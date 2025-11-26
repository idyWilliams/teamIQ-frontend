'use client';
import { useState } from 'react';
import { useProjectCreation } from '@/context/ProjectCreationContext';
import { useOrganizationUsers } from '@/services/hooks/useUsers';
import { useGetExternalAccounts } from '@/services/hooks/useIntegrations';
import Image from 'next/image';
interface OrgMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  role: string;
}
export function Step3TeamMembers() {
  const {
    selectedMembers,
    addMember,
    removeMember,
    updateMemberRole,
    updateMemberMapping,
    getMemberMappingStatus,
    getRequiredProviders,
    validationErrors,
    selectedResources, // ✅ Get selected resources from context
  } = useProjectCreation();
  const { data: users = [], isLoading: loading } = useOrganizationUsers();
  const orgMembers: OrgMember[] = users.map(user => ({
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    profile_image: user.profile_image || undefined,
    role: user.role,
  }));
  const [searchQuery, setSearchQuery] = useState('');
  const [showMappingModal, setShowMappingModal] = useState<string | null>(null);
  const requiredProviders = getRequiredProviders();
  const filteredMembers = orgMembers.filter(
    member =>
      `${member.first_name} ${member.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const isMemberSelected = (memberId: string) =>
    selectedMembers.some(m => m.userId === memberId);
  const handleToggleMember = (member: OrgMember) => {
    if (isMemberSelected(member.id)) {
      removeMember(member.id);
    } else {
      addMember({
        userId: member.id,
        userName: `${member.first_name} ${member.last_name}`,
        userEmail: member.email,
        role: selectedMembers.length === 0 ? 'team_lead' : 'member',
        externalMappings: {},
      });
    }
  };
  // ✅ Helper to get connection ID for a provider
  const getConnectionIdForProvider = (provider: string): number | undefined => {
    // Find the first resource that matches this provider
    const resource = selectedResources?.find(
      r => r.provider?.toLowerCase() === provider.toLowerCase()
    );
    return resource?.connectionId;
  };
  const hasTeamLeadError = validationErrors.some(e => e.includes('team lead'));
  const hasMappingError = validationErrors.some(e => e.includes('mapped'));
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Add Team Members
        </h2>
        <p className="text-gray-600">
          Select team members and map them to their accounts in linked tools
        </p>
      </div>
      {/* Validation Errors */}
      {(hasTeamLeadError || hasMappingError) && (
        <div className="space-y-2">
          {hasTeamLeadError && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <div className="flex gap-3">
                <svg
                  className="h-5 w-5 flex-shrink-0 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <p className="text-sm text-yellow-800">
                  {validationErrors.find(e => e.includes('team lead'))}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Required Providers Info */}
      {requiredProviders.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
          <div className="flex gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="mb-1 font-medium">Account Mapping Required</p>
              <p>
                Team members must be mapped to their accounts in:{' '}
                <span className="font-semibold">
                  {requiredProviders.join(', ')}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Search */}
      <div className="relative">
        <svg
          className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
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
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search members by name or email..."
          className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg
            className="h-8 w-8 animate-spin text-blue-500"
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
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Selected Members */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">
                Team Members ({selectedMembers.length})
              </h3>
              {selectedMembers.length > 0 && (
                <button
                  onClick={() =>
                    selectedMembers.forEach(m => removeMember(m.userId))
                  }
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove All
                </button>
              )}
            </div>
            {selectedMembers.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <svg
                  className="mx-auto mb-3 h-12 w-12 text-gray-400"
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
                <p className="text-sm text-gray-600">
                  No team members selected
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Select members from the right panel
                </p>
              </div>
            ) : (
              <div className="max-h-[600px] space-y-3 overflow-y-auto">
                {selectedMembers.map(member => {
                  const orgMember = orgMembers.find(
                    m => m.id === member.userId
                  );
                  const mappingStatus = getMemberMappingStatus(member.userId);
                  const isTeamLead = member.role === 'team_lead';
                  return (
                    <div
                      key={member.userId}
                      className={`rounded-lg border-2 p-4 transition ${
                        isTeamLead
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {orgMember?.profile_image ? (
                          <Image
                            src={orgMember.profile_image}
                            alt={member.userName}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                            <span className="text-sm font-semibold text-gray-600">
                              {member.userName
                                .split(' ')
                                .map(n => n[0])
                                .join('')}
                            </span>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-semibold">
                                {member.userName}
                              </p>
                              <p className="truncate text-xs text-gray-600">
                                {member.userEmail}
                              </p>
                            </div>
                            <button
                              onClick={() => removeMember(member.userId)}
                              className="ml-2 text-red-600 hover:text-red-700"
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
                          <div className="mb-3 flex items-center gap-2">
                            <select
                              value={member.role}
                              onChange={e =>
                                updateMemberRole(
                                  member.userId,
                                  e.target.value as any
                                )
                              }
                              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${
                                isTeamLead
                                  ? 'border-yellow-400 bg-yellow-100 text-yellow-800'
                                  : 'border-gray-300 bg-white'
                              }`}
                            >
                              <option value="team_lead">👑 Team Lead</option>
                              <option value="admin">Admin</option>
                              <option value="member">Member</option>
                              <option value="viewer">Viewer</option>
                            </select>
                            {requiredProviders.length > 0 && (
                              <button
                                onClick={() =>
                                  setShowMappingModal(member.userId)
                                }
                                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                                  mappingStatus.isMapped
                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                {mappingStatus.isMapped ? (
                                  <>
                                    ✓ Mapped (
                                    {mappingStatus.mappedProviders.length}/
                                    {requiredProviders.length})
                                  </>
                                ) : (
                                  <>
                                    ⚠ Map Accounts (
                                    {mappingStatus.mappedProviders.length}/
                                    {requiredProviders.length})
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                          {!mappingStatus.isMapped &&
                            requiredProviders.length > 0 && (
                              <p className="text-xs text-red-600">
                                Missing:{' '}
                                {mappingStatus.missingProviders.join(', ')}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {/* Available Members */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">
              Available Members ({filteredMembers.length})
            </h3>
            <div className="max-h-[600px] overflow-hidden overflow-y-auto rounded-lg border">
              {filteredMembers.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-sm text-gray-600">No members found</p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredMembers.map(member => {
                    const isSelected = isMemberSelected(member.id);
                    return (
                      <button
                        key={member.id}
                        onClick={() => handleToggleMember(member)}
                        className={`w-full p-4 text-left transition hover:bg-gray-50 ${
                          isSelected ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="h-5 w-5 rounded text-blue-500"
                          />
                          {member.profile_image ? (
                            <Image
                              src={member.profile_image}
                              alt={`${member.first_name} ${member.last_name}`}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                              <span className="text-sm font-semibold text-gray-600">
                                {member.first_name[0]}
                                {member.last_name[0]}
                              </span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {member.first_name} {member.last_name}
                            </p>
                            <p className="truncate text-xs text-gray-600">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* External Account Mapping Modal */}
      {showMappingModal && (
        <ExternalAccountMappingModal
          member={selectedMembers.find(m => m.userId === showMappingModal)!}
          providers={requiredProviders}
          onClose={() => setShowMappingModal(null)}
          onUpdateMapping={updateMemberMapping}
          getConnectionId={getConnectionIdForProvider}
        />
      )}
    </div>
  );
}
function ExternalAccountMappingModal({
  member,
  providers,
  onClose,
  onUpdateMapping,
  getConnectionId,
}: {
  member: any;
  providers: string[];
  onClose: () => void;
  onUpdateMapping: (userId: string, provider: string, externalId: string) => void;
  getConnectionId: (provider: string) => number | undefined;
}) {
  const [mappings, setMappings] = useState(member.externalMappings || {});
  const handleSave = () => {
    Object.entries(mappings).forEach(([provider, externalId]) => {
      if (externalId) {
        onUpdateMapping(member.userId, provider, externalId as string);
      }
    });
    onClose();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Map External Accounts</h3>
              <p className="mt-1 text-sm text-gray-600">
                Link {member.userName} to their tool accounts
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-6 w-6"
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
        </div>
        <div className="max-h-[60vh] space-y-4 overflow-y-auto p-6">
          {providers.map((provider: string) => {
            const connectionId = getConnectionId(provider);
            return (
              <ProviderAccountSelector
                key={provider}
                provider={provider}
                connectionId={connectionId}
                memberEmail={member.userEmail}
                selectedAccountId={mappings[provider] || ''}
                onSelect={(accountId: string) =>
                  setMappings({ ...mappings, [provider]: accountId })
                }
              />
            );
          })}
        </div>
        <div className="flex justify-end gap-3 border-t bg-gray-50 p-6">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-500 px-6 py-2.5 font-medium text-white transition hover:bg-blue-600"
          >
            Save Mappings
          </button>
        </div>
      </div>
    </div>
  );
}
function ProviderAccountSelector({
  provider,
  connectionId,
  memberEmail,
  selectedAccountId,
  onSelect,
}: {
  provider: string;
  connectionId: number | undefined;
  memberEmail: string;
  selectedAccountId: string;
  onSelect: (id: string) => void;
}) {
  // ✅ Use connectionId to fetch users from the correct integration
  const { data: accounts = [], isLoading } = useGetExternalAccounts(connectionId);
  // ✅ Handle missing connection gracefully
  if (!connectionId) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <label className="mb-2 block text-sm font-semibold capitalize text-red-800">
          {provider} Account
        </label>
        <p className="text-sm text-red-600">
          No connection found for {provider}. Please ensure you've linked this tool in Step 2.
        </p>
      </div>
    );
  }
  const hasEmailMatch = accounts.some(
    (acc: any) => acc.email?.toLowerCase() === memberEmail.toLowerCase()
  );
  return (
    <div className="rounded-lg border bg-gray-50 p-4">
      <label className="mb-3 block text-sm font-semibold capitalize text-gray-700">
        {provider} Account
      </label>
      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            className="h-4 w-4 animate-spin"
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
          Loading accounts...
        </div>
      ) : accounts.length === 0 ? (
        <p className="text-sm text-red-600">
          No accounts found for this tool. Please check your integration settings.
        </p>
      ) : (
        <>
          {hasEmailMatch && (
            <p className="mb-2 text-xs text-green-600">
              ✓ Email match found - auto-suggested
            </p>
          )}
          <select
            value={selectedAccountId}
            onChange={e => onSelect(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select account...</option>
            {accounts.map((account: any) => {
              const isEmailMatch =
                account.email?.toLowerCase() === memberEmail.toLowerCase();
              return (
                <option key={account.id} value={account.id}>
                  {account.name || account.username || account.email}
                  {isEmailMatch && ' (Recommended - Email Match)'}
                </option>
              );
            })}
          </select>
        </>
      )}
    </div>
  );
}