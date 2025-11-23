'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { useIntegrations } from '@/context/IntegrationContext';
import { useRouter } from 'next/navigation';

interface ProjectCreationContextType {
  // Step 1: Project Details
  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (desc: string) => void;

  // Step 2: Select Resources
  selectedResources: SelectedResource[];
  addResource: (resource: SelectedResource) => void;
  removeResource: (connectionId: string, resourceId: string) => void;

  // Step 3: Team Members
  selectedMembers: ProjectMemberInput[];
  teamLead: ProjectMemberInput | null;
  setTeamLead: (userId: string) => void;
  addMember: (member: ProjectMemberInput) => void;
  removeMember: (userId: string) => void;
  updateMemberRole: (userId: string, role: ProjectRole) => void;
  updateMemberMapping: (
    userId: string,
    provider: string,
    externalId: string
  ) => void;

  // Validation helpers
  getMemberMappingStatus: (userId: string) => MappingStatus;
  getRequiredProviders: () => string[];
  canMemberBeTracked: (userId: string) => boolean;

  // Step management
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
  validationErrors: string[];

  // Project creation
  createProject: () => Promise<void>;
  isCreating: boolean;
  error: string | null;

  // Reset
  reset: () => void;
}

type ProjectRole = 'team_lead' | 'admin' | 'member' | 'viewer';

interface SelectedResource {
  connectionId: string;
  provider: string;
  resourceId: string;
  resourceName: string;
  resourceType: string;
  metadata?: Record<string, any>;
}

interface ProjectMemberInput {
  userId: string;
  userName: string;
  userEmail: string;
  role: ProjectRole;
  externalMappings: Record<string, string>;
}

interface MappingStatus {
  isMapped: boolean;
  missingProviders: string[];
  mappedProviders: string[];
}

const ProjectCreationContext = createContext<
  ProjectCreationContextType | undefined
>(undefined);

export function ProjectCreationProvider({
  children,
  organizationId,
}: {
  children: React.ReactNode;
  organizationId: string;
}) {
  const router = useRouter();
  const { connections } = useIntegrations();

  // Step 1
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // Step 2
  const [selectedResources, setSelectedResources] = useState<
    SelectedResource[]
  >([]);

  // Step 3
  const [selectedMembers, setSelectedMembers] = useState<ProjectMemberInput[]>(
    []
  );

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get providers from selected resources
  const requiredProviders = useMemo(() => {
    return Array.from(new Set(selectedResources.map(r => r.provider)));
  }, [selectedResources]);

  // Team Lead
  const teamLead = useMemo(() => {
    return selectedMembers.find(m => m.role === 'team_lead') || null;
  }, [selectedMembers]);

  // Resource management
  const addResource = useCallback((resource: SelectedResource) => {
    setSelectedResources(prev => {
      const exists = prev.some(
        r =>
          r.connectionId === resource.connectionId &&
          r.resourceId === resource.resourceId
      );
      if (exists) return prev;
      return [...prev, resource];
    });
  }, []);

  const removeResource = useCallback(
    (connectionId: string, resourceId: string) => {
      setSelectedResources(prev =>
        prev.filter(
          r => !(r.connectionId === connectionId && r.resourceId === resourceId)
        )
      );
    },
    []
  );

  // Member management
  const addMember = useCallback((member: ProjectMemberInput) => {
    setSelectedMembers(prev => {
      const exists = prev.some(m => m.userId === member.userId);
      if (exists) return prev;
      return [...prev, member];
    });
  }, []);

  const removeMember = useCallback((userId: string) => {
    setSelectedMembers(prev => prev.filter(m => m.userId !== userId));
  }, []);

  const setTeamLead = useCallback((userId: string) => {
    setSelectedMembers(prev =>
      prev.map(member => ({
        ...member,
        role:
          member.userId === userId
            ? 'team_lead'
            : member.role === 'team_lead'
              ? 'member'
              : member.role,
      }))
    );
  }, []);

  const updateMemberRole = useCallback((userId: string, role: ProjectRole) => {
    setSelectedMembers(prev => {
      if (role === 'team_lead') {
        return prev.map(member => ({
          ...member,
          role:
            member.userId === userId
              ? 'team_lead'
              : member.role === 'team_lead'
                ? 'member'
                : member.role,
        }));
      }
      return prev.map(member =>
        member.userId === userId ? { ...member, role } : member
      );
    });
  }, []);

  const updateMemberMapping = useCallback(
    (userId: string, provider: string, externalId: string) => {
      setSelectedMembers(prev =>
        prev.map(member => {
          if (member.userId === userId) {
            return {
              ...member,
              externalMappings: {
                ...member.externalMappings,
                [provider]: externalId,
              },
            };
          }
          return member;
        })
      );
    },
    []
  );

  // Validation helpers
  const getMemberMappingStatus = useCallback(
    (userId: string): MappingStatus => {
      const member = selectedMembers.find(m => m.userId === userId);
      if (!member) {
        return {
          isMapped: false,
          missingProviders: requiredProviders,
          mappedProviders: [],
        };
      }

      const mappedProviders = Object.keys(member.externalMappings).filter(
        provider =>
          requiredProviders.includes(provider) &&
          member.externalMappings[provider]
      );
      const missingProviders = requiredProviders.filter(
        provider => !member.externalMappings[provider]
      );

      return {
        isMapped: missingProviders.length === 0 && requiredProviders.length > 0,
        missingProviders,
        mappedProviders,
      };
    },
    [selectedMembers, requiredProviders]
  );

  const getRequiredProviders = useCallback(
    () => requiredProviders,
    [requiredProviders]
  );

  const canMemberBeTracked = useCallback(
    (userId: string): boolean => {
      const status = getMemberMappingStatus(userId);
      return status.isMapped;
    },
    [getMemberMappingStatus]
  );

  // Step-specific validation
  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    // Step 1: Project Details
    if (currentStep === 1) {
      if (projectName.trim().length < 3) {
        errors.push('Project name must be at least 3 characters');
      }
    }

    // Step 2: Link Resources
    if (currentStep === 2) {
      if (selectedResources.length === 0) {
        errors.push('At least one resource must be linked');
      }
    }

    // Step 3: Add Team Members
    if (currentStep === 3) {
      if (selectedMembers.length === 0) {
        errors.push('At least one team member must be added');
      }
      if (!teamLead && selectedMembers.length > 0) {
        errors.push('A team lead must be assigned');
      }
    }

    // Step 4: Review & Create - Final validation before creation
    if (currentStep === 4) {
      // Re-check all previous validations
      if (projectName.trim().length < 3) {
        errors.push('Project name is invalid');
      }
      if (selectedResources.length === 0) {
        errors.push('No resources linked');
      }
      if (selectedMembers.length === 0) {
        errors.push('No team members added');
      }
      if (!teamLead) {
        errors.push('No team lead assigned');
      }

      // Critical: Check if all members have proper mappings
      const unmappedMembers = selectedMembers.filter(member => {
        const status = getMemberMappingStatus(member.userId);
        return !status.isMapped && requiredProviders.length > 0;
      });

      if (unmappedMembers.length > 0) {
        errors.push(
          `${unmappedMembers.length} member${unmappedMembers.length > 1 ? 's' : ''} not mapped to external accounts. ` +
            `All members must be mapped to track their contributions.`
        );
      }
    }

    return errors;
  }, [
    currentStep,
    projectName,
    selectedResources,
    selectedMembers,
    teamLead,
    getMemberMappingStatus,
    requiredProviders,
  ]);

  const canProceed = useMemo(() => {
    return validationErrors.length === 0;
  }, [validationErrors]);

  // Step navigation
  const nextStep = useCallback(() => {
    if (canProceed && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  }, [canProceed, currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 4) setCurrentStep(step);
  }, []);

  // Project creation (only called from Step 4)
  const createProject = useCallback(async () => {
    // Final validation
    if (!teamLead) {
      setError('A team lead must be assigned');
      return;
    }

    // Ensure all members can be tracked
    const untrackableMembers = selectedMembers.filter(
      m => !canMemberBeTracked(m.userId)
    );
    if (untrackableMembers.length > 0) {
      setError(
        `Cannot create project: ${untrackableMembers.length} member(s) are not mapped to external accounts. ` +
          `All team members must be mapped to track contributions.`
      );
      return;
    }

    setIsCreating(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/projects/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization_id: organizationId,
          name: projectName,
          description: projectDescription,
          resources: selectedResources,
          members: selectedMembers,
          team_lead_id: teamLead.userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to create project');
      }

      const project = await response.json();

      // Success - redirect to project page
      router.push(`/organization/projects/${project.id}`);
      reset();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setIsCreating(false);
    }
  }, [
    organizationId,
    projectName,
    projectDescription,
    selectedResources,
    selectedMembers,
    teamLead,
    canMemberBeTracked,
    router,
  ]);

  const reset = useCallback(() => {
    setProjectName('');
    setProjectDescription('');
    setSelectedResources([]);
    setSelectedMembers([]);
    setCurrentStep(1);
    setError(null);
  }, []);

  const value: ProjectCreationContextType = {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    selectedResources,
    addResource,
    removeResource,
    selectedMembers,
    teamLead,
    setTeamLead,
    addMember,
    removeMember,
    updateMemberRole,
    updateMemberMapping,
    getMemberMappingStatus,
    getRequiredProviders,
    canMemberBeTracked,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    canProceed,
    validationErrors,
    createProject,
    isCreating,
    error,
    reset,
  };

  return (
    <ProjectCreationContext.Provider value={value}>
      {children}
    </ProjectCreationContext.Provider>
  );
}

export function useProjectCreation() {
  const context = useContext(ProjectCreationContext);
  if (!context)
    throw new Error(
      'useProjectCreation must be used within ProjectCreationProvider'
    );
  return context;
}
