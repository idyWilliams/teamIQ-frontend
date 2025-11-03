"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * AuthProvider
 * - Automatically validates access token on app load
 * - Refreshes token if expired
 * - Runs token validation periodically (5 sec for testing, 5 min for production)
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const validateToken = useAuthStore((state) => state.validateToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // Run only when logged in
    if (!isAuthenticated) return;

    // ✅ Immediate validation on app load
    validateToken();

    // ⏱ Interval validation
    const interval = setInterval(() => {
      validateToken();
    }, 5000); // 5 seconds for quick testing

    // const interval = setInterval(() => {
    //   validateToken();
    // }, 5 * 60 * 1000); // 5 minutes for production

    return () => clearInterval(interval);
  }, [validateToken, isAuthenticated]);

  return <>{children}</>;
}
