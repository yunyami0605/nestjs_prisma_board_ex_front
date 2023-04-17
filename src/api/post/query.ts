import { useInfiniteQuery, useQuery } from "react-query";
import { apiCall } from "../common";
import queryString from "query-string";
import QueryKeys from "@/constants/queryKeys";
import {
  GetPostResponse,
  GetPostsQuery,
  GetPostsResponse,
} from "@/types/api/post";
import _ from "lodash";

const getPost = (id: string) => {
  return apiCall<GetPostResponse>({
    method: "GET",
    url: `post/${id}`,
  });
};

/**
 *@description 게시글 조회 api hook
 */
export const useGetPost = (id?: string) => {
  return useQuery(
    [QueryKeys.post.getPost, id],
    (param) => {
      const postId = param.queryKey[1] as string;

      return getPost(postId);
    },
    {
      enabled: !_.isEmpty(id),
    }
  );
};

const getPosts = (query: GetPostsQuery) => {
  const _query = queryString.stringify(query);

  return apiCall<GetPostsResponse[]>({
    method: "GET",
    url: `post/cursor?${_query}`,
  });
};

/**
 *@description 게시글 리스트 무한 스크롤링 조회 api hook
 */
export const useGetPosts = (query: GetPostsQuery) => {
  return useInfiniteQuery(
    [QueryKeys.post.getPosts, query],
    (param) => {
      const initQuery = param.queryKey[1] as GetPostsQuery;

      return getPosts(param.pageParam ?? initQuery);
    },
    {
      getNextPageParam: (lastPage) => {
        const lastDataLength = lastPage.data.length;
        return lastDataLength < 8
          ? undefined
          : {
              search: query.search,
              id: lastPage.data[lastDataLength - 1].id,
            };
      },
      keepPreviousData: true,
    }
  );
};
