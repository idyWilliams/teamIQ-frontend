"use client";
import { DndContext } from "@dnd-kit/core";
import { Column } from "@/components/Column";
import { useTasks } from "@/hooks/useTasks";
import { COLUMNS, INITIAL_TASKS } from "@/components/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function TasksPage() {
  const { tasks, handleDragEnd } = useTasks(INITIAL_TASKS);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-[#141414] mb-4">Task Board</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 max-w-xs">
          <Input type="search" placeholder="Search for a task" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Date" className="font-bold text-[#000]"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastmonth">Last Month</SelectItem>
              <SelectItem value="lastweek">Last Week</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Tasks" className="font-bold text-[#000]"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="inprogress">Inprogress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-6">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
