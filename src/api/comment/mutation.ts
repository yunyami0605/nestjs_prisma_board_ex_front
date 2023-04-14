import { useMutation } from "react-query";
import { apiCall } from "../common";
import {
  PostCommentData,
  MutationCommentResponse,
  PatchCommentData,
} from "@/types/api/comment";

const postComment = (data: PostCommentData) => {
  return apiCall<MutationCommentResponse>({
    method: "POST",
    url: `comment/${data.postId}`,
    data: {
      content: data.content,
    },
  });
};

/**
 *@description 댓글 등록
 */
export const usePostComment = () => {
  return useMutation((data: PostCommentData) => postComment(data));
};

const patchComment = (data: PatchCommentData) => {
  return apiCall<MutationCommentResponse>({
    method: "PATCH",
    url: `comment/${data.commentId}`,
    data: {
      content: data.content,
    },
  });
};

/**
 *@description 댓글 수정
 */
export const usePatchComment = () => {
  return useMutation((data: PatchCommentData) => patchComment(data));
};

const deleteComment = (postId: number) => {
  return apiCall<MutationCommentResponse>({
    method: "DELETE",
    url: `comment/${postId}`,
  });
};

/**
 *@description 댓글 삭제
 */
export const useDeleteComment = () => {
  return useMutation((commentId: number) => deleteComment(commentId));
};
