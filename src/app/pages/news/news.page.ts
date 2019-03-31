import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Firebase } from '@ionic-native/firebase/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { INewsPost } from 'src/app/providers/interfaces';
import { NewsService } from 'src/app/providers/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  private id: string;
  private spiner: HTMLIonLoadingElement;

  public info: INewsPost;

  constructor(
    private news: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private firebase: Firebase,
    private storage: Storage,
    private loadingController: LoadingController,
    private toast: ToastController
  ) { }

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.spiner = await this.loadingController.create({
      message: 'Загрузка...',
      duration: 5000
    });
    await this.spiner.present();
    await this.load();

    await this.spiner.dismiss();

    await this.firebase.setScreenName('news');
    await this.firebase.logEvent('select_content', { item_id: this.id, content_type: 'news' });
  }

  public async Comments() {
    this.router.navigateByUrl(`/comments/${this.id}`);
  }

  private async load() {
    try {
      this.info = await this.news.get(this.id);
      await this.storage.set(`news_${this.id}`, this.info);
    } catch (e) {
      // логируем в консоль браузера
      console.error(e);
      // логируем в фаербейс
      await this.firebase.logError(e);
      (await this.toast.create({
        message: 'Ошибка при загрузке, попробуйте чуть позже',
        duration: 5000
      })).present();
    }
  }
}
