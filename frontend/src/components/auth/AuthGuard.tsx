"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const publicPaths = ["/login", "/register", "/about", "/faq", "/contact"];
    const currentPath = window.location.pathname;

    if (!user && !publicPaths.includes(currentPath)) {
      router.replace("/login");
    }
  }, [user, router]);

  return <>{children}</>;
};

export default AuthGuard;
