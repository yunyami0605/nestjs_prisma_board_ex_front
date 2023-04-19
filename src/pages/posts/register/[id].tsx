import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Text, HStack, Stack, Box, useEditable } from "@chakra-ui/react";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import HeaderView from "@/components/common/headerView/HeaderView";
import TextButton from "@/components/common/button/TextButton";
import { useRouter } from "next/router";
import FormLabel from "@/components/common/form/FormLabel";
import FormInput from "@/components/common/form/FormInput";
import FormTextarea from "@/components/common/form/FormTextarea";
import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import { colors } from "@/theme/color";
import { usePatchPost, usePostPost } from "@/api/post/mutation";
import { PostForm } from "@/types/page/posts";
import useToastShow from "@/hooks/useToast";
import useGetUserId from "@/hooks/useGetUserId";
import { useGetPost } from "@/api/post/query";

/**
 *@description 게시글 수정 페이지
 */
function PostModify() {
  const router = useRouter();
  const patchPost = usePatchPost();
  const { toastShow } = useToastShow();
  const userId = useGetUserId();
  const query = router.query as { id: string };
  const { data: postData } = useGetPost(query.id);

  const initForm: PostForm = {
    title: "",
    content: "",
    tags: [],
  };

  const [form, setForm] = useState<PostForm>(initForm);
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (postData?.data) {
      const data = postData.data;
      const { title, content } = data;

      const tags = data.postTagJoin.map((item) => item.tag.text);
      setForm({
        title,
        content,
        tags,
      });
    }
  }, [postData]);

  const onSubmit = () => {
    if (!userId) {
      alert("로그인하시고 수정해주세요.");
      return router.replace("/login");
    }

    if (!query.id) {
      alert("잘못된 접근입니다.");
      return router.replace("/posts");
    }

    patchPost
      .mutateAsync({
        ...form,
        postId: Number(query.id),
        authorId: userId,
      })
      .then((response) => {
        if (response.statusCode === 200) {
          toastShow("수정 완료!");
          router.replace("/posts");
        }
      })
      .catch((error) => {
        toastShow(
          "수정 과정에서 문제가 발생했습니다! 계속해서 안된다면 관리자에게 문의바랍니다."
        );
      });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;

    if (event.key === "Enter") {
      if (form.tags.length === 5)
        return alert("최대 등록 가능한 태그 수는 5개 입니다.");

      if (value.length > 0 && value.length < 7) {
        setTag("");
        setForm((prev) => ({ ...prev, tags: [...prev.tags, value] }));
      }
    }
  };

  const onDeleteTag = (index: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((item, i) => i !== index),
    }));
  };

  return (
    <Stack>
      <HeaderView>
        <div></div>

        <TextButton onClick={() => router.push("/posts")}>목록가기</TextButton>
      </HeaderView>

      {/* 게시글 리스트 */}
      <Box py="32px">
        <FormLabel mb="10px">제목</FormLabel>
        <FormInput
          mb="24px"
          value={form.title}
          onChange={(e: any) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="제목을 입력해주세요."
        />

        <FormLabel mb="10px">본문</FormLabel>
        <FormTextarea
          mb="24px"
          h="336px"
          value={form.content}
          onChange={(e: any) =>
            setForm((prev) => ({ ...prev, content: e.target.value }))
          }
          placeholder="내용을 입력해주세요."
        />

        <FormLabel mb="10px">태그</FormLabel>
        <FormInput
          mb="12px"
          value={tag}
          placeholder="Enter 시, 등록합니다. (최대 6글자까지)"
          onChange={(e: any) => setTag(e.target.value)}
          onKeyPress={handleKeyDown}
        />

        {/* 등록하려는 태그 리스트 */}
        <HStack mb="4px" spacing={"16px"}>
          {form.tags.map((item, i) => (
            <Text
              onClick={() => onDeleteTag(i)}
              key={i.toString()}
              cursor={"pointer"}
              color={colors.gray[2]}
            >
              {item} x
            </Text>
          ))}
        </HStack>

        <HStack justifyContent={"flex-end"} spacing={"18px"}>
          <DefaultButtonBar name={"취소"} onClick={router.back} />
          <PositiveButtonBar name={"글 수정"} onClick={onSubmit} />
        </HStack>
      </Box>
    </Stack>
  );
}

export default PostModify;
