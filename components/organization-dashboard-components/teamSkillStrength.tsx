import React from 'react'
import { Card, CardContent } from '../ui/card';
import Image from 'next/image';
import { Button } from '../ui/button';
import { Search } from "lucide-react";
import {
  Input,
} from "../ui/input";
import { Select, SelectTrigger, SelectValue } from "../ui/select";


export default function teamSkillStrength() {


    
  return (
    <>
      <div className="border border-gray-100 rounded-3xl m-6">
        <div className="p-6 flex place-content-between">
          <h4 className="text-base font-semibold">Team Skill Strength</h4>
          <a
            href="http://"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm flex items-center gap-2 hover:underline"
          >
            View More
            <Image
              src={`/images/formkit_arrowright.png`}
              alt={"view all arrow"}
              width={24}
              height={14}
            />
          </a>
        </div>
        <div className="p-6 flex place-content-between">
          <div className="relative">
            <Search className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for anything"
              className="pl-10 w-[348px] text-gray-700 placeholder:text-gray-400 focus:ring-0"
            ></Input>
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="All Tracks" />
            </SelectTrigger>
          </Select>
          {/* <DropdownMenu>All Tracks</DropdownMenu> */}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-2 p-6 text-xs">
          {teamMemberSkill.map((teamMember) => (
            <Card key={teamMember.id} className="bg-gray-50 border-0">
              <CardContent>
                <div className="flex flex-col items-center">
                  <Image
                    src={teamMember.image || "/default-avatar.png"}
                    alt={teamMember.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover mb-2"
                  />
                  <h4 className="font-semibold">{teamMember.name}</h4>
                  <p className="text-gray-400">{teamMember.track}</p>
                </div>
                <div className="mt-4">
                  {Object.entries(teamMember.skills).map(([name, value]) => (
                    <p key={name} className="flex place-content-between gap-2">
                      <span className={`${skillColors[name]}`}>{name}: </span>
                      <span className={`${valueColors[name]}`}>{value}%</span>
                    </p>
                  ))}
                </div>
              </CardContent>
              <Button className="mx-4 bg-iq-500">View</Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

const skillColors: Record<string, string> = {
  Python: "text-purple-500",
  TypeScript: "text-yellow-500",
  React: "text-pink-500",
};
const valueColors: Record<string, string> = {
  Python: "text-red-500",
  TypeScript: "text-green-500",
  React: "text-green-500",
};

const teamMemberSkill = [
  {
    id: 0,
    image: "/images/Darrell Steward.png",
    name: "Darrell Steward",
    track: "Data Analyst",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 1,
    image: "/images/Ronald Richards.png",
    name: "Ronald Richards",
    track: "Product Analyst",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 2,
    image: "/images/Jane Cooper.png",
    name: "Jane Cooper",
    track: "Interaction Designer",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 3,
    image: "/images/Arlene McCoy.png",
    name: "Arlene McCoy",
    track: "Product Manager",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 4,
    image: "/images/Marvin McKinney.png",
    name: "Marvin McKinney",
    track: "Content Operations",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 5,
    image: "/images/Jerome Bell.png",
    name: "Jerome Bell",
    track: "Frontend Dev",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 6,
    image: "/images/Brooklyn Simmons.png",
    name: "Brooklyn Simmons",
    track: "Product Manager",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
  {
    id: 7,
    image: "/images/Theresa Webb.png",
    name: "Theresa Webb",
    track: "Product Designer",
    skills: {
      Python: 30,
      TypeScript: 70,
      React: 70,
    },
  },
];
