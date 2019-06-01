import { Component } from '@angular/core';
import { IPost, INewsPost } from 'src/app/services/interfaces';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { NewsService } from 'src/app/services/news.service';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /**
   * Содержит последние изменения и обновления
   */
  public lastupdates: IPost[];

  /**
   * Содержит послдедние новости
   */
  public lastnews: INewsPost[];

  /**
   * Список рекомендаций для пользователя (если он вошел в аккаунт)
   */
  public recommendations: IPost[] = [];

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
   * Параметры для слайдера на странице
   */
  public slideOpts: any = {
    slidesPerView: 2,
    spaceBetween: 5,
    centeredSlides: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
  };

  /**
   * Конструктор класса
   * @param router роутер
   * @param IShortPostInfo сервис
   */
  constructor(
    private router: Router,
    private post: PostService,
    private news: NewsService,
    private user: UserService,
    private toast: ToastController,
    // private firebase: Firebase,
    private storage: Storage
  ) {}

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
    // this.slider_data = JSON.parse(await this.remote_config.getValue('home_slider_data'));
    // this.enableSlider = await this.remote_config.getValue('home_slider_enable');
  }

  // tslint:disable-next-line: use-life-cycle-interface
  async ngOnInit() {
    try {
      this.lastnews = await this.news.getAll();
      if (this.storage.get('token')) {
        this.recommendations = await this.user.getOffer();
      }
    } catch (e) {
      console.error(e);

      if (e.error === 'advanced-http: please check browser console for error messages') {
        (await this.toast.create({
          message: 'Необходимо интернет соединение!',
          duration: 5000
        })).present();
      }
    }
  }

  protected async ionViewDidEnter() {
    // await this.firebase.setScreenName('home');
  }

  public async openNews(id: string): Promise<any> {
    await this.router.navigateByUrl(`/news/${id}`);
  }
}
