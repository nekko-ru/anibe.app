import { Injectable } from '@angular/core';
import { API } from './api.service';
import { config } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;

  constructor() {
    this.api = new API({  });
  }

  public setAuth(u: string, p: string) {
    this.api = new API({
      auth: {
        username: u,
        password: p
      }
    });
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
    const res = await this.api.post('/auth', {}, {
      auth: ''
    });

    return JSON.parse(res.data);
  }
}
