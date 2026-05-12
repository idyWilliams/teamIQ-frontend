import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/components/providers/AuthProvider';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';

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
});

export const metadata: Metadata = {
  title: 'TeamIQ App',
  description: 'App powered by Next.js + TanStack Query + Axios',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn('antialiased', hellix.className)}>
        <Toaster richColors expand position="top-right" />

        <AuthProvider>
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}