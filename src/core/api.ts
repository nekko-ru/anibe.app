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
  private baseURL = 'http://localhost:8080';
  /**
   * @private
   * @description тип содержимого ответа и запроса
   * @type {string}
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
  get(url: string) {
    return this.http.get(this.baseURL + url, {}, {});
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  put(url: string, body: any) {
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
  post(url: string, body: any) {
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
  patch(url: string, body: any) {
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
  delete(url: string) {
    return this.http.delete(url, {}, {});
  }
}
