"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * AuthProvider
 * - Periodically validates JWT (5s dev / 5m prod)
 * - Auto-logs out if token is expired/invalid
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const validateToken = useAuthStore((state) => state.validateToken);

  useEffect(() => {
    // ⏱ Interval validation ONLY (no first immediate call)
    const interval = setInterval(() => {
      validateToken();
    }, 5000); // 5 seconds for testing

    // ✅ Production interval
    // const interval = setInterval(() => {
    //   validateToken();
    // }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [validateToken]);

  return <>{children}</>;
}
