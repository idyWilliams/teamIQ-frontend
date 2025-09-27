"use client";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "./types";
import { Avatar } from "@radix-ui/react-avatar";
import DragOutline from "@/components/icons/DragOutline";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { Plus } from "lucide-react";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-150 flex-col rounded-lg">
  
      <div className="flex flex-row justify-between items-center">
        <h2 className="mb-4 font-semibold text-[#0E0E0E]">{column.title}</h2>
        <Avatar
          className={`w-8 h-8 flex items-center justify-center rounded-full ${column.bgColor}`}
        >
          <p className={`font-extrabold text-[11px] ${column.textColor}`}>
            {column.taskCount}
          </p>
        </Avatar>
      </div>

 
      <div className="flex items-center mb-4 gap-2">
        <DragOutline size="20" />
        <p className="text-sm font-normal text-[#626262]">{column.subTitle}</p>
      </div>

      {/* Task cards */}
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      
      <div className="mt-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
               <Plus className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a Task to {column.title}</DialogTitle>
            </DialogHeader>
            <TaskForm
              defaultStatus={column.id}
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
