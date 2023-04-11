import { colors } from "@/theme/color";
import { HStack, Stack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  title: string;
  contents: string;
  createdAt: string;
  author: string;
  view: number;
  commentsCount: number;
  like: number;
}

function PostListItem(props: Props) {
  return (
    <Stack
      px="12px"
      py="20px"
      spacing={"11px"}
      borderTopWidth={"1px"}
      borderBottomWidth={"1px"}
      borderColor={colors.gray[3]}
    >
      <Text fontWeight={"bold"} fontSize="16px">
        {props.title}
      </Text>

      <Text fontSize="12px">{props.contents}</Text>

      <HStack justifyContent={"space-between"}>
        <Text>{props.createdAt}</Text>

        <HStack>
          <Text mr="2px">작성자</Text>
          <Text mr="14px">{props.author}</Text>

          <Text mr="8px">뷰</Text>
          <Text mr="14px">{props.view}</Text>

          <Text mr="8px">댓글</Text>
          <Text mr="14px">{props.commentsCount}</Text>

          <Text mr="8px">좋아요</Text>
          <Text mr="14px">{props.like}</Text>
        </HStack>
      </HStack>
    </Stack>
  );
}

export default PostListItem;
