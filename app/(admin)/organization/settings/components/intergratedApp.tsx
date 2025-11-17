"use client";
import React from "react";
import { EmptyState } from "@/components/emptyState/empty";
import IntgratedApps from "@/app/(admin)/organization/settings/components/settings-intergrated-card";
import { useRouter } from "next/navigation";


interface CardProps {
  name: string;
  logo: string;
  description: string;
}

export default function SettingIntergratedApp() {
  const router = useRouter();

  // mock data for the cards
 const cards: CardProps[] = [
  // {
  //   name: 'Jira',
  //   logo: '/images/devicon_jira.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'GitHub',
  //   logo: '/images/github.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'ClickUp',
  //   logo: '/images/clickup.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'GitLab',
  //   logo: '/images/gitlab.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'Figma',
  //   logo: '/images/figma.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'Slack',
  //   logo: '/images/slack.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'Discord',
  //   logo: '/images/discord.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'Azure Repos',
  //   logo: '/images/Azure.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
  // {
  //   name: 'Teams',
  //   logo: '/images/teams.svg',
  //   description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
  //           senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
  //           cursus lectus diam sit convallis dui nunc.`,

  // },
];





 const handleAddApps = () => {

   router.push('/organization/settings/market-place');
 };

 return (
   <div className="px-6">
     <h2 className="pb-2 text-2xl font-semibold">Integrated Apps</h2>
     <p className="text-gray-600">
       Integrate various apps to increase your productivity across your projects
     </p>
     <hr className="my-6" />

     {cards.length === 0 ? (
       <EmptyState onAddApps={handleAddApps} />
     ) : (
       <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-5">
         {cards.map((card, i) => (
           <IntgratedApps key={i} {...card} />
         ))}
       </div>
     )}
   </div>
 );
}
