import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import MessageTextAltSolid from "@/components/icons/MessageTextAltSolid";
import FileCheckFill from "@/components/icons/FileCheckFile";
import FileAttachmentFilled from "@/components/icons/FileAttachmentFilled";
import { statusBadgeColors } from "@/utils/statusColors";
import TaskModal from "./task-modal";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      columnId: task.status,
    },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={setNodeRef}
          {...attributes}
          className={`group relative cursor-grab rounded-lg p-4 shadow-sm hover:shadow-md w-full ${
            task.status === "IN_PROGRESS" ? "bg-[#E2F5FF]" : "bg-white"
          }`}
          style={style}
        >
          <div
            className="pb-4 flex justify-between items-center"
            {...listeners}
          >
            <h6 className="font-medium text-[#0E0E0E] break-words max-w-[180px]">
              {task.title}
            </h6>
            <div className="flex gap-2">
              <FileCheckFill size="20" color={task.fileBackground} />
              <p className={`${task.fileColor} font-extrabold text-sm`}>
                {task?.files}
              </p>
            </div>
          </div>

          <div>
            <div className="flex gap-2 pb-4">
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
              {task.status && (
                <Badge className={task.statusColor}>{task.status}</Badge>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                {task.avatars?.map((avatar, index) => (
                  <Avatar key={index}>
                    {avatar.src ? (
                      <AvatarImage
                        src={avatar.src}
                        alt={avatar.alt || avatar.fallback}
                      />
                    ) : (
                      <AvatarFallback className="bg-gray-200 text-black font-semibold text-sm flex items-center justify-center">
                        {avatar.fallback}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ))}
                {task.avatars && task.avatars.length > 3 && (
                  <Avatar>
                    <AvatarFallback className="bg-gray-200 text-black font-semibold text-sm flex items-center justify-center">
                      +{task.avatars.length - 3}
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex gap-2">
                  <FileAttachmentFilled
                    size="20"
                    color={task.attahmentBackground}
                  />
                  <p
                    className={`${task.attachmentColor} font-extrabold text-sm`}
                  >
                    {task?.attachments}
                  </p>
                </div>
                <div className="flex gap-2">
                  <MessageTextAltSolid
                    size="20"
                    color={task.messageBackground}
                  />
                  <p className={`${task.messageColor} font-extrabold text-sm`}>
                    {task?.messages}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[80vw] md:max-w-[700px] p-6">
        <TaskModal task={task} />
      </DialogContent>
    </Dialog>
  );
}
