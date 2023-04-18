import { GetCommentsResponse, Recomment } from "@/types/api/comment";
import { GetPostResponse, GetPostsResponse } from "@/types/api/post";

export type CommentType = "COMMENT" | "RECOMMENT" | "DELETE";

export type PostItem = GetPostsResponse;

export type PostContent = GetPostResponse;

export type CommentItem = GetCommentsResponse;

export type RecommentItme = Recomment;

export type SelectedComment = {
  type: CommentType;
  id: number;
  content?: string;
  parentId?: number;
  parentUserNickname?: string;
};

export type LikeType = "LIKE" | "DISLIKE";

export type CommentMutationType =
  | "DEFAULT"
  | "ADD_RECOMMENT"
  | "UPDATE_COMMENT"
  | "UPDATE_RECOMMENT"
  | "DELETE_COMMENT"
  | "DELETE_RECOMMENT";
