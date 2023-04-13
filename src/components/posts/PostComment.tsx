import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DefaultProfile from "../common/profile/DefaultProfile";
import LikeButton from "../common/button/LikeButton";
import TextButton from "../common/button/TextButton";
import { colors } from "@/theme/color";
import { CommentItem, CommentType } from "@/types/page/posts";
import { getProgressTime } from "@/utils/time";

interface Props {
  commentType: CommentType;
  data: CommentItem;
}
function PostComment({ commentType, data }: Props) {
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
            <TextButton>답글 쓰기</TextButton>
            <TextButton>수정</TextButton>
            <TextButton>삭제</TextButton>
          </HStack>
        )}
      </Stack>
    </HStack>
  );
}

export default PostComment;
