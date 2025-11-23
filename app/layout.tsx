import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const hellix = localFont({
  src: [
    {
      path: './fonts/Hellix-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Hellix-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Hellix-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Hellix-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Hellix-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Hellix-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  // variable: "--font-hellix",
});

export const metadata: Metadata = {
  title: 'TeamIQ App',
  description: 'App powered by Next.js + TanStack Query + Axios',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn('antialiased', hellix.className)}>
        {/* <NextTopLoader color="#2299DD" showSpinner /> */}
        <Toaster richColors expand={true} position="top-right" />

        {/* Wrap app with QueryClientProvider */}
        <AuthProvider>
          <Providers>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
