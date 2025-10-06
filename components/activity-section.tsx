"use client";

import * as React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface AvatarType {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface ActivityItemType {
  user: string;
  action: string;
  timestamp: string;
  avatar?: AvatarType;
}

interface ActivitySectionProps {
  currentUserAvatar?: AvatarType;
  activities?: ActivityItemType[];
  onComment?: (text: string) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({
  currentUserAvatar,
  activities = [],
  onComment,
}) => {
  const [comment, setComment] = React.useState("");

  const handleCommentSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && comment.trim()) {
      onComment?.(comment.trim());
      setComment("");
    }
  };

  return (
    <div className="mt-4">
      <p className="text-[#121212] text-[18px] font-bold">Activity</p>

      <div className="flex flex-col gap-3 mt-2">
       
        <div className="flex gap-2">
          {currentUserAvatar && (
            <Avatar>
              <AvatarImage
                src={currentUserAvatar.src}
                alt={currentUserAvatar.alt || currentUserAvatar.fallback}
              />
            </Avatar>
          )}
          <Input
            type="text"
            placeholder="Write a comment"
            value={comment}
            className="py-2 w-[200px] md:w-[250px] lg:w-[300px]"
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleCommentSubmit}
          />
        </div>

        
        {activities.map((act, index) => (
          <div key={index} className="flex items-center gap-2">
            {act.avatar && (
              <Avatar>
                <AvatarImage
                  src={act.avatar.src}
                  alt={act.avatar.alt || act.avatar.fallback}
                />
              </Avatar>
            )}
            <div className="flex flex-col">
              <p className="text-[#141414] text-[14px]">
                <span className="font-bold">{act.user}</span> {act.action}
              </p>
              <p className="text-[#939393] text-[14px] font-medium">
                {act.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
