'use client';

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { AlertCircle, ArrowRight, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import OrganizationalDetails from './org-onboarding-comps/organizationalOnboarding';
import OnboardingSuccess from './org-onboarding-comps/onboardingSuccess';

// Note: I might need to adjust the import paths for OrganizationalDetails and OnboardingSuccess
// if they are strictly inside a specific directory. Let me check where they are.

export default function OnboardingBanner() {
  const { user } = useAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  console.log("user onboarding", user)

  useEffect(() => {
    // Show banner if organization details are incomplete
    if (user && !user?.domain_link) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [user]);

  if (!isVisible) return null;

  const handleComplete = () => {
    setShowSuccessModal(false);
    setIsModalOpen(false);
    setIsVisible(false);
  };

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center justify-between sticky top-0 z-50 animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-1.5 rounded-full">
            <AlertCircle className="size-4 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-900">
              Onboarding Incomplete
              <span className="hidden sm:inline font-normal text-amber-700 ml-2">
                — Complete your organization details to unlock all features.
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:text-amber-700 transition-colors"
          >
            Complete Setup
            <ArrowRight className="size-4" />
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-amber-100 rounded-full transition-colors text-amber-400 hover:text-amber-600"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {/* Onboarding Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
          <OrganizationalDetails
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => {
              setShowSuccessModal(true);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
          <OnboardingSuccess onClose={handleComplete} />
        </DialogContent>
      </Dialog>
    </>
  );
}
