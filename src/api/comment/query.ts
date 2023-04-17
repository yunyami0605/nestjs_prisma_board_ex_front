import QueryKeys from "@/constants/queryKeys";
import { apiCall } from "../common";
import { useInfiniteQuery } from "react-query";
import { GetCommentQuery, GetCommentsResponse } from "@/types/api/comment";
import _ from "lodash";
import queryString from "query-string";

const getComments = (query: GetCommentQuery) => {
  const _query = queryString.stringify({ cursorId: query.cursorId });

  return apiCall<GetCommentsResponse[]>({
    method: "GET",
    url: `comment/cursor/${query.postId}?${_query}`,
  });
};

export const useGetComments = (postId: string) => {
  return useInfiniteQuery(
    [QueryKeys.comment.getComments, postId],
    ({ pageParam, queryKey }) => {
      const _query = queryKey[1] as string;

      return getComments({
        cursorId: pageParam,
        postId: _query,
      });
    },
    {
      getNextPageParam: (lastPage) => {
        const lastDataLength = lastPage.data.length;

        return lastDataLength === 4
          ? lastPage.data[lastDataLength - 1].id
          : undefined;
      },

      enabled: !_.isEmpty(postId),
    }
  );
};
