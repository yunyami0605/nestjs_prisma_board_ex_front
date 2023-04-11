import { extendTheme } from "@chakra-ui/react";
import { colors } from "../color";

/**
 *@description 텍스트 기본 커스텀 스타일
 */
const customTextTheme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontSize: "14px",
        fontWeight: "400",
        color: colors.gray[0],
      },
    },
  },
});

export default customTextTheme;
