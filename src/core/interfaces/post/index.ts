export interface IShortPostInfo {
  id: string;
  name: string;
  annotation: string;
  cover: string;
  author: string;
  genre: string[];
  type: string;
  rating: any;
}

export interface IFullPostInfo {
  id: string;
  name: string;
  annotation: string;
  description: string;
  genre: string[];
  type: string;
  rating: any;
  status: string;
  date: string;
  author: string;
  cover: string;
  chapters: string;
  pages: string;
  reading: string;
  episodes: string;
  createdAt: string;
  updatedAt: string;
}
