import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/providers/post.service';
import { IPost, INewsPost } from 'src/app/providers/interfaces';
import { Firebase } from '@ionic-native/firebase/ngx';
import { ConfigProvider } from '../../providers/config.provider';
import { ToastController } from '@ionic/angular';
import { NewsService } from 'src/app/providers/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  /**
   * Содержит последние изменения и обновления
   */
  public lastupdates: IPost[];

  /**
   * Содержит послдедние новости
   */
  public lastnews: INewsPost[];

  /**
   * Список слайдов которые необходимо будет показать
   */
  public slider_data: any;

  /**
   * Включен ли слайдер
   */
  // tslint:disable-next-line:no-inferrable-types
  public enableSlider: string = 'false';

  /**
   * Конструктор класса
   * @param router роутер
   * @param IShortPostInfo сервис
   */
  constructor(
    private router: Router,
    private post: PostService,
    private news: NewsService,
    private toast: ToastController,
    private firebase: Firebase,
    private remote_config: ConfigProvider
  ) {}

    /**
   * Открывает выбраный пост
   * @param id uuid поста
   */
  public async openPost(id: string): Promise<any> {
    await this.router.navigateByUrl(`/info/${id}`);
  }

  public async openPage(item: { img: string, inapp_page: boolean, url: string }) {
    if (item.inapp_page) {
      this.router.navigateByUrl(item.url);
    } else {
      window.open(item.url, '_system');
    }
  }

  protected async ionViewWillEnter() {
    this.slider_data = JSON.parse(await this.remote_config.getValue('home_slider_data'));
    this.enableSlider = await this.remote_config.getValue('home_slider_enable');
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    try {
      this.lastupdates = await this.post.getAll(null, { limit: '5', sort: '-updatedAt' });
      this.lastnews = await this.news.getAll();
    } catch (e) {
      if (e.error === 'advanced-http: please check browser console for error messages') {
        (await this.toast.create({
          message: 'Необходимо интернет соединение!',
          duration: 5000
        })).present();
      }
    }
    await this.firebase.setScreenName('home');
  }

  public async openNews(id: string): Promise<any> {
    await this.router.navigateByUrl(`/news/${id}`);
  }
}
