'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import CardItem from '@/components/cardItem';
import RadarChart from '@/components/radar-chart';
import RadialChart from '@/components/radial-chart';
import RecentCard from '@/components/recent-card';
import Deadline from '@/components/deadline-card';
import Loading from '@/components/dashboardSkeleton';
import { useAuthStore } from '@/store/useAuthStore';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  console.log('user', user);

  // simulate API fetch delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  // mock data for the cards
  const cards = [
    { title: 'Active Project', avatarUrl: 'images/3dcube.svg', content: '22' },
    { title: 'Overall Progress', avatarUrl: 'images/chart.svg', content: '22' },
    { title: 'Skill Tracked', avatarUrl: 'images/3square.svg', content: '3' },
    {
      title: 'Completed Project',
      avatarUrl: 'images/document-text.svg',
      content: '22',
    },
    {
      title: 'Pending Project',
      avatarUrl: 'images/document.svg',
      content: '3',
    },
  ];

  // for mobile carousel
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const cardWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', onScroll);
    return () => container.removeEventListener('scroll', onScroll);
  }, [loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="">
      <h2 className="pt-5 pb-9 text-2xl font-semibold max-sm:text-xl">
        Welcome back, {user?.first_name} {user?.last_name}
      </h2>
      {/* desktop card display */}
      <div className="mb-12 hidden gap-4 max-lg:flex-wrap sm:flex">
        {cards.map((card, i) => (
          <CardItem key={i} {...card} />
        ))}
      </div>

      {/* card display in mobile */}
      <div className="mb-8 sm:hidden">
        <div
          ref={scrollRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
        >
          {cards.map((card, i) => (
            <div key={i} className="w-full shrink-0 snap-center">
              <CardItem {...card} />
            </div>
          ))}
        </div>
        {/* indicator button container */}
        <div className="mt-4 flex justify-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === activeIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Chart section */}
      <div className="mb-12 flex items-stretch gap-6 max-sm:flex-col">
        <div className="flex-1 lg:flex-2/3">
          <RadarChart />
        </div>
        <div className="flex-1 lg:flex-1/3">
          <RadialChart />
        </div>
      </div>
      <div>
        <div className="mb-12 flex items-stretch gap-6 max-sm:flex-col">
          <div className="flex-1 lg:flex-2/3">
            <RecentCard />
          </div>
          <div className="flex-1 lg:flex-1/3">
            <Deadline />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
