import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { HTTP } from '@ionic-native/http/ngx';

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
  private http: AxiosInstance;
  /**
   * @private
   * @description содержит ссылку на api
   * @type {string}
   */
  private baseURL = 'https://api.anibe.ru';
  // private baseURL = 'http://127.0.0.1:8080';
  /**
   * @private
   * @description тип содержимого ответа и запроса
   */
  private responseType = 'json';

  /**
   * @constructor
   * @param {AxiosSettings} settings параметры для соединения через HTTP
   */
  constructor(
    settings: AxiosSettings
  ) {
    this.settings = settings;
    if (this.settings.auth) {
      this.http = axios.create({
        baseURL: this.baseURL,
        auth: {
          username: settings.auth.username,
          password: settings.auth.password
        },
      });
    } else {
      this.http = axios.create({ baseURL: this.baseURL, });
    }
  }

  /**
   * Выполняет GET запрос к серверу апи
   * @async
   * @param {string} url ссылка на метод без учета базы
   * @returns {AxiosPromise<any>}
   */
  public get(url: string, headers: any): AxiosPromise<any> {
    return this.http.get(url, {
      headers
    });
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {AxiosPromise<any>}
   */
  public put(url: string, body: any, headers: any): AxiosPromise<any> {
    return this.http.put(url, {
      data: body,
      headers
    });
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {AxiosPromise<any>}
   */
  public post(url: string, body: any, headers: any): AxiosPromise<any> {
    return this.http.post(url, {
      ...body
    }, { ...headers });
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {AxiosPromise<any>}
   */
  public patch(url: string, body: any, headers: any): AxiosPromise<any> {
    return this.http.patch(url, {
      data: body,
      headers
    });
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @async
   * @param url ссылка
   * @returns {AxiosPromise<any>}
   */
  public delete(url: string, headers: any): AxiosPromise<any> {
    return this.http.delete(url, {
      headers
    });
  }

  /**
   * Выполняет PUT запрос к серверу апи и загружает файл по ссылке
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {AxiosPromise<any>}
   */
  public putFile(url: string, headers: any, file: any): AxiosPromise<any> {
    const client = new HTTP();

    return client.uploadFile(this.baseURL + url, {}, { ...headers }, file, 'picture');

    // const formData = new FormData();
    // formData.append('picture', file);

    // return this.http.post(url, {
    //   data: formData,
    //   headers
    // });
  }
}
