import { colors } from "@/theme/color";
import { Flex, FlexProps } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  // flexProps:
}
function HeaderView(props: FlexProps) {
  return (
    <Flex
      pb="16px"
      justifyContent={"space-between"}
      borderBottomWidth={"1px"}
      borderBottomColor={colors.gray[0]}
      {...props}
    />
  );
}

export default HeaderView;
