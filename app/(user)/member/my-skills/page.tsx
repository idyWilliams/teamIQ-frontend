"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GitHubCalendar from "react-github-calendar";
import CardSliderMobile from "@/components/card-slider-mobile";
import { cn } from "@/lib/utils";
import SkillRatingsCard from "@/components/skill-ratings-card";
import RaderChartCard from "@/components/Rader-chart-card";
import SkillRecommendationCard from "@/components/skill-recommendation-card";

const chartData = [
  { skill: "Design", percentage: 50 },
  { skill: "Typescript", percentage: 75 },
  { skill: "Python", percentage: 60 },
  { skill: "Communication", percentage: 70 },
  { skill: "Micro Services", percentage: 50 },
  { skill: "React", percentage: 50 },
];

const contributions = [
  { text: "Contributions - All Time", value: "3.3K" },
  { text: "Contributions - 2024", value: "890" },
  { text: " Longest Streak - All Time", value: "78 Days" },
  { text: "Longest Streak - 2024", value: "91 Days" },
];

const cardTexts = [
  { text: "Total Skill", icon: "icon-[hugeicons--briefcase-04]" },
  {
    text: "Average Score",
    icon: "icon-[fluent--data-trending-16-regular]",
  },
  {
    text: "Recommendation",
    icon: "icon-[heroicons-solid--cube]",
  },
];

const cardValues = [
  { value: 22, isPercent: false },
  { value: 75.9, isPercent: true },
  { value: 5, isPercent: false },
];

const skills = [
  { skill: "React", skillLevel: 100, color: "#6182FB" },
  { skill: "design", skillLevel: 75, color: "#D26FF3" },
  { skill: "Python", skillLevel: 50, color: "#FC5A59" },
  { skill: "Typescript", skillLevel: 30, color: "#FAA144" },
  { skill: "Communiacation", skillLevel: 80, color: "#6182FB" },
];

const skillRecommendations = [
  {
    skill: "Typescript",
    skillLevel: 30,
    skillClass: "Low",
    description: [
      "Explore advanced Generics",
      "Refactor project with more strict style",
    ],
  },
  {
    skill: "Design",
    skillLevel: 45,
    skillClass: "Medium",
    description: [
      "Explore advanced Generics",
      "Refactor project with more strict style",
    ],
  },
  {
    skill: "Python",
    skillLevel: 70,
    skillClass: "High",
    description: [
      "Explore advanced Generics",
      "Refactor project with more strict style",
    ],
  },
];

const ThemeInput = {
  dark: ["#8EA8C2", "#5B80A7", "#B3C4D6", "#384259", "#093C70"],
};

export default function MySkillsPage() {
  return (
    <>
      <div className="mb-[40px] hidden lg:flex justify-between gap-[16px] items-center">
        {cardTexts?.map((cardText, idx) => (
          <div
            key={idx}
            className="border min-w-[200px] w-[33%] rounded-[16px] p-[24px] h-[120px]"
          >
            <div className="flex justify-between items-center mb-[8px]">
              <h3 className="font-semibold">{cardText?.text}</h3>
              <span
                className={cn(cardText.icon, "size-5 text-[#086ACE]")}
              ></span>
            </div>
            <div className="font-bold text-xl">
              {cardValues?.at(idx)?.value}
              {cardValues?.at(idx)?.isPercent && "%"}
            </div>
          </div>
        ))}
      </div>
      {/* card display in mobile */}
      <div className="mb-8 lg:hidden">
        <CardSliderMobile cardItems={cardTexts} cardValues={cardValues} />
      </div>
      {/* Rader Chart */}
      <div className="w-full h-fit lg:h-[500px] flex flex-col lg:flex-row gap-[24px] mb-[40px]">
        <RaderChartCard chartData={chartData} />
        {/* Skill recommendation- RHS */}
        <div className="w-full lg:w-[35%] border py-[24px] rounded-[16px] flex flex-col gap-[24px] lg:max-h-[548px]">
          <h3 className="font-semibold px-[12px]">Skill Recommendation</h3>
          <div className="flex flex-col p-[12px] gap-[24px] max-h-[500px] lg:max-h-[400px] overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {skillRecommendations?.map((skillDesc, idx) => (
              <SkillRecommendationCard key={idx} skillData={skillDesc} />
            ))}
          </div>
        </div>
      </div>
      {/* Contributions */}
      <div className="flex flex-col lg:flex-row lg:h-[420px] gap-[24px] mb-[40px]">
        {/* LHS */}
        <div className="lg:w-[65%] flex flex-col item-center justify-start border rounded-[16px] p-[24px]">
          <div className="h-[58px] w-full bg-neutral-50 flex items-center justify-between p-[12px] mb-[20px]">
            <div className="flex gap-[8px] items-center lg:p-[12px]">
              <div className="px-[10px] min-w-fit text-[12px] py-[8px] bg-white rounded-[8px] text-neutral-500 shadow-[0_1px_2px_0_#1018280D]">
                All Timer Contribution
              </div>
              <div className="hidden lg:block px-[10px] py-[8px] text-[12px] bg-white rounded-[8px] text-neutral-500 shadow-[0_1px_2px_0_#1018280D]">
                2023
              </div>
            </div>
            <div className="flex items-center justify-center bg-white shadow-[0_1px_2px_0_#1018280D] rounded-[8px] lg:rounded-0 md:shadow-none">
              <div className="lg:hidden px-[10px] py-[8px] text-[12px] bg-white rounded-[8px] text-neutral-500">
                2023
              </div>
              <Select>
                <SelectTrigger className="bg-white border-0  text-[12px] lg:shadow-[0_1px_2px_0_#1018280D]">
                  <SelectValue placeholder="Slack" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jira">Jira</SelectItem>
                  <SelectItem value="gitlab">Gitlab</SelectItem>
                  <SelectItem value="clickup">Clickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <GitHubCalendar
              username="atimscreative"
              colorScheme={"dark"}
              hideColorLegend={true}
              hideTotalCount={true}
              theme={ThemeInput}
            />
          </div>
          <div className="mt-[28px] lg:mt-auto gap-[8px] lg:gap-0 flex flex-wrap justify-between items-center">
            <p className="text-[12px]">James Alfred’s Slack Contribution</p>
            <div className="flex gap-[4px]">
              <span className="text-[12px] me-[12px]">Less</span>
              <span className="border block w-[14px] h-[16px] bg-iq-50 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-100 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-200 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-300 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-400 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-500 rounded-[5px]"></span>
              <span className="border block w-[14px] h-[16px] bg-iq-600 rounded-[5px]"></span>
              <span className="text-[12px] ms-[12px]">More</span>
            </div>
          </div>
        </div>

        {/* RHS */}
        <div className="relative bg-[#086ACE] lg:w-[35%] lg:h-[100%] h-[350px] rounded-[16px]">
          {/* Timeline */}
          <div className="before:absolute before:left-[2rem] before:top-0 before:bottom-0 before:bg-white before:w-[2px] before:h-[280px] flex flex-col w-full gap-[32px] pt-[49px]">
            {/* Each Timeline item */}
            {contributions?.map((contribution, idx) => (
              <div
                key={idx}
                className="before:absolute before:block before:rounded-full before:w-[24px] before:h-[24px] before:outline-[5px] before:outline-[#086ACE] before:bg-white before:left-[1.3rem] left-[0px] max-w-[75%] ml-[3.3rem]"
              >
                <p className="text-[#B3C4D6] text-[12px]">
                  {contribution?.text}
                </p>
                <p className="text-white font-bold">{contribution?.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skill Rating */}
      <SkillRatingsCard skillRatingData={skills} />
    </>
  );
}
