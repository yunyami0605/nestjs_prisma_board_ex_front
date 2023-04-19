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
import {
  CommentMutationType,
  LikeType,
  SelectedComment,
} from "@/types/page/posts";
import {
  useDeleteRecomment,
  usePatchRecomment,
  usePostRecomment,
} from "@/api/recomment/mutation";
import { useDeletePost, usePostLike } from "@/api/post/mutation";
import useGetUserId from "@/hooks/useGetUserId";

/**
 *@description 게시글 내용 페이지
 *@todo 좋아요/싫어요 상태 확인 퍼블 추가
 *@todo 게시글 수정, 삭제 추가
 *@todo 배포
 *@todo 싫어요에 대한 api 수정하기
 *@todo redis 셋팅 및 연구
 */
function PostContent() {
  const router = useRouter();
  const observerTargetRef = useRef(null); // 댓글 무한 스크롤링 타겟 tag ref
  const parentNicknameRef = useRef<HTMLParagraphElement>(null); // 답글 타겟 닉네임 text tag ref
  const commentInputRef = useRef<HTMLTextAreaElement>(null);
  const { toastShow } = useToastShow();
  const getUserId = useGetUserId();

  const [parentNicknameWidth, setParentNicknameWidth] = useState(0);

  const [commentInputText, setCommentInputText] = useState("");
  const [commentMutationType, setCommentMutationType] =
    useState<CommentMutationType>("DEFAULT");

  const [selectedComment, setSelectedComment] =
    useState<SelectedComment | null>(null);

  const query = router.query as { id: string };

  const { data: postData } = useGetPost(query.id);
  const deletePost = useDeletePost();
  const postCommnet = usePostComment();
  const patchComment = usePatchComment();
  const deleteComment = useDeleteComment();
  const postRecomment = usePostRecomment();
  const patchRecomment = usePatchRecomment();
  const deleteRecomment = useDeleteRecomment();
  const postLike = usePostLike();

  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useGetComments(query.id);

  const tags = ["IOS", "IOS", "IOS"];

  const onUpdateRecomment = () => {
    if (selectedComment) {
      patchRecomment
        .mutateAsync({
          commentId: selectedComment?.id,
          content: selectedComment?.content ?? "",
        })
        .then((response) => {
          if (response.statusCode === 200) {
            toastShow("답글이 수정되었습니다.");
            setSelectedComment(null);
            setCommentMutationType("DEFAULT");
            refetch();
          }
        })
        .catch((error) => {
          toastShow("답글 수정 과정에서 오류가 발생했습니다.");
        });
    }
  };

  const onDeleteRecomment = () => {
    if (selectedComment?.id) {
      deleteRecomment
        .mutateAsync(selectedComment?.id)
        .then((response) => {
          if (response.statusCode === 201) {
            toastShow("답글이 삭제되었습니다.");
            setSelectedComment(null);
            setCommentMutationType("DEFAULT");
            refetch();
          }
        })
        .catch((error) => {
          toastShow("답글 삭제 과정에서 오류가 발생했습니다.");
        });
    }
  };

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
    switch (commentMutationType) {
      case "DEFAULT":
        onAddComment();
        break;

      case "ADD_RECOMMENT":
        onAddRecomment();
        break;

      case "UPDATE_COMMENT":
        onUpdateComment();
        break;

      case "DELETE_COMMENT":
        onDeleteComment();
        break;

      case "UPDATE_RECOMMENT":
        onUpdateRecomment();
        break;

      case "DELETE_RECOMMENT":
        onDeleteRecomment();
        break;
    }
  };

  const onPostLike = (likeType: LikeType) => {
    postLike.mutateAsync({
      id: query.id,
      type: likeType,
    });
  };

  const onInputFocus = () => {
    if (commentInputRef.current) commentInputRef.current.focus();
  };

  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  /**
   *@description 답글 등록 중, 백스페이스 처리 함수 (타겟 닉네임을 지우기 위함)
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      if (
        commentInputText.length === 0 &&
        commentMutationType === "ADD_RECOMMENT"
      ) {
        setCommentMutationType("DEFAULT");
        setSelectedComment(null);
      }
    }
  };

  const onModifyPost = () => {
    if (!query?.id) return toastShow("잘못된 접근입니다.");
    router.push(`/register/${query.id}`);
  };

  const onDeletePost = () => {
    if (!query?.id) return toastShow("잘못된 접근입니다.");

    deletePost
      .mutateAsync({
        postId: Number(query.id),
      })
      .then((response) => {
        if (response.statusCode === 200)
          toastShow("해당 게시글이 삭제 처리되었습니다.");
      })
      .catch((error) => {
        toastShow("삭제 처리과정에서 에러가 발생했습니다.");
      });
  };

  useEffect(() => {
    if (
      commentMutationType !== "DEFAULT" &&
      commentMutationType !== "ADD_RECOMMENT"
    )
      onMutationComment();
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
    if (selectedComment && commentMutationType === "ADD_RECOMMENT") {
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
          <Flex mb="47px" justifyContent={"space-between"}>
            <Flex alignItems={"center"}>
              <DefaultPropfile name={postData?.data?.author?.name ?? ""} />

              <Stack spacing={"6px"} ml="13px">
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  {postData?.data?.author?.name ?? ""}
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

            {getUserId === postData?.data.authorId && (
              <Flex>
                <TextButton onClick={onModifyPost} mr="26px" fontSize={"16px"}>
                  수정
                </TextButton>

                <TextButton onClick={onDeletePost} fontSize={"16px"}>
                  삭제
                </TextButton>
              </Flex>
            )}
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
            {(postData?.data.postTagJoin ?? []).map((item, i) => (
              <React.Fragment key={i.toString()}>
                <Tag name={item.tag.text} />
              </React.Fragment>
            ))}
          </HStack>

          {/* 좋아요, 싫어요 */}
          <LikeButton
            onChange={onPostLike}
            currentIsLike={!_.isEmpty(postData?.data.postLikeJoin)}
            likeCount={postData?.data.like}
          />
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
          onKeyPress={handleKeyDown}
          value={commentInputText}
          _placeholder={{
            color: colors.gray[2],
            fontSize: "16px",
          }}
          resize="none"
        />
      </Flex>

      <Flex justifyContent={"flex-end"} pt="8px" pb="18px">
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
                  commentType={"COMMENT"}
                  isDelete={!_.isEmpty(commentItem.deletedAt)}
                />

                {commentItem.recomments.map((recommentItem) => (
                  <React.Fragment key={recommentItem.id}>
                    <PostComment
                      setSelectedComment={setSelectedComment}
                      setCommentMutationType={setCommentMutationType}
                      onInputFocus={onInputFocus}
                      data={recommentItem}
                      commentType={"RECOMMENT"}
                      isDelete={!_.isEmpty(recommentItem.deletedAt)}
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
