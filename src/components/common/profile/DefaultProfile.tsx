import { colors } from "@/theme/color";
import { Center, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  name: string;
}

/**
 *@description 이미지 없을 경우 프로필
 */
function DefaultProfile({ name }: Props) {
  return (
    <Center w="39px" h="39px" borderRadius={"50px"} bgColor={colors.gray[3]}>
      <Text fontSize={"16px"} fontWeight={"bold"} color={colors.gray[5]}>
        {name}
      </Text>
    </Center>
  );
}

export default DefaultProfile;
