'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '../../../../../components/ui/button';
import TeamMemberCard from '../components/team/TeamMemberCard';
import SearchFilter from '../components/team/SearchFilter';
import TeamProfileModal from '../components/team/TeamProfileModal';

import { TeamMember } from '../../../../(user)/member/projects/components/assigned-team-member';

interface TeamMemberPreview {
  id: number;
  name: string;
  track: string;
  skills: Record<string, number>;
  image: string;
  github?: string;
  isVerified?: boolean;
}

const teamMemberSkill: TeamMemberPreview[] = [
  { id: 0, image: '/images/Darrell Steward.png', name: 'Darrell Steward', track: 'Data Analyst', github: 'https://github.com/darrell', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 1, image: '/images/Ronald Richards.png', name: 'Ronald Richards', track: 'Product Analyst', github: 'https://github.com/richards', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 2, image: '/images/Jane Cooper.png', name: 'Jane Cooper', track: 'Interaction Designer', github: 'https://github.com/jane', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 3, image: '/images/Arlene McCoy.png', name: 'Arlene McCoy', track: 'Product Manager', github: 'https://github.com/arlene', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 4, image: '/images/Marvin McKinney.png', name: 'Marvin McKinney', track: 'Content Operations', github: 'https://github.com/marvin', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 5, image: '/images/Marvin McKinney.png', name: 'Marvin McKinney', track: 'Content Operations', github: 'https://github.com/marvin', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 6, image: '/images/Marvin McKinney.png', name: 'Marvin McKinney', track: 'Content Operations', github: 'https://github.com/marvin', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 7, image: '/images/Marvin McKinney.png', name: 'Marvin McKinney', track: 'Content Operations', github: 'https://github.com/marvin', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
  { id: 8, image: '/images/Marvin McKinney.png', name: 'Marvin McKinney', track: 'Content Operations', github: 'https://github.com/marvin', isVerified: true, skills: { Python: 30, TypeScript: 70, React: 70 } },
];

export default function TeamSkillStrength() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    const searchLower = search.toLowerCase();
    return teamMemberSkill.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchLower) ||
        member.track.toLowerCase().includes(searchLower) ||
        Object.keys(member.skills).some((skill) =>
          skill.toLowerCase().includes(searchLower)
        );
      const matchesTrack = trackFilter === 'All' || member.track === trackFilter;
      return matchesSearch && matchesTrack;
    });
  }, [search, trackFilter]);

  const visibleMembers = filteredMembers.slice(0, 4);
  const tracks = ['All', ...new Set(teamMemberSkill.map((m) => m.track))];

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

  const handleSendMessage = () => {
    if (selectedMember) console.log('Message sent to:', selectedMember.name);
  };

  return (
    <>
      <div className="rounded-3xl border border-gray-100 w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between p-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">Team Skill Strength</h4>
            <p className="text-sm text-gray-500">Overview of team capabilities and performance</p>
          </div>

          <Button
            variant="link"
            onClick={() => router.push('/organization/team-matrix/team/skill-strength')}
            className={`flex items-center gap-2 text-sm transition p-0 ${
              filteredMembers.length > 4
                ? 'text-blue-600 hover:underline cursor-pointer'
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={filteredMembers.length <= 4}
          >
            View More
            <Image
              src="/images/formkit_arrowright.png"
              alt="view all arrow"
              width={24}
              height={14}
            />
          </Button>
        </div>

        {/* Search + Filter */}
        <div className="px-6 pb-4">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            trackFilter={trackFilter}
            setTrackFilter={setTrackFilter}
            tracks={tracks}
          />
        </div>

        {/* Grid of Cards */}
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-700">No team members found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid gap-10 p-6 grid-cols-[repeat(auto-fit,minmax(220px,260px))] justify-start">
            {visibleMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
              >
                <TeamMemberCard member={member} onView={handleDisplayProfile} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <TeamProfileModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSendMessage={handleSendMessage}
      />
    </>
  );
}