import { Injectable } from '@angular/core';
import { API } from './api.service';
import { Storage } from '@ionic/storage';
import { INotif, IPost, IUser } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;
  private token: string;

  constructor(
    private storage: Storage
  ) {
    this.api = new API({  });
  }

  private async setToken() {
    this.token = await this.storage.get('token');
  }

  public async reg(v: { email: string, name: string, password: string, picture?: string }) {
    const url = `/users`;

    const res = await this.api.post(url, {
      email: v.email,
      password: v.password,
      name: v.name,
      picture: v.picture
    }, {});
    return res.data;
  }

  /**
   * Авторизация и получение токена
   */
  public async auth(username: string, password: string) {
    const res = await this.api.auth('/auth', username, password);
    return res.data;
  }

  /**
   * @description получить текущего пользователя
   */
  public async getSelf() {
    await this.setToken();
    const url = `/users/me`;

    const res = await this.api.get(url, {
      access_token: this.token
    });
    return res.data;
  }

  /**
   * @description получить информацию о пользователе
   * @param id uuid пользователя
   */
  public async get(id: string): Promise<IUser> {
    await this.setToken();
    const url = `/users/${id}`;

    const res = await this.api.get(url, {
      access_token: this.token
    });
    return res.data;
  }

  /**
   * @description получить информацию о пользователе по его нику
   * @param name
   */
  public async getName(name: string): Promise<IUser> {
    await this.setToken();
    const url = `/users/name/${name}`;

    const res = await this.api.get(url, {
      access_token: this.token
    });
    return res.data;
  }

  /**
   * @description обновить информацию о пользователе
   * @param body новая информация о пользователе
   */
  public async update(body: any) {
    await this.setToken();
    const res = await this.api.put(`/users/me`, body, {
      access_token: this.token
    });

    return res.data;
  }
  public async updateAvatar(file: any) {
    await this.setToken();
    const url = `/users/update/avatar`;

    const res = await this.api.putFile(url, {
      access_token: this.token
    }, file);
    return res.data;
  }

  public async addFCM(token: string) {
    await this.setToken();

    const res = await this.api.post('/users/me/fcm', {
      token,
    }, {
      access_token: this.token
    });
  }

  public async updateFCM(newtoken: string, oldtoken: string) {
    await this.setToken();

    await this.api.put(`/users/me/fcm`, {
      new: newtoken,
      old: oldtoken,
    }, {
      access_token: this.token
    });
  }

  public async getNotif(page: string, limit: string): Promise<INotif[]> {
    await this.setToken();

    const res = await this.api.get(`/notifications`, {
      access_token: this.token,
      page,
      limit
    });
    return res.data.rows;
  }

  /**
   * Список рекомендаций
   */
  public async getOffer(): Promise<IPost[]> {
    await this.setToken();

    const res = await this.api.get('/users/me/offer', {
      sort: '+genre',
      access_token: this.token
    });
    return res.data.rows;
  }

  /**
   * Список рекомендаций (более крутой и точный, но более затратный по ресурсам сервера)
   */
  public async getRecommendations(): Promise<IPost[]> {
    await this.setToken();

    const res = await this.api.get('/users/me/recommendations', {
      access_token: this.token
    });
    return res.data.rows;
  }
}
