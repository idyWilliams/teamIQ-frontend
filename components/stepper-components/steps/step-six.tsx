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
import { useProjectStore } from '@/store/useProjectstore';
import { useCreateCompleteProject } from '@/services/hooks/useProject';
import { toast } from 'sonner';
import { Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        onSubmit();
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getIntegrationMethodDisplay = (method: string) => {
    const methodMap: { [key: string]: string } = {
      oauth2: 'OAuth 2.0',
      api_key: 'API Key',
      webhook: 'Webhook',
    };
    return methodMap[method] || method;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Project Summary</h2>
        <p className="mt-2 text-gray-600">
          Review your project configuration before creating the project.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="mb-8 grid gap-6">
        {/* Project Details Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Project Details
            </CardTitle>
            {projectData.step1 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            {projectData.step1 ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Name:</strong> {projectData.step1.name}
                </div>
                <div>
                  <strong>Description:</strong> {projectData.step1.description}
                </div>
                <div>
                  <strong>Stacks:</strong>{' '}
                  {projectData.step1.stacks.map(stack => (
                    <Badge key={stack} variant="secondary" className="mr-1">
                      {stack}
                    </Badge>
                  ))}
                </div>
                <div>
                  <strong>Timeline:</strong>{' '}
                  {formatDate(projectData.step1.start_date)} to{' '}
                  {formatDate(projectData.step1.end_date)}
                </div>
                <div>
                  <strong>Visibility:</strong>{' '}
                  {projectData.step1.is_visible ? 'Public' : 'Private'}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No project details provided</p>
            )}
          </CardContent>
        </Card>

        {/* Project Management Tool Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Project Management
            </CardTitle>
            {projectData.step2 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            {projectData.step2 ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Tool:</strong> {projectData.step2.pm_tool}
                </div>
                <div>
                  <strong>Method:</strong>{' '}
                  {getIntegrationMethodDisplay(
                    projectData.step2.pm_integration_method
                  )}
                </div>
                {projectData.step2.pm_project_id && (
                  <div>
                    <strong>Project ID:</strong>{' '}
                    {projectData.step2.pm_project_id}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">
                No project management tool configured
              </p>
            )}
          </CardContent>
        </Card>

        {/* Version Control Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Version Control
            </CardTitle>
            {projectData.step3 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            {projectData.step3 ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Tool:</strong> {projectData.step3.vc_tool}
                </div>
                <div>
                  <strong>Method:</strong>{' '}
                  {getIntegrationMethodDisplay(
                    projectData.step3.vc_integration_method
                  )}
                </div>
                {projectData.step3.vc_repository_url && (
                  <div>
                    <strong>Repository:</strong>{' '}
                    {projectData.step3.vc_repository_url}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500">No version control configured</p>
            )}
          </CardContent>
        </Card>

        {/* Communication Tool Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication</CardTitle>
            {projectData.step4 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            {projectData.step4 ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Tool:</strong> {projectData.step4.comm_tool}
                </div>
                <div>
                  <strong>Method:</strong>{' '}
                  {getIntegrationMethodDisplay(
                    projectData.step4.comm_integration_method
                  )}
                </div>
                {projectData.step4.comm_channel_id && (
                  <div>
                    <strong>Channel ID:</strong>{' '}
                    {projectData.step4.comm_channel_id}
                  </div>
                )}
                <div>
                  <strong>Notifications:</strong>
                </div>
                <div className="pl-4">
                  {projectData.step4.comm_notifications.pmt_updates && (
                    <div>• PMT Updates</div>
                  )}
                  {projectData.step4.comm_notifications.code_events && (
                    <div>• Code Events</div>
                  )}
                  {projectData.step4.comm_notifications
                    .sentiment_monitoring && <div>• Sentiment Monitoring</div>}
                  {projectData.step4.comm_notifications.custom_commands && (
                    <div>• Custom Commands</div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No communication tool configured</p>
            )}
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            {projectData.step5 ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-yellow-500" />
            )}
          </CardHeader>
          <CardContent>
            {projectData.step5 && projectData.step5.members.length > 0 ? (
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Total Members:</strong>{' '}
                  {projectData.step5.members.length}
                </div>
                <div>
                  <strong>Project Lead:</strong>{' '}
                  {projectData.step5.members.find(m => m.role === 'lead')
                    ? 'Assigned'
                    : 'Not assigned'}
                </div>
                <div>
                  <strong>Regular Members:</strong>{' '}
                  {
                    projectData.step5.members.filter(m => m.role === 'member')
                      .length
                  }
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No team members added</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
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

      {/* Debug Info (remove in production) */}
      <div className="mt-8 rounded-lg bg-gray-100 p-4">
        <details>
          <summary className="cursor-pointer font-medium">
            Debug Information
          </summary>
          <pre className="mt-2 overflow-auto text-xs">
            {JSON.stringify(getFinalProjectData(), null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default StepSix;
