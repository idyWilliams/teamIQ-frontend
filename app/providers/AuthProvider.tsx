"use client";

import { useEffect, ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * AuthProvider
 * Automatically validates JWT token every 5 minutes.
 * Logs out user if token is expired or invalid.
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const validateToken = useAuthStore((state) => state.validateToken);

  useEffect(() => {
    // ✅ Validate token immediately on app load
    validateToken();

    // ✅ Setup interval to auto-check token every 5 min
    const interval = setInterval(() => {
      validateToken();
    }, 5 * 60 * 1000); // 5 mins

    // ✅ Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [validateToken]);

  return <>{children}</>;
}
