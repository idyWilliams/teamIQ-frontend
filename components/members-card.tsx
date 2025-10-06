import React from "react";
import { Task } from "./types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type MembersProps = {
  task: Task;
};

const  Members: React.FC<MembersProps> = ({ task }) => {
  return (
    <div className="flex flex-col gap-2 max-w-[400px]">
      <h1 className="text-[#141414] font-medium text-base">Members</h1>
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          size={16}
        />
        <Input
          type="search"
          placeholder="Search for a task"
          value=""
          className="pl-10 pr-4 py-2 w-full"
          onChange={() => {}}
        />
      </div>

      <div className="flex flex-col items-start gap-2 pt-2">
        {task.avatars?.map((avatar, index) => (
          <div key={index} className="flex flex-row items-center gap-2">
            <Avatar key={index}>
              {avatar.src && (
                <AvatarImage
                  src={avatar.src}
                  alt={avatar.alt || avatar.fallback}
                />
              )}
            </Avatar>
            <p className="text-[#434343] font-medium text-sm">{avatar?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
