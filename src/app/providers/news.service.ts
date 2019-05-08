import { Injectable } from '@angular/core';
import { API } from './api.service';
import { ToastController } from '@ionic/angular';
import { INewsPost } from './interfaces';
import { Storage } from '@ionic/storage';

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
    private storage: Storage,
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
    this.token = await this.storage.get('token') || '';
    const url = `/news/${id}`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return res.data;
  }

  public async getAll(page: number = 1, limit: number = 5): Promise<INewsPost[]> {
    this.token = await this.storage.get('token') || '';
    const url = `/news?page=${page}&limit=${limit}`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return res.data.rows;
  }
}
