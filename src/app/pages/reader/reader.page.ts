import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, Events, IonSlide, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { SelectChapterPage } from '../select-chapter/select-chapter.page';
import { IPostFull } from 'src/app/providers/interfaces';
import { PostService } from 'src/app/providers/post.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {
  private ready: boolean;
  private info: IPostFull;
  public chapter: string;
  public episode: string[];

  public preload = false;
  public slideOpts: any = {
    preloadImages: true,
    updateOnImagesReady: true
  };

  private spiner: any;
  @ViewChild('mySlider') public slider: any;

  private active: { chapter: string, page: number, pages: number };
  private allactives: { [k: string]: { chapter: string, page: number, pages: number } };

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private post: PostService,
    private toast: ToastController,
    private firebase: Firebase,
    private statusBar: StatusBar
  ) {
    this.episode = [];
  }

  protected async ionViewDidLeave() {
    await this.statusBar.show();
  }

  async ngOnInit() {
    await this.statusBar.hide();

    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();
    await this.storage.ready();

    this.preload = (await this.storage.get('image_preload'));
    if (this.preload === undefined) {
      this.preload = true;
    }

    this.info = await this.post.get(this.route.snapshot.paramMap.get('id'));

    // получаем первую главу
    // todo: добавить возможноть открывать последнию главу

    const post = await this.storage.get(this.info.id);
    console.log(this);

    // по умолчанию мы открывает первую главу
    this.chapter = Object.keys(this.info.episodes)[0];

    if (post && post.allactives[this.chapter]) {
      this.active = post.active;
      console.log(this.active);

      this.chapter = this.active.chapter;
      this.allactives = post.allactives;
    } else {
      this.active = {
        chapter: this.chapter,
        page: 0,
        pages: this.episode.length
      };
      this.allactives = {
        ...this.allactives,
        [this.chapter]: this.active
      };
    }

    this.episode = this.info.episodes[this.chapter];
    this.ready = true;
    await this.slider.slideTo(this.active.page);
    await this.spiner.dismiss();

    await this.firebase.setScreenName('reader');
    await this.firebase.logEvent('select_content', { item_id: this.info.id, content_type: 'manga' });
  }

  public async ChapterEnded() {
    // фикс срабатываний при не полной загрузке слайдера
    if (await this.slider.getActiveIndex() !== this.episode.length - 1) {
      return;
    }
    // проверка на то что мы загрузились
    if (!this.ready) {
      return;
    }

    console.log('reached end', await this.slider.getActiveIndex());

    this.active = {
      chapter: this.chapter,
      page: await this.slider.getActiveIndex(),
      pages: this.episode.length - 1
    };

    this.allactives = {
      ...this.allactives,
      [this.chapter]: this.active
    };
    // записываем всю активность и сохраняем, относительно последней и глобально по манге
    await this.storage.set(this.info.id, {
      allactives: this.allactives,
      active: this.active
    });
  }

  public async sliderEvent() {
    // срабатывает при перелистывании
    this.active = {
      chapter: this.chapter,
      // fixme:
      page: await this.slider.getActiveIndex(),
      pages: this.episode.length - 1
    };

    this.allactives = {
      ...this.allactives,
      [this.chapter]: this.active
    };
    await this.storage.set(this.info.id, {
      allactives: this.allactives,
      active: this.active
    });
  }

  public async selectChapter() {
    // открываем новое окно с выбором глав
    const modal = await this.modalController.create({
      component: SelectChapterPage,
      backdropDismiss: true,
      componentProps: {
        selected: this.chapter,
        chapters: Object.keys(this.info.episodes),
        allactives: this.allactives
      }
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    const post: {
      allactives: {
        [k: string]: {
          chapter: string,
          page: number,
          pages: number
        }
      },
      active: {
        chapter: string,
        page: number,
        pages: number
      }
    } = await this.storage.get(this.info.id);

    console.log(post, this.chapter in post.allactives);

    // проверяем на то что глава была наньше открыта и загружаем прогресс с нее
    this.chapter = result.data.chapter;
    if (post && this.chapter in post.allactives) {
      console.log('opened chapter in progress or ended');

      this.episode = this.info.episodes[this.chapter];
      this.allactives = post.allactives;
      await this.slider.slideTo(this.active.page);
    } else {
      console.log('opened new chapter');
      this.episode = this.info.episodes[this.chapter];

      this.active = {
        chapter: this.chapter,
        page: 0,
        pages: this.episode.length - 1
      };
      this.allactives = {
        ...this.allactives,
        [this.chapter]: this.active
      };
      await this.slider.slideTo(0);
    }

    // еще раз все сохроняем, после наших всех переходов
    await this.storage.set(this.info.id, {
      allactives: {
        ...this.allactives,
        [this.chapter]: this.active
      },
      active: this.active
    });
  }
}
