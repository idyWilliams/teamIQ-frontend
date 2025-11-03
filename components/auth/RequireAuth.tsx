"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isCheckingAuth = useAuthStore((s) => s.isCheckingAuth);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-lg">
        Checking session...
      </div>
    );
  }

  return <>{isAuthenticated && children}</>;
}
