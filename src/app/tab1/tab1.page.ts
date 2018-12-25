import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../core';
import { IPost } from 'src/core/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private Post: Post;
  /**
   * Содержит последние изменения и обновления
   */
  private lastupdates: IPost[];

  /**
   * Список новостей на главной странице
   */
  private news: any[];

  /**
   * Конструктор класса
   * @param router роутер
   * @param IShortPostInfo сервис
   */
  constructor(
    private router: Router
  ) {
    this.Post = new Post();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.lastupdates = await this.Post.getAll(null, { limit: '5' });
  }
}
