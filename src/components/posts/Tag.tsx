import { colors } from "@/theme/color";
import { Center, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  name: string;
}
function Tag({ name }: Props) {
  return (
    <Center bgColor={colors.gray[4]} borderRadius={"24px"} px="15px" py="10px">
      <Text color={colors.gray[2]} fontSize={"16px"} fontWeight={700}>
        {name}
      </Text>
    </Center>
  );
}

export default Tag;
