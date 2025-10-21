'use client';
import React, { useState } from 'react';
import StepFour from './step-four';
import StepFive from './step-five';
import StepSix from './step-six';
import SuccessStep from './success-step';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
interface StepperModalProps {
  onClose?: () => void;
}

const StepperModal = ({ onClose }: StepperModalProps) => {
  const [currentStep, setCurrentStep] = useState(4);

  const next = () => setCurrentStep(prev => prev + 1);
  const prev = () => setCurrentStep(prev => prev - 1);
  const goToStep = (step: number) => setCurrentStep(step);

  const handleSubmit = () => {
    console.log('Project created!');
  };

  const steps = [
    { number: 1, name: 'Project Details' },
    { number: 2, name: 'Project Management Tool  Setup' },
    { number: 3, name: 'Version Control Setup' },
    { number: 4, name: 'Communication Tool Setup' },
    { number: 5, name: 'User & Permission Sync' },
    { number: 6, name: 'Summary' },
  ];

  return (
    <div className="w-full">
      <div className="sticky top-0 z-50 bg-white">
        <div className="relative mx-auto w-full max-w-6xl p-6">
          <Button
            variant="ghost"
            onClick={onClose}
            className="ring-offset-background focus:ring-ring absolute -top-1 -right-4 cursor-pointer rounded-sm opacity-70 transition-opacity"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full transition-all duration-200 ${
                        currentStep === step.number
                          ? 'bg-[#E4E7EC] text-[#086ACE] ring-2 ring-[#086ACE] ring-offset-2'
                          : currentStep > step.number
                            ? 'bg-[#086ACE] text-white'
                            : 'bg-[#E4E7EC] text-[#00000033] ring-2 ring-[#00000033]'
                      }`}
                      onClick={() => goToStep(step.number)}
                    >
                      {currentStep > step.number ? (
                        <Check size={16} />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-2 flex h-10 w-full items-center justify-center">
                      <span
                        className={`text-center text-xs leading-tight font-medium ${
                          currentStep === step.number ||
                          currentStep > step.number
                            ? 'text-[#086ACE]'
                            : 'text-[#434343]'
                        }`}
                      >
                        {step.name}
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`mx-2 mb-8 h-1 w-16 ${
                        currentStep > step.number
                          ? 'bg-[#E4E7EC]'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        {currentStep === 4 && <StepFour next={next} />}
        {currentStep === 5 && <StepFive next={next} />}
        {currentStep === 6 && <StepSix onSubmit={next} />}
        {currentStep === 7 && <SuccessStep />}
      </div>
    </div>
  );
};

export default StepperModal;
