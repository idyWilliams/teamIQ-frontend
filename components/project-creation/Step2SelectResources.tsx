'use client';

import { useState, useMemo } from 'react';
import { useIntegrations } from '@/context/IntegrationContext';
import { useProjectCreation } from '@/context/ProjectCreationContext';
import { apps } from '@/components/apps/appCards';
import Image from 'next/image';
import { useGetIntegrationResources } from '@/services/hooks/useIntegrations';
import { Button } from '@/components/ui/button';
import { Search, Globe, ChevronRight, Check, Trash2, LayoutGrid, List } from 'lucide-react';

export function Step2SelectResources() {
  const { connections } = useIntegrations();
  const { selectedResources, addResource, removeResource } = useProjectCreation();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const groupedConnections = useMemo(() => {
    return connections.reduce((acc, conn) => {
      if (!acc[conn.provider]) acc[conn.provider] = [];
      acc[conn.provider].push(conn);
      return acc;
    }, {} as Record<string, typeof connections>);
  }, [connections]);

  const providers = Object.keys(groupedConnections);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tool Selector */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">1. Select Integration</h3>
          <div className="grid grid-cols-1 gap-2">
            {providers.map(provider => {
              const app = apps.find(a => a.id === provider);
              if (!app) return null;
              const isSelected = selectedProvider === provider;
              const resourceCount = selectedResources.filter(r => r.provider === provider).length;

              return (
                <button
                  key={provider}
                  onClick={() => setSelectedProvider(provider)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                    isSelected 
                    ? 'border-blue-600 bg-blue-50 shadow-sm' 
                    : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="h-10 w-10 flex items-center justify-center shrink-0">
                    {typeof app.logo === 'string' ? (
                      <span className="text-xl">{app.logo}</span>
                    ) : (
                      <Image src={app.logo} alt={app.name} width={32} height={32} />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-bold text-gray-900">{app.name}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">{groupedConnections[provider].length} accounts connected</p>
                  </div>
                  {resourceCount > 0 && (
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {resourceCount}
                    </span>
                  )}
                  <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Resource Selector */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">2. Link Repos & Channels</h3>
            {selectedProvider && (
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Filter resources..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-gray-50 border rounded-lg py-1 pl-7 pr-3 text-xs outline-none focus:ring-1 focus:ring-blue-500 w-48"
                />
              </div>
            )}
          </div>

          {!selectedProvider ? (
            <div className="h-[400px] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-gray-50/50">
              <Globe className="h-12 w-12 text-gray-300 mb-4" />
              <p className="text-sm font-medium text-gray-600">Select a tool from the left to browse available resources</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {groupedConnections[selectedProvider].map(conn => (
                <CompactConnectionSection
                  key={conn.id}
                  connection={conn}
                  provider={selectedProvider}
                  searchQuery={searchQuery}
                  selectedResources={selectedResources}
                  onAdd={addResource}
                  onRemove={removeResource}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Resources Strip */}
      {selectedResources.length > 0 && (
        <div className="pt-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Stack ({selectedResources.length})</h3>
            <button 
              onClick={() => selectedResources.forEach(r => removeResource(r.connectionId, r.resourceId))}
              className="text-xs text-red-600 hover:underline"
            >
              Remove All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedResources.map(r => (
              <div key={`${r.connectionId}-${r.resourceId}`} className="group flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 text-xs font-medium">
                <span className="truncate max-w-[150px]">{r.resourceName}</span>
                <button 
                  onClick={() => removeResource(r.connectionId, r.resourceId)}
                  className="text-blue-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CompactConnectionSection({
  connection,
  provider,
  searchQuery,
  selectedResources,
  onAdd,
  onRemove,
}: any) {
  const { data: resources = [], isLoading } = useGetIntegrationResources(connection.id, provider);
  
  const filteredResources = resources.filter((r: any) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="px-4 py-2 bg-gray-50 border-b flex items-center justify-between">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
          {connection.providerAccountName || connection.account_id}
        </p>
        {isLoading && <div className="h-3 w-3 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />}
      </div>
      
      <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        {filteredResources.length === 0 && !isLoading ? (
          <p className="col-span-full py-4 text-center text-[10px] text-gray-400">No resources found</p>
        ) : (
          filteredResources.map((res: any) => {
            const isSelected = selectedResources.some(
              (r: any) => r.connectionId === String(connection.id) && r.resourceId === res.id
            );

            return (
              <button
                key={res.id}
                onClick={() => isSelected 
                  ? onRemove(String(connection.id), res.id) 
                  : onAdd({
                      connectionId: String(connection.id),
                      provider,
                      resourceId: res.id,
                      resourceName: res.name,
                      resourceType: res.type,
                      metadata: res.metadata,
                    })
                }
                className={`flex items-center justify-between p-2 rounded-lg border text-left transition-all ${
                  isSelected 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-100 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p className={`text-xs font-semibold truncate ${isSelected ? 'text-blue-700' : 'text-gray-900'}`}>
                    {res.name}
                  </p>
                  <p className="text-[10px] text-gray-500 capitalize">{res.type}</p>
                </div>
                {isSelected && <Check className="h-3 w-3 text-blue-600 shrink-0" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
