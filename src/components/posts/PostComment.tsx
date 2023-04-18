import { Flex, HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import DefaultProfile from "../common/profile/DefaultProfile";
import LikeButton from "../common/button/LikeButton";
import TextButton from "../common/button/TextButton";
import { colors } from "@/theme/color";
import {
  CommentMutationType,
  CommentType,
  SelectedComment,
} from "@/types/page/posts";
import { getProgressTime } from "@/utils/time";
import { SetState } from "@/types/common";
import _ from "lodash";
import useToastShow from "@/hooks/useToast";

type CommentItem = {
  id: number;
  user: {
    nickname: string;
  };
  createdAt: string;
  content: string;
};

interface Props {
  commentType: CommentType;
  data: CommentItem;
  setSelectedComment: SetState<SelectedComment | null>;
  setCommentMutationType: SetState<CommentMutationType>;
  onInputFocus: () => void;
  isDelete: boolean;
}
function PostComment({
  commentType,
  data,
  setSelectedComment,
  setCommentMutationType,
  onInputFocus,
  isDelete,
}: Props) {
  const { toastShow } = useToastShow();

  const [modifiedContent, setModifiedContent] = useState(data.content);
  const [isModifyStatus, setModifyStatus] = useState(false);

  const onAddRecomment = () => {
    setSelectedComment({
      type: commentType,
      id: data.id,
      parentUserNickname: data.user.nickname,
    });
    setCommentMutationType("ADD_RECOMMENT");
    onInputFocus();
  };

  const onModifyComment = () => {
    setModifyStatus(true);
  };

  const onModifyCommentCancel = () => {
    setModifyStatus(false);
    setModifiedContent(data.content);
  };

  const onModifyCommentComplete = () => {
    if (_.isEmpty(modifiedContent)) return toastShow("글자를 입력해주세요.");

    setSelectedComment({
      type: commentType,
      id: data.id,
      content: modifiedContent,
    });
    setCommentMutationType(
      commentType === "COMMENT" ? "UPDATE_COMMENT" : "UPDATE_RECOMMENT"
    );
    setModifyStatus(false);
  };

  const onDeleteComment = () => {
    setSelectedComment({ type: commentType, id: data.id });
    setCommentMutationType(
      commentType === "COMMENT" ? "DELETE_COMMENT" : "DELETE_RECOMMENT"
    );
  };

  return (
    <HStack spacing={"58px"} w="100%">
      {commentType === "RECOMMENT" && (
        <Text color={colors.gray[3]} fontSize={"24px"} fontWeight={"bold"}>
          →
        </Text>
      )}

      <Stack
        w="100%"
        py="24px"
        borderTopWidth={"1px"}
        borderTopColor={colors.gray[3]}
      >
        <Stack spacing="20px" mb="4px">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <HStack alignItems={"center"} spacing="18px">
              <DefaultProfile name={data.user.nickname.slice(0, 4)} />

              <Stack spacing={"2px"}>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  {data.user.nickname}
                </Text>

                <Text fontSize={"12px"}>{getProgressTime(data.createdAt)}</Text>
              </Stack>
            </HStack>

            {/* 좋아요 버튼 */}
            <LikeButton onChange={() => {}} />
          </Flex>

          {isModifyStatus && !isDelete ? (
            <Textarea
              value={modifiedContent}
              onChange={(e) => setModifiedContent(e.target.value)}
              resize="none"
            />
          ) : (
            <Text
              minH="90px"
              color={colors.gray[isDelete ? 2 : 0]}
              fontWeight={"500"}
            >
              {isDelete ? "삭제된 댓글입니다." : data.content}
            </Text>
          )}
        </Stack>

        {!isDelete && (
          <HStack spacing={"20px"} pl="2px">
            {!isModifyStatus && (
              <TextButton onClick={onAddRecomment}>답글 쓰기</TextButton>
            )}
            {!isModifyStatus && (
              <TextButton onClick={onModifyComment}>수정</TextButton>
            )}
            {!isModifyStatus && (
              <TextButton onClick={onDeleteComment}>삭제</TextButton>
            )}
            {isModifyStatus && (
              <TextButton onClick={onModifyCommentComplete}>완료</TextButton>
            )}
            {isModifyStatus && (
              <TextButton onClick={onModifyCommentCancel}>취소</TextButton>
            )}
          </HStack>
        )}
      </Stack>
    </HStack>
  );
}

export default PostComment;
