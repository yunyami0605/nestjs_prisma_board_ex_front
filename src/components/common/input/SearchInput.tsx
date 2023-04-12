import { colors } from "@/theme/color";
import { Input, InputProps } from "@chakra-ui/react";
import React from "react";

/**
 *@description 검색
 */
function SearchInput(props: InputProps) {
  return (
    <Input
      {...props}
      borderWidth="1px"
      borderColor={colors.gray[3]}
      borderRadius={"8px"}
      placeholder="검색"
      w="180px"
      h="35px"
      _placeholder={{ color: colors.gray[3] }}
      color={colors.gray[0]}
    />
  );
}

export default SearchInput;
