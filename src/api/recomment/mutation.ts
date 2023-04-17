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
