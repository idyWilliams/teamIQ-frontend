// components/wave-progress.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WaveProgressProps {
  percentage: number;
  label: string;
  subtitle: string;
  backgroundColor?: string;
  waveColor?: string;
}
// Props for the entire WaveProgressCard component I've made them optional (make it reusable for me) so they can take fallback data
interface WaveProgressCardProps {
  progressData?: WaveProgressProps[];
  title?: string;
  showButton?: boolean;
  zeroMargin?: boolean;
}

/**Pass default data to make the component reusable
 * Allows passing default progress data for reusability.
 * Will be replaced once we integrate an API
 */
export function WaveProgressCard({
  progressData,
  title,
  showButton = true,
  zeroMargin = false,
}: WaveProgressCardProps) {
  const defaultData: WaveProgressProps[] = [
    {
      percentage: 50,
      label: '2-4 member are Strong',
      subtitle: 'React',
      waveColor: 'purple',
    },
    {
      percentage: 70,
      label: '2-4 member are Strong',
      subtitle: 'Node.js',
      waveColor: 'yellow',
    },
    {
      percentage: 50,
      label: '2-4 member are Strong',
      subtitle: 'TypeScript',
      waveColor: 'pink',
    },
    {
      percentage: 50,
      label: '2-4 member are Strong',
      subtitle: 'TypeScript',
      waveColor: 'orange',
    },
    {
      percentage: 50,
      label: '2-4 member are Strong',
      subtitle: 'Golang',
      waveColor: 'blue',
    },
    {
      percentage: 50,
      label: '2-4 member are Strong',
      subtitle: 'Golang',
      waveColor: 'green',
    },
  ];
  // We can either use provided data, otherwise fallback to default
  const dataToRender = progressData?.length ? progressData : defaultData;

  return (
    <div className={`${zeroMargin ? '' : 'm-6'} border-gray-50 `}>
      <Card className='shadow-none'>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>{title || 'Team Skills Overview'}</CardTitle>
          {/* Conditionally render “View More” button */}
          {showButton && (
            <button className="group flex items-center gap-1 text-sm text-[#086ACE] transition-colors hover:text-blue-700">
              <span className="font-medium">View More</span>
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
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
            </button>
          )}
        </CardHeader>
        <CardContent className="px-4">
          <div
            className="grid items-start justify-items-center gap-0"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            }}
          >
            {dataToRender.map((progress, index) => (
              <WaveProgress
                key={index}
                percentage={progress.percentage}
                label={progress.label}
                subtitle={progress.subtitle}
                backgroundColor={progress.backgroundColor}
                waveColor={progress.waveColor}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function WaveProgress({
  percentage,
  label,
  subtitle,
  backgroundColor = '#FBFBFB',
  waveColor = 'red',
}: WaveProgressProps) {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const waveColors = {
    red: {
      primary: '#ef4444',
      secondary: '#f87171',
      tertiary: '#fca5a5',
    },
    blue: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      tertiary: '#93c5fd',
    },
    green: {
      primary: '#10b981',
      secondary: '#34d399',
      tertiary: '#6ee7b7',
    },
    yellow: {
      primary: '#eab308',
      secondary: '#facc15',
      tertiary: '#fde047',
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      tertiary: '#c4b5fd',
    },
  };

  const currentWaveColors =
    waveColors[waveColor as keyof typeof waveColors] || waveColors.red;

  return (
    <div className="flex w-full flex-col items-center gap-1 p-1">
      {/* Wave Progress Container */}
      <div
        className="relative h-[150px] w-[135px] grow overflow-hidden rounded-lg border border-blue-200"
        style={{ backgroundColor }}
      >
        {/* Wave Animation Container */}
        <div
          className="absolute right-0 bottom-0 left-0 overflow-hidden transition-all duration-1000 ease-out"
          style={{ height: `${animatedPercentage}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0">
            {/* Wave pattern */}
            <div className="wave-animation absolute bottom-0 h-full w-[200%]">
              <svg
                viewBox="0 0 200 100"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 50 Q50 30 100 50 T200 50 L200 100 L0 100 Z"
                  fill={currentWaveColors.primary}
                />
              </svg>
            </div>

            {/* Secondary wave */}
            <div className="wave-animation-slow absolute bottom-0 h-full w-[200%]">
              <svg
                viewBox="0 0 200 100"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 60 Q60 40 120 60 T200 60 L200 100 L0 100 Z"
                  fill={currentWaveColors.secondary}
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="absolute right-0 bottom-1 left-0 flex flex-col items-center justify-center">
          <span className="z-10 text-base leading-none font-bold text-white drop-shadow-md">
            {percentage}%
          </span>
          <span className="z-10 mt-0 px-1 text-center text-[10px] leading-tight font-medium text-white drop-shadow-md">
            {label}
          </span>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <span className="text-xs leading-tight font-semibold text-black">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
