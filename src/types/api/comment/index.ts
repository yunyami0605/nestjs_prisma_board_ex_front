/**
 *@description 댓글 등록 데이터
 */
export interface PostCommentData {
  postId: string;
  content: string;
}

/**
 *@description 등록, 수정, 삭제 댓글 응답
 */
export interface MutationCommentResponse {
  id: number;
}

/**
 *@description 댓글 수정 api 훅 파라미터
 */
export interface PatchCommentData {
  commentId: number;
  content: string;
}

/**
 *@description 댓글 조회 api 훅 쿼리
 */
export interface GetCommentQuery {
  postId: string;
  cursorId?: number;
}

/**
 *@description 댓글 리스트 조회 api 응답
 */
export interface GetCommentsResponse {
  id: number;
  postId: number;
  userId: number;
  content: string;
  like: number;
  thank: number;
  recomments: Recomment[];
  user: {
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}

export interface Recomment {
  id: number;
  userId: number;
  commentId: number;
  content: string;
  thank: number;
  like: number;
  user: {
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
