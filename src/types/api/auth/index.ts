/**
 *@description 회원가입 데이터 - 응답
 */
export interface PostSignupData {
  nickname: string;
  email: string;
  name: string;
  password: string;
}

export interface PostSignupResponse {
  access: string;
  refresh: string;
}

/**
 *@description 로그인 데이터 - 응답
 */
export interface PostLoginData {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  access: string;
  refresh: string;
}
