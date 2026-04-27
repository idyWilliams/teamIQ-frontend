'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { IntegrationProvider } from '@/context/IntegrationContext';
import { useIntegrations } from '@/context/IntegrationContext';
import { ConnectionCard } from '@/components/integrations/ConnectionCard';
import { EmptyState } from '@/components/emptyState/empty';
import { getProviderConfig } from '@/lib/providerConfig';
import { toast } from 'sonner';

// Internal component that uses integration context
function IntegrationsContent({
  orgId,
  provider,
  status,
  reason,
}: {
  orgId: string;
  provider: string | null;
  status: string | null;
  reason: string | null;
}) {
  const router = useRouter();
  const { connections, loading, fetchConnections } = useIntegrations();
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    // Handle OAuth callback status
    if (status && !hasShownToast) {
      if (status === 'success' && provider) {
        const providerConfig = getProviderConfig(provider);
        toast.success(`${providerConfig.name} connected successfully`, {
          duration: 5000,
        });
        setHasShownToast(true);
      } else if (status === 'error') {
        const providerConfig = provider ? getProviderConfig(provider) : null;
        const errorMsg = reason
          ? `Failed to connect ${providerConfig?.name || 'provider'}: ${reason}`
          : `Failed to connect ${providerConfig?.name || 'provider'}. Please try again.`;
        toast.error(errorMsg, {
          duration: 8000,
        });
        setHasShownToast(true);
      }
    }
  }, [status, provider, reason, hasShownToast]);

  useEffect(() => {
    // Fetch integrations after showing toast
    if (status && !hasShownToast) {
      const timer = setTimeout(() => {
        fetchConnections();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, hasShownToast, fetchConnections]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3">
          <svg
            className="text-iq-500 h-8 w-8 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-muted-foreground">Loading integrations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Integrated Apps</h2>
            <p className="mt-1 text-gray-600">
              Integrate various apps to increase your productivity across your
              projects
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {connections.length === 0 ? (
        <EmptyState onAddApps={() => router.push('/organization/settings/market-place')} />
      ) : (
        <>
          {/* Stats Card */}
          <div className="from-iq-50 to-iq-100 border-iq-200 mb-6 rounded-xl border bg-gradient-to-br p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-iq-800 text-3xl font-bold">
                  {connections.length}
                </p>
                <p className="text-iq-700 text-sm font-medium">
                  Active Connection{connections.length !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="text-right">
                <p className="text-iq-800 text-3xl font-bold">
                  {new Set(connections.map((c) => c.provider)).size}
                </p>
                <p className="text-iq-700 text-sm font-medium">
                  Integrated App{new Set(connections.map((c) => c.provider)).size !== 1 ? 's' : ''}
                </p>
              </div>
              <div className="bg-iq-500/10 flex h-16 w-16 items-center justify-center rounded-full">
                <svg
                  className="text-iq-500 h-8 w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Connections Grid */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
            {connections.map((connection) => (
              <ConnectionCard key={connection.id} connection={connection} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Main page component
export default function IntegrationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const orgId = searchParams.get('orgId');
  const provider = searchParams.get('provider');
  const status = searchParams.get('status');
  const reason = searchParams.get('reason');

  // Use orgId from URL param, fallback to user's organization id
  const effectiveOrgId = orgId || user?.id?.toString();

  useEffect(() => {
    // If no orgId at all, redirect to settings
    if (!effectiveOrgId) {
      router.push('/organization/settings?tab=integrated-apps');
    }
  }, [effectiveOrgId, router]);

  if (!effectiveOrgId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-3">
          <svg
            className="text-iq-500 h-8 w-8 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <IntegrationProvider organizationId={effectiveOrgId}>
      <IntegrationsContent
        orgId={effectiveOrgId}
        provider={provider}
        status={status}
        reason={reason}
      />
    </IntegrationProvider>
  );
}
