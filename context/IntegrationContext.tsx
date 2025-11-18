'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Apps, Connection, IntegrationContextType } from '@/types/integrations';

const IntegrationContext = createContext<IntegrationContextType | undefined>(undefined);

interface IntegrationProviderProps {
  children: React.ReactNode;
  organizationId: string; // Pass from your auth/org context
}

export function IntegrationProvider({ children, organizationId }: IntegrationProviderProps) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);

  // Storage key specific to organization
  const storageKey = `teamiq_integrations_${organizationId}`;

  // Load connections from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && organizationId) {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          // Convert logo strings back to their original form
          setConnections(parsed);
        }
      } catch (error) {
        console.error('Failed to load connections:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [organizationId, storageKey]);

  // Save connections to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && !loading && organizationId) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(connections));
      } catch (error) {
        console.error('Failed to save connections:', error);
      }
    }
  }, [connections, loading, organizationId, storageKey]);

  const addConnection = useCallback((
    app: Apps,
    accountInfo: { name: string; email: string; displayName?: string }
  ): Connection => {
    const newConnection: Connection = {
      id: `conn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      appId: app.id,
      appName: app.name,
      logo: app.logo,
      color: app.color,
      providerAccountName: accountInfo.name,
      providerAccountEmail: accountInfo.email,
      displayName: accountInfo.displayName || `${app.name} - ${accountInfo.name}`,
      isActive: true,
      connectedAt: new Date().toISOString(),
      lastSyncedAt: new Date().toISOString(),
      organizationId,
    };

    setConnections(prev => [...prev, newConnection]);
    return newConnection;
  }, [organizationId]);

  const removeConnection = useCallback((connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  }, []);

  const updateConnection = useCallback((connectionId: string, updates: Partial<Connection>) => {
    setConnections(prev =>
      prev.map(conn =>
        conn.id === connectionId
          ? { ...conn, ...updates }
          : conn
      )
    );
  }, []);

  const getConnectionsByApp = useCallback((appId: string) => {
    return connections.filter(conn => conn.appId === appId && conn.isActive);
  }, [connections]);

  const syncConnection = useCallback(async (connectionId: string) => {
    // Simulate sync delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    updateConnection(connectionId, {
      lastSyncedAt: new Date().toISOString(),
    });
  }, [updateConnection]);

  const isAppConnected = useCallback((appId: string) => {
    return connections.some(conn => conn.appId === appId && conn.isActive);
  }, [connections]);

  const value: IntegrationContextType = {
    connections,
    addConnection,
    removeConnection,
    updateConnection,
    getConnectionsByApp,
    syncConnection,
    isAppConnected,
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
  if (context === undefined) {
    throw new Error('useIntegrations must be used within an IntegrationProvider');
  }
  return context;
}