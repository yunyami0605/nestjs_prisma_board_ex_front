import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import HeaderView from "@/components/common/headerView/HeaderView";
import SearchInput from "@/components/common/input/SearchInput";
import PostListItem from "@/components/posts/PostListItem";
import { deleteToken, getUserId } from "@/utils/auth";
import { HStack, Stack } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

/**
 *@description 게시글 리스트
 */
function Posts() {
  const [isLogin, setIsLogin] = useState(false);
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

  const onLogin = () => router.push("/login");

  const onLogout = () => {
    deleteToken();
    setIsLogin(false);
  };

  useEffect(() => {
    const id = getUserId();

    // 토큰 id값 있을 시, 로그인되었다는 여부 표시
    if (id) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

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

          <DefaultButtonBar
            name={isLogin ? "로그아웃" : "로그인"}
            onClick={isLogin ? onLogout : onLogin}
          />
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
