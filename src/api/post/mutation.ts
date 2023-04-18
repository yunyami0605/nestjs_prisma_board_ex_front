import { apiCall } from "../common";
import { useMutation } from "react-query";
import { LikeData, MutationResponse } from "@/types/api/common";
import { PostForm } from "@/types/page/posts";

export const postPost = (data: PostForm) => {
  return apiCall<MutationResponse>({
    method: "POST",
    url: `post`,
    data,
  });
};

/**
 *@description 게시글 등록 api 호출 훅
 */
export const usePostPost = () => {
  return useMutation((data: PostForm) => postPost(data));
};

export const postLike = (data: LikeData) => {
  return apiCall<MutationResponse>({
    method: "POST",
    url: `post/${data.type === "LIKE" ? "like" : "dislike"}/${data.id}`,
  });
};

/**
 *@description 게시글 좋아요 api 호출 훅
 */
export const usePostLike = () => {
  return useMutation((data: LikeData) => postLike(data));
};
