/**
 *@description 댓글 등록 데이터
 */
export interface PostCommentData {
  postId: string;
  content: string;
}

export interface GetCommentQuery {
  postId: string;
  cursorId?: string;
}

export interface GetCommentsResponse {
  content: string;
  createdAt: string;
  deletedAt: null;
  id: number;
  like: number;
  postId: number;
  recomments: any[];
  thank: number;
  updatedAt: string;
  userId: number;
  user: {
    nickname: string;
  };
}
