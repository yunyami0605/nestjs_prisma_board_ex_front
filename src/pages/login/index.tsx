import FormInput from "@/components/common/form/FormInput";
import FormLabel from "@/components/common/form/FormLabel";
import {
  Center,
  FormControl,
  Input,
  VStack,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {}
function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <Center>
      <VStack alignContent={"flex-start"}>
        <FormLabel mb="10px">이메일</FormLabel>

        <FormInput
          mb="16px"
          placeholder="이메일"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />

        <FormLabel mb="10px">비밀번호</FormLabel>
        <FormInput
          mb="12px"
          placeholder="비밀번호"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, password: e.target.value }))
          }
        />

        <Flex></Flex>
      </VStack>
    </Center>
  );
}

export default Login;
