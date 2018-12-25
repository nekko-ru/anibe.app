import axios from 'axios';

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

  constructor(settings: AxiosSettings) {
    this.settings = {
      baseURL: 'http://localhost:8080',
      responseType: 'json',
      ...settings,
    };
  }

  /**
   * Выполняет GET запрос к серверу апи
   * @param {string} url ссылка на метод без учета базы
   */
  get(url: string, params: any = {}) {
    return axios.get(url, {
      params,
      ...this.settings
    });
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  put(url: string, body: any, params: any = {}) {
    return axios.put(url, body, {
      params,
      ...this.settings
    });
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  post(url: string, body: any, params: any = {}) {
    return axios.post(url, body, {
      params,
      ...this.settings
    });
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  patch(url: string, body: any, params: any = {}) {
    return axios.patch(url, body, {
      params,
      ...this.settings
    });
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @param url ссылка
   */
  delete(url: string, params: any = {}) {
    return axios.delete(url, {
      params,
      ...this.settings
    });
  }
}
