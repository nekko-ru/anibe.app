import { Injectable } from '@angular/core';
import { API } from './api.service';
import { IPostFull, RequestParam, IPost, IComment, IChat, IMessage } from './interfaces';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';

// const SERVER_URL = 'https://api.anibe.ru';
const SERVER_URL = 'http://127.0.0.1:2300';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  /**
   * Экземпляр класса для работы с апи через небольшую обертку
   */
  private api: API;
  private token: string;
  private ready: Promise<any>;
  private socket: any;

  constructor(
    private storage: Storage,
    private toast: ToastController
  ) {
    this.api = new API({  });
  }

  public async initSocket(): Promise<void> {
      this.socket = socketIo(SERVER_URL, {
        // path: '/ws/',
        query: {
          token: await this.storage.get('token') || ''
        }
      });
  }
  public send(
    chat_id: string,
    body: string,
    attachments: {
      images: string[],
      links: string[],
      videos: string[],
      sticker: string
    } = { images: [], links: [], videos: [], sticker: ''}
  ): void {
      this.socket.emit('new_message', {
        chat_id,
        body,
        attachments
      });
  }
  public onMessage(): Observable<IMessage> {
      return new Observable<IMessage>((observer: { next: (arg0: IMessage) => void; }) => {
          this.socket.on('new_message', (data: IMessage) => observer.next(data));
      });
  }
  public onEvent(event: Event): Observable<any> {
      return new Observable<Event>((observer: { next: () => void; }) => {
          this.socket.on(event, () => observer.next());
      });
  }

  /**
   * Получить чат по его айди
   * @async
   * @param {string} id uuid чата
   * @returns {Promise<IChat>} результат
   */
  public async get(id: string): Promise<IChat> {
    this.token = await this.storage.get('token') || '';
    const url = `/chats/${id}`;

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * Получение всех активных чатов для пользователя
   * @async
   * @param {string} query Название чата, может быть null
   * @returns {Promise<IChat[]>}
   */
  public async getAll(query?: string): Promise<IChat[]> {
    this.token = await this.storage.get('token') || '';
    let url = `/chats`;
    if (query) {
      url += `?q=${query}`;
    }

    const res = await this.api.get(url, {
      'Authorization': 'Bearer ' + this.token
    });

    return JSON.parse(res.data).rows;
  }

  /**
   * Отправляет сообщение в чат
   * @param chat_id uuid чата
   * @param body сообщение
   * @param attachments прикрепления к сообщению
   */
  public async createMessage(
    chat_id: string,
    body: string,
    attachments: {
      images: string[],
      links: string[],
      videos: string[],
      sticker: string
    } = { images: [], links: [], videos: [], sticker: ''}
  ): Promise<any> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.post(`/messages/${chat_id}`, {
      body,
      attachments
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * Получение сообщений с паджинацией
   * @param {string} id uuid чата
   */
  public async getMessages(id: string, page: number = 1): Promise<IMessage[]> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.get(`/messages/${id}?page=${page}`, {
      'Authorization': 'Bearer ' + this.token
    });

    return JSON.parse(res.data).rows;
  }

  /**
   * Отправляет сообщение в чат
   * @param {string} name имя нового чата
   * @param {string} picture картинка нового чата
   */
  public async createChat(
    name: string,
    picture: string
  ): Promise<any> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.post(`/chats`, {
      name,
      picture
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }

  /**
   * Удаляет чат по его айди (только если админ или создатель)
   * @param {string} chat_id id чата
   */
  public async deleteChat(chat_id: string) {
    this.token = await this.storage.get('token') || '';

    await this.api.delete(`/chats/${chat_id}`, {
      'Authorization': 'Bearer ' + this.token
    });
    return true;
  }

  /**
   * ВЫполняет действия внутри чата, например добавить нового пользователя
   * @param chat_id id чата
   * @param action действие (add, ban)
   */
  public async actionsChat(
    chat_id: string,
    user_id: string,
    action: string,
  ): Promise<any> {
    this.token = await this.storage.get('token') || '';

    await this.api.post(`/chats/${chat_id}/actions`, {
      action,
      user_id
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    return true;
  }

  /**
   * Изменяет картинку и название чата
   * @param chat_id id чата
   * @param name название
   * @param picture картинка
   */
  public async editChat(
    chat_id: string,
    name: string,
    picture: string
  ): Promise<any> {
    this.token = await this.storage.get('token') || '';

    const res = await this.api.put(`/chats/${chat_id}`, {
      name,
      picture
    }, {
      'Authorization': 'Bearer ' + this.token
    });
    return JSON.parse(res.data);
  }
}
