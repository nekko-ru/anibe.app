import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  /**
   * Содержит последние изменения и обновления
   */
  private lastupdates: any[];

  /**
   * Конструктор класса
   * @param router роутер
   * @param itemService сервис
   */
  constructor(
    private router: Router,
    public homeService: HomeService
  ) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.lastupdates = this.homeService.getItems();
  }

}
