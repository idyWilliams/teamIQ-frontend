'use client';

import React, {
  createContext,
  useContext,
  useCallback,
} from 'react';
import { Apps, Connection, IntegrationContextType } from '@/types/integrations';
import { useGetIntegrations, useDeleteIntegration, useSyncIntegration } from '@/services/hooks/useIntegrations';

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
  const { data: connections = [], isLoading: loading, refetch: fetchConnections } = useGetIntegrations(organizationId);
  const { mutate: removeConnection } = useDeleteIntegration();
  const { mutate: syncConnection } = useSyncIntegration();


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
