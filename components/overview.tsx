import React from "react";
import CardItem from "./cardItem";
import RecentCard from "./recent-card";
import Deadline from "./deadline-card";
import { WaveProgress } from "./wave-progress";
import ChartLineDefault from "./chart-line";
import ActiveBlockers from "./active-blockers";
import { dashboardCards, activeBlockers, progressData } from "@/constants";

const DashbordOverview = () => {
  return (
    <div className="p-4 space-y-6">
      <div>
        <div className="hidden sm:flex gap-3 max-lg:flex-wrap">
          {dashboardCards.map((card, i) => (
            <CardItem key={i} {...card}  />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Team Skills Overview
              </h2>
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
            </div>

            <div
              className="flex gap-1 justify-items-center items-start"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              }}
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
          </div>

          <div className="mt-6">
            <ChartLineDefault />
          </div>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <ActiveBlockers blockers={activeBlockers} />
        </div>
      </div>
    </div>
  );
};

export default DashbordOverview;
