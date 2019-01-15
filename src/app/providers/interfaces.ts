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
