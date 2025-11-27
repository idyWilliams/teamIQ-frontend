'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const validateToken = useAuthStore(state => state.validateToken);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return <>{children}</>;
}