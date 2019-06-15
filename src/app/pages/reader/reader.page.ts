import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, LoadingController, Events, IonSlide, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';

import { SelectChapterPage } from '../select-chapter/select-chapter.page';
import { IPostFull } from 'src/app/services/interfaces';
import { PostService } from 'src/app/services/post.service';
import { Firebase } from '@ionic-native/firebase/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss'],
})
export class ReaderPage implements OnInit {
  private ready: boolean;
  private info: IPostFull;
  public episode: string[];
  private spiner: any;

  public stats: {
    readed: string[],
    inprogress: string[],
    all: string[],
    last: string
  };

  constructor(
    private storage: AppState,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private post: PostService,
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

    this.info = await this.post.get(this.route.snapshot.paramMap.get('id'));

    // загружаем прогресс, если его нету для данной манги то создаем его
    this.stats = (await this.storage.getAsync(`reader_${this.info.id}`)) || {
      readed: [],
      inprogress: [],
      all: [],
      last: Object.keys(this.info.episodes)[0]
    };
    // обновляем на всякий случай, может вышло обновление
    this.stats.all = Object.keys(this.info.episodes);
    await this.storage.setAsync(`reader_${this.info.id}`, this.stats);

    this.episode = this.info.episodes[this.stats.last];

    await this.spiner.dismiss();

    await this.firebase.setScreenName('reader');
    await this.firebase.logEvent('select_content', { item_id: this.info.id, content_type: 'manga' });
  }

  public async selectChapter() {
    // открываем новое окно с выбором глав
    const modal = await this.modalController.create({
      component: SelectChapterPage,
      backdropDismiss: true,
      componentProps: {
        stats: this.stats
      }
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    this.stats = result.data;
    this.episode = this.info.episodes[this.stats.last];
    await this.storage.setAsync(`reader_${this.info.id}`, this.stats);
  }
}
