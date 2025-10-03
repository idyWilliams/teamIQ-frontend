import React from "react";
import { Input } from "./ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "./ui/button";

const backgrounds = [
  "bg-green-400",
  "bg-pink-600",
  "bg-yellow-400",
  "bg-blue-900",
  "bg-teal-500",
  "bg-orange-500",
  "bg-purple-600",
  "bg-indigo-400",
  "bg-sky-400",
];


const LabelCard = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[#141414] font-medium text-base">Label</p>
      <p className="text-[#141414] font-normal text-sm">Title</p>
      <Input placeholder="Enter a display text for the file" />
      <p className="text-[#141414] font-normal text-sm">Color</p>

      <div className="grid grid-cols-7 gap-2">
        {backgrounds.map((bg, index) => (

            <div
              key={index}
              className={`w-[45px] h-[45px] rounded-md ${bg}`}
              // style={{ backgroundColor: bg.color }}
            />

        ))}
      </div>

      <Button className="bg-[#086ACE] text-white w-full">Insert</Button>
    </div>
  );
};

export default LabelCard;
