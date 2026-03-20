'use client'
import React from 'react';
import TeamRecommendation from './teamRecommendation';
import ProjectReadiness from './projectReadiness';
import TeamSkillStrength from './teamSkillStrength';
import { WaveProgressCard } from '../../../../../components/wave-progress';
import CardItem from '../../../../../components/cardItem';
import { useOrganizationUsers } from '@/services/hooks/useUsers';

export default function Matrix() {
  const { data: users, isLoading, error } = useOrganizationUsers();
  const cardData = [
    {
      title: 'Team Members',
      avatarUrl: '/images/IconSet (1).png',
      content: users ? `${users.length}` : "0",
    },
    {
      title: 'Skills Covered',
      avatarUrl:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheWVycy1pY29uIGx1Y2lkZS1sYXllcnMiPjxwYXRoIGQ9Ik0xMi44MyAyLjE4YTIgMiAwIDAgMC0xLjY2IDBMMi42IDYuMDhhMSAxIDAgMCAwIDAgMS44M2w4LjU4IDMuOTFhMiAyIDAgMCAwIDEuNjYgMGw4LjU4LTMuOWExIDEgMCAwIDAgMC0xLjgzeiIvPjxwYXRoIGQ9Ik0yIDEyYTEgMSAwIDAgMCAuNTguOTFsOC42IDMuOTFhMiAyIDAgMCAwIDEuNjUgMGw4LjU4LTMuOUExIDEgMCAwIDAgMjIgMTIiLz48cGF0aCBkPSJNMiAxN2ExIDEgMCAwIDAgLjU4LjkxbDguNiAzLjkxYTIgMiAwIDAgMCAxLjY1IDBsOC41OC0zLjlBMSAxIDAgMCAwIDIyIDE3Ii8+PC9zdmc+',
      content: '22',
    },
    {
      title: 'Growth this Month',
      avatarUrl: '/images/IconSet (2).png',
      content: `+19%`,
    },
    {
      title: 'Pending Tasks',
      avatarUrl: '/images/IconSet.png',
      content: '3',
    },
  ];

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-2 px-6">
        {cardData.map((item, i) => (
          <CardItem
            key={i}
            title={item.title}
            avatarUrl={item.avatarUrl}
            content={item.content}
          />
        ))}
      </div>
      <div className="flex ">
        <div className='flex-2'>
          <WaveProgressCard title="Skill Gap Analysis" />
          <TeamSkillStrength />
          <ProjectReadiness />
        </div>
        <div className='flex-1'>
        <TeamRecommendation />
        </div>
      </div>
    </>
  );
}


