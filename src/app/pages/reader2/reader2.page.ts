import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { LoadingController } from '@ionic/angular';
import { IPostFull } from 'src/app/services/interfaces';
import { Firebase } from '@ionic-native/firebase/ngx';
import { of, Observable, from, Subject } from 'rxjs';
import { FivGallery, FivGalleryImage, ImageService } from '@fivethree/core';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-reader2',
  templateUrl: './reader2.page.html',
  styleUrls: ['./reader2.page.scss'],
})
export class Reader2Page implements OnInit {

  /**
   * Contain full manga info with chapters
   */
  public info: IPostFull;
  /**
   * Contain only images from current chapter
   */
  public imgs: string[] = [];

  /**
   * Current chapter name
   */
  public chapter: string;
  /**
   * Current manga id
   */
  public id: string;

  /**
   * Viewer
   */
  @ViewChild('Viewer') viewer: FivGallery;

  /**
   * Current state
   * using for open last page and show come stats
   */
  public stats: {
    readed: string[],
    inprogress: string[],
    all: string[],
    last: string
  };

  constructor(
    private post: PostService,
    private route: ActivatedRoute,
    private storage: AppState,
    private firebase: Firebase,
    private loadingController: LoadingController,
  ) { }

  async ngOnInit() {
    await this.presentLoading();
    this.id = this.route.snapshot.paramMap.get('id');
    this.chapter = this.route.snapshot.paramMap.get('chapter');

    await this.load();

    this.stats = (await this.storage.getAsync(`reader_${this.info.id}`)) || {
      readed: [],
      inprogress: [],
      all: [],
      last: Object.keys(this.info.episodes)[0]
    };
    // обновляем на всякий случай, может вышло обновление
    this.stats.all = Object.keys(this.info.episodes);
    await this.storage.setAsync(`reader_${this.info.id}`, this.stats);

    setTimeout(() => this.viewer.updateImages(), 50);

    await this.firebase.setScreenName('reader');
    await this.firebase.logEvent('select_content', { item_id: this.info.id, content_type: 'manga' });
  }

  private async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 2000
    });
    await loading.present();
  }

  /**
   * Fix bugs when close page with reader
   */
  protected async ionViewWillLeave() {
    this.viewer.close();
  }

  private async load() {
    // todo: loading in offline
    this.info = await this.post.get(this.id);
    this.imgs = this.info.episodes[this.chapter];
  }
}
