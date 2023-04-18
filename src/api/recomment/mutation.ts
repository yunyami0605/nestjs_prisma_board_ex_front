import { useMutation } from "react-query";
import { apiCall } from "../common";
import {
  MutationRecommentResponse,
  PostRecommentData,
} from "@/types/api/recomment";

const postRecomment = (data: PostRecommentData) => {
  return apiCall<MutationRecommentResponse>({
    method: "POST",
    url: `recomment/${data.commentId}`,
    data: {
      content: data.content,
    },
  });
};

/**
 *@description 답글 등록 api 훅
 */
export const usePostRecomment = () => {
  return useMutation((data: PostRecommentData) => postRecomment(data));
};

const patchRecomment = (data: PostRecommentData) => {
  return apiCall<MutationRecommentResponse>({
    method: "PATCH",
    url: `recomment/${data.commentId}`,
    data: {
      content: data.content,
    },
  });
};

/**
 *@description 답글 수정
 */
export const usePatchRecomment = () => {
  return useMutation((data: PostRecommentData) => patchRecomment(data));
};

const deleteRecomment = (postId: number) => {
  return apiCall<MutationRecommentResponse>({
    method: "DELETE",
    url: `recomment/${postId}`,
  });
};

/**
 *@description 답글 삭제
 */
export const useDeleteRecomment = () => {
  return useMutation((commentId: number) => deleteRecomment(commentId));
};
