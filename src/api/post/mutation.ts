import { apiCall } from "../common";
import { useMutation } from "react-query";
import { LikeData, MutationResponse } from "@/types/api/common";
import { PatchForm, PostForm } from "@/types/page/posts";
import { DeletePostData, PatchPostData } from "@/types/api/post";

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

export const patchPost = (data: PatchPostData, postId: number) => {
  return apiCall<MutationResponse>({
    method: "PATCH",
    url: `post/${postId}`,
    data,
  });
};

/**
 *@description 게시글 수정 api 호출 훅
 */
export const usePatchPost = () => {
  return useMutation((data: PatchForm) => {
    const _data: Omit<PatchForm, "postId"> &
      Partial<Pick<PatchForm, "postId">> = { ...data };
    delete _data["postId"];

    return patchPost({ ..._data }, data.postId);
  });
};

export const deletePost = (data: DeletePostData) => {
  return apiCall<MutationResponse>({
    method: "DELETE",
    url: `post/${data.postId}`,
  });
};

/**
 *@description 게시글 삭제 api 호출 훅
 */
export const useDeletePost = () => {
  return useMutation((data: DeletePostData) => deletePost(data));
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
