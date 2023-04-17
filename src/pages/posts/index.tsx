import { useGetPosts } from "@/api/post/query";
import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import HeaderView from "@/components/common/headerView/HeaderView";
import SearchInput from "@/components/common/input/SearchInput";
import PostListItem from "@/components/posts/PostListItem";
import { deleteToken, getUserId } from "@/utils/auth";
import { HStack, Stack } from "@chakra-ui/react";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

/**
 *@description 게시글 리스트
 *@todo 게시글 검색 debounce 로직 추가하기
 */
function Posts() {
  // 스크롤 시, 옵저버가 감지하는 화면에 나오는 타겟 (화면 하단에 위치)
  const observerTargetRef = useRef(null);
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetPosts({
    search: searchText,
  });

  const onLogin = () => router.push("/login");

  const onLogout = () => {
    deleteToken();
    setIsLogin(false);
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const options = {
      rootMargin: "100px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerTargetRef, data]);

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
          value={searchText}
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
        {data?.pages.map((page, i) => (
          <React.Fragment key={i.toString()}>
            {page.data.map((post) => (
              <React.Fragment key={post.id.toString()}>
                <PostListItem data={post} />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Stack>

      <Stack ref={observerTargetRef} className="observer_target" />
    </Stack>
  );
}

export default Posts;
