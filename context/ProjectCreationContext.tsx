'use client';

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/services/axios';
import { projects } from '@/services/api';

interface ProjectCreationContextType {
  projectId?: number;

  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (desc: string) => void;

  selectedResources: SelectedResource[];
  addResource: (resource: SelectedResource) => void;
  removeResource: (connectionId: string, resourceId: string) => void;

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

  getMemberMappingStatus: (userId: string) => MappingStatus;
  getRequiredProviders: () => string[];
  canMemberBeTracked: (userId: string) => boolean;

  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  canProceed: boolean;
  validationErrors: string[];

  createProject: () => Promise<void>;
  isCreating: boolean;
  error: string | null;

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
  projectId,
}: {
  children: React.ReactNode;
  organizationId: string;
  projectId?: number;
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

  const teamLead = useMemo(() => {
    return selectedMembers.find(m => m.role === 'team_lead') || null;
  }, [selectedMembers]);

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

  const getRequiredProviders = useCallback(() => requiredProviders, [
    requiredProviders,
  ]);

  const canMemberBeTracked = useCallback(
    (userId: string) => getMemberMappingStatus(userId).isMapped,
    [getMemberMappingStatus]
  );

  const validationErrors = useMemo(() => {
    const errors: string[] = [];

    if (currentStep === 1 && projectName.trim().length < 3) {
      errors.push('Project name must be at least 3 characters');
    }

    if (currentStep === 2 && selectedResources.length === 0) {
      errors.push('At least one resource must be linked');
    }

    if (currentStep === 3) {
      if (selectedMembers.length === 0) {
        errors.push('At least one team member must be added');
      }
      if (!teamLead && selectedMembers.length > 0) {
        errors.push('A team lead must be assigned');
      }
    }

    if (currentStep === 4) {
      if (projectName.trim().length < 3) errors.push('Project name is invalid');
      if (selectedResources.length === 0) errors.push('No resources linked');
      if (selectedMembers.length === 0) errors.push('No team members added');
      if (!teamLead) errors.push('No team lead assigned');

      const unmappedMembers = selectedMembers.filter(member => {
        const status = getMemberMappingStatus(member.userId);
        return !status.isMapped && requiredProviders.length > 0;
      });

      if (unmappedMembers.length > 0) {
        errors.push(
          `${unmappedMembers.length} member(s) not mapped to external accounts.`
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

  const canProceed = validationErrors.length === 0;

  const nextStep = useCallback(() => {
    if (canProceed && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  }, [canProceed, currentStep, setCurrentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, setCurrentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= 4) {
        setCurrentStep(step);
      }
    },
    [setCurrentStep]
  );

  const createProject = useCallback(async () => {
    if (!teamLead) {
      setError('A team lead must be assigned');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const { data: project } = await axiosInstance.post(projects.create, {
        organization_id: organizationId,
        name: projectName,
        description: projectDescription,
        resources: selectedResources,
        members: selectedMembers,
        team_lead_id: teamLead.userId,
      });

      queryClient.invalidateQueries({ queryKey: ['created-projects'] });

      // Success - redirect to project page
      router.push(`/organization/projects/${project.id}`);
      reset();
    } catch (err: any) {
      setError(
        err.response?.data?.detail ||
          err.response?.data?.message ||
          err.message ||
          'Failed to create project'
      );
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
    router,
    reset,
    setError,
    setIsCreating,
  ]);

  const value: ProjectCreationContextType = {
    projectId,
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

  if (!context) {
    throw new Error(
      'useProjectCreation must be used within ProjectCreationProvider'
    );
  }

  return context;
}