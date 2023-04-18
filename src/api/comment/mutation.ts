import { useMutation, useQueryClient } from "react-query";
import { apiCall } from "../common";
import { PostCommentData, PatchCommentData } from "@/types/api/comment";
import { LikeData, MutationResponse } from "@/types/api/common";
import QueryKeys from "@/constants/queryKeys";

const postComment = (data: PostCommentData) => {
  return apiCall<MutationResponse>({
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
  return apiCall<MutationResponse>({
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
  const queryClient = useQueryClient();

  return useMutation((data: PatchCommentData) => patchComment(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};

const deleteComment = (postId: number) => {
  return apiCall<MutationResponse>({
    method: "DELETE",
    url: `comment/${postId}`,
  });
};

/**
 *@description 댓글 삭제
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation((commentId: number) => deleteComment(commentId), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};

interface CommentLikeData extends LikeData {
  commentType: "comment" | "recomment";
}

export const commentLike = (data: CommentLikeData) => {
  return apiCall<MutationResponse>({
    method: "POST",
    url: `${data.commentType}/${data.type === "LIKE" ? "like" : "dislike"}/${
      data.id
    }`,
  });
};

/**
 *@description 댓글 좋아요 api 호출 훅
 */
export const useCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation((data: CommentLikeData) => commentLike(data), {
    onSettled: () =>
      queryClient.invalidateQueries([QueryKeys.comment.getComments]),
  });
};
