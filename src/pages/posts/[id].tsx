import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
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
import {
  useDeleteComment,
  usePatchComment,
  usePostComment,
} from "@/api/comment/mutation";
import useToastShow from "@/hooks/useToast";
import { useGetComments } from "@/api/comment/query";
import { CommentMutationType, SelectedComment } from "@/types/page/posts";

/**
 *@description 게시글 내용 페이지
 *@todo 태그, 좋아요, 답글, 수정, 삭제,
 */
function PostContent() {
  const router = useRouter();
  const observerTargetRef = useRef(null); // 댓글 무한 스크롤링 타겟 tag ref
  const parentNicknameRef = useRef<HTMLParagraphElement>(null); // 답글 타겟 닉네임 text tag ref
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { toastShow } = useToastShow();

  const [parentNicknameWidth, setParentNicknameWidth] = useState(0);

  const [commentInputText, setCommentInputText] = useState("");
  const [commentMutationType, setCommentMutationType] =
    useState<CommentMutationType>("DEFAULT");

  const [selectedComment, setSelectedComment] =
    useState<SelectedComment | null>(null);

  const query = router.query as { id: string };

  const { data: postData } = useGetPost(query.id);
  const postCommnet = usePostComment();
  const patchComment = usePatchComment();
  const deleteComment = useDeleteComment();

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetComments({
    postId: query.id,
  });

  const tags = ["IOS", "IOS", "IOS"];

  const onPostComment = () => {
    postCommnet
      .mutateAsync({ postId: query.id, content: commentInputText })
      .then((response) => {
        console.log(response);
        toastShow("댓글이 등록되었습니다.");
        setCommentInputText("");
        refetch();
      })
      .catch((error) => {
        toastShow("댓글 등록 과정에서 오류가 발생했습니다.");
      });
  };

  const onPatchComment = () => {
    patchComment
      .mutateAsync({ commentId: query.id, content: commentInputText })
      .then((response) => {
        toastShow("댓글이 수정되었습니다.");
        setCommentInputText("");
        refetch();
      })
      .catch((error) => {
        toastShow("댓글 수정 과정에서 오류가 발생했습니다.");
      });
  };

  const onDeleteComment = () => {
    //
    // deleteComment
    // .mutateAsync()
  };

  const onInputFocus = () => {
    if (commentInputRef.current) commentInputRef.current.focus();
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && !hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 8) {
      console.log("Backspace key pressed");
      if (
        commentInputText.length === 0 &&
        (commentMutationType === "ADD_RECOMMENT" ||
          commentMutationType === "UPDATE_RECOMMENT")
      ) {
        setCommentMutationType("DEFAULT");
        setSelectedComment(null);
      }
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
  }, [observerTargetRef]);

  useEffect(() => {
    if (
      selectedComment &&
      (commentMutationType === "ADD_RECOMMENT" ||
        commentMutationType === "UPDATE_RECOMMENT")
    ) {
      if (parentNicknameRef.current) {
        console.log(parentNicknameRef.current?.offsetWidth);
        setParentNicknameWidth(parentNicknameRef.current?.offsetWidth);
      }
    } else {
      setParentNicknameWidth(0);
    }
  }, [selectedComment]);

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
            <DefaultPropfile name={postData?.data.author.name ?? ""} />

            <Stack spacing={"6px"} ml="13px">
              <Text fontSize={"16px"} fontWeight={"bold"}>
                {postData?.data.author.name ?? ""}
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
            {postData?.data.title ?? ""}
          </Text>

          {/* 내용 */}
          <Text fontSize={"12px"} minH="30vh">
            {postData?.data.content ?? ""}
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
      <Flex
        alignItems={"center"}
        position={"relative"}
        borderRadius={"12px"}
        borderWidth={"1px"}
        borderColor={colors.gray[3]}
      >
        {selectedComment?.parentUserNickname && (
          <Text
            ref={parentNicknameRef}
            className="parent_nickname"
            color={colors.sky[3]}
            position={"absolute"}
            top="22px"
            left="30px"
            fontSize="16px"
          >
            @{selectedComment?.parentUserNickname}
          </Text>
        )}

        <Textarea
          ref={commentInputRef}
          borderRadius={"12px"}
          placeholder="댓글을 쓰려면 로그인이 필요합니다."
          pl={
            selectedComment?.parentUserNickname
              ? `${parentNicknameWidth + 36}px`
              : "30px"
          }
          pr="30px"
          py="22px"
          h="111px"
          onChange={(e) => setCommentInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          value={commentInputText}
          _placeholder={{
            color: colors.gray[2],
            fontSize: "16px",
          }}
          resize="none"
        />
      </Flex>

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
                  setSelectedComment={setSelectedComment}
                  setCommentMutationType={setCommentMutationType}
                  onInputFocus={onInputFocus}
                  data={item}
                  commentType={item.deletedAt ? "DELETE" : "COMMENT"}
                />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}

        <Stack ref={observerTargetRef} className="observer_target" />
      </Stack>
    </Stack>
  );
}

export default PostContent;
