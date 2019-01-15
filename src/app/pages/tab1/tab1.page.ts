import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/providers/post.service';
import { IPost } from 'src/app/providers/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
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
    private router: Router,
    private post: PostService
  ) {}

    /**
   * Открывает выбраный пост
   * @param id uuid поста
   */
  private openPost(id: string): void {
    this.router.navigateByUrl(`/info/${id}`);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  async ngOnInit() {
    this.lastupdates = await this.post.getAll(null, { limit: '5', sort: '-updatedAt' });
  }
}
