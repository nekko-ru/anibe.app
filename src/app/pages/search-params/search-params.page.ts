import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search-params',
  templateUrl: './search-params.page.html',
  styleUrls: ['./search-params.page.scss'],
})
export class SearchParamsPage implements OnInit {

  public genres: { name: string, active: boolean } [] = [
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

  private changed = false;

  constructor(
    private modalController: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  protected async ionViewDidEnter() {
    Object.assign(this.genres, await this.storage.get('search_genres'));
  }

  public async savePicks() {
    await this.storage.set('search_genres', this.genres);
    await this.modalController.dismiss({
      activegenres: this.activeGenre(),
      changed: this.changed
    });
  }

  /**
   * Возвращяет активные жанры
   */
  private activeGenre(): string[] {
    return this.genres.filter((v) => v.active === true).map((v) => v.name);
  }

  public ionChanged() {
    // костыль для обработки события при изменении чекбокса
    this.changed = true;
  }
}
