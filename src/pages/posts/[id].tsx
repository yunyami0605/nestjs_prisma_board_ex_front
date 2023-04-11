import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Flex,
  FlexProps,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import HeaderView from "@/components/common/headerView/HeaderView";
import SearchInput from "@/components/common/input/SearchInput";
import TextButton from "@/components/common/button/TextButton";
import DefaultPropfile from "@/components/common/profile/DefaultProfile";
import Tag from "@/components/posts/Tag";
import { colors } from "@/theme/color";
import LikeButton from "@/components/common/button/LikeButton";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import _ from "lodash";
import PostComment from "@/components/posts/PostComment";

interface Props {}
function PostContent() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [commentInputText, setCommentInputText] = useState("");

  const tags = ["IOS", "IOS", "IOS"];

  const comments = _.range(0, 6);

  const commentData = {
    nickname: "쿠키",
    createdAt: "20220301",
    like: 0,
    contents: "test",
    commentType: "COMMENT",
  };

  const commentsDummyData = comments.map((_, i) => ({
    ...commentData,
    commentType:
      i % 2 === 0
        ? "COMMENT"
        : ("RECOMMENT" as "COMMENT" | "RECOMMENT" | "DELETE"),
  }));

  return (
    <Stack>
      <HeaderView>
        <SearchInput
          placeholder="검색"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <TextButton>목록가기</TextButton>
      </HeaderView>

      {/* 게시글 내용 */}
      <Flex py="32px" flexDir={"column"} justifyContent={"space-between"}>
        {/* 글쓴이 정보 */}
        <Stack>
          <Flex alignItems={"center"} mb="47px">
            <DefaultPropfile name="쿠키" />

            <Stack spacing={"6px"} ml="13px">
              <Text fontSize={"16px"} fontWeight={"bold"}>
                쿠키
              </Text>

              <HStack spacing={"14px"}>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  2 일전
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  뷰 30
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  수정됨
                </Text>
              </HStack>
            </Stack>
          </Flex>

          {/* 타이틀 */}
          <Text fontSize={"16px"} fontWeight={"bold"} mb="54px">
            대용량 데이터 분석 타이틀
          </Text>

          {/* 내용 */}
          <Text fontSize={"12px"} minH="30vh">
            안녕하세요 대용량 데이터 분석 안내 글입니다. 감사합니다.
          </Text>
        </Stack>

        {/* 태그 */}
        <Flex justifyContent={"space-between"}>
          <HStack spacing={"20px"}>
            {tags.map((item, i) => (
              <React.Fragment key={i.toString()}>
                <Tag name={item} />
              </React.Fragment>
            ))}
          </HStack>

          <LikeButton onChange={() => {}} />
        </Flex>
      </Flex>

      {/* 댓글 입력 */}
      <Textarea
        placeholder="댓글을 쓰려면 로그인이 필요합니다."
        borderRadius={"12px"}
        borderWidth={"1px"}
        px="30px"
        py="22px"
        h="111px"
        borderColor={colors.gray[3]}
        onChange={(e) => setCommentInputText(e.target.value)}
        value={commentInputText}
        _placeholder={{
          color: colors.gray[2],
          fontSize: "16px",
        }}
        resize="none"
      />

      <Flex justifyContent={"flex-end"} pt="22px">
        <PositiveButtonBar name={"댓글 작성"} onClick={() => {}} />
      </Flex>

      {/* 댓글 리스트 */}
      <Stack>
        {commentsDummyData.map((item, i) => (
          <React.Fragment key={i.toString()}>
            <PostComment data={item} commentType={item.commentType} />
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default PostContent;
