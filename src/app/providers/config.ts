
export const config: Config = {
  url: 'http://api.anibe.ru',
  logined: false,
  currentUser: {
    id: null,
    nickname: null,
    password: null
  }
};

interface Config {
  url: string;
  logined: boolean;
  currentUser: {
    id: string;
    nickname: string;
    password: string;
    info?: any;
  };
}
