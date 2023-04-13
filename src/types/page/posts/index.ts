import { GetCommentsResponse } from "@/types/api/comment";
import { GetPostResponse, GetPostsResponse } from "@/types/api/post";

export type CommentType = "COMMENT" | "RECOMMENT" | "DELETE";

export type PostItem = GetPostsResponse;

export type PostContent = GetPostResponse;

export type CommentItem = GetCommentsResponse;
