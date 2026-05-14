"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren } from "react";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.push("/login");
    }
  }, [pathname]);

  return children;
};

export default AuthWrapper;
