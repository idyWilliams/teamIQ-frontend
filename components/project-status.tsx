import { Dot } from 'lucide-react';
import ActiveBlockers from './active-blockers';
import { activeBlockers } from '@/constants';
import OrganizationalDetails from './org-onboarding-comps/organizationalOnboarding';

const Datas = [
  {
    name: 'Mobile App v2.0...',
    status: 'In Progress',
    description: 'Next: Beta',
    Date: 'Release - Jun 25',
  },
  {
    name: 'API Modernization...',
    status: 'In Progress',
    description: 'Next: Security',
    Date: 'Review - Jul 20',
  },
  {
    name: 'API Modernization...',
    status: 'In Progress',
    description: 'Next: Security',
    Date: 'Review - Jul 20',
  },
  {
    name: 'Customer Portal...',
    status: 'In Progress',
    description: 'Next: Phase 2',
    Date: 'Start - Jul 30',
  },
];

const ProjectStatus = () => {
  return (
    <>
      <div className="flex justify-between gap-4 space-y-6 p-4">
        {' '}
        <div className="w-[65%] grow">
          <div className="mb-3 flex justify-between">
            <h2 className="text-1 font-semibold text-[#0E0E0E]">
              Project Status Summary
            </h2>
            <h2 className="text-1 font-semibold text-[#0E0E0E]">
              View Project List
            </h2>
          </div>

          <div>
            <div className="flex flex-col gap-4">
              {Datas.map((data, index) => (
                <div
                  key={index}
                  className="bg-muted/50 rounded-lg border border-l-1 border-l-[#086ACE] px-5 py-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-[14px] font-semibold text-[#141414]">
                      {data.name}
                    </h3>
                    <div className="flex items-center justify-center text-[12px] text-[#8A8CD9]">
                      <Dot className="text-[12px]" /> <span>{data.status}</span>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#626262]">
                    {data.description}
                  </p>
                  <p className="text-[12px] text-[#626262]">{data.Date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ActiveBlockers blockers={activeBlockers} />
      </div>
    </>
  );
};

export default ProjectStatus;
