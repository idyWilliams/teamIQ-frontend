// import React from 'react';
// import CardItem from './cardItem';
// import ChartLineDefault from './chart-line';
// import ActiveBlockers from './active-blockers';
// import { useState } from 'react';
// import { WaveProgressCard } from './wave-progress';
// import { dashboardCards, activeBlockers, progressData } from '@/constants';
// import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
// import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
// import OrganizationalDetails from './org-onboarding-comps/organizationalOnboarding';
// import OnboardingSuccess from './org-onboarding-comps/onboardingSuccess';

// const DashbordOverview = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//     const [showCard, setShowCard] = useState(true);
//    const [showSuccessModal, setShowSuccessModal] = useState(false);

//   const handleComplete = () => {
//     setShowSuccessModal(false);
// setIsModalOpen(false);
//     setShowCard(false); // ✅ hides the card
//   };

//   return (
//     <div className="space-y-6 p-4">
//       <div>
//          {showCard && (
//         <div id ='completed' className="bg-iq-war-100 border-iq-war-300 mb-[48px] flex items-center justify-between rounded-[10px] border px-[56px] py-[26px]">
//           <div className="flex items-center gap-[10px]">
//             <Avatar>
//               <AvatarImage src="/images/danger.svg" alt="danger-icon" />
//               <AvatarFallback>D</AvatarFallback>
//             </Avatar>
//             <p className="text-[16px] text-neutral-950">
//               Complete your organization details to unlock full access.
//             </p>
//           </div>

//           <button
//             onClick={() => { setIsModalOpen(true); }}

//             className="bg-iq-600 hover:bg-iq-800 cursor-pointer rounded-[8px] p-[10px] text-neutral-50 duration-500"
//           >
//             Complete Now
//           </button>
//         </div>
//          )}
//         <div className="hidden gap-3 max-lg:flex-wrap sm:flex">
//           {dashboardCards.map((card, i) => (
//             <CardItem key={i} {...card} />
//           ))}
//         </div>
//       </div>

//       <div className="flex gap-4">
//         <div className="grow space-y-4 lg:col-span-2">
//           <WaveProgressCard progressData={progressData} />
//           <div className="mt-6">
//             <ChartLineDefault />
//           </div>
//         </div>

//         <div className="space-y-4 lg:col-span-1">
//           <ActiveBlockers blockers={activeBlockers} />
//         </div>
//       </div>
//       {/* Fill form */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
//           <OrganizationalDetails onClose={() => setIsModalOpen(false)} />
//         </DialogContent>
//       </Dialog>

//         {showSuccessModal && (
//         <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
//           <DialogTitle></DialogTitle>
//           <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
//             <OnboardingSuccess  onClose={handleComplete} />
//           </DialogContent>
//         </Dialog>
//       )}
//     </div>

//   );
// };

// export default DashbordOverview;

'use client';
import React, { useEffect, useState } from 'react';
import CardItem from './cardItem';
import ChartLineDefault from './chart-line';
import ActiveBlockers from './active-blockers';
import { WaveProgressCard } from './wave-progress';
import { dashboardCards, activeBlockers, progressData } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import OrganizationalDetails from './org-onboarding-comps/organizationalOnboarding';
import OnboardingSuccess from './org-onboarding-comps/onboardingSuccess';
import { useAuthStore } from '@/store/useAuthStore';

const DashboardOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useAuthStore();

  const handleComplete = () => {
    setShowSuccessModal(false);
    setIsModalOpen(false);
    setShowCard(false); // ✅ hides the card after onboarding
  };

  useEffect(() => {
    if (user && !user?.domain_link) {
      setShowCard(true);
    }
  }, [user]);

  return (
    <div className="space-y-6 p-4">
      <div>
        {/* 🟨 Card */}
        {showCard && (
          <div
            id="completed"
            className="bg-iq-war-100 border-iq-war-300 mb-[48px] flex items-center justify-between rounded-[10px] border px-[56px] py-[26px]"
          >
            <div className="flex items-center gap-[10px]">
              <Avatar>
                <AvatarImage src="/images/danger.svg" alt="danger-icon" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <p className="text-[16px] text-neutral-950">
                Complete your organization details to unlock full access.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-iq-600 hover:bg-iq-800 cursor-pointer rounded-[8px] p-[10px] text-neutral-50 duration-500"
            >
              Complete Now
            </button>
          </div>
        )}

        {/* 🟩 Dashboard cards */}
        <div className="hidden gap-3 max-lg:flex-wrap sm:flex">
          {dashboardCards.map((card, i) => (
            <CardItem key={i} {...card} />
          ))}
        </div>
      </div>

      {/* 🟦 Charts and blockers */}
      <div className="flex gap-4">
        <div className="max-w-md space-y-4 flex-shrink-0 ">
          <WaveProgressCard progressData={progressData} zeroMargin={true} />
          <div className="mt-6">
            <ChartLineDefault />
          </div>
        </div>
        <div className="space-y-4 lg:col-span-1">
          <ActiveBlockers blockers={activeBlockers} />
        </div>
      </div>

      {/* 🧩 Onboarding Modal */}
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

      {/* 🎉 Success Modal */}
      {showSuccessModal && (
        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="max-h-[90vh] w-[900px] overflow-y-auto !pt-0 sm:!max-w-[900px] [&>button]:hidden">
            <OnboardingSuccess onClose={handleComplete} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DashboardOverview;
