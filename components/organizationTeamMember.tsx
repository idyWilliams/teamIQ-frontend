import React from 'react';
import { DataTable } from '@/components/dataTable';
import { columns } from '@/components/ui/columns';
import { TeamMember } from '@/constants/team-member';

const mockData: TeamMember[] = [
  {
    name: 'Kristin Watson',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Product Design',
    skills: ['Figma', 'Sketch'],
    status: 'Busy',
    rating: 4.5,
    tasksCompleted: 25,
    lastSeen: '25 task completed',
  },
  {
    name: 'Wade Warren',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Frontend Dev',
    skills: ['Node.js', 'Python'],
    status: 'Available',
    rating: 4.5,
    tasksCompleted: 27,
    lastSeen: '27 task completed',
  },
  {
    name: 'Arlene McCoy',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Full-stack dev',
    skills: ['Product Strategy and Data Analytics'],
    status: 'Available',
    rating: 4.5,
    tasksCompleted: 21,
    lastSeen: '21 task completed',
  },
  {
    name: 'Guy Hawkins',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Backend Dev',
    skills: ['Node.js', 'Python'],
    status: 'Available',
    rating: 4.5,
    tasksCompleted: 43,
    lastSeen: '43 task completed',
  },
  {
    name: 'Marvin McKinney',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Full-stack dev',
    skills: ['Node.js', 'Python'],
    status: 'Offline',
    rating: 4.5,
    tasksCompleted: 33,
    lastSeen: '33 task completed',
  },
  {
    name: 'Esther Howard',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Frontend Dev',
    skills: ['Figma', 'Sketch'],
    status: 'Offline',
    rating: 4.5,
    tasksCompleted: 27,
    lastSeen: '27 task completed',
  },
  {
    name: 'Robert Fox',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Backend Dev',
    skills: ['Node.js', 'Python'],
    status: 'Available',
    rating: 4.5,
    tasksCompleted: 31,
    lastSeen: '31 task completed',
  },
  {
    name: 'Jenny Wilson',
    role: 'Product Designer',
    avatar: '/images/Female09.png',
    tasks: 'Product Design',
    skills: ['Figma', 'Sketch'],
    status: 'Busy',
    rating: 4.5,
    tasksCompleted: 29,
    lastSeen: '29 task completed',
  },
];

export default function TeamMembersPage() {
  return (
    <div className="w-full grow bg-white p-6">
      <DataTable columns={columns} data={mockData} />
    </div>
  );
}
