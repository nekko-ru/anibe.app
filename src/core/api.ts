import axios from 'axios';

interface Settings {
  auth?: {
    username: string,
    password: string,
  };
  baseURL?: string;
  responseType?: string;
}

export class API {
  private settings: Settings;

  constructor(settings: Settings) {
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
  get(url: string) {
    return axios.get(url, this.settings);
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  put(url: string, body: any) {
    return axios.put(url, body, this.settings);
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  post(url: string, body: any) {
    return axios.post(url, body, this.settings);
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @param url ссылка
   * @param body тело запроса
   */
  patch(url: string, body: any) {
    return axios.patch(url, body, this.settings);
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @param url ссылка
   */
  delete(url: string) {
    return axios.delete(url, this.settings);
  }
}
