import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  children: JSX.Element | JSX.Element[];
}

/**
 *@description 기본 레이아웃
 */
function BaseLayout({ children }: Props) {
  return (
    <Box px="86px" py="56px" minH="100vh">
      {children}
    </Box>
  );
}

export default BaseLayout;
