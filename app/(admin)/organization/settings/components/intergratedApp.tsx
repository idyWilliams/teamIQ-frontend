'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { EmptyState } from '@/components/emptyState/empty';
import { apps } from '@/components/apps/appCards';
import { Connection } from '@/types/integrations';
import { useIntegrations } from '@/context/IntegrationContext';
import { ConnectionCard } from '@/components/integrations/ConnectionCard';

export default function SettingIntegratedApp() {
  const router = useRouter();
  const { connections, loading } = useIntegrations();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterApp, setFilterApp] = useState<string>('All');

  // Use 'provider' for grouping (backend uses .provider as app id)
  const groupedConnections = useMemo(
    () =>
      connections.reduce(
        (acc, conn) => {
          if (!acc[conn.provider]) acc[conn.provider] = [];
          acc[conn.provider].push(conn);
          return acc;
        },
        {} as Record<string, Connection[]>
      ),
    [connections]
  );

  // Unique apps that actually have connections
  const connectedApps = Object.keys(groupedConnections)
    .map(provider => apps.find(app => app.id === provider))
    .filter(Boolean);

  // Filter logic: search and app filter
  const filteredConnections = useMemo(
    () =>
      connections.filter(conn => {
        const matchesSearch =
          (conn.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
          (conn.providerAccountName || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (conn.appName || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
          filterApp === 'All' || conn.provider === filterApp;
        return matchesSearch && matchesFilter;
      }),
    [connections, searchQuery, filterApp]
  );

  const handleAddApps = () => {
    router.push('/organization/settings/market-place');
  };

  console.log(filteredConnections, "filteredConnections")

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
          <button
            onClick={handleAddApps}
            className="bg-iq-500 hover:bg-iq-600 flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Browse Apps
          </button>
        </div>
      </div>

      <hr className="my-6" />

      {connections.length === 0 ? (
        <EmptyState onAddApps={handleAddApps} />
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
                  {connectedApps.length}
                </p>
                <p className="text-iq-700 text-sm font-medium">
                  Integrated App{connectedApps.length !== 1 ? 's' : ''}
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

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <svg
                className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search connections..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="border-border focus:ring-iq-500 w-full rounded-lg border py-2 pr-4 pl-10 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none"
              />
            </div>

            {/* App Filter */}
            <select
              value={filterApp}
              onChange={e => setFilterApp(e.target.value)}
              className="border-border focus:ring-iq-500 rounded-lg border px-4 py-2 text-sm transition-all focus:border-transparent focus:ring-2 focus:outline-none"
            >
              <option value="All">All Apps ({connections.length})</option>
              {connectedApps.map(app => {
                if (!app) return null;
                const count = groupedConnections[app.id]?.length || 0;
                return (
                  <option key={app.id} value={app.id}>
                    {app.name} ({count})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Connections Grid */}
          {filteredConnections.length === 0 ? (
            <div className="bg-muted flex flex-col items-center justify-center rounded-xl p-12">
              <svg
                className="text-muted-foreground mb-4 h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-muted-foreground text-center">
                No connections found matching your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
              {filteredConnections.map((connection: Connection) => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
