import { LikeType } from "@/types/page/posts";

// 서버 에러 응답 타입
export interface ErrorResponse {
  message: string;
  statusCode: number;
  path: string;
}

export interface ErrorResponseTransform extends ErrorResponse {
  success: "FAIL";
}

export type LikeData = {
  id: string;
  type: LikeType;
};

/**
 *@description 등록, 수정, 삭제 댓글 응답
 */
export type MutationResponse = {
  id: number;
};
