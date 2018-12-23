// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { IShortPostInfo } from 'src/core/interfaces/post';
import { ModalController } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {
  private result: IShortPostInfo[] = [{
    id: '44a99cb0-be7c-447c-9e8c-f5fc1d23214c',
    name: 'tempor aute mollit',
    annotation: 'ex dolor aliqua cillum culpa excepteur non labore aliqua fugiat eiusmod ut veniam in nulla deserunt aliquip sit nulla ad ex aliquip cillum duis ea esse incididunt excepteur deserunt fugiat quis exercitation veniam magna excepteur',
    cover: 'http://placehold.it/620x820',
    author: 'dolor',
    genre: [
      'ea',
      'ea',
      'incididunt',
      'pariatur',
      'nulla',
      'eiusmod',
      'eiusmod',
      'fugiat',
      'irure',
      'nisi'
    ],
    type: 'Манга',
    rating: 6.75
  },
  {
    id: '8ce4894f-997c-445e-ac47-0d5eb1864809',
    name: 'magna enim ipsum',
    annotation: 'pariatur ullamco esse fugiat officia magna deserunt duis pariatur fugiat proident et minim eiusmod anim dolor id esse occaecat aliqua sint dolor fugiat proident aute ipsum deserunt est veniam ex non labore excepteur non est',
    cover: 'http://placehold.it/620x820',
    author: 'esse',
    genre: [
      'laboris',
      'ullamco',
      'esse',
      'aute',
      'aliqua',
      'ut',
      'tempor',
      'velit'
    ],
    type: 'Манга',
    rating: 1.62
  },
  {
    id: '888e608e-acc0-44df-acb4-a877d052be8d',
    name: 'magna enim tempor',
    annotation: 'ipsum consectetur consectetur nulla tempor aute consectetur dolor nostrud tempor laborum nulla sit ad sunt aute minim consectetur ad quis et cillum proident fugiat nisi veniam pariatur dolor mollit laborum id consequat elit ut consequat',
    cover: 'http://placehold.it/620x820',
    author: 'qui',
    genre: [
      'exercitation',
      'mollit',
      'velit',
      'eu',
      'laboris',
      'ex',
      'ad'
    ],
    type: 'Манга',
    rating: 9.13
  },
  {
    id: '88d11c1b-f05e-40cc-9933-dcb9cdd17658',
    name: 'incididunt consectetur ea',
    annotation: 'excepteur nostrud occaecat enim non Lorem dolor ad reprehenderit occaecat tempor labore ullamco quis id quis adipisicing aliqua ipsum quis veniam incididunt culpa ullamco ut fugiat magna fugiat aute magna nisi sit voluptate enim dolor',
    cover: 'http://placehold.it/620x820',
    author: 'sint',
    genre: [
      'minim',
      'ullamco',
      'esse',
      'exercitation',
      'laborum',
      'ipsum',
      'commodo'
    ],
    type: 'Манга',
    rating: 1.79
  },
  {
    id: '940b555c-8f47-4db4-b59e-eefa5441e83a',
    name: 'sint laboris ipsum',
    annotation: 'dolore mollit sit ullamco Lorem reprehenderit commodo laboris nulla qui magna nisi ut pariatur adipisicing Lorem ullamco reprehenderit labore anim quis excepteur labore sunt occaecat aute dolore quis velit eiusmod eu tempor esse ut sunt',
    cover: 'http://placehold.it/620x820',
    author: 'incididunt',
    genre: [
      'cillum',
      'elit',
      'nisi',
      'ipsum',
      'voluptate',
      'et',
      'minim',
      'consequat'
    ],
    type: 'Манга',
    rating: 2.7
  }
];

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
