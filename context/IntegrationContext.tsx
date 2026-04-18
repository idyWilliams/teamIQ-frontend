'use client';

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { Apps, Connection, IntegrationContextType } from '@/types/integrations';
import { useGetIntegrations, useDeleteIntegration, useSyncIntegration } from '@/services/hooks/useIntegrations';
import { getProviderConfig } from '@/lib/providerConfig';

const IntegrationContext = createContext<IntegrationContextType | undefined>(
  undefined
);

interface IntegrationProviderProps {
  children: React.ReactNode;
  organizationId: string; // Set from your auth/org context/user state!
}

export function IntegrationProvider({
  children,
  organizationId,
}: IntegrationProviderProps) {
  const { data: rawConnections = [], isLoading: loading, refetch } = useGetIntegrations(organizationId);
  const { mutateAsync: removeConnectionMutation } = useDeleteIntegration();
  const { mutateAsync: syncConnectionMutation } = useSyncIntegration();

  // Transform backend connections to include provider config (logo, name, etc.)
  const connections = useMemo(() => {
    return rawConnections.map((conn: any) => {
      const providerConfig = getProviderConfig(conn.provider);

      return {
        id: conn.id.toString(),
        provider: conn.provider,
        appName: providerConfig.name,
        logo: providerConfig.logo,
        displayName: `${providerConfig.name} - ${conn.account_id}`,
        providerAccountName: conn.account_id || 'Unknown Account',
        providerAccountEmail: conn.account_email || '',
        isActive: conn.is_active,
        lastSyncedAt: conn.updated_at || conn.created_at,
      } as Connection;
    });
  }, [rawConnections]);

  // Wrap mutations to match the expected interface
  const removeConnection = useCallback(
    async (id: string) => {
      await removeConnectionMutation(id);
    },
    [removeConnectionMutation]
  );

  const syncConnection = useCallback(
    async (id: string) => {
      await syncConnectionMutation(id);
    },
    [syncConnectionMutation]
  );

  const fetchConnections = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Helpers and selectors (based on fetched backend state)
  const getConnectionsByApp = useCallback(
    (appId: string) =>
      connections.filter(conn => conn.provider === appId && conn.isActive),
    [connections]
  );
  const isAppConnected = useCallback(
    (appId: string) =>
      connections.some(conn => conn.provider === appId && conn.isActive),
    [connections]
  );

  const value: IntegrationContextType = {
    connections,
    removeConnection,
    syncConnection,
    getConnectionsByApp,
    isAppConnected,
    fetchConnections,
    loading,
  };

  return (
    <IntegrationContext.Provider value={value}>
      {children}
    </IntegrationContext.Provider>
  );
}

export function useIntegrations() {
  const context = useContext(IntegrationContext);
  if (!context)
    throw new Error(
      'useIntegrations must be used within an IntegrationProvider'
    );
  return context;
}
