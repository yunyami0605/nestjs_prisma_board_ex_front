import ToastMessage from "@/components/common/toast/ToastMessage";
import { useToast } from "@chakra-ui/react";
import React from "react";

/**
 *@description toast 훅 생성
 */
function useToastShow() {
  const toast = useToast();

  const toastShow = (text: string) => {
    toast({
      render: () => {
        return <ToastMessage text={text} />;
      },
      duration: 3000,
    });
  };

  return { toastShow };
}

export default useToastShow;
