"use client";
import React from "react";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Search, CircleX } from "lucide-react";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue } from "../ui/select";
// import { defaultTeamMembers } from "../assigned-team-member";
import { TeamMember } from "../assigned-team-member";

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
      status: "Active",
      email: "",
      slack: "",
      skills: Object.keys(member.skills),
      specialties: [],
      tasksCompleted: 0,
      monthlyKPI: 0,
      topSkills: Object.entries(member.skills).map(([name, rating]) => ({
        name,
        rating,
        color: "bg-blue-500",
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
      console.log("Message sent to:", selectedMember.name);
    }
  };

  return (
    <>
      <div className="border border-gray-100 sm:m-2 lg:m-6 rounded-3xl">
        <div className="p-6 flex place-content-between">
          <h4 className="text-base font-semibold">Team Skill Strength</h4>
          <a
            // href="http://"
            // target="_blank"
            // rel="noopener noreferrer"
            className="text-blue-600 text-sm flex items-center gap-2 hover:underline"
            onClick={handleViewAll}
          >
            View More
            <Image
              src={`/images/formkit_arrowright.png`}
              alt={"view all arrow"}
              width={24}
              height={14}
            />
          </a>
          {/* Open the view All team members button */}
          {openViewAll && (
            <div className="border border-gray-100 fixed inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm z-50">
              <div className=" relative bg-white p-14 rounded-2xl w-[744] h-[792] overflow-y-auto">
                <h4 className="font-semibold text-xl">Team Skill Strength</h4>
                <div className="p-4 flex place-content-between">
                  <div className="relative">
                    <Search className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search for anything"
                      className="pl-10 w-[348px] text-gray-700 placeholder:text-gray-400 focus:ring-0"
                    ></Input>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Tracks" />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2 p-4 text-xs">
                  {teamMemberSkill.map((teamMember) => (
                    <Card key={teamMember.id} className="bg-gray-50 border-0">
                      <CardContent>
                        <div className="flex flex-col items-center">
                          <Image
                            src={teamMember.image || "/default-avatar.png"}
                            alt={teamMember.name}
                            width={64}
                            height={64}
                            className="rounded-full object-cover mb-2"
                          />
                          <h4 className="font-semibold text-xs">
                            {teamMember.name}
                          </h4>
                          <p className="text-gray-400 text-xs">
                            {teamMember.track}
                          </p>
                        </div>
                        <div className="mt-4">
                          {Object.entries(teamMember.skills).map(
                            ([name, value]) => (
                              <p
                                key={name}
                                className="flex place-content-between gap-2 font-semibold text-xs"
                              >
                                <span className={`${skillColors[name]}`}>
                                  {name}:{" "}
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
                        className="mx-4 bg-iq-500 hover:bg-iq-300"
                        onClick={() => handleDisplayProfile(teamMember)}
                      >
                        View
                      </Button>
                    </Card>
                  ))}
                </div>
                <CircleX
                  onClick={handleCloseViewAll}
                  className="absolute top-0 right-0 rounded-full text-white bg-iq-900 coloi"
                />
              </div>
            </div>
          )}
        </div>
        <div className="sm:p-2  m-2 gap-2 lg:p-6 flex place-content-between">
          <div className="relative">
            <Search className="sm:text-xs text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for anything"
              className="pl-10 sm:w-[200px] text-xs lg:w-[348px] text-gray-700 placeholder:text-gray-400 focus:ring-0"
            ></Input>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Tracks" />
            </SelectTrigger>
          </Select>
        </div>
        {/* Grid for all team Members */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-2 p-6 text-xs">
          {teamMemberSkill.map((teamMember) => (
            <Card key={teamMember.id} className="bg-gray-50 border-0">
              <CardContent>
                <div className="flex flex-col items-center">
                  <Image
                    src={teamMember.image || "/default-avatar.png"}
                    alt={teamMember.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover mb-2"
                  />
                  <h4 className="font-semibold text-xs">{teamMember.name}</h4>
                  <p className="text-gray-400 text-xs">{teamMember.track}</p>
                </div>
                <div className="mt-4">
                  {Object.entries(teamMember.skills).map(([name, value]) => (
                    <p
                      key={name}
                      className="flex place-content-between gap-2 font-semibold text-xs"
                    >
                      <span className={`${skillColors[name]}`}>{name}: </span>
                      <span className={`${valueColors[name]}`}>{value}%</span>
                    </p>
                  ))}
                </div>
              </CardContent>
              <Button
                className="mx-4 bg-iq-500 hover:bg-iq-300"
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
            className="fixed inset-0 bg-black/20 w-full my-auto shadow-xl z-50 flex flex-col items-center justify-center backdrop-blur-sm"
            // onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white rounded-2xl overflow-y-auto max-h-[90vh]">
              <div className="p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-0 right-0 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                <div className="flex items-start gap-6 mb-8">
                  <Image
                    src={selectedMember.avatar}
                    alt={`${selectedMember.name} profile picture`}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedMember.name}
                      </h2>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {selectedMember.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{selectedMember.role}</p>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-5 h-5 text-yellow-400"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div>
                    {/* Contact Information */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                          <svg
                            className="w-5 h-5 flex-shrink-0"
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
                        <div className="flex items-center gap-3 text-gray-700">
                          <svg
                            className="w-5 h-5 flex-shrink-0"
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
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Top Skill Rating
                      </h3>
                      <div className="space-y-3 mb-4">
                        {selectedMember.topSkills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                              <div
                                className={`${skill.color} h-full rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                                style={{ width: `${skill.rating}%` }}
                              >
                                {skill.rating}%
                              </div>
                            </div>
                            <span className="font-medium text-gray-900 w-20 text-right text-sm">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="#"
                        className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
                      >
                        View in Github
                        <svg
                          className="w-4 h-4"
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
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Skill
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Specialties */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Specialties
                      </h3>
                      <ul className="space-y-2">
                        {selectedMember.specialties.map((specialty) => (
                          <li
                            key={specialty}
                            className="flex items-center gap-2 text-gray-700"
                          >
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Performance */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Performance
                      </h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <div className="text-4xl font-bold text-gray-900 mb-1">
                            {selectedMember.tasksCompleted}
                          </div>
                          <div className="text-sm text-gray-600">
                            Task completed
                          </div>
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-gray-900 mb-1">
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
                    className="w-full bg-iq-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
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
  Python: "text-purple-500",
  TypeScript: "text-yellow-500",
  React: "text-pink-500",
};
const valueColors: Record<string, string> = {
  Python: "text-red-500",
  TypeScript: "text-green-500",
  React: "text-green-500",
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
    image: "/images/Darrell Steward.png",
    name: "Darrell Steward",
    track: "Data Analyst",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 1,
    image: "/images/Ronald Richards.png",
    name: "Ronald Richards",
    track: "Product Analyst",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 2,
    image: "/images/Jane Cooper.png",
    name: "Jane Cooper",
    track: "Interaction Designer",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 3,
    image: "/images/Arlene McCoy.png",
    name: "Arlene McCoy",
    track: "Product Manager",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 4,
    image: "/images/Marvin McKinney.png",
    name: "Marvin McKinney",
    track: "Content Operations",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 5,
    image: "/images/Jerome Bell.png",
    name: "Jerome Bell",
    track: "Frontend Dev",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 6,
    image: "/images/Brooklyn Simmons.png",
    name: "Brooklyn Simmons",
    track: "Product Manager",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 7,
    image: "/images/Theresa Webb.png",
    name: "Theresa Webb",
    track: "Product Designer",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
];
