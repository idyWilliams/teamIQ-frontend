'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { apps } from '@/components/apps/appCards';
import { CheckCircle2, AlertCircle, Users, Box, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function ProjectManifest() {
  const {
    projectName,
    selectedResources,
    selectedMembers,
    teamLead,
    validationErrors,
    createProject,
    isCreating,
    currentStep,
    goToStep,
  } = useProjectCreation();

  const isStepValid = (step: number) => {
    if (step === 1) return projectName.trim().length >= 3;
    if (step === 2) return selectedResources.length > 0;
    if (step === 3) return selectedMembers.length > 0 && !!teamLead;
    return false;
  };

  return (
    <div className="flex h-full flex-col bg-white border-l shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Box className="h-5 w-5 text-blue-600" />
          Project Manifest
        </h2>
        <p className="text-xs text-gray-500 mt-1">Real-time build status</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Project Identity */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Identity</h3>
            {isStepValid(1) ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <button onClick={() => goToStep(1)} className="text-[10px] text-blue-600 hover:underline">Fix</button>
            )}
          </div>
          <div className="p-3 rounded-lg border bg-gray-50">
            <p className="text-sm font-medium text-gray-900 truncate">
              {projectName || <span className="text-gray-400 italic">Untitled Project</span>}
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resources ({selectedResources.length})</h3>
            {isStepValid(2) ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <button onClick={() => goToStep(2)} className="text-[10px] text-blue-600 hover:underline">Add</button>
            )}
          </div>
          <div className="space-y-2">
            {selectedResources.length === 0 ? (
              <p className="text-xs text-gray-400 italic px-1">No resources linked yet</p>
            ) : (
              selectedResources.slice(0, 5).map((r, i) => {
                const app = apps.find(a => a.id === r.provider);
                return (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-700 bg-white border rounded p-2">
                    {app?.logo && (
                      <div className="h-4 w-4 relative">
                        {typeof app.logo === 'string' ? (
                          <span>{app.logo}</span>
                        ) : (
                          <Image src={app.logo} alt="" fill className="object-contain" />
                        )}
                      </div>
                    )}
                    <span className="truncate flex-1">{r.resourceName}</span>
                  </div>
                );
              })
            )}
            {selectedResources.length > 5 && (
              <p className="text-[10px] text-gray-500 text-center">+{selectedResources.length - 5} more resources</p>
            )}
          </div>
        </section>

        {/* Team Readiness */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Team ({selectedMembers.length})</h3>
            {isStepValid(3) ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <button onClick={() => goToStep(3)} className="text-[10px] text-blue-600 hover:underline">Invite</button>
            )}
          </div>
          <div className="space-y-2">
            {selectedMembers.length === 0 ? (
              <p className="text-xs text-gray-400 italic px-1">No members added yet</p>
            ) : (
              <div className="flex -space-x-2 overflow-hidden px-1">
                {selectedMembers.slice(0, 6).map((m, i) => (
                  <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600" title={m.userName}>
                    {m.userName.charAt(0)}
                  </div>
                ))}
                {selectedMembers.length > 6 && (
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                    +{selectedMembers.length - 6}
                  </div>
                )}
              </div>
            )}
            {teamLead && (
              <div className="mt-2 p-2 rounded border bg-yellow-50 flex items-center gap-2">
                <span className="text-[10px] font-bold text-yellow-700">LEAD</span>
                <span className="text-xs text-yellow-900 truncate">{teamLead.userName}</span>
              </div>
            )}
          </div>
        </section>

        {/* Issues/Status */}
        {validationErrors.length > 0 && (
          <section className="rounded-xl border-red-100 border bg-red-50 p-4">
            <h4 className="text-xs font-bold text-red-800 flex items-center gap-2 mb-2">
              <AlertCircle className="h-3 w-3" />
              Build Blockers ({validationErrors.length})
            </h4>
            <ul className="space-y-1.5">
              {validationErrors.slice(0, 3).map((err, i) => (
                <li key={i} className="text-[10px] text-red-700 leading-tight">• {err}</li>
              ))}
              {validationErrors.length > 3 && (
                <li className="text-[10px] text-red-600 font-medium">And {validationErrors.length - 3} more issues...</li>
              )}
            </ul>
          </section>
        )}
      </div>

      <div className="p-6 border-t bg-gray-50/50">
        <Button
          onClick={createProject}
          disabled={validationErrors.length > 0 || isCreating || currentStep < 3}
          className="w-full h-12 text-sm font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200"
        >
          {isCreating ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Initializing...
            </div>
          ) : (
            'Go Live'
          )}
        </Button>
        <p className="text-[10px] text-center text-gray-400 mt-3 flex items-center justify-center gap-1">
          <Info className="h-3 w-3" />
          Click to start syncing activity
        </p>
      </div>
    </div>
  );
}
