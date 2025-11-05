import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Step1Data {
  name: string;
  description: string;
  project_lead_id: number;
  stacks: string[];
  start_date: string;
  end_date: string;
  linked_documents: string[];
  project_image: string;
  is_visible: boolean;
}

interface Step2Data {
  pm_tool: string;
  pm_integration_method: 'oauth2' | 'api_key';
  pm_project_id?: string;
  pm_api_key?: string;
  pm_access_token?: string;
}

interface Step3Data {
  vc_tool: string;
  vc_integration_method: 'oauth2' | 'api_key';
  vc_repository_url?: string;
  vc_api_key?: string;
  vc_access_token?: string;
}

interface ProjectStore {
  // Project identification
  currentProjectId: number | null;

  // Step data
  step1Data: Step1Data | null;
  step2Data: Step2Data | null;
  step3Data: Step3Data | null;

  // UI state
  currentStep: number;
  isCreating: boolean;
  lastSaved: string | null;

  // Actions
  setCurrentProjectId: (id: number) => void;
  setStep1Data: (data: Step1Data) => void;
  setStep2Data: (data: Step2Data) => void;
  setStep3Data: (data: Step3Data) => void;
  setCurrentStep: (step: number) => void;
  setIsCreating: (creating: boolean) => void;
  updateLastSaved: () => void;

  // Utility actions
  getProjectData: () => {
    step1: Step1Data | null;
    step2: Step2Data | null;
    step3: Step3Data | null;
    currentStep: number;
  };

  clearStore: () => void;
  resetToStep: (step: number) => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentProjectId: null,
      step1Data: null,
      step2Data: null,
      step3Data: null,
      currentStep: 1,
      isCreating: false,
      lastSaved: null,

      // Actions
      setCurrentProjectId: id => set({ currentProjectId: id }),

      setStep1Data: data =>
        set({
          step1Data: data,
          lastSaved: new Date().toISOString(),
        }),

      setStep2Data: data =>
        set({
          step2Data: data,
          lastSaved: new Date().toISOString(),
        }),

      setStep3Data: data =>
        set({
          step3Data: data,
          lastSaved: new Date().toISOString(),
        }),

      setCurrentStep: step => set({ currentStep: step }),

      setIsCreating: creating => set({ isCreating: creating }),

      updateLastSaved: () => set({ lastSaved: new Date().toISOString() }),

      // Utility function to get all project data
      getProjectData: () => {
        const state = get();
        return {
          step1: state.step1Data,
          step2: state.step2Data,
          step3: state.step3Data,
          currentStep: state.currentStep,
        };
      },

      // Clear everything
      clearStore: () =>
        set({
          currentProjectId: null,
          step1Data: null,
          step2Data: null,
          step3Data: null,
          currentStep: 1,
          isCreating: false,
          lastSaved: null,
        }),

      // Reset to a specific step (useful for going back)
      resetToStep: step => {
        const resetState: Partial<ProjectStore> = { currentStep: step };

        // Clear data from steps beyond the target step
        if (step < 2) resetState.step2Data = null;
        if (step < 3) resetState.step3Data = null;
        // Add more as you add steps

        set(resetState);
      },
    }),
    {
      name: 'project-creation-store',
      // Optional: Only persist certain fields
      partialize: state => ({
        currentProjectId: state.currentProjectId,
        step1Data: state.step1Data,
        step2Data: state.step2Data,
        step3Data: state.step3Data,
        currentStep: state.currentStep,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
