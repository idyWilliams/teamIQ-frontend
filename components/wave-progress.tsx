// components/wave-progress.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WaveProgressProps {
  percentage: number;
  label: string;
  subtitle: string;
  backgroundColor?: string;
  waveColor?: string;
}

interface WaveProgressCardProps {
  progressData: WaveProgressProps[];
}

export function WaveProgressCard({ progressData }: WaveProgressCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Team Skills Overview</CardTitle>
        <button className="flex items-center gap-1 text-[#086ACE] hover:text-blue-700 transition-colors group text-sm">
          <span className="font-medium">View More</span>
          <svg
            className="w-3 h-3 transition-transform group-hover:translate-x-1"
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
      </CardHeader>
      <CardContent>
        <div
          className="lg:grid-cols-4 xl:grid-cols-5 gap-1 grid justify-items-center items-start"
          // style={{
          //   gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          // }}
        >
          {progressData.map((progress, index) => (
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
  );
}

export function WaveProgress({
  percentage,
  label,
  subtitle,
  backgroundColor = "#FBFBFB",
  waveColor = "red",
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
      primary: "#ef4444",
      secondary: "#f87171",
      tertiary: "#fca5a5",
    },
    blue: {
      primary: "#3b82f6",
      secondary: "#60a5fa",
      tertiary: "#93c5fd",
    },
    green: {
      primary: "#10b981",
      secondary: "#34d399",
      tertiary: "#6ee7b7",
    },
    yellow: {
      primary: "#eab308",
      secondary: "#facc15",
      tertiary: "#fde047",
    },
    purple: {
      primary: "#8b5cf6",
      secondary: "#a78bfa",
      tertiary: "#c4b5fd",
    },
  };

  const currentWaveColors =
    waveColors[waveColor as keyof typeof waveColors] || waveColors.red;

  return (
    <div className="flex flex-col w-full items-center gap-1 p-1">
      {/* Wave Progress Container */}
      <div
        className="relative w-[150px] h-[180px] grow rounded-lg overflow-hidden border border-blue-200"
        style={{ backgroundColor }}
      >
        {/* Wave Animation Container */}
        <div
          className="absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out overflow-hidden"
          style={{ height: `${animatedPercentage}%` }}
        >
          <div className="absolute bottom-0 left-0 right-0 top-0">
            {/* Wave pattern */}
            <div className="absolute bottom-0 w-[200%] h-full wave-animation">
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 50 Q50 30 100 50 T200 50 L200 100 L0 100 Z"
                  fill={currentWaveColors.primary}
                />
              </svg>
            </div>

            {/* Secondary wave */}
            <div className="absolute bottom-0 w-[200%] h-full wave-animation-slow">
              <svg
                viewBox="0 0 200 100"
                className="w-full h-full"
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

        <div className="absolute bottom-1 left-0 right-0 flex flex-col items-center justify-center">
          <span className="text-white text-base font-bold drop-shadow-md z-10 leading-none">
            {percentage}%
          </span>
          <span className="text-white text-[10px] font-medium drop-shadow-md z-10 mt-0 leading-tight text-center px-1">
            {label}
          </span>
        </div>
      </div>

      <div className="flex flex-col text-center">
        <span className="text-xs text-black font-semibold leading-tight">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
