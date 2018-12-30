import { API } from '../api';
import { config } from '../config';
import { IPostFull, IPost, RequestParam } from './interfaces';

export class Post {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;

  constructor() {
    if (config.logined === true) {
      this.api = new API({
        auth: {
          username: config.currentUser.nickname,
          password: config.currentUser.password
        }
      });
    } else {
      this.api = new API({  });
    }
  }

  /**
   * Получить полную информацию о посте, включая эпизоды его
   * @async
   * @param {string} id uuid поста
   * @returns {Promise<IPostFull>} результат
   */
  async get(id: string): Promise<IPostFull> {
    const url = `/posts/${id}`;

    const res = await this.api.get(url);
    return JSON.parse(res.data);
  }

  /**
   * Получение всех постов
   * @async
   * @param {string} query Запрос, может быть null
   * @param {RequestParam} params параметры запроса
   * @returns {Promise<IPost[]>}
   */
  async getAll(query: string, params: RequestParam): Promise<IPost[]> {
    let url = `/posts?page=${params.page || ''}` +
    `&limit=${params.limit || ''}&sort=${params.sort || ''}` +
    `&fields=${params.fields || ''}`;

    if (query) {
      url += `&q=${query}`;
    }
    if (params.custom) {
      url += params.custom;
    }

    const res = await this.api.get(url);

    return JSON.parse(res.data).rows;
  }
}
