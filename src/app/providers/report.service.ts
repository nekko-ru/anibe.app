import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { API, baseURL } from './api.service';
import { Storage } from '@ionic/storage';
import axios from 'axios';

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
    this.token = await this.storage.get('token') || 'invalid';

    const res = await axios.post(baseURL + `/reports`, {
      ...body,
      status: 'Created',
      'access_token': this.token
    });
    return res.data;
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
