import { colors } from "@/theme/color";
import { Center, CenterProps, Text, TextProps } from "@chakra-ui/react";
import React from "react";

interface Props {
  name: string;
  onClick: () => void;
  centerDivProps?: CenterProps;
  textProps?: TextProps;
}
function DefaultButtonBar({ name, onClick, centerDivProps, textProps }: Props) {
  return (
    <Center
      onClick={onClick}
      borderRadius={"12px"}
      borderWidth={"1px"}
      px="27px"
      py="8px"
      borderColor={colors.gray[2]}
      bgColor={colors.gray[5]}
      cursor="pointer"
      {...centerDivProps}
    >
      <Text
        color={colors.gray[2]}
        fontSize={"14px"}
        fontWeight={700}
        {...textProps}
      >
        {name}
      </Text>
    </Center>
  );
}

export default DefaultButtonBar;
