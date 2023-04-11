import React, { useState } from "react";
import { Text, TextProps } from "@chakra-ui/react";
import { colors } from "@/theme/color";

interface Props extends TextProps {
  children?: string;
}
function FormErrorLabel(props: Props) {
  return (
    <Text {...props} color={colors.red[3]} fontSize={"12px"}>
      {props.children}
    </Text>
  );
}

export default FormErrorLabel;
