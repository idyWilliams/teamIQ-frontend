'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import SearchFilter from '../../components/team/SearchFilter';
import TeamProfileModal from '../../components/team/TeamProfileModal';

import { TeamMember } from '../../../../../(user)/member/projects/components/assigned-team-member';

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

export default function TeamSkillStrengthFullPage() {
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [trackFilter, setTrackFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showScrollTop, setShowScrollTop] = useState(false);

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

  const tracks = ['All', ...new Set(teamMemberSkill.map((m) => m.track))];

  // Reliable scroll detection using document.documentElement
  const handleScroll = useCallback(
    throttle(() => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      setShowScrollTop(scrolled > 200);
    }, 150),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDisplayProfile = useCallback((member: TeamMemberPreview) => {
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
  }, []);

  const handleSendMessage = () => {
    if (selectedMember) console.log('Message sent to:', selectedMember.name);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.back()} className="flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Team Skill Strength</h1>
            <p className="text-sm text-gray-500">Full overview of team capabilities and performance</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-6">
          <SearchFilter
            search={search}
            setSearch={setSearch}
            trackFilter={trackFilter}
            setTrackFilter={setTrackFilter}
            tracks={tracks}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 pb-24">
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg font-semibold text-gray-700">No team members found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <TeamMemberCard member={member} onView={handleDisplayProfile} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-2xl z-50 transition-all duration-200"
        >
          ↑
        </button>
      )}

      {/* Profile Modal */}
      <TeamProfileModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}