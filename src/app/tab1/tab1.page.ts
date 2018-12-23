import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../core/home';
import { IShortPostInfo } from '../../core/interfaces/post';
import { IShortNews } from 'src/core/interfaces/news';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Содержит последние изменения и обновления
   */
  private lastupdates: IShortPostInfo[];

  /**
   * Список новостей на главной странице
   */
  private news: IShortNews[];

  /**
   * Конструктор класса
   * @param router роутер
   * @param IShortPostInfo сервис
   */
  constructor(
    private router: Router,
    public homeService: HomeService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.lastupdates = this.homeService.getUpdates();
    this.news = this.homeService.getNews()
  }

}
