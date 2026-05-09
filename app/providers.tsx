'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IntegrationProvider } from '@/context/IntegrationContext';
import { useAuthStore } from '@/store/useAuthStore';

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  const organizationId = useAuthStore(
    state => state.user?.organization_id || state.user?.id || ''
  );

  return (
    <QueryClientProvider client={queryClient}>
      <IntegrationProvider organizationId={organizationId}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </IntegrationProvider>
    </QueryClientProvider>
  );
}