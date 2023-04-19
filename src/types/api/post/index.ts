import { LikeType, PatchForm } from "@/types/page/posts";

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

export interface GetPostResponse {
  author: { email: string; name: string };
  email: string;
  name: string;
  authorId: number;
  content: string;
  createdAt: string;
  deletedAt: null;
  id: number;
  like: number;
  title: string;
  updatedAt: string;
  view: number;
  postLikeJoin: {
    id: number;
    createdAt: string;
    postId: number;
    userId: number;
  }[];
  postTagJoin: {
    tag: { text: string };
  }[];
}

export type PatchPostData = Omit<PatchForm, "postId">;

export type DeletePostData = {
  postId: number;
};
