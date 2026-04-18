import React from 'react';
import { DataTable } from '@/components/dataTable';
import { columns } from '@/components/ui/columns';
import { TeamMember } from '@/constants/team-member';
import { useOrganizationTeamMember } from '@/services/hooks/useOrgProfile';

// const mockData: TeamMember[] = [

//   {
//     id: 1,
//     name: 'Kristin Watson',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Product Design',
//     skills: ['Figma', 'Sketch'],
//     status: 'Busy',
//     rating: 4.5,
//     tasksCompleted: 25,
//     lastSeen: '25 task completed',
//   },
//   {
//     id: 2,
//     name: 'Wade Warren',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Frontend Dev',
//     skills: ['Node.js', 'Python'],
//     status: 'Available',
//     rating: 4.5,
//     tasksCompleted: 27,
//     lastSeen: '27 task completed',
//   },
//   {
//     id: 3,
//     name: 'Arlene McCoy',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Full-stack dev',
//     skills: ['Product Strategy and Data Analytics'],
//     status: 'Available',
//     rating: 4.5,
//     tasksCompleted: 21,
//     lastSeen: '21 task completed',
//   },
//   {
//     id: 4,
//     name: 'Guy Hawkins',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Backend Dev',
//     skills: ['Node.js', 'Python'],
//     status: 'Available',
//     rating: 4.5,
//     tasksCompleted: 43,
//     lastSeen: '43 task completed',
//   },
//   {
//     id: 5,
//     name: 'Marvin McKinney',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Full-stack dev',
//     skills: ['Node.js', 'Python'],
//     status: 'Offline',
//     rating: 4.5,
//     tasksCompleted: 33,
//     lastSeen: '33 task completed',
//   },
//   {
//     id: 6,
//     name: 'Esther Howard',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Frontend Dev',
//     skills: ['Figma', 'Sketch'],
//     status: 'Offline',
//     rating: 4.5,
//     tasksCompleted: 27,
//     lastSeen: '27 task completed',
//   },
//   {
//     id: 7,
//     name: 'Robert Fox',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Backend Dev',
//     skills: ['Node.js', 'Python'],
//     status: 'Available',
//     rating: 4.5,
//     tasksCompleted: 31,
//     lastSeen: '31 task completed',
//   },
//   {
//     id: 8,
//     name: 'Jenny Wilson',
//     role: 'Product Designer',
//     avatar: '/images/Female09.png',
//     tasks: 'Product Design',
//     skills: ['Figma', 'Sketch'],
//     status: 'Busy',
//     rating: 4.5,
//     tasksCompleted: 29,
//     lastSeen: '29 task completed',
//   },
// ];

// const members: TeamMember[]

export default function TeamMembersPage() {
  const { data: members, isLoading, error } = useOrganizationTeamMember();
    console.log("data", members);
  return (
    <div className="w-full grow bg-white p-6">
      <DataTable columns={columns} data={members || []} />
    </div>
  );
}
