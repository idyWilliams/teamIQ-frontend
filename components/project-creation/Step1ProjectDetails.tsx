'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextArea } from '../ui/FormTextArea';
import { Layout, FileText, Info } from 'lucide-react';

export function Step1ProjectDetails() {
  const {
    projectName,
    setProjectName,
    projectDescription,
    setProjectDescription,
    validationErrors,
  } = useProjectCreation();

  const nameError = validationErrors.find(e => e.includes('Project name'));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <div className="space-y-4">
          <FormInput
            label="Project Name"
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            placeholder="e.g., Mobile App Redesign"
            required
            maxLength={100}
            error={nameError}
            className="text-lg font-semibold"
          />

          <FormTextArea
            label="Project Description"
            value={projectDescription}
            onChange={e => setProjectDescription(e.target.value)}
            placeholder="What are the goals of this project?"
            rows={4}
            maxLength={500}
          />
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-700 leading-relaxed">
            <p className="font-bold mb-1">Efficiency Tip</p>
            <p>You can skip the description for now and add it later in settings. A clear project name helps team members identify it quickly.</p>
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="hidden md:block">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Live Preview</h3>
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden ring-4 ring-gray-50">
          <div className="h-24 bg-gradient-to-br from-blue-500 to-blue-700 p-6 flex items-end">
            <div className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 flex items-center justify-center">
              <Layout className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <div className={`h-6 rounded bg-gray-100 mb-2 transition-all ${projectName ? 'bg-transparent h-auto' : 'w-3/4'}`}>
                {projectName && <h4 className="text-xl font-bold text-gray-900">{projectName}</h4>}
              </div>
              <div className={`h-3 rounded bg-gray-50 transition-all ${projectDescription ? 'bg-transparent h-auto' : 'w-full'}`}>
                {projectDescription && <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{projectDescription}</p>}
              </div>
            </div>
            
            <div className="pt-4 border-t flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white" />
                ))}
              </div>
              <div className="h-2 w-24 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
