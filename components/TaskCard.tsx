import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Task } from "./types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditTaskForm } from "./EditTaskForm";
import { useTasks } from "@/store/useTask";
import { toast } from "sonner";
import MessageTextAltSolid from "@/components/icons/MessageTextAltSolid";
import FileCheckFill from "@/components/icons/FileCheckFile";
import FileAttachmentFilled from "@/components/icons/FileAttachmentFilled";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { statusBadgeColors } from "@/utils/statusColors";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, isLoading, setLoading, setError } = useTasks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const [isEditOpen, setIsEditOpen] = useState(false);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const handleEditClick = () => {
    console.log("Edit button clicked for task:", task.id); // Debug
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    console.log("delete clicked");
    try {
      setLoading(true);
      deleteTask(task.id);
      toast.success("Task deleted successfully!");
    } catch (error) {
      setError("Failed to delete task");
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <div
        ref={setNodeRef}
        {...attributes}
        className={`group relative cursor-grab rounded-lg p-4 shadow-sm hover:shadow-md w-full ${
          task.status === "IN_PROGRESS" ? "bg-[#E2F5FF]" : "bg-white"
        }`}
        style={style}
      >
        <div className="pb-4 flex justify-between items-center">
          <h6 className="font-medium text-[#0E0E0E] break-words max-w-[180px]">
            {task.title}
          </h6>
          <div className="flex gap-2">
            <FileCheckFill size="20" color={task.fileBackground} />
            <p className={`${task.fileColor} font-extrabold text-sm`}>
              {task?.files}
            </p>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick();
                  }}
                  className="flex items-center  gap-2"
                >
                  <Pencil className="h-4 w-4 text-yellow-600" />
                  <p className="text-yellow-600">Edit</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                  <p className="text-red-600">Delete</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div {...listeners}>
          <div className="flex gap-2 pb-4">
            {task.taskId && (
              <Badge className={statusBadgeColors[task.status] || "bg-gray-100 text-gray-800"}>{task.taskId}</Badge>
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
                <p className={`${task.attachmentColor} font-extrabold text-sm`}>
                  {task?.attachments}
                </p>
              </div>
              <div className="flex gap-2">
                <MessageTextAltSolid size="20" color={task.messageBackground} />
                <p className={`${task.messageColor} font-extrabold text-sm`}>
                  {task?.messages}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <EditTaskForm task={task} onClose={() => setIsEditOpen(false)} />
        </DialogContent>
      </div>
    </Dialog>
  );
}
