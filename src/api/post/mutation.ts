import { apiCall } from "../common";
import { useMutation } from "react-query";
import { LikeData, MutationResponse } from "@/types/api/common";

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
