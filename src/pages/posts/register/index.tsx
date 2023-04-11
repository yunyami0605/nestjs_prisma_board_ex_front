import React, { useState } from "react";
import _ from "lodash";
import { Text, HStack, Stack, Box } from "@chakra-ui/react";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import HeaderView from "@/components/common/headerView/HeaderView";
import SearchInput from "@/components/common/input/SearchInput";
import TextButton from "@/components/common/button/TextButton";
import { useRouter } from "next/router";
import FormLabel from "@/components/common/form/FormLabel";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextarea";
import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import { colors } from "@/theme/color";

/**
 *@description 게시글 등록 페이지
 */
function PostRegister() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  return (
    <Stack>
      <HeaderView>
        <div></div>

        <TextButton onClick={() => router.push("/posts")}>목록가기</TextButton>
      </HeaderView>

      {/* 게시글 리스트 */}
      <Box py="32px">
        <FormLabel mb="10px">게시글 유형</FormLabel>
        <FormInput mb="24px" />

        <FormLabel mb="10px">제목</FormLabel>
        <FormInput mb="24px" />

        <FormLabel mb="10px">본문</FormLabel>
        <FormTextarea mb="24px" h="336px" />

        <FormLabel mb="10px">태그</FormLabel>
        <FormInput mb="12px" />

        {/* 등록하려는 태그 리스트 */}
        <HStack mb="4px">
          <Text cursor={"pointer"} fontSize={"12px"} color={colors.gray[2]}>
            태그 x
          </Text>
        </HStack>

        <HStack justifyContent={"flex-end"} spacing={"18px"}>
          <DefaultButtonBar name={"취소"} onClick={() => {}} />
          <PositiveButtonBar name={"글 등록"} onClick={() => {}} />
        </HStack>
      </Box>
    </Stack>
  );
}

export default PostRegister;
