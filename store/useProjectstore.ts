import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectStore {
  currentProjectId: number | null;
  step1Data: any | null;
  step2Data: any | null;
  currentStep: number;

  setCurrentProjectId: (id: number) => void;
  setStep1Data: (data: any) => void;
  setStep2Data: (data: any) => void;
  setCurrentStep: (step: number) => void;
  clearStore: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    set => ({
      currentProjectId: null,
      step1Data: null,
      step2Data: null,
      currentStep: 1,

      setCurrentProjectId: id => set({ currentProjectId: id }),
      setStep1Data: data => set({ step1Data: data }),
      setStep2Data: data => set({ step2Data: data }),
      setCurrentStep: step => set({ currentStep: step }),
      clearStore: () =>
        set({
          currentProjectId: null,
          step1Data: null,
          step2Data: null,
          currentStep: 1,
        }),
    }),
    {
      name: 'project-creation-store',
    }
  )
);
