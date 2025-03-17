"use client";

import { getUser } from "@/app/_actions/userAction";
import useUserStore from "@/stores/userStore";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: Props) => {
  const { setUser } = useUserStore();
  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      if (user) setUser(user);
    };

    loadUser();
  }, []);

  return <>{children}</>;
};

export default UserProvider;
