import { colors } from "@/theme/color";
import { Center, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  text: string;
}

/**
 *@description 토스트 팝업 기본 메세지
 *@param text - (필수)
 */

function ToastMessage({ text }: Props) {
  return (
    <Center
      minHeight={"44px"}
      px={"14px"}
      py="12px"
      minW={"375px"}
      borderRadius={"8px"}
      backgroundColor={"rgba(26, 30, 39, 0.8)"}
    >
      <Text textAlign={"center"} color={colors.gray[5]}>
        {text}
      </Text>
    </Center>
  );
}

export default ToastMessage;
