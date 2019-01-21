import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, Events, IonSlide } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { SelectChapterPage } from '../select-chapter/select-chapter.page';
import { IPostFull } from 'src/app/providers/interfaces';
import { PostService } from 'src/app/providers/post.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {
  private ready: boolean;
  private info: IPostFull;
  private chapter: string;
  private episode: string[];

  private spiner: any;
  @ViewChild('mySlider') private slider: any;

  private active: { chapter: string, page: number, pages: number };
  private allactives: { [k: string]: { chapter: string, page: number, pages: number } };

  constructor(
    private events: Events,
    private storage: Storage,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private post: PostService
  ) {
    this.episode = [];
  }

  async ngOnInit() {
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();
    await this.storage.ready();

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
      this.slider.slideTo(this.active.page);
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
      this.slider.slideTo(0);
    }

    this.episode = this.info.episodes[this.chapter];
    await this.spiner.dismiss();
    this.ready = true;
  }

  private async ChapterEnded() {
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
    await this.storage.set(this.info.id, {
      allactives: this.allactives,
      active: this.active
    });
  }

  private async sliderEvent() {
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

  private async selectChapter() {
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

    const post = await this.storage.get(this.info.id);
    console.log(this);

    this.chapter = result.data.chapter;
    if (post && post.allactives[this.chapter]) {
      console.log('opened chapter in progress or ended');

      this.episode = this.info.episodes[this.chapter];
      this.allactives = post.allactives;
      this.slider.slideTo(this.active.page);
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
      this.slider.slideTo(0);
    }

    await this.storage.set(this.info.id, {
      allactives: {
        ...this.allactives,
        [this.chapter]: this.active
      },
      active: this.active
    });
  }
}
