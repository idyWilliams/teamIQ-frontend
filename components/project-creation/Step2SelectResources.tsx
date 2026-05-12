'use client';
import { useState, useMemo } from 'react';
import { useIntegrations } from '@/context/IntegrationContext';
import { useProjectCreation } from '@/context/ProjectCreationContext';
import { apps } from '@/components/apps/appCards';
import Image from 'next/image';
import { useGetIntegrationResources } from '@/services/hooks/useIntegrations';


export function Step2SelectResources() {
  const { connections } = useIntegrations();
  const { selectedResources, addResource, removeResource, validationErrors } =
    useProjectCreation();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  // Group connections by provider (e.g., multiple GitHub accounts)
  const groupedConnections = useMemo(() => {
    return connections.reduce(
      (acc, conn) => {
        if (!acc[conn.provider]) acc[conn.provider] = [];
        acc[conn.provider].push(conn);
        return acc;
      },
      {} as Record<string, typeof connections>
    );
  }, [connections]);
  const providers = Object.keys(groupedConnections);
  const hasError = validationErrors.some(e => e.includes('resource'));
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Link Project Resources
        </h2>
        <p className="text-gray-600">
          Connect repositories, boards, and channels to track all project
          activity
        </p>
      </div>
      {/* Error Alert */}
      {hasError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <svg
              className="h-5 w-5 flex-shrink-0 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-red-800">
              {validationErrors.find(e => e.includes('resource'))}
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Provider Selection */}
        <div className="space-y-3 lg:col-span-1">
          <h3 className="text-sm font-semibold text-gray-700">Select Tool</h3>
          <div className="space-y-2">
            {providers.map(provider => {
              const app = apps.find(a => a.id === provider);
              if (!app) return null;
              const connectionCount = groupedConnections[provider].length;
              const resourceCount = selectedResources.filter(
                r => r.provider === provider
              ).length;
              return (
                <button
                  key={provider}
                  onClick={() => setSelectedProvider(provider)}
                  className={`w-full rounded-xl border-2 p-4 text-left transition ${
                    selectedProvider === provider
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
                      {typeof app.logo === 'string' ? (
                        <span className="text-2xl">{app.logo}</span>
                      ) : (
                        <Image
                          src={app.logo}
                          alt={app.name}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {app.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {connectionCount} account
                        {connectionCount > 1 ? 's' : ''}
                      </p>
                    </div>
                    {resourceCount > 0 && (
                      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                        {resourceCount}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        {/* Right Column: Resource Selection */}
        <div className="lg:col-span-2">
          {!selectedProvider ? (
            <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
              <svg
                className="mb-4 h-16 w-16 text-gray-400"
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
              <p className="mb-1 text-lg font-medium text-gray-700">
                Select a tool to get started
              </p>
              <p className="text-sm text-gray-500">
                Choose from your connected integrations on the left
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">
                  {apps.find(a => a.id === selectedProvider)?.name} Resources
                </h3>
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-64 rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* Render a selector for EACH connection of this provider */}
              {groupedConnections[selectedProvider].map(conn => (
                <ConnectionResourceSelector
                  key={conn.id}
                  connection={conn}
                  provider={selectedProvider}
                  selectedResources={selectedResources}
                  onAddResource={addResource}
                  onRemoveResource={removeResource}
                  searchQuery={searchQuery}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Selected Resources Summary */}
      {selectedResources.length > 0 && (
        <div className="border-t pt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">
              Selected Resources ({selectedResources.length})
            </h3>
            <button
              onClick={() =>
                selectedResources.forEach(r =>
                  removeResource(r.connectionId, r.resourceId)
                )
              }
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {selectedResources.map(resource => {
              const app = apps.find(a => a.id === resource.provider);
              return (
                <div
                  key={`${resource.connectionId}-${resource.resourceId}`}
                  className="group flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3 transition hover:bg-green-100"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center">
                      {typeof app?.logo === 'string' ? (
                        <span className="text-lg">{app.logo}</span>
                      ) : app?.logo ? (
                        <Image
                          src={app.logo}
                          alt={app.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {resource.resourceName}
                      </p>
                      <p className="text-xs text-gray-600 capitalize">
                        {resource.resourceType}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="condition"
                    title="Condition"
                    onClick={() =>
                      removeResource(resource.connectionId, resource.resourceId)
                    }
                    className="text-red-600 opacity-0 transition-opacity group-hover:opacity-100 hover:text-red-700"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
function ConnectionResourceSelector({
  connection,
  provider,
  selectedResources,
  onAddResource,
  onRemoveResource,
  searchQuery,
}: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  // Fetch resources for this specific connection
  const { data: resources = [], isLoading: loading, error } = useGetIntegrationResources(
    isExpanded ? connection.id : null,
    provider
  );
  const filteredResources = resources.filter((r: any) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Check how many resources from THIS connection are selected
  const selectedCount = selectedResources.filter(
    (r: any) => r.connectionId === String(connection.id)
  ).length;
  return (
    <div className="overflow-hidden rounded-xl border">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gray-50 p-4 text-left transition hover:bg-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold">
              {connection.providerAccountName || connection.account_id}
            </p>
            <p className="mt-0.5 text-xs text-gray-600">
              {connection.providerAccountEmail || 'Connected account'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {selectedCount > 0 && (
              <span className="rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">
                {selectedCount} selected
              </span>
            )}
            <svg
              className={`h-5 w-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      {isExpanded && (
        <div className="max-h-80 overflow-y-auto border-t bg-white p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <svg
                className="h-6 w-6 animate-spin text-blue-500"
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
            </div>
          ) : error ? (
            <p className="py-4 text-center text-sm text-red-500">
              Error loading resources: {(error as Error).message}
            </p>
          ) : filteredResources.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No resources found
            </p>
          ) : (
            <div className="space-y-2">
              {filteredResources.map((resource: any) => {
                const isSelected = selectedResources.some(
                  (r: any) =>
                    r.connectionId === String(connection.id) &&
                    r.resourceId === resource.id
                );
                return (
                  <label
                    key={resource.id}
                    htmlFor={`resource-${resource.id}`}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3 transition ${
                      isSelected
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      id={`resource-${resource.id}`}
                      type="checkbox"
                      aria-label={`Select ${resource.name}`}
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          onRemoveResource(String(connection.id), resource.id);
                        } else {
                          onAddResource({
                            connectionId: String(connection.id),
                            provider,
                            resourceId: resource.id,
                            resourceName: resource.name,
                            resourceType: resource.type,
                            metadata: resource.metadata,
                          });
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-500"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-medium">{resource.name}</p>

                      {resource.metadata?.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-600">
                          {resource.metadata.description}
                        </p>
                      )}
                    </div>

                    {isSelected && (
                      <svg
                        className="h-5 w-5 flex-shrink-0 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}