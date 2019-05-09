import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { API } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
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
  public async send(body: IReportBody): Promise<any> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.post('/reports', {
      ...body,
      status: 'created'
    }, {
      'access_token': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }
}

export interface IReportBody {
  name?: string;
  body?: string;
  post_id?: string;
  user_id?: string;
  authod_id?: string;
  status?: string;
}
