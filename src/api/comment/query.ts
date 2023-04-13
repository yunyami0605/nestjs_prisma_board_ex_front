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

export const useGetComments = (query: GetCommentQuery) => {
  return useInfiniteQuery(
    [QueryKeys.comment.getComments, query],
    (param) => {
      const _query = param.queryKey[1] as GetCommentQuery;
      return getComments(_query);
    },
    {
      getNextPageParam: (lastPage) => {
        const lastDataLength = lastPage.data.length;

        return {
          cursorId:
            lastDataLength === 0
              ? undefined
              : lastPage.data[lastDataLength - 1].id,
          postId: query.postId,
        };
      },
      keepPreviousData: true,
      enabled: !_.isEmpty(query.postId),
    }
  );
};
