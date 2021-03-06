import { Injectable } from '@angular/core';
import { API } from './api.service';
import { ToastController } from '@ionic/angular';
import { INewsPost } from './interfaces';
import { AppState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;
  private token: string;
  private ready: Promise<any>;

  constructor(
    private storage: AppState,
    private toast: ToastController
  ) {
    this.api = new API({  });
  }

  /**
   * Получить новость по id
   * @async
   * @param {string} id uuid поста
   * @returns {Promise<INewsPost>} результат
   */
  public async get(id: string): Promise<INewsPost> {
    this.token = await this.storage.getAsync('token') || 'invalid';
    const url = `/news/${id}`;

    const res = await this.api.get(url, {
      access_token: this.token
    });
    return res.data;
  }

  public async getAll(page: string = '1', limit: string = '25'): Promise<INewsPost[]> {
    this.token = await this.storage.getAsync('token') || 'invalid';
    const url = `/news`;

    const res = await this.api.get(url, {
      access_token: this.token,
      page,
      limit
    });
    return res.data.rows;
  }
}
