import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
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
import {
  useDeleteComment,
  usePatchComment,
  usePostComment,
} from "@/api/comment/mutation";
import useToastShow from "@/hooks/useToast";
import { useGetComments } from "@/api/comment/query";
import { CommentMutationType, SelectedComment } from "@/types/page/posts";
import { usePostRecomment } from "@/api/recomment/mutation";

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
  const postRecomment = usePostRecomment();

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetComments(query.id);

  const tags = ["IOS", "IOS", "IOS"];

  const onAddComment = () => {
    if (_.isEmpty(commentInputText)) return toastShow("글자를 입력해주세요.");

    postCommnet
      .mutateAsync({ postId: query.id, content: commentInputText })
      .then((response) => {
        toastShow("댓글이 등록되었습니다.");
        setCommentInputText("");
        refetch();
      })
      .catch((error) => {
        toastShow("댓글 등록 과정에서 오류가 발생했습니다.");
      });
  };

  const onAddRecomment = () => {
    if (_.isEmpty(commentInputText)) return toastShow("글자를 입력해주세요.");

    if (selectedComment && commentMutationType === "ADD_RECOMMENT") {
      const data = {
        content: commentInputText,
        commentId: selectedComment?.id,
      };
      postRecomment
        .mutateAsync(data)
        .then((response) => {
          if (response.statusCode === 201) {
            toastShow("답글이 등록되었습니다.");
            setCommentInputText("");
            setSelectedComment(null);
            setCommentMutationType("DEFAULT");
            refetch();
          }
        })
        .catch((error) => {
          toastShow("답글 등록 과정에서 오류가 발생했습니다.");
        });
    }
  };

  const onUpdateComment = () => {
    if (selectedComment) {
      patchComment
        .mutateAsync({
          commentId: selectedComment?.id,
          content: selectedComment?.content ?? "",
        })
        .then((response) => {
          if (response.statusCode === 200) {
            toastShow("댓글이 수정되었습니다.");
            setSelectedComment(null);
            setCommentMutationType("DEFAULT");
            refetch();
          }
        })
        .catch((error) => {
          toastShow("댓글 수정 과정에서 오류가 발생했습니다.");
        });
    }
  };

  const onDeleteComment = () => {
    if (selectedComment?.id) {
      deleteComment
        .mutateAsync(selectedComment?.id)
        .then((response) => {
          if (response.statusCode === 201) {
            toastShow("댓글이 삭제되었습니다.");
            setSelectedComment(null);
            setCommentMutationType("DEFAULT");
            refetch();
          }
        })
        .catch((error) => {
          toastShow("댓글 삭제 과정에서 오류가 발생했습니다.");
        });
    }
  };

  /**
   *@description 댓글 crud에 따른 분기처리 함수
   */
  const onMutationComment = () => {
    if (commentMutationType === "DEFAULT") onAddComment();
    else if (commentMutationType === "ADD_RECOMMENT") onAddRecomment();
    else if (commentMutationType === "UPDATE_COMMENT") onUpdateComment();
    else if (commentMutationType === "DELETE_COMMENT") onDeleteComment();
  };

  const onInputFocus = () => {
    if (commentInputRef.current) commentInputRef.current.focus();
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.keyCode === 8) {
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
    if (commentMutationType !== "DEFAULT") onMutationComment();
  }, [commentMutationType]);

  useEffect(() => {
    const options = {
      rootMargin: "40px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (observerTargetRef.current) {
      observer.observe(observerTargetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [observerTargetRef, commentsData]);

  useEffect(() => {
    if (
      selectedComment &&
      (commentMutationType === "ADD_RECOMMENT" ||
        commentMutationType === "UPDATE_RECOMMENT")
    ) {
      // 답글 등록 부분에서 답글 타겟 닉네임 표시해야할 영역 width 설정
      if (parentNicknameRef.current) {
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
        <PositiveButtonBar name={"댓글 작성"} onClick={onMutationComment} />
      </Flex>

      {/* 댓글 리스트 */}
      <Stack>
        {commentsData?.pages.map((page, i) => (
          <React.Fragment key={i.toString()}>
            {page.data.map((commentItem) => (
              <React.Fragment key={commentItem.id}>
                <PostComment
                  setSelectedComment={setSelectedComment}
                  setCommentMutationType={setCommentMutationType}
                  onInputFocus={onInputFocus}
                  data={commentItem}
                  commentType={commentItem.deletedAt ? "DELETE" : "COMMENT"}
                />

                {commentItem.recomments.map((recommentItem) => (
                  <React.Fragment key={recommentItem.id}>
                    <PostComment
                      setSelectedComment={setSelectedComment}
                      setCommentMutationType={setCommentMutationType}
                      onInputFocus={onInputFocus}
                      data={recommentItem}
                      commentType={
                        recommentItem.deletedAt ? "DELETE" : "RECOMMENT"
                      }
                    />
                  </React.Fragment>
                ))}
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
