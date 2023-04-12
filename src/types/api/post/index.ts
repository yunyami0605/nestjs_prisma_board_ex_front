export interface GetPostsQuery {
  id?: string;
  search?: string;
}

export interface GetPostsResponse {
  id: number;
  title: string;
  content: string;
  like: number;
  view: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  _count: {
    comments: number;
  };
  author: {
    nickname: string;
  };
}
