import React from "react";
import { Input, InputProps } from "@chakra-ui/react";
import { colors } from "@/theme/color";

interface Props extends InputProps {}
function FormTextarea(props: Props) {
  return (
    <Input
      {...props}
      borderWidth="1px"
      borderColor={colors.gray[3]}
      borderRadius={"8px"}
      color={colors.gray[0]}
      _placeholder={{
        color: colors.gray[3],
      }}
      _focus={{
        borderColor: colors.gray[2],
      }}
    />
  );
}

export default FormTextarea;
