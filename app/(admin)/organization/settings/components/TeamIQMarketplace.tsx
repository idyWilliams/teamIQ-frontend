'use client';

import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { AppDetailModal } from '@/components/marketPlace/AppDetailModal';
import { AppCard, apps, categories } from '@/components/apps/appCards';
import { EmptyState } from '@/components/emptyState/empty';
import { useIntegrations } from '@/context/IntegrationContext';
import { Apps } from '@/types/integrations';
import { useAuthStore } from '@/store/useAuthStore';

export default function TeamIQMarketplace() {
  const router = useRouter();
  const { connections, isAppConnected } = useIntegrations();
  const organizationId = useAuthStore(state => state.user?.id);
  const [selectedApp, setSelectedApp] = useState<Apps | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showConnectedOnly, setShowConnectedOnly] = useState<boolean>(false);

  const filteredApps = apps.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || app.category === selectedCategory;
    const matchesConnectedFilter = showConnectedOnly
      ? isAppConnected(app.id)
      : true;

    return matchesSearch && matchesCategory && matchesConnectedFilter;
  });


  const connectedApps = apps.filter(app => isAppConnected(app.id));

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background/80 border-border sticky top-0 z-40 border-b backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-foreground mb-2 text-3xl font-bold">
                App Marketplace
              </h1>
              <p className="text-muted-foreground">
                Connect tools to centralize collaboration and unlock
                productivity insights
              </p>
            </div>
            {connectedApps.length > 0 && (
              <button
                onClick={() =>
                  router.push('/organization/settings?tab=integrated-apps')
                }
                className="bg-iq-500 hover:bg-iq-600 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Manage Integrations
              </button>
            )}
          </div>

          {/* Stats */}
          {connectedApps.length > 0 && (
            <div className="bg-iq-50 border-iq-200 mb-6 rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <svg
                  className="text-iq-500 h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="text-iq-800 font-semibold">
                    {connections.length} Active Connection
                    {connections.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-iq-700 text-sm">
                    Connected to {connectedApps.length} different app
                    {connectedApps.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="relative mb-4">
            <svg
              className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2"
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
              placeholder="Search apps..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-card border-border focus:ring-iq-500 w-full rounded-xl border py-3 pr-4 pl-12 transition-all focus:border-transparent focus:ring-2 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Categories */}
            <div className="hide-scrollbar flex flex-1 gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-iq-500 text-white shadow-md'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Connected filter */}
            {connectedApps.length > 0 && (
              <button
                onClick={() => setShowConnectedOnly(!showConnectedOnly)}
                className={`rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  showConnectedOnly
                    ? 'bg-green-500 text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {showConnectedOnly ? '✓ Connected' : 'Show Connected'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-foreground text-lg font-semibold">
            {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''}{' '}
            available
          </h2>
        </div>

        {filteredApps.length === 0 ? (
          <div className="bg-muted flex flex-col items-center justify-center rounded-xl p-12">
            <svg
              className="text-muted-foreground mb-4 h-16 w-16"
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
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              No apps found
            </h3>
            <p className="text-muted-foreground text-center text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredApps.map(app => (
              <AppCard
                key={app.id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                app={app}
                onConnect={setSelectedApp}
                isConnected={isAppConnected(app.id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          organizationId={organizationId}
        />
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
