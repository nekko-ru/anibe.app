// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';

import { Post } from '../../core';
import { IPost } from 'src/core/interfaces';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  private Post: Post;

  private result: IPost[] = [];
  private query = null;
  private page = 0;
  private genges: any[] = [
    {
      name: 'Новое',
      active: true
    },
    {
      name: 'Тег',
      active: true
    },
    {
      name: 'Популярное',
      active: true
    }
  ];

  constructor(public modalController: ModalController) {
    this.Post = new Post();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchParamsPage,
      backdropDismiss: true,
      componentProps: {
        genres: this.genges
      }
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    this.genges = result.data.genges;
    console.log(result);
  }

  ngOnInit() {
    this.load();
  }

  private async load(query?: string) {
    // тк первую страницу только что загрузили
    this.page += 1;

    const temp = await this.Post.getAll(query || this.query, { limit: '10', page: this.page });
    if (temp.length === 0) {
      this.result = [];
      this.page = 0;
    } else {
      temp.forEach(i => {
        this.result.push(i);
      });
    }
  }

  async search(event: any) {
    this.query = event.target.value;

    console.log(event.target.value);
    if (this.query !== '') {
      await this.load(this.query);
    } else {
      await this.load(null);
    }
  }

  loadNewPage(event) {
    this.load();
    event.target.complete();
  }
}
