"use client";
import React from "react";
import IntergratedApp from "@/components/settings-intergrated-card";


export default function SettingIntergratedApp() {
 

  // mock data for the cards
 const cards = [
  {
    name: 'Jira',
    logo: '/images/devicon_jira.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
  {
    name: 'GitHub',
    logo: '/images/github.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
  
  },
  {
    name: 'ClickUp',
    logo: '/images/clickup.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
  
  },
  {
    name: 'GitLab',
    logo: '/images/gitlab.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
  {
    name: 'Figma',
    logo: '/images/figma.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
  {
    name: 'Slack',
    logo: '/images/slack.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
  {
    name: 'Discord',
    logo: '/images/discord.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
  
  },
  {
    name: 'Azure Repos',
    logo: '/images/Azure.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
  {
    name: 'Teams',
    logo: '/images/teams.svg',
    description: `Lorem ipsum dolor sit amet consectetur. Pulvinar amet at neque
            senectus. Ipsum mattis ac consequat felis lectus tortor. Cursus urna
            cursus lectus diam sit convallis dui nunc.`,
   
  },
];




  
  return (
    <div className="px-6">
      <h2 className="font-semibold  pb-2 text-2xl ">
       Intergrated Apps
      </h2>
      <p >Integrate various app to increase your productivity across your projects</p>
      <hr className="my-6"></hr>
      {/* desktop card display */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] items-stretch gap-5">
        {cards.map((card, i) => (
          <IntergratedApp key={i} {...card} />
        ))}
      </div>

      
      
    </div>
  );
}
