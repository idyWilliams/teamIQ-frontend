'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { apps } from '@/components/apps/appCards';
import Image from 'next/image';

export function Step4ReviewCreate() {
  const {
    projectName,
    projectDescription,
    selectedResources,
    selectedMembers,
    teamLead,
    getMemberMappingStatus,
    getRequiredProviders,
    createProject,
    isCreating,
    error,
    validationErrors,
  } = useProjectCreation();

  // Group resources by provider
  const groupedResources = selectedResources.reduce(
    (acc, resource) => {
      if (!acc[resource.provider]) acc[resource.provider] = [];
      acc[resource.provider].push(resource);
      return acc;
    },
    {} as Record<string, typeof selectedResources>
  );

  const requiredProviders = getRequiredProviders();
  const hasErrors = validationErrors.length > 0;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Review & Create Project
        </h2>
        <p className="text-gray-600">
          Review your project configuration. Data sync will begin immediately
          after creation.
        </p>
      </div>

      {/* Validation Errors */}
      {hasErrors && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500"
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
            <div className="flex-1">
              <p className="mb-2 text-sm font-semibold text-red-800">
                Cannot create project - please fix the following:
              </p>
              <ul className="space-y-1">
                {validationErrors.map((error, idx) => (
                  <li key={idx} className="text-sm text-red-700">
                    • {error}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Project Details */}
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <div className="border-b bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-blue-900">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Project Details
          </h3>
        </div>
        <div className="space-y-4 bg-white p-6">
          <div>
            <p className="mb-1 text-xs font-medium text-gray-600">
              Project Name
            </p>
            <p className="text-lg font-semibold text-gray-900">{projectName}</p>
          </div>
          {projectDescription && (
            <div>
              <p className="mb-1 text-xs font-medium text-gray-600">
                Description
              </p>
              <p className="text-sm text-gray-700">{projectDescription}</p>
            </div>
          )}
        </div>
      </div>

      {/* Linked Resources */}
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <div className="border-b bg-gradient-to-r from-green-50 to-green-100 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-green-900">
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Linked Resources ({selectedResources.length})
          </h3>
        </div>
        <div className="bg-white p-6">
          {Object.entries(groupedResources).length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No resources linked
            </p>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedResources).map(([provider, resources]) => {
                const app = apps.find(a => a.id === provider);
                return (
                  <div
                    key={provider}
                    className="rounded-r-lg border-l-4 border-green-500 bg-green-50 p-3 pl-4"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      {typeof app?.logo === 'string' ? (
                        <span className="text-2xl">{app.logo}</span>
                      ) : app?.logo ? (
                        <Image
                          src={app.logo}
                          alt={app.name}
                          width={28}
                          height={28}
                          className="object-contain"
                        />
                      ) : null}
                      <p className="text-sm font-semibold text-gray-900">
                        {app?.name} ({resources.length})
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {resources.map(resource => (
                        <div
                          key={resource.resourceId}
                          className="flex items-center gap-2 rounded-lg border border-green-200 bg-white p-2 text-sm"
                        >
                          <svg
                            className="h-4 w-4 flex-shrink-0 text-green-600"
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
                          <div className="min-w-0 flex-1">
                            <p className="truncate font-medium text-gray-900">
                              {resource.resourceName}
                            </p>
                            <p className="text-xs text-gray-600 capitalize">
                              {resource.resourceType}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Team Members */}
      <div className="overflow-hidden rounded-xl border shadow-sm">
        <div className="border-b bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-purple-900">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Team Members ({selectedMembers.length})
          </h3>
        </div>
        <div className="bg-white p-6">
          {selectedMembers.length === 0 ? (
            <p className="py-4 text-center text-sm text-gray-500">
              No team members added
            </p>
          ) : (
            <div className="space-y-4">
              {/* Team Lead */}
              {teamLead && (
                <div className="rounded-xl border-2 border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100 p-4">
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold text-yellow-800">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    TEAM LEAD
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-200">
                      <span className="font-bold text-yellow-800">
                        {teamLead.userName
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">
                        {teamLead.userName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {teamLead.userEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      {requiredProviders.length > 0 && (
                        <MappingBadge
                          member={teamLead}
                          getMemberMappingStatus={getMemberMappingStatus}
                          requiredProviders={requiredProviders}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Other Members */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {selectedMembers
                  .filter(m => m.role !== 'team_lead')
                  .map(member => (
                    <div
                      key={member.userId}
                      className="flex items-center gap-3 rounded-lg border-2 border-gray-200 bg-gray-50 p-3 transition hover:bg-gray-100"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-300">
                        <span className="text-sm font-semibold text-gray-700">
                          {member.userName
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {member.userName}
                        </p>
                        <p className="text-xs text-gray-600 capitalize">
                          {member.role}
                        </p>
                      </div>
                      {requiredProviders.length > 0 && (
                        <MappingBadge
                          member={member}
                          getMemberMappingStatus={getMemberMappingStatus}
                          requiredProviders={requiredProviders}
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Data Sync Info */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500">
              <svg
                className="h-6 w-6 text-white"
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
            </div>
          </div>
          <div className="flex-1">
            <p className="mb-2 text-sm font-semibold text-blue-900">
              What happens after creation?
            </p>
            <ul className="space-y-1.5 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>Project created instantly with all linked resources</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>
                  Automatic sync of commits, PRs, and code activity from
                  repositories
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>
                  Import of tasks, tickets, and board activities from project
                  management tools
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>Analysis of communication data from linked channels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>
                  Real-time tracking of team contributions and individual
                  progress
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-blue-600">•</span>
                <span>
                  Initial sync completes within minutes (depends on project
                  size)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
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
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">
                Failed to create project
              </p>
              <p className="mt-1 text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Create Button */}
      <button
        onClick={createProject}
        disabled={isCreating || hasErrors}
        className={`w-full rounded-xl py-4 text-lg font-semibold text-white shadow-lg transition-all ${
          isCreating || hasErrors
            ? 'cursor-not-allowed bg-gray-400'
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
        }`}
      >
        {isCreating ? (
          <span className="flex items-center justify-center gap-3">
            <svg
              className="h-6 w-6 animate-spin"
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
            Creating Project & Starting Sync...
          </span>
        ) : (
          '🚀 Create Project & Start Sync'
        )}
      </button>
    </div>
  );
}

function MappingBadge({
  member,
  getMemberMappingStatus,
  requiredProviders,
}: any) {
  const status = getMemberMappingStatus(member.userId);

  if (status.isMapped) {
    return (
      <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
        <svg
          className="h-3 w-3"
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
        Mapped
      </span>
    );
  }

  return (
    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
      ⚠ {status.mappedProviders.length}/{requiredProviders.length}
    </span>
  );
}
