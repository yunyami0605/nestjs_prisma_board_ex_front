import { colors } from "@/theme/color";
import { PostItem } from "@/types/page/posts";
import { getProgressTime } from "@/utils/time";
import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface Props {
  data: PostItem;
}

/**
 *@description 게시글 리스트 페이지 > 게시글 항목
 */
function PostListItem({ data }: Props) {
  const router = useRouter();

  return (
    <Stack
      px="12px"
      py="20px"
      spacing={"11px"}
      borderTopWidth={"1px"}
      borderBottomWidth={"1px"}
      borderColor={colors.gray[3]}
      cursor="pointer"
      onClick={() => router.push(`/posts/${data.id}`)}
    >
      <Text fontWeight={"bold"} fontSize="16px">
        {data.title}
      </Text>

      <Text fontSize="12px">{data.content}</Text>

      <HStack justifyContent={"space-between"}>
        <Text>{getProgressTime(data.createdAt)}</Text>

        <Flex>
          <Text mr="6px">작성자</Text>
          <Text mr="20px">{data.author.nickname}</Text>

          <Text mr="6px">뷰</Text>
          <Text mr="20px">{data.view}</Text>

          <Text mr="6px">댓글</Text>
          <Text mr="20px">{data._count.comments}</Text>

          <Text mr="6px">좋아요</Text>
          <Text>{data.like}</Text>
        </Flex>
      </HStack>
    </Stack>
  );
}

export default PostListItem;
