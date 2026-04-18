'use client';

import { useState } from 'react';
import OrganizationMemberCard from '@/components/OrganisationMemberCard';
import { UserPlus, Calendar } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {  TeamMember } from '@/constants';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

export const TeamModal: React.FC<{
  selectedMember: TeamMember;
  onClose: () => void;
  handleSendMessage: () => void;
}> = ({ selectedMember, onClose, handleSendMessage }) => {
  // Function to generate initials from name
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div>
      <div className="p-2">
        {/* Header */}
        <div className="mb-8 flex items-start gap-6">
          {/* Replace Image with Initials */}
          {selectedMember.profile_picture ? (
            <Image
              src={selectedMember.profile_picture}
              alt={selectedMember.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-blue-200 bg-blue-100">
              <span className="text-2xl font-bold text-blue-600">
                {getInitials(selectedMember.name)}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedMember.name}
              </h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {selectedMember.status || 'Available'}
              </span>
            </div>
            <p className="mb-2 text-gray-600">{selectedMember.role}</p>
            <div className="flex items-center gap-1">
              <svg
                className="h-5 w-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold text-gray-900">
                {selectedMember.rating || 4.3}
              </span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div>
            {/* Contact Information */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{selectedMember.email || 'email@company.com'}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                  </svg>
                  <span>{selectedMember.slack || 'slack@company.com'}</span>
                </div>
              </div>
            </div>

            {/* Top Skill Rating */}
            {selectedMember.topSkills && (
              <div>
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
                      <span className="w-20 text-right text-sm font-medium text-gray-900">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href="#"
                  className="flex items-center gap-2 font-medium text-blue-600 hover:underline"
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
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Skills */}
            {selectedMember.skills && (
              <div className="mb-6">
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
            )}

            {/* Specialties */}
            {selectedMember.specialties && (
              <div className="mb-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  Specialties
                </h3>
                <ul className="space-y-2">
                  {selectedMember.specialties.map(specialty => (
                    <li
                      key={specialty}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400"></span>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Performance */}
            <div className="rounded-lg bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Performance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="mb-1 text-4xl font-bold text-gray-900">
                    {selectedMember.tasksCompleted || 123}
                  </div>
                  <div className="text-sm text-gray-600">Task completed</div>
                </div>
                <div>
                  <div className="mb-1 text-4xl font-bold text-gray-900">
                    {selectedMember.monthlyKPI || 67}%
                  </div>
                  <div className="text-sm text-gray-600">Monthly KPI</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Button */}
        <div className="mt-8">
          <Button
            onClick={handleSendMessage}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};
