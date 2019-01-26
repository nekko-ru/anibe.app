import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/providers/post.service';
import { IPost } from 'src/app/providers/interfaces';
import { Firebase } from '@ionic-native/firebase/ngx';
import { config } from '../../providers/config';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Содержит последние изменения и обновления
   */
  public lastupdates: IPost[];

  /**
   * Список новостей на главной странице
   */
  public news: any[];

  /**
   * Список слайдов которые необходимо будет показать
   */
  public slider_data: any;

  /**
   * Включен ли слайдер
   */
  public enableSlider: boolean;

  /**
   * Конструктор класса
   * @param router роутер
   * @param IShortPostInfo сервис
   */
  constructor(
    private router: Router,
    private post: PostService,
    private firebase: Firebase
  ) {}

    /**
   * Открывает выбраный пост
   * @param id uuid поста
   */
  public openPost(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
  }

  public async openPage(item: { img: string, inapp_page: boolean, url: string }) {
    if (item.inapp_page) {
      this.router.navigateByUrl(item.url);
    } else {
      window.open(item.url, '_system');
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.enableSlider = config.home_slider_enable;
    this.slider_data = config.home_slider_data;

    this.lastupdates = await this.post.getAll(null, { limit: '5', sort: '-updatedAt' });
    await this.firebase.setScreenName('home');
  }
}
