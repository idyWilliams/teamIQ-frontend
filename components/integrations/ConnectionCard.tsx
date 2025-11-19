'use client';

import app from '@/app/(admin)/organization/app/components/org-app-lists';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { apps } from '../apps/appCards';
import { useIntegrations } from '@/context/IntegrationContext';

// Mock data for demonstration
const mockConnection = {
  id: 'conn-1',
  appName: 'Jira',
  logo: '🟦',
  displayName: 'Product Development Board',
  providerAccountName: 'Acme Corp Workspace',
  providerAccountEmail: 'team@acme.com',
  isActive: true,
  lastSyncedAt: new Date(Date.now() - 3600000).toISOString(),
  color: 'from-blue-500 to-blue-600',
};

interface Connection {
  id: string;
  appName: string;
  logo: string | StaticImageData;
  displayName: string;
  providerAccountName: string;
  providerAccountEmail: string;
  isActive: boolean;
  lastSyncedAt: string;
  color?: string;
}

interface ConnectionCardProps {
  connection: Connection;
}

export function ConnectionCard({ connection }: ConnectionCardProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(connection.displayName);
  const { connections, loading, removeConnection } = useIntegrations();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const renderLogo = (logo: string | StaticImageData, name: string) => {
    if (typeof logo === 'string') {
      return <span className="text-2xl">{logo}</span>;
    }

    return (
      <Image
        src={logo}
        alt={name}
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
    );
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Syncing connection:', connection.id);
    } catch (error) {
      console.error('Sync failed:', error);
    } finally {
      setIsSyncing(false);
      setShowMenu(false);
    }
  };

  const handleDisconnect = () => {
    if (
      confirm(`Are you sure you want to disconnect ${connection.displayName}?`)
    ) {
      removeConnection(connection.id);
      console.log('Disconnecting:', connection.id);
      setShowMenu(false);
    }
  };

  const handleSaveName = () => {
    if (displayName.trim()) {
      console.log('Updating connection name:', displayName.trim());
      setIsEditing(false);
      setShowMenu(false);
    }
  };
  console.log('Selected Provider:', selectedProvider);
  console.log('connection:', connection);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-card border-border group hover:border-iq-300 relative rounded-2xl border p-6 transition-all hover:shadow-xl">
      {/* Menu Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg p-2 transition-colors"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowMenu(false)}
            />
            <div className="bg-card border-border animate-in fade-in slide-in-from-top-2 absolute top-10 right-0 z-20 w-52 overflow-hidden rounded-xl border shadow-2xl duration-200">
              <button
                onClick={() => {
                  setIsEditing(true);
                  setShowMenu(false);
                }}
                className="text-foreground hover:bg-muted flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors"
              >
                <svg
                  className="text-iq-500 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Rename Connection
              </button>
              <button
                onClick={handleSync}
                disabled={isSyncing}
                className="text-foreground hover:bg-muted flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors disabled:opacity-50"
              >
                <svg
                  className={`text-iq-500 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
              <div className="bg-border my-1 h-px" />
              <button
                onClick={handleDisconnect}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Disconnect
              </button>
            </div>
          </>
        )}
      </div>

      {/* Logo */}
      <div
        className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg`}
      >
        {renderLogo(connection?.logo, connection.appName)}
        {/* <span className="font-medium">{connection.appName}</span> */}
      </div>

      {/* Name */}
      {isEditing ? (
        <div className="mb-3 space-y-2">
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSaveName()}
            className="border-border focus:ring-iq-500 w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
            placeholder="Enter connection name"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveName}
              className="bg-iq-500 hover:bg-iq-600 flex-1 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setDisplayName(connection.displayName);
                setIsEditing(false);
              }}
              className="text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg px-4 py-2 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <h3 className="text-foreground mb-2 text-xl font-semibold">
          {connection.displayName}
        </h3>
      )}

      {/* App Badge */}
      <div className="bg-muted mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1">
        <span className="text-foreground text-xs font-medium">
          {connection.appName}
        </span>
      </div>

      {/* Account Info */}
      <div className="mb-4 space-y-1">
        <p className="text-foreground text-sm font-medium">
          {connection.providerAccountName}
        </p>
        <p className="text-muted-foreground text-xs">
          {connection.providerAccountEmail}
        </p>
      </div>

      {/* Footer */}
      <div className="border-border flex items-center justify-between border-t pt-4">
        {/* Status */}
        <div className="flex items-center gap-2">
          <div
            className={`h-2.5 w-2.5 rounded-full ${connection.isActive ? 'animate-pulse bg-green-500' : 'bg-red-500'}`}
          />
          <span
            className={`text-xs font-medium ${connection.isActive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
          >
            {connection.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>

        {/* Last Synced */}
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formatDate(connection.lastSyncedAt)}</span>
        </div>
      </div>
    </div>
  );
}

// Demo Component
export default function ConnectionCardsDemo() {
  const connections: Connection[] = [
    {
      ...mockConnection,
      id: 'conn-1',
      appName: 'Jira',
      logo: '🟦',
      color: 'from-blue-500 to-blue-600',
      displayName: 'Product Development',
      lastSyncedAt: new Date(Date.now() - 1800000).toISOString(),
    },
    {
      ...mockConnection,
      id: 'conn-2',
      appName: 'GitHub',
      logo: '⚫',
      color: 'from-gray-700 to-gray-900',
      displayName: 'Main Repository',
      providerAccountName: 'acme-org',
      lastSyncedAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      ...mockConnection,
      id: 'conn-3',
      appName: 'Slack',
      logo: '💬',
      color: 'from-purple-500 to-pink-600',
      displayName: 'Team Workspace',
      lastSyncedAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
      ...mockConnection,
      id: 'conn-4',
      appName: 'Figma',
      logo: '🎨',
      color: 'from-red-500 to-purple-600',
      displayName: 'Design System',
      isActive: false,
      lastSyncedAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ];

  return (
    <div className="bg-background min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-foreground mb-2 text-3xl font-bold">
            My Connections
          </h1>
          <p className="text-muted-foreground">
            Manage your connected apps and sync data
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {connections.map(connection => (
            <ConnectionCard key={connection.id} connection={connection} />
          ))}
        </div>
      </div>
    </div>
  );
}
