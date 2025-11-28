'use client';
import React, { useEffect, useState, useRef } from 'react';
import CardItem from './cardItem';
import ChartLineDefault from './chart-line';
import ActiveBlockers from './active-blockers';
import { WaveProgressCard } from './wave-progress';
import { activeBlockers, progressData } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import OrganizationalDetails from './org-onboarding-comps/organizationalOnboarding';
import OnboardingSuccess from './org-onboarding-comps/onboardingSuccess';
import { useAuthStore } from '@/store/useAuthStore';
import { useOrganizationUsers } from '@/services/hooks/useUsers';
import { useProjects } from '@/services/hooks/useProjectGet';

const DashboardOverview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // for mobile carousel
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { user } = useAuthStore();
  const { data: users, isLoading, error } = useOrganizationUsers();
  const { data: apiProjects } = useProjects();

  // Dynamic dashboard cards based on real data
  const dashboardCards = [
    { 
      title: "Team Members", 
      avatarUrl: "images/team-member.svg", 
      content: users ? `${users.length}` : "0"
    },
    { 
      title: "Active Projects", 
      avatarUrl: "images/active-task.svg", 
      content: apiProjects ? `${apiProjects.length}` : "0"  
    },
    {
      title: "Completed Project",
      avatarUrl: "images/completed-task.svg",
      content: apiProjects ? `${apiProjects.length}` : "0"  
    },
    {
      title: "Pending Project",
      avatarUrl: "images/pending-task.svg",
      content: apiProjects ? `${apiProjects.length}` : "0" 
    },
    { 
      title: "Unassigned Task", 
      avatarUrl: "images/pending-task.svg", 
      content: "5" 
    },
  ];

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

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const cardWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 py-4">
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 py-4">
        <div className="flex min-h-[200px] items-center justify-center">
          <div className="text-red-600">Error loading dashboard data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-4">
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
        {/* card display in mobile */}
        <div className="mb-8 sm:hidden">
          <div
            ref={scrollRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
          >
            {dashboardCards.map((card, i) => (
              <div key={i} className="w-full shrink-0 snap-center">
                <CardItem {...card} />
              </div>
            ))}
          </div>
          {/* indicator button container */}
          <div className="mt-4 flex justify-center gap-2">
            {dashboardCards.map((_, i) => (
              <button
                key={i}
                className={`h-2 w-2 rounded-full ${
                  i === activeIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🟦 Charts and blockers */}
      <div className="flex max-w-full flex-col gap-4 overflow-hidden lg:flex-row">
        <div className="min-w-0 flex-1 space-y-4">
          <WaveProgressCard progressData={progressData} zeroMargin={true} />
          <div className="mt-6">
            <ChartLineDefault />
          </div>
        </div>
        <div className="w-full flex-shrink-0 space-y-4 lg:w-80">
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