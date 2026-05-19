'use client';

import { useState, useMemo } from 'react';
import { useProjectCreation } from '@/context/ProjectCreationContext';
import { useOrganizationUsers } from '@/services/hooks/useUsers';
import { useGetExternalAccounts } from '@/services/hooks/useIntegrations';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Zap, Trash2, Check, AlertTriangle, ChevronDown } from 'lucide-react';

interface OrgMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  role: string;
}

import axiosInstance from '@/services/axios';
import { integrations } from '@/services/api';

export function Step3TeamMembers() {
  const {
    selectedMembers,
    addMember,
    removeMember,
    updateMemberRole,
    updateMemberMapping,
    smartMapAll,
    getMemberMappingStatus,
    getRequiredProviders,
    selectedResources,
  } = useProjectCreation();

  const { data: users = [], isLoading: loading } = useOrganizationUsers();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSmartMapping, setIsSmartMapping] = useState(false);

  const orgMembers: OrgMember[] = useMemo(() => users.map(user => ({
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    profile_image: user.profile_picture || undefined,
    role: user.role,
  })), [users]);

  const requiredProviders = getRequiredProviders();

  const filteredMembers = orgMembers.filter(
    member =>
      `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddAll = () => {
    filteredMembers.forEach(member => {
      if (!selectedMembers.some(m => m.userId === member.id)) {
        addMember({
          userId: member.id,
          userName: `${member.first_name} ${member.last_name}`,
          userEmail: member.email,
          role: selectedMembers.length === 0 ? 'team_lead' : 'member',
          externalMappings: {},
        });
      }
    });
  };

  const handleSmartMap = async () => {
    setIsSmartMapping(true);
    try {
      const allAccounts: Record<string, any[]> = {};
      
      const uniqueConnections = Array.from(new Set(selectedResources.map(r => JSON.stringify({
        id: r.connectionId,
        provider: r.provider,
        resourceId: r.resourceId,
        resourceName: r.resourceName
      })))).map(s => JSON.parse(s));

      for (const conn of uniqueConnections) {
        const resourceIdentifier = conn.provider === 'slack' ? conn.resourceId : (conn.resourceName || conn.resourceId);
        try {
          const response = await axiosInstance.get(integrations.externalAccounts(Number(conn.id), resourceIdentifier));
          allAccounts[conn.provider] = [...(allAccounts[conn.provider] || []), ...response.data];
        } catch (e) {
          console.error(`Failed to fetch accounts for ${conn.provider}:`, e);
        }
      }

      await smartMapAll(allAccounts); 
    } finally {
      setIsSmartMapping(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search & Bulk Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl border">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search organization members..."
            className="w-full bg-white border rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddAll}
            className="flex-1 sm:flex-none gap-2"
          >
            <UserPlus className="h-4 w-4" />
            Add All
          </Button>
          <Button 
            size="sm" 
            onClick={handleSmartMap}
            disabled={isSmartMapping || selectedMembers.length === 0}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 gap-2"
          >
            <Zap className="h-4 w-4" />
            Smart Map
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Mapping Matrix (Main Table) */}
        <div className="xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-900">Project Team ({selectedMembers.length})</h3>
            {selectedMembers.length > 0 && (
              <button 
                onClick={() => selectedMembers.forEach(m => removeMember(m.userId))}
                className="text-xs text-red-600 hover:underline font-medium"
              >
                Clear Team
              </button>
            )}
          </div>

          <div className="border rounded-xl bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-[250px]">Member</th>
                    <th className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider w-[120px]">Role</th>
                    {requiredProviders.map(p => (
                      <th key={p} className="p-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider capitalize min-w-[150px]">{p} Account</th>
                    ))}
                    <th className="p-4 w-[50px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {selectedMembers.length === 0 ? (
                    <tr>
                      <td colSpan={3 + requiredProviders.length} className="p-12 text-center text-gray-400 text-sm italic">
                        No members added to this project yet.
                      </td>
                    </tr>
                  ) : (
                    selectedMembers.map(member => (
                      <tr key={member.userId} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
                              {member.userName.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-gray-900 truncate">{member.userName}</p>
                              <p className="text-[10px] text-gray-500 truncate">{member.userEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="relative">
                            <select
                              value={member.role}
                              onChange={e => updateMemberRole(member.userId, e.target.value as any)}
                              className="appearance-none w-full bg-white border rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none pr-6 font-medium"
                            >
                              <option value="team_lead">Team Lead</option>
                              <option value="member">Member</option>
                              <option value="admin">Admin</option>
                              <option value="viewer">Viewer</option>
                            </select>
                            <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 pointer-events-none" />
                          </div>
                        </td>
                        {requiredProviders.map(provider => (
                          <td key={provider} className="p-4">
                            <ProviderAccountCell 
                              member={member} 
                              provider={provider} 
                              selectedResources={selectedResources}
                              onSelect={(id) => updateMemberMapping(member.userId, provider, id)}
                            />
                          </td>
                        ))}
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => removeMember(member.userId)}
                            className="p-1 text-gray-300 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Selection Sidebar (Compact) */}
        <div className="xl:col-span-4 space-y-4">
          <h3 className="text-sm font-bold text-gray-900">Available ({filteredMembers.length})</h3>
          <div className="border rounded-xl bg-white max-h-[600px] overflow-y-auto divide-y">
            {filteredMembers.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No members found.</div>
            ) : (
              filteredMembers.map(member => {
                const isSelected = selectedMembers.some(m => m.userId === member.id);
                return (
                  <div 
                    key={member.id} 
                    className={`p-3 flex items-center justify-between hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50/50' : ''}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs shrink-0">
                        {member.first_name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{member.first_name} {member.last_name}</p>
                        <p className="text-[10px] text-gray-500 truncate">{member.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (isSelected) removeMember(member.id);
                        else addMember({
                          userId: member.id,
                          userName: `${member.first_name} ${member.last_name}`,
                          userEmail: member.email,
                          role: selectedMembers.length === 0 ? 'team_lead' : 'member',
                          externalMappings: {},
                        });
                      }}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isSelected 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm' 
                        : 'text-gray-400 hover:border-gray-300'
                      }`}
                    >
                      {isSelected ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProviderAccountCell({ 
  member, 
  provider, 
  selectedResources, 
  onSelect 
}: { 
  member: any, 
  provider: string, 
  selectedResources: any[],
  onSelect: (id: string) => void
}) {
  const resource = selectedResources.find(r => r.provider === provider);
  const connectionId = resource?.connectionId;
  const resourceIdentifier = provider === 'slack' ? resource?.resourceId : (resource?.resourceName || resource?.resourceId);

  const { data: accounts = [], isLoading } = useGetExternalAccounts(
    connectionId ? Number(connectionId) : undefined, 
    resourceIdentifier
  );

  const selectedId = member.externalMappings[provider] || '';
  const isMapped = !!selectedId;

  if (!connectionId) return <div className="text-[10px] text-red-400 font-medium">No connection</div>;

  return (
    <div className="relative group">
      <select
        value={selectedId}
        onChange={e => onSelect(e.target.value)}
        className={`w-full appearance-none bg-white border rounded px-2 py-1 text-[10px] outline-none transition-all pr-6 ${
          isMapped 
          ? 'border-green-200 bg-green-50 text-green-700 font-medium' 
          : 'border-red-100 bg-red-50 text-red-600'
        }`}
      >
        <option value="">Map account...</option>
        {accounts.map((acc: any) => (
          <option key={acc.id} value={acc.id}>
            {acc.name || acc.username || acc.email}
          </option>
        ))}
      </select>
      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
        {isLoading ? (
          <div className="h-2 w-2 border border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        ) : isMapped ? (
          <Check className="h-3 w-3 text-green-500" />
        ) : (
          <AlertTriangle className="h-3 w-3 text-red-400" />
        )}
      </div>
    </div>
  );
}
