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
  private http: HTTP;
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
    this.http = new HTTP();

    if (settings.auth) {
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
  public get(url: string, params: any): Promise<any> {
    return this.http.get(this.baseURL + url, params, {});
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @async
   * @param url ссылка
   * @param data тело запроса
   * @returns {Promise<any>}
   */
  public put(url: string, data: any, params: any): Promise<any> {
    return this.http.sendRequest(this.baseURL + url, {
      method: 'put',
      data,
      params
    });
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @async
   * @param url ссылка
   * @param data тело запроса
   * @returns {Promise<any>}
   */
  public post(url: string, data: any, params: any): Promise<any> {
    return this.http.sendRequest(this.baseURL + url, {
      method: 'post',
      data,
      params
    });
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public patch(url: string, data: any, params: any): Promise<any> {
    return this.http.sendRequest(this.baseURL + url, {
      method: 'patch',
      data,
      params
    });
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @async
   * @param url ссылка
   * @returns {Promise<any>}
   */
  public delete(url: string, params: any): Promise<any> {
    return this.http.sendRequest(this.baseURL + url, {
      method: 'delete',
      params
    });
  }

  /**
   * Выполняет PUT запрос к серверу апи и загружает файл по ссылке
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public putFile(url: string, params: any, file: string): Promise<any> {
    return this.http.sendRequest(this.baseURL + url, {
      method: 'upload',
      filePath: file,
      params
    });
  }
}
