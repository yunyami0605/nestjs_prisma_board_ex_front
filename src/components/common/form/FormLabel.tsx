import React, { useState } from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface Props extends TextProps {
  children?: string;
}
function FormLabel(props: Props) {
  return <Text {...props}>{props.children}</Text>;
}

export default FormLabel;
