export interface IPost {
  id: string;
  name: string;
  annotation: string;
  cover: string;
  author: string;
  genre: string[];
  type: string;
  rating: any;
}

export interface IPostFull {
  id: string;
  name: string;
  cover: string;
  annotation: string;
  description: string;
  genre: string[];
  type: string;
  rating: any;
  status: string;
  date: string;
  author: string;
  chapters: string;
  pages: string;
  reading: string;
  episodes: any;
  createdAt: string;
  updatedAt: string;
}

export interface RequestParam {
  page?: number;
  limit?: string;
  sort?: string | string[];
  fields?: string | string[];
  q?: string;
  custom?: string;
}

export interface IComment {
  id: string;
  body: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export interface INewsPost {
  id: string;
  /**
   * @description Заголовок новости
   */
  title: string;
  /**
   * @description Rich text содержимое новости (html)
   */
  body: string;
  /**
   * @description id автора новости
   */
  author_id: string;
  /**
   * @description ссылка на картинку которая будет на превью
   */
  preview: string;
  /**
   * @description ссылка на картинку которая будет на заднем фоне при отпрытии новости
   */
  background: string;
  /**
   * @description Тип новости, а точнее категория (Приложение, новая манга и т.п.)
   */
  type: string;
  /**
   * @description Дата и время создания новости
   */
  createdAt?: string;
  /**
   * @description Дата и время полсденего редактирования
   */
  updatedAt?: string;
}

export interface INotif {
  id: string;
  title: string;
  body: string;
  type: string;
  picture: string;
  url: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}



export interface IChat {
  id: string;
  name: string;
  picture: string;
  users: IUser[];
  lastmessage?: IMessage;

  createdAt: string;
  updatedAt: string;
}

export interface IMessage {
  id: string;
  body: string;
  user: IUser;
  attachments?: {
    images?: string[];
    links?: string[];
    sticker?: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface IUserBadge {
  name: string;
  icon: string;
}

export interface IUser {
  id: string;
  online: string;
  name: string;
  picture: string;
  role: string;
  badges: IUserBadge[];
}

export interface IUserSelf {
  id: string;
  online: string;
  name: string;
  picture: string;
  desc: string;
  email: string;
  enablefcm: boolean;
  role: string;
  favorite: IPost[];
  thrown: IPost[];
  inprogress: IPost[];
  readed: IPost[];
  willread: IPost[];
  createdAt: string;
  updatedAt: string;
  badges: IUserBadge[];
}
