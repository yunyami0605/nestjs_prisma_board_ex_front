import React, { useState } from "react";
import { Center, Box, Stack, FormLabel } from "@chakra-ui/react";
import FormInput from "@/components/common/form/FormInput";
import PositiveButtonBar from "@/components/common/button/PositiveButtonBar";
import DefaultButtonBar from "@/components/common/button/DefaultButtonBar";
import { useRouter } from "next/router";
import { usePostSignup } from "@/api/auth/mutation";
import FormErrorLabel from "@/components/common/form/FormErrorLabel";
import useToastShow from "@/hooks/useToast";
import { EMAIL_REGREX } from "@/constants/reqexp";

/**
 *@description 회원가입 페이지
 *@todo 회원가입 에러 로직 추가
 */
function Signup() {
  const router = useRouter();
  const { toastShow } = useToastShow();

  const initForm = {
    email: "",
    password: "",
    nickname: "",
    name: "",
  };

  const postSignup = usePostSignup();

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    name: "",
  });

  const [form, setForm] = useState(initForm);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const onChangeForm = (formKey: keyof typeof initForm, value: string) => {
    setForm((prev) => ({ ...prev, [formKey]: value }));
  };

  const onSignup = () => {
    if (!EMAIL_REGREX.test(form.email)) {
      return setErrorMessage((prev) => ({
        ...prev,
        email: "올바른 이메일 형식이 아닙니다.",
      }));
    }

    postSignup
      .mutateAsync(form)
      .then((response) => {
        if (response.statusCode === 201) {
          toastShow("회원가입을 축하드립니다. 로그인 부탁드립니다.");
          router.back();
        }
      })
      .catch((error) => {
        // signup error logic
      });
  };

  const onChangePasswordConfirm = (value: string) => {
    setPasswordConfirm(value);

    if (value !== form.password)
      setErrorMessage((prev) => ({
        ...prev,
        passwordConfirm: "비밀번호가 일치하지 않습니다.",
      }));
  };

  return (
    <Center h="80vh">
      <Box w="310px">
        <FormLabel w="100%" mb="10px">
          이메일
        </FormLabel>

        <FormInput
          mb="10px"
          placeholder="이메일"
          value={form.email}
          onChange={(e) => onChangeForm("email", e.target.value)}
        />

        <FormErrorLabel mb="16px">{errorMessage.email}</FormErrorLabel>

        <FormLabel w="100%" mb="10px">
          비밀번호
        </FormLabel>

        <FormInput
          mb="10px"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={(e) => onChangeForm("password", e.target.value)}
        />

        <FormErrorLabel mb="16px">{errorMessage.password}</FormErrorLabel>

        <FormLabel w="100%" mb="10px">
          비밀번호 확인
        </FormLabel>

        <FormInput
          mb="10px"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={(e) => onChangePasswordConfirm(e.target.value)}
        />

        <FormErrorLabel mb="16px">
          {errorMessage.passwordConfirm}
        </FormErrorLabel>

        <FormLabel w="100%" mb="10px">
          닉네임
        </FormLabel>

        <FormInput
          mb="10px"
          placeholder="닉네임"
          value={form.nickname}
          onChange={(e) => onChangeForm("nickname", e.target.value)}
        />

        <FormErrorLabel mb="16px">{errorMessage.nickname}</FormErrorLabel>

        <FormLabel w="100%" mb="10px">
          이름
        </FormLabel>

        <FormInput
          mb="10px"
          placeholder="이름"
          value={form.name}
          onChange={(e) => onChangeForm("name", e.target.value)}
        />

        <FormErrorLabel mb="16px">{errorMessage.name}</FormErrorLabel>

        <Stack spacing={"8px"}>
          <PositiveButtonBar name="가입완료" onClick={onSignup} />
          <DefaultButtonBar name="뒤로가기" onClick={router.back} />
        </Stack>
      </Box>
    </Center>
  );
}

export default Signup;
