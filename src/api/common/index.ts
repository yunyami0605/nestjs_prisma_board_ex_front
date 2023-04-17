import { ErrorResponse } from "@/types/api/common";
import { getCookie } from "@/utils/cookie";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL ?? ""}/`;

const axiosInstance = axios.create();

/**
 *@description api 공통 호출 모듈
 *@param props - axios 라이브러리 props (url, method, headers, baseURL ...)
 */
export const apiCall = async <ResponseType = any>(
  props: AxiosRequestConfig
) => {
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME
    ? getCookie(process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME)
    : "";

  const refreshToken = process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME
    ? getCookie(process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME)
    : "";

  return axiosInstance({
    ...props,
    headers: {
      Accept: "application/json",
      ...props.headers,
      Authorization: "Bearer " + `${accessToken}`,
    },
    url: `${props.url}`,
    baseURL: BASE_URL,
  })
    .then(({ data, status }: { data: ResponseType; status: number }) => {
      return {
        data,
        statusCode: status,
        success: "SUCCESS" as const,
      };
    })
    .catch((error: AxiosError) => {
      if (error.response?.data) {
        const data = error.response?.data as ErrorResponse;

        throw {
          message: data?.message || "",
          statusCode: data?.statusCode || 500,
          success: "FAIL" as const,
        };
      } else
        throw {
          data: undefined,
          statusCode: error.response?.status,
          success: false,
        };
    });
};
