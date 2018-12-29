// tslint:disable:max-line-length
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchParamsPage } from '../search-params/search-params.page';

import { Post } from '../../core';
import { IPost } from 'src/core/interfaces';

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
  private genres: { name: string, active: boolean } [] = [
    {
      name: 'Безумие',
      active: false
    }, {
      name: 'Боевые искусства',
      active: false
    }, {
      name: 'Вампиры',
      active: false
    }, {
      name: 'Военное',
      active: false
    }, {
      name: 'Гарем',
      active: false
    }, {
      name: 'Гендерная интрига',
      active: false
    }, {
      name: 'Детское',
      active: false
    }, {
      name: 'Дзёсей',
      active: false
    }, {
      name: 'Драма',
      active: false
    }, {
      name: 'Игры',
      active: false
    }, {
      name: 'Исторический',
      active: false
    }, {
      name: 'Комедия',
      active: false
    }, {
      name: 'Космос',
      active: false
    }, {
      name: 'Магия',
      active: false
    }, {
      name: 'Машины',
      active: false
    }, {
      name: 'Меха',
      active: false
    }, {
      name: 'Мистика',
      active: false
    }, {
      name: 'Музыка',
      active: false
    }, {
      name: 'Пародия',
      active: false
    }, {
      name: 'Повседневность',
      active: false
    }, {
      name: 'Приключения',
      active: false
    }, {
      name: 'Психологическое',
      active: false
    }, {
      name: 'Романтика',
      active: false
    }, {
      name: 'Сверхъестественное',
      active: false
    }, {
      name: 'Сёдзе',
      active: false
    }, {
      name: 'Сёдзе Ай',
      active: false
    }, {
      name: 'Сёнен',
      active: false
    }, {
      name: 'Сейнен',
      active: false
    }, {
      name: 'Сёнен Ай',
      active: false
    }, {
      name: 'Спорт',
      active: false
    }, {
      name: 'Супер сила',
      active: false
    }, {
      name: 'Триллер',
      active: false
    }, {
      name: 'Ужасы',
      active: false
    }, {
      name: 'Фантастика',
      active: false
    }, {
      name: 'Хентай',
      active: false
    }, {
      name: 'Школа',
      active: false
    }, {
      name: 'Экшен',
      active: false
    }, {
      name: 'Этти',
      active: false
    }, {
      name: 'Юри',
      active: false
    }, {
      name: 'Яой',
      active: false
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
        genres: this.genres
      }
    });

    await modal.present();
    const result = await modal.onDidDismiss();

    this.genres = result.data.genres;
    console.log(result.data);
  }

  ngOnInit() {
    this.load();
  }

  private async load(query?: string) {
    // тк первую страницу только что загрузили
    this.page += 1;

    const temp = await this.Post.getAll(query || this.query, {
      limit: '10',
      page: this.page
    });
    if (temp.length === 0) {
      this.result = [];
      this.page = 0;
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
    } else {
      await this.load(null);
    }
  }

  /**
   * Возвращяет активные жанры
   */
  activeGenre(): { name: string, active: boolean }[] {
    return this.genres.filter((v) => v.active === true);
  }

  /**
   * Подзагрузка содержимого, вызывается из шаблона
   * @param event событие
   */
  loadNewPage(event) {
    this.load();
    event.target.complete();
  }
}
