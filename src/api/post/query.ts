import { useInfiniteQuery } from "react-query";
import { apiCall } from "../common";
import queryString from "query-string";
import QueryKeys from "@/constants/queryKeys";
import { GetPostsQuery, GetPostsResponse } from "@/types/api/post";

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
      getNextPageParam: (lastPage, allPages) => {
        const lastDataLength = lastPage.data.length;
        return {
          search: query.search,
          id:
            lastDataLength === 0
              ? undefined
              : lastPage.data[lastDataLength - 1].id,
        };
      },
      keepPreviousData: true,
    }
  );
};
