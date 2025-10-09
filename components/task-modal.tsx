import React from "react";
import Circle from "@/components/icons/Circle";
import { Badge } from "@/components/ui/badge";
import { Task } from "./types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { statusBadgeColors } from "@/utils/statusColors";
import { Textarea } from "@/components/ui/textarea";
import People32Light from "./icons/People";
import Attachment from "./icons/Attachment";
import Label from "./icons/Label";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import ProfileCard from "./profile-card";
import Members from "./members-card";
import AttachmentCard from "./attachment-card";
import LabelCard from "./label-card";
import { AttachmentItem } from "./attachment-menu";
import { ActivitySection } from "./activity-section";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

type TaskModalProps = {
  task: Task;
};

const TaskModal: React.FC<TaskModalProps> = ({ task }) => {
  return (
    <div className="w-full flex">
      {/* Left Section */}
      <div className="basis-[90%] pr-6">
        <div className="flex-1 pr-4">
          <div className="flex gap-2 ">
            <Circle size="20" />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-medium text-[#0E0E0E]">
                {task.title}
              </h1>
              <div className="flex items-center gap-2">
                <p className="text-[#626262] font-medium text-base">Status</p>
                <Badge className={task.statusColor}>{task.status}</Badge>
              </div>
            </div>
          </div>


          <div className="flex items-center gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-[#626262]">Members</p>
              <div className="flex items-center gap-2">
                {task.avatars?.map((avatar, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger asChild>
                      <Avatar key={index}>
                        {avatar.src && (
                          <AvatarImage
                            src={avatar.src}
                            alt={avatar.alt || avatar.fallback}
                          />
                        )}
                      </Avatar>
                    </HoverCardTrigger>
                    <HoverCardContent className="p-0 bg-transparent border-none shadow-none w-auto">
                      <ProfileCard avatar={avatar} />
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-md font-medium text-[#626262]">Label</p>
              <div className="flex items-center gap-2">
                {task.taskId && (
                  <Badge
                    className={
                      statusBadgeColors[task.status] ||
                      "bg-gray-100 text-gray-800"
                    }
                  >
                    {task.taskId}
                  </Badge>
                )}
                {task.category && (
                  <Badge className={task.categoryColor}>{task.category}</Badge>
                )}
              </div>
            </div>
          </div>


          <div className="mt-4">
            <Textarea placeholder="Description" />
          </div>


          <div className="mt-4">
            <p className="text-[18px] font-semibold text-[#121212]">
              Attachments
            </p>
            {[1, 2, 3].map((i) => (
              <AttachmentItem
                key={i}
                name={`Software Requirements Specification (SRS) ${i}.pdf`}
                fileUrl={`/files/file${i}.pdf`}
              />
            ))}
          </div>


          <div className="mt-4">
            <ActivitySection
              currentUserAvatar={task.avatars?.[0]}
              activities={[
                {
                  user: "Usman Alimat Funmilola",
                  action: `added this card to ${task.status}`,
                  timestamp: "Sep 16, 2022, 6:51 AM",
                  avatar: task.avatars?.[0],
                },
              ]}
              onComment={(text) => console.log("New comment:", text)}
            />
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-px bg-gray-200 mx-4" />

      {/* Right Section (New Components) */}
      <div className="basis-[10%] flex flex-col items-center  gap-4">
        
        <Dialog>
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <DialogTrigger>
              <div className="flex flex-col items-center gap-1">
              <People32Light size="20" />
              <p className="font-medium text-sm text-[#626262]">Members</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <Members task={task} />
            </DialogContent>
          </div>
        </Dialog>
        <Dialog>
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <DialogTrigger>
              <div className="flex flex-col items-center gap-1">
              <Attachment size="20" />
              <p className="font-medium text-sm text-[#626262]">Attachment</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <AttachmentCard />
            </DialogContent>
          </div>
        </Dialog>
        <Dialog>
          <div className="flex flex-col items-center justify-center gap-2">
            <DialogTrigger>
              <div className="flex flex-col items-center gap-1">
              <Label size="20" />
              <p className="font-medium text-sm text-[#626262]">Label</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <LabelCard />
            </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskModal;
