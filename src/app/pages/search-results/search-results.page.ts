// tslint:disable:max-line-length
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonVirtualScroll } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';

import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { IPost, RequestParam } from 'src/app/services/interfaces';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  private query = null;
  private page = 0;
  private activegenres: string[] = [];

  // virtualScroll
  public render: any[] = [];

  @ViewChild('scroller') private scroller: IonVirtualScroll;

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

    if (result.data && !result.data.changed) {
      // отменяем запрос, только если предыдущий выбор жанров был таким же
      return;
    }

    this.activegenres = result.data.activegenres;
    this.render = [];
    this.page = 0;

    if (this.query !== '') {
      this.render = [];
      await this.load(this.query);
    } else {
      await this.load(null);
    }

    console.log(result.data);
  }

  ngOnInit() {
  }

  protected async ionViewDidEnter() {
    await this.firebase.setScreenName('search');

    const genres = await this.storage.get('search_genres');
    if (!genres) {
      this.activegenres = [];
    } else {
      this.activegenres = genres.filter((v) => v.active === true).map((v) => v.name);
    }

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
    const opt: RequestParam = {
      limit: '25',
      page: Number(this.page).toString(),
      sort: '-rating',
    };

    if (this.activegenres.length !== 0) {
      opt.genre = this.activegenres.join(',');
    }

    if (this.query) {
      opt.q = this.query;
    }

    const temp = await this.post.getAll(query || this.query, { ...opt });
    if (temp.length === 0 && this.page === 1) {
      this.render = [];
      this.page = 0;
      return;
    } else {
      temp.forEach((i: IPost) => this.render.push(i));
    }

    // this.render = this.result;
    this.scroller.checkEnd();
  }

  /**
   * Поиск после ввода, вызывается из шаблона
   * @param event событие
   */
  async search(event: any) {
    this.query = event.target.value;

    this.page = 0;
    this.render = [];

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
    console.log(this);
  }
}
