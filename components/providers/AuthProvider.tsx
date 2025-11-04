'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { tokenStorage } from '@/services/axios';

/**
 * AuthProvider
 * - Periodically validates JWT (5s dev / 5m prod)
 * - Auto-logs out if token is expired/invalid
 */
export default function AuthProvider({ children }: { children: ReactNode }) {
  const validateToken = useAuthStore(state => state.validateToken);
  const isAuthenticate = useAuthStore(state => state.isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = tokenStorage.get();
    console.log(isAuthenticate, token, 'FROM Providers');

    if ((pathname === '/member' || pathname === '/organization') && !token) {
      router.push('/login');
      return;
    }

    let interval: NodeJS.Timeout;
    if (isAuthenticate) {
      interval = setInterval(
        () => {
          validateToken();
        },
        5 * 60 * 1000
      ); // 5 seconds for testing

      // ✅ Production interval
      // const interval = setInterval(() => {
      //   validateToken();
      // },5 * 60 * 1000 ); // 5 minutes
    }

    return () => clearInterval(interval);
  }, [isAuthenticate, pathname, router, validateToken]);

  return <>{children}</>;
}
