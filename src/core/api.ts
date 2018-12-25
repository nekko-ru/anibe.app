import { HTTP } from '@ionic-native/http/ngx';
import { RequestParam } from './Post/interfaces';

export interface AxiosSettings {
  auth?: {
    username: string,
    password: string,
  };
  baseURL?: string;
  responseType?: string;
}

export class API {
  private settings: AxiosSettings;
  private http: HTTP;

  private baseURL = 'http://localhost:8080';
  private responseType = 'json';

  constructor(settings: AxiosSettings) {
    this.settings = settings;
    this.http = new HTTP();
    if (this.settings.auth) {
      this.http.useBasicAuth(settings.auth.username, settings.auth.password);
    }
    this.http.setDataSerializer(this.responseType);
  }

  /**
   * Выполняет GET запрос к серверу апи
   * @param {string} url ссылка на метод без учета базы
   */
  get(url: string, params: RequestParam = {}) {
    url = this.baseURL + `${url}?page=${params.page || ''}` +
      `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
      `&fields=${params.fields || ''}`;
    return this.http.get(url, {}, {});
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  put(url: string, body: any, params: any = {}) {
    url = this.baseURL + `${url}?page=${params.page || ''}` +
      `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
      `&fields=${params.fields || ''}`;
    return this.http.put(url, {
      data: body
    }, {});
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  post(url: string, body: any, params: any = {}) {
    url = this.baseURL + `${url}?page=${params.page || ''}` +
      `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
      `&fields=${params.fields || ''}`;
    return this.http.post(url, {
      data: body
    }, {});
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  patch(url: string, body: any, params: any = {}) {
    url = this.baseURL + `${url}?page=${params.page || ''}` +
      `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
      `&fields=${params.fields || ''}`;
    return this.http.patch(url, {
      data: body
    }, {});
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @param url ссылка
   */
  delete(url: string, params: any = {}) {
    return this.http.delete(url, {}, {});
  }
}
