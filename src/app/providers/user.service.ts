import { Injectable } from '@angular/core';
import { API } from './api.service';
import { Storage } from '@ionic/storage';

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

  public setAuth(u: string, p: string) {
    this.api = new API({
      auth: {
        username: u,
        password: p
      }
    });
  }

  public async reg(v: { email: string, name: string, password: string, picture?: string }) {
    const url = `/users`;

    const res = await this.api.post(url, {
      email: v.email,
      password: v.password,
      name: v.name,
      picture: v.picture
    }, {});
    return JSON.parse(res.data);
  }

  /**
   * Авторизация и получение токена
   */
  public async auth(username: string, password: string) {
    this.api = new API({
      auth: {
        username,
        password
      }
    });
    const res = await this.api.post('/auth', {}, {});

    this.api = new API({});
    return JSON.parse(res.data);
  }

  /**
   * @description получить текущего пользователя
   */
  public async getSelf() {
    await this.setToken();
    const url = `/users/me`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * @description получить информацию о пользователе
   * @param id uuid пользователя
   */
  public async get(id: string) {
    await this.setToken();
    const url = `/users/${id}`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * @description обновить информацию о пользователе
   * @param body новая информация о пользователе
   */
  public async update(body: any) {
    await this.setToken();
    const url = `/users/me`;

    const res = await this.api.put(url, body, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }
}
