import React from 'react';
import TeamRecommendation from './organization-dashboard-components/teamRecommendation';
import ProjectReadiness from './organization-dashboard-components/projectReadiness';
import TeamSkillStrength from './organization-dashboard-components/teamSkillStrength';
import { WaveProgressCard } from './wave-progress';
import CardItem from './cardItem';

export default function matrix() {
  return (
    <>
      <div className='w-[844] grid grid-cols-4 gap-2'>
        {cardData.map((item, i) => (
          <CardItem
            key={i}
            title={item.title}
            avatarUrl={item.avatarUrl}
            content={item.content}
          />
        ))}
      </div>
      <div className="flex">
        <div>
          <WaveProgressCard title="Skill Gap Analysis" />
          <TeamSkillStrength />
          <ProjectReadiness />
        </div>
        <TeamRecommendation />
      </div>
    </>
  );
}

const cardData = [
  {
    title: 'Team Members',
    avatarUrl: '/images/IconSet (1).png',
    content: "22",
  },
  {
    title: 'Skills Covered',
    avatarUrl:
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxheWVycy1pY29uIGx1Y2lkZS1sYXllcnMiPjxwYXRoIGQ9Ik0xMi44MyAyLjE4YTIgMiAwIDAgMC0xLjY2IDBMMi42IDYuMDhhMSAxIDAgMCAwIDAgMS44M2w4LjU4IDMuOTFhMiAyIDAgMCAwIDEuNjYgMGw4LjU4LTMuOWExIDEgMCAwIDAgMC0xLjgzeiIvPjxwYXRoIGQ9Ik0yIDEyYTEgMSAwIDAgMCAuNTguOTFsOC42IDMuOTFhMiAyIDAgMCAwIDEuNjUgMGw4LjU4LTMuOUExIDEgMCAwIDAgMjIgMTIiLz48cGF0aCBkPSJNMiAxN2ExIDEgMCAwIDAgLjU4LjkxbDguNiAzLjkxYTIgMiAwIDAgMCAxLjY1IDBsOC41OC0zLjlBMSAxIDAgMCAwIDIyIDE3Ii8+PC9zdmc+',
    content: "22",
  },
  {
    title: 'Growth this Month',
    avatarUrl: '/images/IconSet (2).png',
    content: `+19%`,
  },
  {
    title: 'Pending Tasks',
    avatarUrl: '/images/IconSet.png',
    content: "3",
  },
];
