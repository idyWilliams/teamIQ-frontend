'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import GitHubCalendar from 'react-github-calendar';
import CardSliderMobile from '@/app/(user)/member/my-skills/components/card-slider-mobile';
import { cn } from '@/lib/utils';
import SkillRatingsCard from '@/app/(user)/member/my-skills/components/skill-ratings-card';
import RaderChartCard from '@/app/(user)/member/my-skills/components/Rader-chart-card';
import SkillRecommendationCard from '@/app/(user)/member/my-skills/components/skill-recommendation-card';

const chartData = [
  { skill: 'Design', percentage: 50 },
  { skill: 'Typescript', percentage: 75 },
  { skill: 'Python', percentage: 60 },
  { skill: 'Communication', percentage: 70 },
  { skill: 'Micro Services', percentage: 50 },
  { skill: 'React', percentage: 50 },
];

const contributions = [
  { text: 'Contributions - All Time', value: '3.3K' },
  { text: 'Contributions - 2024', value: '890' },
  { text: ' Longest Streak - All Time', value: '78 Days' },
  { text: 'Longest Streak - 2024', value: '91 Days' },
];

const cardTexts = [
  { text: 'Total Skill', icon: 'icon-[hugeicons--briefcase-04]' },
  {
    text: 'Average Score',
    icon: 'icon-[fluent--data-trending-16-regular]',
  },
  {
    text: 'Recommendation',
    icon: 'icon-[heroicons-solid--cube]',
  },
];

const cardValues = [
  { value: 22, isPercent: false },
  { value: 75.9, isPercent: true },
  { value: 5, isPercent: false },
];

const skills = [
  { skill: 'React', skillLevel: 100, color: '#6182FB' },
  { skill: 'design', skillLevel: 75, color: '#D26FF3' },
  { skill: 'Python', skillLevel: 50, color: '#FC5A59' },
  { skill: 'Typescript', skillLevel: 30, color: '#FAA144' },
  { skill: 'Communication', skillLevel: 80, color: '#6182FB' },
];

const skillRecommendations = [
  {
    skill: 'Typescript',
    skillLevel: 30,
    skillClass: 'Low',
    description: [
      'Explore advanced Generics',
      'Refactor project with more strict style',
    ],
  },
  {
    skill: 'Design',
    skillLevel: 45,
    skillClass: 'Medium',
    description: [
      'Explore advanced Generics',
      'Refactor project with more strict style',
    ],
  },
  {
    skill: 'Python',
    skillLevel: 70,
    skillClass: 'High',
    description: [
      'Explore advanced Generics',
      'Refactor project with more strict style',
    ],
  },
];

const ThemeInput = {
  dark: ['#8EA8C2', '#5B80A7', '#B3C4D6', '#384259', '#093C70'],
};

export default function MySkillsPage() {
  return (
    <>
      <div className="mb-[40px] hidden items-center justify-between gap-[16px] lg:flex">
        {cardTexts?.map((cardText, idx) => (
          <div
            key={idx}
            className="h-[120px] w-[33%] min-w-[200px] rounded-[16px] border p-[24px]"
          >
            <div className="mb-[8px] flex items-center justify-between">
              <h3 className="font-semibold">{cardText?.text}</h3>
              <span
                className={cn(cardText.icon, 'size-5 text-[#086ACE]')}
              ></span>
            </div>
            <div className="text-xl font-bold">
              {cardValues?.at(idx)?.value}
              {cardValues?.at(idx)?.isPercent && '%'}
            </div>
          </div>
        ))}
      </div>
      {/* card display in mobile */}
      <div className="mb-8 lg:hidden">
        <CardSliderMobile cardItems={cardTexts} cardValues={cardValues} />
      </div>
      {/* Rader Chart */}
      <div className="mb-[40px] flex h-fit w-full flex-col gap-[24px] lg:h-[500px] lg:flex-row">
        <RaderChartCard chartData={chartData} />
        {/* Skill recommendation- RHS */}
        <div className="flex w-full flex-col gap-[24px] rounded-[16px] border py-[24px] lg:max-h-[548px] lg:w-[35%]">
          <h3 className="px-[12px] font-semibold">Skill Recommendation</h3>
          <div className="flex max-h-[500px] flex-col gap-[24px] overflow-y-scroll p-[12px] [scrollbar-width:none] lg:max-h-[400px] [&::-webkit-scrollbar]:hidden">
            {skillRecommendations?.map((skillDesc, idx) => (
              <SkillRecommendationCard key={idx} skillData={skillDesc} />
            ))}
          </div>
        </div>
      </div>
      {/* Contributions */}
      <div className="mb-[40px] flex flex-col gap-[24px] lg:h-[420px] lg:flex-row">
        {/* LHS */}
        <div className="item-center flex flex-col justify-start rounded-[16px] border p-[24px] lg:w-[65%]">
          <div className="mb-[20px] flex h-[58px] w-full items-center justify-between bg-neutral-50 p-[12px]">
            <div className="flex items-center gap-[8px] lg:p-[12px]">
              <div className="min-w-fit rounded-[8px] bg-white px-[10px] py-[8px] text-[12px] text-neutral-500 shadow-[0_1px_2px_0_#1018280D]">
                All Timer Contribution
              </div>
              <div className="hidden rounded-[8px] bg-white px-[10px] py-[8px] text-[12px] text-neutral-500 shadow-[0_1px_2px_0_#1018280D] lg:block">
                2023
              </div>
            </div>
            <div className="lg:rounded-0 flex items-center justify-center rounded-[8px] bg-white shadow-[0_1px_2px_0_#1018280D] md:shadow-none">
              <div className="rounded-[8px] bg-white px-[10px] py-[8px] text-[12px] text-neutral-500 lg:hidden">
                2023
              </div>
              <Select>
                <SelectTrigger className="border-0 bg-white text-[12px] lg:shadow-[0_1px_2px_0_#1018280D]">
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
              colorScheme={'dark'}
              hideColorLegend={true}
              hideTotalCount={true}
              theme={ThemeInput}
            />
          </div>
          <div className="mt-[28px] flex flex-wrap items-center justify-between gap-[8px] lg:mt-auto lg:gap-0">
            <p className="text-[12px]">James Alfred’s Slack Contribution</p>
            <div className="flex gap-[4px]">
              <span className="me-[12px] text-[12px]">Less</span>
              <span className="bg-iq-50 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-100 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-200 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-300 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-400 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-500 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="bg-iq-600 block h-[16px] w-[14px] rounded-[5px] border"></span>
              <span className="ms-[12px] text-[12px]">More</span>
            </div>
          </div>
        </div>

        {/* RHS */}
        <div className="relative h-[350px] rounded-[16px] bg-[#086ACE] lg:h-[100%] lg:w-[35%]">
          {/* Timeline */}
          <div className="flex w-full flex-col gap-[32px] pt-[49px] before:absolute before:top-0 before:bottom-0 before:left-[2rem] before:h-[280px] before:w-[2px] before:bg-white">
            {/* Each Timeline item */}
            {contributions?.map((contribution, idx) => (
              <div
                key={idx}
                className="left-[0px] ml-[3.3rem] max-w-[75%] before:absolute before:left-[1.3rem] before:block before:h-[24px] before:w-[24px] before:rounded-full before:bg-white before:outline-[5px] before:outline-[#086ACE]"
              >
                <p className="text-[12px] text-[#B3C4D6]">
                  {contribution?.text}
                </p>
                <p className="font-bold text-white">{contribution?.value}</p>
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
