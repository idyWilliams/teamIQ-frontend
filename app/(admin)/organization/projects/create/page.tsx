'use client';

import {
  ProjectCreationProvider,
  useProjectCreation,
} from '@/context/ProjectCreationContext';
import { IntegrationProvider, useIntegrations } from '@/context/IntegrationContext';
import { useAuthStore } from '@/store/useAuthStore';
import { Step1ProjectDetails } from '@/components/project-creation/Step1ProjectDetails';
import { Step3TeamMembers } from '@/components/project-creation/Step3TeamMembers';
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

import { ProjectManifest } from '@/components/project-creation/ProjectManifest';

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
  ];

  useEffect(() => {
    if (!loading && connections.length === 0) {
      setShowIntegrationsModal(true);
    }
  }, [loading, connections]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        if (canProceed && currentStep < steps.length) {
          nextStep();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canProceed, currentStep, nextStep, steps.length]);

  const CurrentStepComponent = steps[currentStep - 1]?.component || steps[0].component;

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
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

      {/* Configuration Column */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-600 rounded-lg">
                <Settings className="h-4 w-4 text-white" />
              </span>
              Project Builder
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`h-1.5 w-8 rounded-full transition-all ${
                    currentStep >= step.number ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure? All progress will be lost.')) {
                  reset();
                  router.push('/organization/projects');
                }
              }}
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Step {currentStep} of {steps.length}</span>
              <h2 className="text-2xl font-bold text-gray-900 mt-1">{steps[currentStep - 1].title}</h2>
              <p className="text-gray-500 text-sm">{steps[currentStep - 1].description}</p>
            </div>

            <div className="bg-white rounded-2xl border shadow-sm p-8">
              <CurrentStepComponent />
            </div>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Previous
              </Button>
              {currentStep < steps.length && (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed}
                  className="bg-blue-600 hover:bg-blue-700 gap-2 px-8"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Manifest Column */}
      <aside className="w-[320px] shrink-0 hidden lg:block">
        <ProjectManifest />
      </aside>
    </div>
  );
}
