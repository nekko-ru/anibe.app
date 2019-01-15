import { HTTP } from '@ionic-native/http/ngx';
import { RequestParam } from './interfaces';
import { config } from './config';

export interface AxiosSettings {
  auth?: {
    username: string,
    password: string,
  };
  baseURL?: string;
  responseType?: string;
}

/**
 * Класс обертка для быстрой смены способоа запросов
 * @param {AxiosSettings} settings параметры для установки
 * @class
 */
export class API {
  /**
   * @private
   * @description параметры для установки http соединения
   * @type {AxiosSettings}
   */
  private settings: AxiosSettings;
  /**
   * @private
   * @description переменная для хранения экземпляра класса для работы с http
   * @type {HTTP}
   */
  private http: HTTP;
  /**
   * @private
   * @description содержит ссылку на api
   * @type {string}
   */
  private baseURL: string = config.url;
  /**
   * @private
   * @description тип содержимого ответа и запроса
   */
  private responseType = 'json';

  /**
   * @constructor
   * @param {AxiosSettings} settings параметры для соединения через HTTP
   */
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
   * @async
   * @param {string} url ссылка на метод без учета базы
   * @returns {Promise<any>}
   */
  public get(url: string): Promise<any> {
    return this.http.get(this.baseURL + url, {}, {});
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public put(url: string, body: any): Promise<any> {
    return this.http.put(this.baseURL + url, {
      data: body
    }, {});
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public post(url: string, body: any): Promise<any> {
    return this.http.post(url, {
      data: body
    }, {});
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public patch(url: string, body: any): Promise<any> {
    return this.http.patch(url, {
      data: body
    }, {});
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @async
   * @param url ссылка
   * @returns {Promise<any>}
   */
  public delete(url: string): Promise<any> {
    return this.http.delete(url, {}, {});
  }
}
