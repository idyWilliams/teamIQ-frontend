'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Apps, Connection, IntegrationContextType } from '@/types/integrations';

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
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch connections from backend on mount (or org change)
  const fetchConnections = useCallback(async () => {
    if (!organizationId) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/integrations?org_id=${organizationId}`);
      if (!res.ok) throw new Error('Failed to fetch integrations');
      const parsed = await res.json();
      setConnections(parsed);
    } catch (error) {
      setConnections([]); // fallback to empty if error
      console.error('Failed to fetch connections:', error);
    } finally {
      setLoading(false);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  // CRUD actions - now all via backend
  const removeConnection = useCallback(
    async (connectionId: string) => {
      try {
        await fetch(`/api/v1/integrations/${connectionId}`, {
          method: 'DELETE',
        });
        await fetchConnections();
      } catch (error) {
        console.error('Failed to remove connection:', error);
      }
    },
    [fetchConnections]
  );

  const syncConnection = useCallback(
    async (connectionId: string) => {
      try {
        await fetch(`/api/v1/integrations/${connectionId}/sync`, {
          method: 'POST',
        });
        await fetchConnections();
      } catch (error) {
        console.error('Failed to sync connection:', error);
      }
    },
    [fetchConnections]
  );

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
