import { usePostLogin } from "@/api/auth/mutation";
import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import FormInput from "@/components/common/form/FormInput";
import FormLabel from "@/components/common/form/FormLabel";
import { setToken } from "@/utils/auth";
import { Center, Box, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

/**
 *@description 로그인 페이지
 *@todo 로그인 에러 로직 추가
 */
function Login() {
  const postLogin = usePostLogin();
  const router = useRouter();

  const initForm = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initForm);

  const onLogin = () => {
    postLogin
      .mutateAsync(form)
      .then((response) => {
        if (response.statusCode === 201) {
          setToken("ACCESS", response.data.access);
          setToken("REFRESH", response.data.refresh);

          router.replace("/posts");
        }
      })
      .catch((error) => {
        /**
         *@todo api 401 로직 추가하기
         */
        console.log(error);
      });
  };

  const onMoveSignupPage = () => router.push("/signup");

  const onChangeForm = (formKey: keyof typeof initForm, value: string) => {
    setForm((prev) => ({ ...prev, [formKey]: value }));
  };

  return (
    <Center h="70vh">
      <Box w="310px">
        <FormLabel w="100%" mb="10px">
          이메일
        </FormLabel>

        <FormInput
          mb="16px"
          placeholder="이메일"
          value={form.email}
          onChange={(e) => onChangeForm("email", e.target.value)}
        />

        <FormLabel w="100%" mb="10px">
          비밀번호
        </FormLabel>

        <FormInput
          mb="24px"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={(e) => onChangeForm("password", e.target.value)}
        />

        <Stack spacing={"8px"}>
          <PositiveButtonBar name="로그인" onClick={onLogin} />
          <DefaultButtonBar name="회원가입" onClick={onMoveSignupPage} />
        </Stack>
      </Box>
    </Center>
  );
}

export default Login;
