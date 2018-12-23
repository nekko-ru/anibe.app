// tslint:disable:max-line-length
import { IShortPostInfo } from './interfaces/post';
import { IShortNews } from './interfaces/news';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private news: IShortNews[] = [{
      id: 'asdasdasd',
      title: 'Новое обновление v11.0',
      annotation: 'доступно новое приложение',
      cover: 'http://placehold.it/800x500'
    },
    {
      id: 'asd',
      title: 'Новое обновление v10.13',
      annotation: 'доступно новое приложение',
      cover: 'http://placehold.it/800x500'
    }
  ];

  private lastupdates: IShortPostInfo[] = [{
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

  constructor() {}

  /**
   * Возращяет список обновлений
   */
  public getUpdates (): IShortPostInfo[] {
    return this.lastupdates;
  }

  /**
   * Список новостей которые необходимо отразить на главной
   */
  public getNews(): IShortNews[] {
    return this.news;
  }

}
