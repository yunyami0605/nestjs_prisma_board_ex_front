import { getUserId } from "@/utils/auth";
import React, { useEffect, useState } from "react";

/**
 *@description return user id hook
 */
function useGetUserId() {
  const [userId, setUserId] = useState<number>();
  useEffect(() => {
    const _userId = getUserId();
    if (_userId) setUserId(_userId);
  }, []);

  return userId;
}

export default useGetUserId;
