import React, { use, useEffect, useState } from "react";
import { Flex, FlexboxProps, Text } from "@chakra-ui/react";
import { colors } from "@/theme/color";
import { LikeType } from "@/types/page/posts";

interface Props {
  flexProps?: FlexboxProps;
  onChange: (likeType: LikeType) => void;
  currentIsLike?: boolean;
  likeCount?: number;
  isLoading?: boolean;
  isDelete?: boolean;
}
function LikeButton({
  flexProps,
  onChange,
  currentIsLike,
  likeCount,
  isLoading,
  isDelete,
}: Props) {
  const [count, setCount] = useState(0);

  const onCountChange = (value: number) => {
    const nextIsLike = value === 1;
    if (isLoading || isDelete || nextIsLike === currentIsLike) return;

    setCount((prev) => prev + value);
    onChange(currentIsLike ? "DISLIKE" : "LIKE");
  };

  useEffect(() => {
    if (likeCount) setCount(likeCount);
  }, [likeCount]);

  return (
    <Flex
      w="130px"
      h="34px"
      {...flexProps}
      borderWidth={"1px"}
      borderColor={colors.gray[3]}
      borderRadius={"12px"}
    >
      <Text
        fontWeight={"bold"}
        fontSize={"24px"}
        cursor={"pointer"}
        px="10px"
        h="100%"
        textAlign={"center"}
        lineHeight={"29px"}
        onClick={() => onCountChange(-1)}
      >
        -
      </Text>

      <Text
        fontWeight={"bold"}
        fontSize={"16px"}
        w="60px"
        h="100%"
        textAlign={"center"}
        lineHeight={"32px"}
        borderLeftWidth={"1px"}
        borderRightWidth={"1px"}
        borderColor={colors.gray[3]}
      >
        {count}
      </Text>

      <Text
        fontWeight={"bold"}
        fontSize={"20px"}
        cursor={"pointer"}
        px="10px"
        h="100%"
        textAlign={"center"}
        lineHeight={"29px"}
        onClick={() => onCountChange(1)}
      >
        +
      </Text>
    </Flex>
  );
}

export default LikeButton;
