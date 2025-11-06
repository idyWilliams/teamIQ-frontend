// stores/useProjectStore.ts
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

interface Step4Data {
  comm_tool: string;
  comm_integration_method: 'oauth2' | 'api_key' | 'webhook';
  comm_channel_id?: string;
  comm_api_key?: string;
  comm_webhook_url?: string;
  comm_notifications: {
    pmt_updates: boolean;
    code_events: boolean;
    sentiment_monitoring: boolean;
    custom_commands: boolean;
  };
}

interface Step5Data {
  members: Array<{
    user_id: number;
    role: string;
  }>;
}

interface ProjectStore {
  // Project identification
  currentProjectId: number | null;

  // Step data
  step1Data: Step1Data | null;
  step2Data: Step2Data | null;
  step3Data: Step3Data | null;
  step4Data: Step4Data | null;
  step5Data: Step5Data | null;

  // UI state
  currentStep: number;
  isCreating: boolean;
  lastSaved: string | null;

  // Actions
  setCurrentProjectId: (id: number) => void;
  setStep1Data: (data: Step1Data) => void;
  setStep2Data: (data: Step2Data) => void;
  setStep3Data: (data: Step3Data) => void;
  setStep4Data: (data: Step4Data) => void;
  setStep5Data: (data: Step5Data) => void;
  setCurrentStep: (step: number) => void;
  setIsCreating: (creating: boolean) => void;
  updateLastSaved: () => void;

  // Utility actions
  getProjectData: () => {
    step1: Step1Data | null;
    step2: Step2Data | null;
    step3: Step3Data | null;
    step4: Step4Data | null;
    step5: Step5Data | null;
    currentStep: number;
  };

  // Final project creation
  getFinalProjectData: () => any;

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
      step4Data: null,
      step5Data: null,
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

      setStep4Data: data =>
        set({
          step4Data: data,
          lastSaved: new Date().toISOString(),
        }),

      setStep5Data: data =>
        set({
          step5Data: data,
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
          step4: state.step4Data,
          step5: state.step5Data,
          currentStep: state.currentStep,
        };
      },

      // Get final data for API submission
      getFinalProjectData: () => {
        const state = get();

        // Extract member IDs from step 5 for the member_ids field
        const memberIds =
          state.step5Data?.members
            .filter(member => member.role !== 'lead')
            .map(member => member.user_id) || [];

        // Find project lead from step 5
        const projectLead = state.step5Data?.members.find(
          member => member.role === 'lead'
        );
        const projectLeadId = projectLead ? projectLead.user_id : 0;

        return {
          // Step 1 data
          name: state.step1Data?.name || '',
          description: state.step1Data?.description || '',
          project_lead_id: projectLeadId,
          stacks: state.step1Data?.stacks || [],
          start_date: state.step1Data?.start_date || new Date().toISOString(),
          end_date: state.step1Data?.end_date || new Date().toISOString(),
          linked_documents: state.step1Data?.linked_documents || [],
          project_image: state.step1Data?.project_image || '',
          is_visible: state.step1Data?.is_visible || true,

          // Step 2 data
          pm_tool: state.step2Data?.pm_tool || '',
          pm_integration_method:
            state.step2Data?.pm_integration_method || 'oauth2',
          pm_project_id: state.step2Data?.pm_project_id || '',
          pm_api_key: state.step2Data?.pm_api_key || '',

          // Step 3 data
          vc_tool: state.step3Data?.vc_tool || '',
          vc_integration_method:
            state.step3Data?.vc_integration_method || 'oauth2',
          vc_repository_url: state.step3Data?.vc_repository_url || '',
          vc_api_key: state.step3Data?.vc_api_key || '',

          // Step 4 data
          comm_tool: state.step4Data?.comm_tool || '',
          comm_integration_method:
            state.step4Data?.comm_integration_method || 'oauth2',
          comm_channel_id: state.step4Data?.comm_channel_id || '',
          comm_api_key: state.step4Data?.comm_api_key || '',
          comm_webhook_url: state.step4Data?.comm_webhook_url || '',
          comm_notifications: state.step4Data?.comm_notifications || {
            pmt_updates: true,
            code_events: true,
            sentiment_monitoring: false,
            custom_commands: false,
          },

          // Step 5 data (as member_ids)
          member_ids: memberIds,
        };
      },

      // Clear everything
      clearStore: () =>
        set({
          currentProjectId: null,
          step1Data: null,
          step2Data: null,
          step3Data: null,
          step4Data: null,
          step5Data: null,
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
        if (step < 4) resetState.step4Data = null;
        if (step < 5) resetState.step5Data = null;

        set(resetState);
      },
    }),
    {
      name: 'project-creation-store',
      partialize: state => ({
        currentProjectId: state.currentProjectId,
        step1Data: state.step1Data,
        step2Data: state.step2Data,
        step3Data: state.step3Data,
        step4Data: state.step4Data,
        step5Data: state.step5Data,
        currentStep: state.currentStep,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
