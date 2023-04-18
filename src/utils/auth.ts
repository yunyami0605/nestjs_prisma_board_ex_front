import { getCookie, setCookie } from "./cookie";
import jwt from "jsonwebtoken";

/**
 *@description auth token 설정
 *@param data : token data
 */
export const setToken = (tokenType: "ACCESS" | "REFRESH", data: string) => {
  if (
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME &&
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME &&
    process.env.NEXT_PUBLIC_API_DOMAIN
  ) {
    setCookie(
      tokenType === "ACCESS"
        ? process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME
        : process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME,
      data,
      3,
      process.env.NEXT_PUBLIC_API_DOMAIN
    );
  }
};

export const deleteToken = () => {
  if (
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME &&
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME &&
    process.env.NEXT_PUBLIC_API_DOMAIN
  ) {
    setCookie(
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
      "",
      0,
      process.env.NEXT_PUBLIC_API_DOMAIN
    );

    setCookie(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME,
      "",
      0,
      process.env.NEXT_PUBLIC_API_DOMAIN
    );
  }
};

export const getUserId = () => {
  if (!process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME) return;

  const userToken = getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME);

  if (!userToken) return null;
  const userData = JSON.stringify(jwt.decode(userToken));
  const user = JSON.parse(userData) as { sub: number };

  return user?.sub;
};
