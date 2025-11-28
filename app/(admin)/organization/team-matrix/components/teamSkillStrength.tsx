'use client';
import React from 'react';
import { useState } from 'react';
import { Card, CardContent } from '../../../../../components/ui/card';
import Image from 'next/image';
import { Button } from '../../../../../components/ui/button';
import { Search, CircleX } from 'lucide-react';
import { Input } from '../../../../../components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
// import { defaultTeamMembers } from "../assigned-team-member";
import { TeamMember } from '../../../../(user)/member/projects/components/assigned-team-member';

export default function TeamSkillStrength() {
  const [openViewAll, setOpenViewAll] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [displayTeamMember, setDisplayTeamMember] = useState(false);

  const handleDisplayProfile = (member: TeamMemberPreview) => {
    const fullMember: TeamMember = {
      name: member.name,
      role: member.track,
      avatar: member.image,
      rating: 0,
      status: 'Active',
      email: '',
      slack: '',
      skills: Object.keys(member.skills),
      specialties: [],
      tasksCompleted: 0,
      monthlyKPI: 0,
      topSkills: Object.entries(member.skills).map(([name, rating]) => ({
        name,
        rating,
        color: 'bg-blue-500',
      })),
    };
    setSelectedMember(fullMember);
    setIsModalOpen(true);
  };

  // const closeProfile = () => setSelectedMember(null);

  const handleViewAll = () => setOpenViewAll(true);
  const handleCloseViewAll = () => setOpenViewAll(false);

  const handleSendMessage = () => {
    if (selectedMember) {
      console.log('Message sent to:', selectedMember.name);
    }
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-100 sm:m-2 lg:m-6">
        <div className="flex place-content-between p-6">
          <h4 className="text-base font-semibold">Team Skill Strength</h4>
          <a
            // href="http://"
            // target="_blank"
            // rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            onClick={handleViewAll}
          >
            View More
            <Image
              src={`/images/formkit_arrowright.png`}
              alt={'view all arrow'}
              width={24}
              height={14}
            />
          </a>
          {/* Open the view All team members button */}
          {openViewAll && (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center border border-gray-100 bg-black/20 backdrop-blur-sm">
              <div className="relative h-[792] w-[744] overflow-y-auto rounded-2xl bg-white p-14">
                <h4 className="text-xl font-semibold">Team Skill Strength</h4>
                <div className="flex place-content-between p-4">
                  <div className="relative">
                    <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search for anything"
                      className="w-[348px] pl-10 text-gray-700 placeholder:text-gray-400 focus:ring-0"
                    ></Input>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Tracks" />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="grid gap-2 p-4 text-xs sm:grid-cols-1 lg:grid-cols-3">
                  {teamMemberSkill.map(teamMember => (
                    <Card key={teamMember.id} className="border-0 bg-gray-50">
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <Image
                            src={teamMember.image || '/default-avatar.png'}
                            alt={teamMember.name}
                            width={64}
                            height={64}
                            className="mb-2 rounded-full object-cover"
                          />
                          <h4 className="text-xs font-semibold">
                            {teamMember.name}
                          </h4>
                          <p className="text-xs text-gray-400">
                            {teamMember.track}
                          </p>
                        </div>
                        <div className="mt-4">
                          {Object.entries(teamMember.skills).map(
                            ([name, value]) => (
                              <p
                                key={name}
                                className="flex place-content-between gap-2 text-xs font-semibold"
                              >
                                <span className={`${skillColors[name]}`}>
                                  {name}:{' '}
                                </span>
                                <span className={`${valueColors[name]}`}>
                                  {value}%
                                </span>
                              </p>
                            )
                          )}
                        </div>
                      </CardContent>
                      <Button
                        className="bg-iq-500 hover:bg-iq-300 mx-4"
                        onClick={() => handleDisplayProfile(teamMember)}
                      >
                        View
                      </Button>
                    </Card>
                  ))}
                </div>
                <CircleX
                  onClick={handleCloseViewAll}
                  className="bg-iq-900 coloi absolute top-0 right-0 rounded-full text-white"
                />
              </div>
            </div>
          )}
        </div>
        <div className="m-2 flex place-content-between gap-2 sm:p-2 lg:p-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400 sm:text-xs" />
            <Input
              type="text"
              placeholder="Search for anything"
              className="pl-10 text-xs text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:w-[200px] lg:w-[348px]"
            ></Input>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Tracks" />
            </SelectTrigger>
          </Select>
        </div>
        {/* Grid for all team Members */}
        <div className="grid gap-2 p-6 text-xs sm:grid-cols-1 lg:grid-cols-4">
          {teamMemberSkill.map(teamMember => (
            <Card key={teamMember.id} className="border-0 bg-gray-50">
              <CardContent>
                <div className="flex flex-col items-center">
                  <Image
                    src={teamMember.image || '/default-avatar.png'}
                    alt={teamMember.name}
                    width={64}
                    height={64}
                    className="mb-2 rounded-full object-cover"
                  />
                  <h4 className="text-xs font-semibold">{teamMember.name}</h4>
                  <p className="text-xs text-gray-400">{teamMember.track}</p>
                </div>
                <div className="mt-4">
                  {Object.entries(teamMember.skills).map(([name, value]) => (
                    <p
                      key={name}
                      className="flex place-content-between gap-2 text-xs font-semibold"
                    >
                      <span className={`${skillColors[name]}`}>{name}: </span>
                      <span className={`${valueColors[name]}`}>{value}%</span>
                    </p>
                  ))}
                </div>
              </CardContent>
              <Button
                className="bg-iq-500 hover:bg-iq-300 mx-4"
                onClick={() => handleDisplayProfile(teamMember)}
              >
                View
              </Button>
            </Card>
          ))}
        </div>
        {/* View a team member profile modal */}
        {isModalOpen && selectedMember && (
          <div
            className="fixed inset-0 z-50 my-auto flex w-full flex-col items-center justify-center bg-black/20 shadow-xl backdrop-blur-sm"
            // onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[90vh] overflow-y-auto rounded-2xl bg-white">
              <div className="p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition-colors hover:bg-gray-800"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                {/* Header */}
                <div className="mb-8 flex items-start gap-4">
                  <Image
                    src={selectedMember.avatar}
                    alt={`${selectedMember.name} profile picture`}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedMember.name}
                      </h2>
                      <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
                        {selectedMember.status}
                      </span>
                    </div>
                    <p className="mb-1 text-gray-600">{selectedMember.role}</p>
                    <div className="flex items-center gap-1">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900">
                        {selectedMember.rating}
                      </span>
                    </div>
                  </div>
                </div>
                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {/* Left Column */}
                  <div>
                    {/* Contact Information */}
                    <div className="mb-6 rounded-lg bg-[#F7F7F7] p-4">
                      <h3 className="mb-3 text-lg font-semibold text-gray-900">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="break-all">
                            {selectedMember.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <svg
                            className="h-4 w-4 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                          </svg>
                          <span className="break-all">
                            {selectedMember.slack}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Top Skill Rating */}
                    <div className="rounded-lg border-2 border-[#F7F7F7] p-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Top Skill Rating
                      </h3>
                      <div className="mb-4 space-y-3">
                        {selectedMember.topSkills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="h-10 flex-1 overflow-hidden rounded-full bg-gray-200">
                              <div
                                className={`${skill.color} flex h-full items-center justify-center rounded-full text-sm font-semibold text-white`}
                                style={{ width: `${skill.rating}%` }}
                              >
                                {skill.rating}%
                              </div>
                            </div>
                            <span className="w-20 text-right text-sm font-semibold text-gray-900">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="text-decoration-line-through flex items-center justify-center gap-2 font-medium text-blue-600 hover:underline"
                      >
                        View in Github
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Skills */}
                    <div className="mb-12">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Skill
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map(skill => (
                          <span
                            key={skill}
                            className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900">
                        Specialties
                      </h3>
                      <ul className="space-y-2">
                        {selectedMember.specialties.map(specialty => (
                          <li
                            key={specialty}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400"></span>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance */}
                    <div className="rounded-lg border-2 border-[#F7F7F7] p-4">
                      <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Performance
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="mb-1 text-4xl font-bold text-gray-900">
                            {selectedMember.tasksCompleted}
                          </div>
                          <div className="text-sm text-gray-600">
                            Task completed
                          </div>
                        </div>
                        <div>
                          <div className="mb-1 text-4xl font-bold text-gray-900">
                            {selectedMember.monthlyKPI}%
                          </div>
                          <div className="text-sm text-gray-600">
                            Monthly KPI
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Message Button */}
                <div className="mt-8">
                  <button
                    onClick={handleSendMessage}
                    className="bg-iq-500 w-full rounded-lg py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const skillColors: Record<string, string> = {
  Python: 'text-purple-500',
  TypeScript: 'text-yellow-500',
  React: 'text-pink-500',
};
const valueColors: Record<string, string> = {
  Python: 'text-red-500',
  TypeScript: 'text-green-500',
  React: 'text-green-500',
};
interface TeamMemberPreview {
  id: number;
  name: string;
  track: string;
  skills: Record<string, number>;
  image: string;
}
const teamMemberSkill: TeamMemberPreview[] = [
  {
    id: 0,
    image: '/images/Darrell Steward.png',
    name: 'Darrell Steward',
    track: 'Data Analyst',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 1,
    image: '/images/Ronald Richards.png',
    name: 'Ronald Richards',
    track: 'Product Analyst',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 2,
    image: '/images/Jane Cooper.png',
    name: 'Jane Cooper',
    track: 'Interaction Designer',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 3,
    image: '/images/Arlene McCoy.png',
    name: 'Arlene McCoy',
    track: 'Product Manager',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 4,
    image: '/images/Marvin McKinney.png',
    name: 'Marvin McKinney',
    track: 'Content Operations',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 5,
    image: '/images/Jerome Bell.png',
    name: 'Jerome Bell',
    track: 'Frontend Dev',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 6,
    image: '/images/Brooklyn Simmons.png',
    name: 'Brooklyn Simmons',
    track: 'Product Manager',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 7,
    image: '/images/Theresa Webb.png',
    name: 'Theresa Webb',
    track: 'Product Designer',
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
];
