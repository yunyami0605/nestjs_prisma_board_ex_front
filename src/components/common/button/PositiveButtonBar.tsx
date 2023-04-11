import { colors } from "@/theme/color";
import { CenterProps, TextProps } from "@chakra-ui/react";
import React from "react";
import DefaultButtonBar from "./DefaultButtonBar";

interface Props {
  name: string;
  onClick: () => void;
  centerDivProps?: CenterProps;
  textProps?: TextProps;
}
function PositiveButtonBar({ name, onClick }: Props) {
  return (
    <DefaultButtonBar
      onClick={onClick}
      name={name}
      centerDivProps={{
        bgColor: colors.sky[3],
        borderWidth: "2px",
        borderColor: colors.sky[2],
      }}
      textProps={{
        color: colors.gray[4],
      }}
    />
  );
}

export default PositiveButtonBar;
