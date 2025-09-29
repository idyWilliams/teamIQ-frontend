"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import CardItem from "@/components/cardItem";
import RadarChart from "@/components/radar-chart";
import RadialChart from "@/components/radial-chart";
import RecentCard from "@/components/recent-card";
import Deadline from "@/components/deadline-card";

export default function Dashboard() {
  // mock data for the cards
  const cards = [
    { title: "Active Project", avatarUrl: "images/3dcube.svg", content: "22" },
    { title: "Overall Progress", avatarUrl: "images/chart.svg", content: "22" },
    { title: "Skill Tracked", avatarUrl: "images/3square.svg", content: "3" },
    {
      title: "Completed Project",
      avatarUrl: "images/document-text.svg",
      content: "22",
    },
    {
      title: "Pending Project",
      avatarUrl: "images/document.svg",
      content: "3",
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

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="px-6">
      <h2 className="font-semibold pt-5 pb-9">Welcome back, James Alfred</h2>
      {/* desktop card display */}
      <div className="hidden sm:flex gap-4 mb-12">
        {cards.map((card, i) => (
          <CardItem key={i} {...card} />
        ))}
      </div>

      {/* card display in mobile */}
      <div className="mb-8 sm:hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar"
      >
        {cards.map((card, i) => (
          <div key={i} className="snap-center shrink-0 w-full">
            <CardItem {...card} />
          </div>
        ))}
      </div>

      <div className="flex gap-2 justify-center mt-4">
        {cards.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
</div>
      {/* Chart section */}
      <div className="flex gap-6 items-stretch max-sm:flex-col mb-12">
        <div className="flex-2/3 ">
          <RadarChart />
        </div>
        <div className="flex-1/3">
          <RadialChart />
        </div>
      </div>
      <div>
        <div className="flex gap-6 items-stretch max-sm:flex-col mb-12">
          <div className="flex-2/3 ">
            <RecentCard />
          </div>
          <div className="flex-1/3">
            <Deadline />
          </div>
        </div>
      </div>
    </div>
  );
}
