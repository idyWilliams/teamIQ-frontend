'use client';

import Image from 'next/image';
import { CircleX } from 'lucide-react';
import { TeamMember } from '@/app/(user)/member/projects/components/assigned-team-member';

interface TeamProfileModalProps {
  member: TeamMember | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: () => void;
}

export default function TeamProfileModal({
  member,
  isOpen,
  onClose,
  onSendMessage,
}: TeamProfileModalProps) {
  if (!isOpen || !member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[60%] max-w-5xl max-h-[92vh] rounded-2xl bg-white shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 sm:p-4 flex-1 overflow-y-auto sm:overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white hover:bg-red-500 hover:scale-110 transition-all duration-200 cursor-pointer z-10"
          >
            <CircleX className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row items-start gap-4">
            <Image
              src={member.avatar}
              alt={`${member.name} profile picture`}
              width={96}
              height={96}
              className="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="mb-1 flex items-center gap-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{member.name}</h2>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {member.status}
                </span>
              </div>
              <p className="text-gray-600">{member.role}</p>
              <div className="flex items-center gap-1 mt-1">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-gray-900">{member.rating}</span>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
            {/* Left Column */}
            <div>
              <div className="mb-6 rounded-lg bg-[#F7F7F7] p-4">
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="break-all">{member.email || 'No email provided'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                    </svg>
                    <span className="break-all">{member.slack || 'No Slack ID'}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border-2 border-[#F7F7F7] p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Top Skill Rating</h3>
                <div className="mb-4 space-y-2 sm:space-y-3">
                  {member.topSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-6 sm:h-10 flex-1 overflow-hidden rounded-full bg-gray-200">
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
                <a href="#" className="flex items-center justify-center gap-2 font-medium text-blue-600 hover:underline">
                  View in Github
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="mb-3 text-base sm:text-lg font-semibold text-gray-900">Specialties</h3>
                <ul className="space-y-2">
                  {member.specialties.length > 0 ? (
                    member.specialties.map((specialty) => (
                      <li key={specialty} className="flex items-center gap-2 text-gray-700">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                        {specialty}
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No specialties listed</p>
                  )}
                </ul>
              </div>

              <div className="rounded-lg border-2 border-[#F7F7F7] p-4">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">Performance</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-2xl sm:text-4xl font-bold text-gray-900">{member.tasksCompleted}</div>
                    <div className="text-sm text-gray-600">Tasks completed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-gray-900">{member.monthlyKPI}%</div>
                    <div className="text-sm text-gray-600">Monthly KPI</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Button */}
        <div className="border-t p-3 bg-white flex justify-center">
          <button
            onClick={onSendMessage}
            className="bg-iq-500 w-full sm:w-auto sm:min-w-[200px] rounded-lg py-2 px-6 font-semibold text-white hover:bg-blue-700 cursor-pointer"
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
}