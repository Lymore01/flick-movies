
import React, { FC, ReactNode } from "react";
import { useRouter } from "next/navigation";

const useRouterHook = () => {
  const router = useRouter();
  return router;
};

export default useRouterHook;
