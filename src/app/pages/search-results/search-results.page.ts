// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';

import { Router } from '@angular/router';
import { PostService } from 'src/app/providers/post.service';
import { IPost } from 'src/app/providers/interfaces';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  // используется для переключения вида отображения данных
  private mode: boolean;

  public result: IPost[] = [];
  private query = null;
  private page = 0;
  private activegenres: string[] = [];

  constructor(
    private modalController: ModalController,
    private router: Router,
    private storage: Storage,
    private post: PostService,
    private firebase: Firebase
  ) {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchParamsPage,
      backdropDismiss: true,
      componentProps: {}
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    if (!result.data.changed) {
      // отменяем запрос, только если предыдущий выбор жанров был таким же
      return;
    }

    this.activegenres = result.data.activegenres;
    this.result = [];
    this.page = 0;

    if (this.query !== '') {
      this.result = [];
      await this.load(this.query);
    } else {
      await this.load(null);
    }

    console.log(result.data);
  }

  ngOnInit() {
  }

  protected async ionViewDidEnter () {
    await this.firebase.setScreenName('search');
    this.activegenres = await this.storage.get('search_genres');
    await this.load();
  }

  /**
   * Открывает выбраный пост
   * @param id uuid поста
   */
  public openPost(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
  }

  private async load(query?: string) {
    // инкрементируем страницу
    this.page += 1;
    const temp = await this.post.getAll(query || this.query, {
      limit: '25',
      page: this.page,
      sort: '-rating',
      custom: (this.activegenres.length !== 0) ? `&genre=${this.activegenres.join(',')}` : ''
    });
    if (temp.length === 0 && this.page === 1) {
      this.result = [];
      this.page = 0;
      return;
    } else {
      temp.forEach(i => {
        this.result.push(i);
      });
    }
  }

  /**
   * Поиск после ввода, вызывается из шаблона
   * @param event событие
   */
  async search(event: any) {
    this.query = event.target.value;

    this.page = 0;
    this.result = [];

    console.log(event.target.value);
    if (this.query !== '') {
      await this.load(this.query);

      await this.firebase.logEvent('search', { genres: this.activegenres, query: this.query });
    } else {
      await this.load(null);
    }
  }

  /**
   * Подзагрузка содержимого, вызывается из шаблона
   * @param event событие
   */
  public loadNewPage(event: any) {
    this.load();
    event.target.complete();
  }
}
