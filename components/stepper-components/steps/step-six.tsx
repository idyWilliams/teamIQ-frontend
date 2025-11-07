// components/stepper/step-six.tsx
'use client';
import React from 'react';
import RightArrow from '../../icons/RightArrow';
import { Button } from '../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DownArrow from '@/components/icons/DownArrow';
import ConnectionTool from '../stepper-forms/connection-tool';
import UserPermission from '../stepper-forms/user-permission';
import NewProjectDetails from '../stepper-forms/project-details';
import ProjectMgmtSetup from '../stepper-forms/project-mgmt-setup';
import VersionControlSetup from '../stepper-forms/version-control-setup';
import { useProjectStore } from '@/store/useProjectstore';
import { useCreateCompleteProject } from '@/services/hooks/useProject';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

interface StepSixProps {
  onSubmit: () => void;
}

const StepSix = ({ onSubmit }: StepSixProps) => {
  const { getProjectData, getFinalProjectData, clearStore } = useProjectStore();
  const projectData = getProjectData();

  const createCompleteProject = useCreateCompleteProject();

  const handleCreateProject = () => {
    const finalData = getFinalProjectData();
    console.log('📤 Final data to be submitted:', finalData);

    createCompleteProject.mutate(finalData, {
      onSuccess: () => {
        clearStore();
        toast.success('Project created successfully!');
        onSubmit();
      },
      onError: (error: any) => {
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to create project';
        toast.error(errorMessage);
      },
    });
  };

  // In your StepSix component - update the getStep1DefaultValues function
  const getStep1DefaultValues = () => {
    if (!projectData.step1) return undefined;
    return {
      projectName: projectData.step1.name,
      description: projectData.step1.description,
      stack: projectData.step1.stacks,
      startDate: new Date(projectData.step1.start_date),
      endDate: new Date(projectData.step1.end_date),
      visibility: projectData.step1.is_visible,
      projectLead: 'Intern',
      projectLeadId: 1,
    };
  };

  // In your StepSix component
  const getStep2DefaultValues = () => {
    if (!projectData.step2) return undefined;
    return {
      app: projectData.step2.pm_tool,
      integrationMethod:
        projectData.step2.pm_integration_method === 'oauth2' ? 'OAuth' : 'Api',
      existingLink: projectData.step2.pm_project_id,
      token: projectData.step2.pm_api_key || projectData.step2.pm_access_token,
    };
  };

  const getStep3DefaultValues = () => {
    if (!projectData.step3) return undefined;
    return {
      app: projectData.step3.vc_tool,
      integrationMethod:
        projectData.step3.vc_integration_method === 'oauth2' ? 'OAuth' : 'Api',
      assignMapping: projectData.step3.vc_repository_url,
      token: projectData.step3.vc_api_key || projectData.step3.vc_access_token,
      permissions: 'read', // Default value
    };
  };

  const getStep4DefaultValues = () => {
    if (!projectData.step4) return undefined;
    return {
      app: projectData.step4.comm_tool,
      integrationMethod:
        projectData.step4.comm_integration_method === 'oauth2'
          ? 'oauth'
          : projectData.step4.comm_integration_method === 'api_key'
            ? 'api-key'
            : 'webhook',
      channelId: projectData.step4.comm_channel_id,
      accessToken: projectData.step4.comm_api_key,
      webhookUrl: projectData.step4.comm_webhook_url,
      postPmtUpdates:
        projectData.step4.comm_notifications?.pmt_updates || false,
      postTaskUpdates: false, // Default
      postDeadlineReminders: false, // Default
      codeEvents: projectData.step4.comm_notifications?.code_events || false,
      sentimentMonitoring:
        projectData.step4.comm_notifications?.sentiment_monitoring || false,
      customCommands:
        projectData.step4.comm_notifications?.custom_commands || false,
    };
  };

  // In your StepSix component
  const getStep5DefaultValues = () => {
    if (!projectData.step5) return undefined;

    // Transform members data for the UserPermission component
    const selectedMembers: number[] = [];
    let projectLead: number | null = null;

    projectData.step5.members.forEach(member => {
      if (member.role === 'lead') {
        projectLead = member.user_id;
      } else {
        selectedMembers.push(member.user_id);
      }
    });

    return {
      selectedMembers,
      projectLead,
    };
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Summary</h2>
        <p className="mt-2 text-gray-600">
          Review all the information you have provided. You can expand each
          section to see the details.
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="project-details"
      >
        <AccordionItem value="project-details">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">Project Details</p>
            {projectData.step1 && (
              <span className="text-sm text-green-600">✓ Completed</span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <NewProjectDetails
              onSubmit={() => {}}
              hideButton={true}
              defaultValues={getStep1DefaultValues()}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="project-management-tool">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">
              Project Management Tool Setup
            </p>
            {projectData.step2 && (
              <span className="text-sm text-green-600">✓ Completed</span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <ProjectMgmtSetup
              onSubmit={() => {}}
              hideButton={true}
              defaultValues={getStep2DefaultValues()}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="version-control-setup">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">
              Version Control Setup
            </p>
            {projectData.step3 && (
              <span className="text-sm text-green-600">✓ Completed</span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <VersionControlSetup
              onSubmit={() => {}}
              hideButton={true}
              defaultValues={getStep3DefaultValues()}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="communication-tool">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">
              Communication Tool Setup
            </p>
            {projectData.step4 && (
              <span className="text-sm text-green-600">✓ Completed</span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <ConnectionTool
              onSubmit={() => {}}
              hideButton={true}
              defaultValues={getStep4DefaultValues()}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="user-permission">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">
              User & Permission Sync
            </p>
            {projectData.step5 && (
              <span className="text-sm text-green-600">✓ Completed</span>
            )}
          </AccordionTrigger>
          <AccordionContent>
            <UserPermission
              onSubmit={() => {}}
              hideButton={true}
              defaultValues={getStep5DefaultValues()}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-8 flex gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.history.back()}
          disabled={createCompleteProject.isPending}
        >
          Back
        </Button>
        <Button
          className="flex-1 cursor-pointer bg-[#086ACE] p-6 text-base font-semibold hover:bg-[#086ACE]/90 disabled:cursor-not-allowed disabled:bg-gray-400"
          onClick={handleCreateProject}
          disabled={createCompleteProject.isPending || !projectData.step1}
        >
          {createCompleteProject.isPending ? (
            <div className="flex items-center gap-2">
              <Loader className="h-4 w-4 animate-spin" />
              Creating Project...
            </div>
          ) : (
            'Create Project'
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
