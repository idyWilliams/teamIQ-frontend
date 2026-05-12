// store/useProjectCreationStore.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type ProjectRole = 'team_lead' | 'admin' | 'member' | 'viewer';

export interface SelectedResource {
  connectionId: string;
  provider: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  metadata?: Record<string, any>;
}

export interface ProjectMemberInput {
  userId: string;
  userName: string;
  userEmail: string;
  role: ProjectRole;
  externalMappings: Record<string, string>;
}

interface ProjectCreationState {
  // Step 1
  projectName: string;
  projectDescription: string;

  // Step 2
  selectedResources: SelectedResource[];

  // Step 3
  selectedMembers: ProjectMemberInput[];

  // UI state
  currentStep: number;
  isCreating: boolean;
  error: string | null;

  // Actions
  setProjectName: (name: string) => void;
  setProjectDescription: (desc: string) => void;

  addResource: (resource: SelectedResource) => void;
  removeResource: (connectionId: string, resourceId: string) => void;

  addMember: (member: ProjectMemberInput) => void;
  removeMember: (userId: string) => void;
  setTeamLead: (userId: string) => void;
  updateMemberRole: (userId: string, role: ProjectRole) => void;
  updateMemberMapping: (
    userId: string,
    provider: string,
    externalId: string
  ) => void;

  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setIsCreating: (value: boolean) => void;
  setError: (value: string | null) => void;

  reset: () => void;
}

const initialState = {
  projectName: '',
  projectDescription: '',
  selectedResources: [],
  selectedMembers: [],
  currentStep: 1,
  isCreating: false,
  error: null,
};

export const useProjectCreationStore = create<ProjectCreationState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setProjectName: name => set({ projectName: name }),

      setProjectDescription: desc => set({ projectDescription: desc }),

      addResource: resource =>
        set(state => {
          const exists = state.selectedResources.some(
            r =>
              r.connectionId === resource.connectionId &&
              r.resourceId === resource.resourceId
          );

          if (exists) return state;

          return {
            selectedResources: [...state.selectedResources, resource],
          };
        }),

      removeResource: (connectionId, resourceId) =>
        set(state => ({
          selectedResources: state.selectedResources.filter(
            r =>
              !(
                r.connectionId === connectionId &&
                r.resourceId === resourceId
              )
          ),
        })),

      addMember: member =>
        set(state => {
          const exists = state.selectedMembers.some(
            m => m.userId === member.userId
          );

          if (exists) return state;

          return {
            selectedMembers: [...state.selectedMembers, member],
          };
        }),

      removeMember: userId =>
        set(state => ({
          selectedMembers: state.selectedMembers.filter(
            m => m.userId !== userId
          ),
        })),

      setTeamLead: userId =>
        set(state => ({
          selectedMembers: state.selectedMembers.map(member => ({
            ...member,
            role:
              member.userId === userId
                ? 'team_lead'
                : member.role === 'team_lead'
                  ? 'member'
                  : member.role,
          })),
        })),

      updateMemberRole: (userId, role) =>
        set(state => ({
          selectedMembers: state.selectedMembers.map(member => {
            if (role === 'team_lead') {
              return {
                ...member,
                role:
                  member.userId === userId
                    ? 'team_lead'
                    : member.role === 'team_lead'
                      ? 'member'
                      : member.role,
              };
            }

            return member.userId === userId ? { ...member, role } : member;
          }),
        })),

      updateMemberMapping: (userId, provider, externalId) =>
        set(state => ({
          selectedMembers: state.selectedMembers.map(member =>
            member.userId === userId
              ? {
                  ...member,
                  externalMappings: {
                    ...member.externalMappings,
                    [provider]: externalId,
                  },
                }
              : member
          ),
        })),

      setCurrentStep: step => set({ currentStep: step }),

      nextStep: () =>
        set(state => ({
          currentStep: Math.min(state.currentStep + 1, 4),
        })),

      prevStep: () =>
        set(state => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      setIsCreating: value => set({ isCreating: value }),

      setError: value => set({ error: value }),

      reset: () => set(initialState),
    }),
    {
      name: 'project-creation-storage',
      storage: createJSONStorage(() => localStorage),

      partialize: state => ({
        projectName: state.projectName,
        projectDescription: state.projectDescription,
        selectedResources: state.selectedResources,
        selectedMembers: state.selectedMembers,
        currentStep: state.currentStep,
      }),
    }
  )
);