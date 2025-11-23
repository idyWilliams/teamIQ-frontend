'use client';

import { useProjectCreation } from '@/context/ProjectCreationContext';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextArea } from '../ui/FormTextArea';


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
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Project Details
        </h2>
        <p className="text-gray-600">
          Give your project a name and description
        </p>
      </div>

      <FormInput
        label="Project Name"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        placeholder="e.g., Mobile App Redesign Q1 2025"
        required
        maxLength={100}
        error={nameError}
        helperText={`${projectName.length}/100 characters`}
      />

      <FormTextArea
        label="Description"
        value={projectDescription}
        onChange={e => setProjectDescription(e.target.value)}
        placeholder="Describe what this project tracks and its objectives..."
        rows={5}
        maxLength={500}
        helperText={`${projectDescription.length}/500 characters`}
      />

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="mb-1 font-medium">What&apos;s next?</p>
            <ul className="space-y-1 text-blue-700">
              <li>
                • Link repositories, boards, and channels from your integrated
                tools
              </li>
              <li>
                • Add team members and map them to their external accounts
              </li>
              <li>
                • TeamIQ will automatically sync and track all project activity
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
