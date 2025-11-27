'use client';

import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';

const loadingMessages = [
  'Collecting your information...',
  'Setting up your experience...',
  'Fetching user data...',
  'Connecting to your workspace...',
  'Syncing team performance metrics...',
  'Loading collaboration insights...',
  'Preparing your dashboard...',
  'Gathering analytics data...',
  'Reimagining your experience...',
  'Building your performance overview...',
];

const FullScreenLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="from-background via-background to-primary/5 fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br">
      <div className="relative">
        {/* Animated SVG Loader */}
        <svg
          className="h-32 w-32"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer rotating circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="70 200"
            strokeLinecap="round"
            className="text-primary/20"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Middle rotating circle */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="50 150"
            strokeLinecap="round"
            className="text-primary/60"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50"
              to="0 50 50"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Inner pulsing circle */}
          <circle
            cx="50"
            cy="50"
            r="20"
            fill="currentColor"
            className="text-primary"
          >
            <animate
              attributeName="r"
              values="20;25;20"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.6;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Center icon - represents team/collaboration */}
          <g className="text-background" transform="translate(50, 50)">
            <circle cx="0" cy="-5" r="4" fill="currentColor" />
            <circle cx="-6" cy="4" r="4" fill="currentColor" />
            <circle cx="6" cy="4" r="4" fill="currentColor" />
          </g>
        </svg>

        {/* Orbital dots */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: '3s' }}
        >
          <div className="bg-primary absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full" />
        </div>
      </div>

      {/* Rotating Messages */}
      <div className="mt-8 flex h-16 items-center justify-center">
        <p className="text-foreground/80 animate-fade-in text-lg font-medium transition-opacity duration-500">
          {loadingMessages[messageIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex gap-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="bg-primary/40 h-2 w-2 animate-pulse rounded-full"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.4s',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore(
    useShallow(s => ({
      isAuthenticated: s.isAuthenticated,
      isLoading: s.isLoading,
    }))
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
