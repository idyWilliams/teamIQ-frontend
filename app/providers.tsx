"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import AuthProvider from "@/components/providers/AuthProvider";

export default function Providers({ children }: { children: ReactNode }) {
  // Create a QueryClient for this session
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* AuthProvider runs token validation every 5 mins/ 5 seconds */}
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}
