import { useMutation } from "react-query";
import { apiCall } from "../common";
import {
  PostLoginData,
  PostLoginResponse,
  PostSignupData,
  PostSignupResponse,
} from "@/types/api/auth";

const postSignup = (data: PostSignupData) => {
  return apiCall<PostSignupResponse>({
    method: "POST",
    url: `auth/signup`,
    data,
  });
};

/**
 *@description 회원가입 api hook
 */
export const usePostSignup = () => {
  return useMutation((data: PostSignupData) => postSignup(data));
};

const postLogin = (data: PostLoginData) => {
  return apiCall<PostLoginResponse>({
    method: "POST",
    url: `auth/login`,
    data,
  });
};

/**
 *@description 로그인 api hook
 */
export const usePostLogin = () => {
  return useMutation((data: PostLoginData) => postLogin(data));
};
