'use client';

import {
  ProjectCreationProvider,
  useProjectCreation,
} from '@/context/ProjectCreationContext';
import { IntegrationProvider, useIntegrations } from '@/context/IntegrationContext';
import { useAuthStore } from '@/store/useAuthStore';
import { Step1ProjectDetails } from '@/components/project-creation/Step1ProjectDetails';
import { Step3TeamMembers } from '@/components/project-creation/Step3TeamMembers';
import { Step4ReviewCreate } from '@/components/project-creation/Step4ReviewCreate';
import { useRouter } from 'next/navigation';
import { Step2SelectResources } from '@/components/project-creation/Step2SelectResources';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowRight, Settings } from 'lucide-react';

export default function CreateProjectPage() {
  const organizationId = useAuthStore(
    state => state.user?.organization_id || state.user?.id || ''
  );

  return (
    <IntegrationProvider organizationId={organizationId}>
      <ProjectCreationProvider organizationId={organizationId}>
        <CreateProjectFlow />
      </ProjectCreationProvider>
    </IntegrationProvider>
  );
}

function CreateProjectFlow() {
  const router = useRouter();
  const {
    currentStep,
    nextStep,
    prevStep,
    canProceed,
    reset,
    validationErrors,
  } = useProjectCreation();
  const { connections, loading } = useIntegrations();
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);

  useEffect(() => {
    if (!loading && connections.length === 0) {
      setShowIntegrationsModal(true);
    }
  }, [loading, connections]);

  const steps = [
    {
      number: 1,
      title: 'Project Details',
      description: 'Name and describe your project',
      component: Step1ProjectDetails,
    },
    {
      number: 2,
      title: 'Link Resources',
      description: 'Connect repos, boards & channels',
      component: Step2SelectResources,
    },
    {
      number: 3,
      title: 'Add Team',
      description: 'Select members and map accounts',
      component: Step3TeamMembers,
    },
    {
      number: 4,
      title: 'Review & Create',
      description: 'Confirm and start sync',
      component: Step4ReviewCreate,
    },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Dialog open={showIntegrationsModal} onOpenChange={setShowIntegrationsModal}>
        <DialogContent className="sm:max-w-[425px]" showCloseButton={false}>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
            <DialogTitle className="mt-4 text-center text-xl font-bold">
              Integrations Required
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-gray-600">
              You must integrate at least one tool (Communication, Version Control, or Project Management) to create a project and track progress.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              onClick={() => router.push('/organization/settings?tab=integrated-apps')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Settings className="h-5 w-5" />
              Go to Integrated Apps
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push('/organization/projects')}
              className="w-full text-gray-500 hover:text-gray-700"
            >
              Back to Projects
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
                Create New Project
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Link your tools and team to start tracking progress
                automatically
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure? All progress will be lost.')) {
                  reset();
                  router.push('/organization/projects');
                }
              }}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="relative flex items-center justify-between">
            {/* Progress Line */}
            <div className="absolute top-5 right-0 left-0 -z-10 h-0.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {steps.map((step, index) => {
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;
              const isUpcoming = currentStep < step.number;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-1 flex-col items-center"
                >
                  <button
                    onClick={() => {
                      if (step.number < currentStep) {
                        // Allow going back
                        while (currentStep > step.number) prevStep();
                      }
                    }}
                    disabled={step.number >= currentStep}
                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all duration-300 ${
                      isCompleted
                        ? 'scale-110 bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg'
                        : isCurrent
                          ? 'scale-125 bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl ring-4 ring-blue-200'
                          : 'bg-gray-200 text-gray-500'
                    } ${step.number < currentStep ? 'cursor-pointer hover:scale-115' : 'cursor-not-allowed'}`}
                  >
                    {isCompleted ? (
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </button>
                  <div
                    className={`mt-3 text-center transition-all duration-300 ${isCurrent ? 'scale-105' : ''}`}
                  >
                    <p
                      className={`text-sm font-semibold ${
                        isCompleted || isCurrent
                          ? 'text-gray-900'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p
                      className={`mt-0.5 text-xs ${
                        isCurrent
                          ? 'font-medium text-blue-600'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="min-h-[600px] rounded-2xl border bg-white p-8 shadow-lg">
          <CurrentStepComponent />
        </div>
      </div>

      {/* Footer Navigation */}
      {currentStep < 4 && (
        <div className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white shadow-2xl">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all ${
                  currentStep === 1
                    ? 'cursor-not-allowed text-gray-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:shadow-md'
                }`}
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {steps.length}
                </p>
                {validationErrors.length > 0 && (
                  <p className="mt-1 text-xs text-red-600">
                    {validationErrors.length} issue
                    {validationErrors.length > 1 ? 's' : ''} to fix
                  </p>
                )}
              </div>

              <button
                onClick={nextStep}
                disabled={!canProceed}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-semibold shadow-lg transition-all ${
                  canProceed
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-xl'
                    : 'cursor-not-allowed bg-gray-200 text-gray-400'
                }`}
              >
                Next
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
