import React from "react";
import CardItem from "./cardItem";
import ChartLineDefault from "./chart-line";
import ActiveBlockers from "./active-blockers";
import { WaveProgressCard } from "./wave-progress";
import { dashboardCards, activeBlockers, progressData } from "@/constants";

const DashbordOverview = () => {
  return (
    <div className="p-4 space-y-6">
        <div className="flex gap-3 max-lg:flex-wrap">
          {dashboardCards.map((card, i) => (
            <CardItem key={i} {...card} />
          ))}
        </div>

      <div className="flex gap-4">
        <div className="lg:col-span-2 space-y-4 grow">
          <WaveProgressCard progressData={progressData} />
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
