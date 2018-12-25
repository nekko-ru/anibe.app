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
   * @param {string[]} fields необходимые поля
   * @returns {Promise<IPostFull>} результат
   */
  async get(id: string, params: RequestParam): Promise<IPostFull> {
    const url = `/posts/${id}?fields=${params.fields}&page=${params.page}&sort=${params.sort}&limit=${params.limit}`;

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
    const res = await this.api.get(`/posts`, {
      ...params,
      q: query
    });

    return JSON.parse(res.data).rows;
  }
}
