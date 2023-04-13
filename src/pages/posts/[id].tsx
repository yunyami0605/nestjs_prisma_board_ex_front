import { useRouter } from "next/router";
import React, { useState } from "react";
import { Flex, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import HeaderView from "@/components/common/headerView/HeaderView";
import TextButton from "@/components/common/button/TextButton";
import DefaultPropfile from "@/components/common/profile/DefaultProfile";
import Tag from "@/components/posts/Tag";
import { colors } from "@/theme/color";
import LikeButton from "@/components/common/button/LikeButton";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import _ from "lodash";
import PostComment from "@/components/posts/PostComment";
import { useGetPost } from "@/api/post/query";
import { getProgressTime } from "@/utils/time";
import { usePostComment } from "@/api/comment/mutation";
import useToastShow from "@/hooks/useToast";
import { useGetComments } from "@/api/comment/query";

/**
 *@description 게시글 내용 페이지
 *@todo 태그, 좋아요, 댓글 리스트, 답글, 수정, 삭제,
 */
function PostContent() {
  const router = useRouter();
  const { toastShow } = useToastShow();
  const [searchText, setSearchText] = useState("");
  const [commentInputText, setCommentInputText] = useState("");

  const query = router.query as { id: string };

  const { data: postData } = useGetPost(query.id);
  const postCommnet = usePostComment();
  const { data: commentsData } = useGetComments({
    postId: query.id,
  });

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

  const onPostComment = () => {
    postCommnet
      .mutateAsync({ postId: query.id, content: commentInputText })
      .then((response) => {
        console.log(response);
        toastShow("댓글이 등록되었습니다.");
      })
      .catch((error) => {
        toastShow("댓글 등록 과정에서 오류가 발생했습니다.");
      });
  };

  return (
    <Stack>
      <HeaderView>
        <Flex />

        <TextButton onClick={router.back}>목록가기</TextButton>
      </HeaderView>

      {/* 게시글 내용 */}
      <Flex py="32px" flexDir={"column"} justifyContent={"space-between"}>
        {/* 글쓴이 정보 */}
        <Stack>
          <Flex alignItems={"center"} mb="47px">
            <DefaultPropfile name="쿠키" />

            <Stack spacing={"6px"} ml="13px">
              <Text fontSize={"16px"} fontWeight={"bold"}>
                {postData?.data.author.name}
              </Text>

              <HStack spacing={"14px"}>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  {getProgressTime(postData?.data.createdAt) ?? ""}
                </Text>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  뷰 {postData?.data.view ?? 0}
                </Text>
                {postData?.data.updatedAt !== postData?.data.createdAt && (
                  <Text fontSize={"16px"} fontWeight={"bold"}>
                    수정됨
                  </Text>
                )}
              </HStack>
            </Stack>
          </Flex>

          {/* 타이틀 */}
          <Text fontSize={"16px"} fontWeight={"bold"} mb="54px">
            {postData?.data.title}
          </Text>

          {/* 내용 */}
          <Text fontSize={"12px"} minH="30vh">
            {postData?.data.content}
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
        <PositiveButtonBar name={"댓글 작성"} onClick={onPostComment} />
      </Flex>

      {/* 댓글 리스트 */}
      <Stack>
        {commentsData?.pages.map((page, i) => (
          <React.Fragment key={i.toString()}>
            {page.data.map((item) => (
              <React.Fragment key={item.id}>
                <PostComment
                  data={item}
                  commentType={item.deletedAt ? "DELETE" : "COMMENT"}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

export default PostContent;
