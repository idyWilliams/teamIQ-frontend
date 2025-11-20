'use client';

import React from 'react';
// import { CheckCircle, Wrench, FileText, Box } from 'lucide-react';
import { teamMembers, TeamMember } from '@/constants/team-member';
import Image from 'next/image';

function tracks() {
  type Track = {
    id: number;
    icon: string;
    name: string;
    uncompletedTasks: number;
    members: TeamMember[];
  };

  const allTracks: Track[] = [
    {
      id: 1,
      icon: '/images/Product design.png',
      name: 'Design Team',
      uncompletedTasks: 10,
      members: teamMembers.slice(0, 3),
    },
    {
      id: 2,
      icon: '/images/Engineering.png',
      name: 'Engineering',
      uncompletedTasks: 10,
      members: teamMembers.slice(0, 2),
    },
    {
      id: 3,
      icon: '/images/Content.png',
      name: 'Content Team',
      uncompletedTasks: 10,
      members: teamMembers.slice(0, 2),
    },
    {
      id: 4,
      icon: '/images/Product.png',
      name: 'Product',
      uncompletedTasks: 10,
      members: teamMembers.slice(0, 2),
    },
  ];

  return (
    <>
      {/* This component is not positioned well on the page. Position it accordingly once imported */}
      <div className="w-[382px] max-w-sm rounded-xl border border-gray-100 bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Tracks</h2>
        <div className="flex flex-col gap-6">
          {allTracks.map(track => (
            <div
              key={track.id}
              className="rounded-xl border-l border-blue-500 bg-gray-50 p-6"
            >
              <div className="flex items-start justify-between gap-1">
                <div>
                  <Image
                    src={track.icon}
                    alt={track.name}
                    width={32}
                    height={32}
                    className="-mr-2 rounded-full border border-white"
                  />
                </div>
                <div className="flex items-center gap-1">
                  {track.members.slice(0, 2).map((member, index) => (
                    <div
                      key={index}
                      className="relative z-10 -ml-2 h-6 w-6 overflow-hidden rounded-full border-2 border-white"
                    >
                      <Image
                        src={member.avatar || '/images/default-avatar.png'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <span className="relative z-10 -ml-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-200 text-xs font-medium text-gray-500">
                    +3
                  </span>
                </div>
              </div>
              <h3 className="mt-3 font-semibold">{track.name}</h3>
              <p className="mb-2 text-sm text-gray-500">
                {track.uncompletedTasks} task uncompleted Task
              </p>
              {/* Project progress Bar */}
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/3 bg-blue-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// const allTracks = [
//   {
//     icon: <CheckCircle />,
//     name: 'Design Team',
//     status: '10 uncompleted tasks',
//     members: [],
//   },
//   {
//     icon: <Wrench />,
//     name: 'Engineering',
//     status: '10 uncompleted tasks',
//   },
//   {
//     icon: <FileText />,
//     name: 'Content Team',
//     status: '10 uncompleted tasks',
//   },
//   {
//     icon: <Box />,
//     name: 'Product',
//     status: '10 uncompleted tasks',
//   },
// ];
export default tracks;
