import { useMutation } from "react-query";
import { apiCall } from "../common";
import { PostCommentData } from "@/types/api/comment";

const postComment = (data: PostCommentData) => {
  return apiCall<any>({
    method: "POST",
    url: `comment/${data.postId}`,
    data: {
      content: data.content,
    },
  });
};

export const usePostComment = () => {
  return useMutation((data: PostCommentData) => postComment(data));
};
