import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

function TextButton(props: TextProps) {
  return (
    <Text fontSize={"14px"} fontWeight={"bold"} cursor="pointer" {...props} />
  );
}

export default TextButton;
