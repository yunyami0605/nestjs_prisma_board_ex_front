import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DefaultProfile from "../common/profile/DefaultProfile";
import LikeButton from "../common/button/LikeButton";
import TextButton from "../common/button/TextButton";
import { colors } from "@/theme/color";
import {
  CommentItem,
  CommentMutationType,
  CommentType,
  SelectedComment,
} from "@/types/page/posts";
import { getProgressTime } from "@/utils/time";
import { SetState } from "@/types/common";
import _ from "lodash";

interface Props {
  commentType: CommentType;
  data: CommentItem;
  setSelectedComment: SetState<SelectedComment | null>;
  setCommentMutationType: SetState<CommentMutationType>;
  onInputFocus: () => void;
}
function PostComment({
  commentType,
  data,
  setSelectedComment,
  setCommentMutationType,
  onInputFocus,
}: Props) {
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
    setSelectedComment({ type: commentType, id: data.id, content: "" });
    setCommentMutationType(
      commentType === "COMMENT" ? "UPDATE_COMMENT" : "UPDATE_RECOMMENT"
    );
    onInputFocus();
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
        <Stack spacing="20px">
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <HStack alignItems={"center"} spacing="18px">
              <DefaultProfile name={data.user.nickname.slice(0, 4)} />

              <Stack spacing={"2px"}>
                <Text fontSize={"16px"} fontWeight={"bold"}>
                  {data.user.nickname}
                </Text>

                <Text fontSize={"12px"}>
                  {getProgressTime(data.createdAt)}일전
                </Text>
              </Stack>
            </HStack>

            {/* 좋아요 버튼 */}
            <LikeButton onChange={() => {}} />
          </Flex>

          <Text minH="90px">
            {commentType === "DELETE" ? "삭제된 댓글입니다." : data.content}
          </Text>
        </Stack>

        {commentType !== "DELETE" && (
          <HStack spacing={"14px"}>
            <TextButton onClick={onAddRecomment}>답글 쓰기</TextButton>
            <TextButton onClick={onModifyComment}>수정</TextButton>
            <TextButton onClick={onDeleteComment}>삭제</TextButton>
          </HStack>
        )}
      </Stack>
    </HStack>
  );
}

export default PostComment;
