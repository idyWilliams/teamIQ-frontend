'use client';
import React from 'react';
import { useState, useEffect } from 'react';
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

  // simulate API fetch delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // mock data for the cards
  const cards = [
    { title: 'Active Projects', avatarUrl: 'images/3dcube.svg', content: '22', trend: '+2' },
    { title: 'Overall Progress', avatarUrl: 'images/chart.svg', content: '85%', trend: '+5%' },
    { title: 'Skills Tracked', avatarUrl: 'images/3square.svg', content: '12', trend: '+1' },
    {
      title: 'Completed Projects',
      avatarUrl: 'images/document-text.svg',
      content: '45',
      trend: '+12'
    },
    {
      title: 'Pending Tasks',
      avatarUrl: 'images/document.svg',
      content: '8',
      trend: '-2'
    },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="py-6 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user?.first_name || 'Member'}
        </h2>
        <p className="text-gray-500 text-sm font-medium">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card, i) => (
          <CardItem key={i} {...card} />
        ))}
      </div>

      {/* Intelligence Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RadarChart />
        </div>
        <div className="lg:col-span-1">
          <RadialChart />
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentCard />
        </div>
        <div className="lg:col-span-1">
          <Deadline />
        </div>
      </div>
    </div>
  );
}
