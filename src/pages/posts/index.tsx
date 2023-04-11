import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import HeaderView from "@/components/common/headerView/HeaderView";
import SearchInput from "@/components/common/input/SearchInput";
import PostListItem from "@/components/posts/PostListItem";
import { HStack, Stack } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";

/**
 *@description 게시글 리스트
 */
function Posts() {
  const initData = {
    title: "string",
    contents: "",
    createdAt: "20220202",
    author: "test",
    view: 0,
    commentsCount: 0,
    like: 0,
  };
  const tmps = _.range(0, 10);
  const router = useRouter();

  const datas = tmps.map((item) => initData);

  const [searchText, setSearchText] = useState("");

  return (
    <Stack>
      <HeaderView>
        <SearchInput
          placeholder="검색"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <HStack spacing={"18px"}>
          <PositiveButtonBar
            name="글 작성"
            onClick={() => router.push("/posts/register")}
          />

          <DefaultButtonBar name="로그인" onClick={() => {}} />
        </HStack>
      </HeaderView>

      {/* 게시글 리스트 */}
      <Stack py="32px" spacing={"33px"}>
        {datas.map((item, i) => (
          <React.Fragment key={i.toString()}>
            <PostListItem {...item} />
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default Posts;
