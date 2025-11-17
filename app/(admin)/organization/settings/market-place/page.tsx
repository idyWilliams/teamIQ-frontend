'use client';
import { useState } from 'react';
import Image from 'next/image';
import { AppDetailModal } from '@/components/marketPlace/AppDetailModal';
import { AppCard, apps, categories } from '@/components/apps/appCards';
import { EmptyState } from '@/components/emptyState/empty';

export default function TeamIQMarketplace() {
  const [installedApps, setInstalledApps] = useState([]);
  const [showMarketplace, setShowMarketplace] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredApps = apps.filter(app => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || app.category === selectedCategory;
    const notInstalled = !installedApps.find(
      installed => installed.id === app.id
    );
    return matchesSearch && matchesCategory && notInstalled;
  });

  const handleInstall = app => {
    setInstalledApps([...installedApps, app]);
    setShowMarketplace(false);
  };

  if (!showMarketplace && installedApps.length === 0) {
    return (
      <div className="bg-background min-h-screen p-6">
        <div className="mx-auto max-w-5xl">
          <EmptyState onBrowseApps={() => setShowMarketplace(true)} />
        </div>
      </div>
    );
  }

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
            {installedApps.length > 0 && (
              <button
                onClick={() => setShowMarketplace(!showMarketplace)}
                className="text-muted-foreground hover:text-foreground px-4 py-2 text-sm font-medium transition-colors"
              >
                {showMarketplace ? 'View Installed Apps' : 'Browse Marketplace'}
              </button>
            )}
          </div>

          {showMarketplace && (
            <>
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

              {/* Categories */}
              <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
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
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {showMarketplace ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-lg font-semibold">
                {filteredApps.length} apps available
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredApps.map(app => (
                <AppCard key={app.id} app={app} onConnect={setSelectedApp} />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-foreground text-lg font-semibold">
                Connected Apps ({installedApps.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {installedApps.map(app => (
                <div
                  key={app.id}
                  className="bg-card border-border rounded-2xl border p-6"
                >
                  <div
                    className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${app.color} mb-4 flex items-center justify-center shadow-lg`}
                  >
                    {typeof app.logo === 'string' ? (
                      <Image
                        src={app.logo}
                        alt={app.name}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <Image
                        src={app.logo}
                        alt={app.name}
                        className="h-10 w-10 object-contain"
                      />
                    )}
                  </div>

                  <h3 className="text-foreground mb-1 text-lg font-semibold">
                    {app.name}
                  </h3>
                  <p className="text-iq-500 mb-4 text-xs">Connected</p>
                  <button className="bg-muted text-foreground hover:bg-muted/80 w-full rounded-xl px-4 py-2.5 font-medium transition-colors">
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedApp && (
        <AppDetailModal
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
          onInstall={handleInstall}
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes bounce-subtle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(0.8);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
