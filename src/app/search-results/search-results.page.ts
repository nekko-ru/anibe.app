// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { IShortPostInfo } from 'src/core/interfaces/post';
import { ModalController } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';
import axios from 'axios';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  private result: any[] = [];

  private query: string;
  private page: number;
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

  constructor(public modalController: ModalController) {}

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
    this.loadLates();
  }

  async loadLates() {
    const res: any = await axios.get('http://192.168.0.103:8080/posts');
    console.log(res);
    this.result = res.data.rows;
  }

  search(event: any) {
    this.query = event.target.value;
    if (this.query !== '') {
      console.log(event.target.value);
    } else {
      // todo: show empty result
    }
  }

  loadData(event) {
    setTimeout(() => {
      this.result.forEach(i => {
        this.result.push(i);
      });
      event.target.complete();
    }, 3000);
  }
}
