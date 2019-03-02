import { Injectable } from '@angular/core';
import { API } from './api.service';
import { IPostFull, RequestParam, IPost, IComment } from './interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PostService {
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
   * Получить полную информацию о посте, включая эпизоды его
   * @async
   * @param {string} id uuid поста
   * @returns {Promise<IPostFull>} результат
   */
  public async get(id: string): Promise<IPostFull> {
    this.token = await this.storage.get('token') || '';
    const url = `/posts/${id}`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * Получение всех постов
   * @async
   * @param {string} query Запрос, может быть null
   * @param {RequestParam} params параметры запроса
   * @returns {Promise<IPost[]>}
   */
  public async getAll(query: string, params: RequestParam): Promise<IPost[]> {
    this.token = await this.storage.get('token') || '';
    let url = `/posts?page=${params.page || ''}` +
    `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
    `&fields=${params.fields || ''}`;

    if (query) {
      url += `&q=${query}`;
    }
    if (params.custom) {
      url += params.custom;
    }

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });

    return JSON.parse(res.data).rows;
  }

  public async addToList(id: string, status: string) {
    this.token = await this.storage.get('token') || '';
    const url = `/posts/${id}/user-list`;

    const res = await this.api.post(url, {
      status
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    (await this.toast.create({
      message: 'Добавлено',
      duration: 2000
    })).present();
    return JSON.parse(res.data).rows;
  }

  public async removeFromList(id: string) {
    this.token = await this.storage.get('token') || '';
    const url = `/posts/${id}/user-list`;

    const res = await this.api.delete(url, {
      'Authorization': 'Bearer ' + this.token
    });

    (await this.toast.create({
      message: 'Удалено',
      duration: 2000
    })).present();
    return JSON.parse(res.data).rows;
  }

  /**
   * Добавляет новый комент
   * @param post_id айди к которому нужно добавить комент
   * @param body тело комента
   */
  public async createComment(post_id: string, body: string) {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.post('/comments', {
      body,
      post_id
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * Получение всех коментов
   * @param {string} id айдишник поста
   */
  public async getComments(id: string, page: number = 1): Promise<IComment[]> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.get(`/comments/${id}?page=${page}`, {
      'Authorization': 'Bearer ' + this.token
    });

    return JSON.parse(res.data);
  }

  public async deleteComment(id: string): Promise<any> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.delete(`/comments/${id}`, {
      'Authorization': 'Bearer ' + this.token
    });

    return JSON.parse(res.data);
  }
}
