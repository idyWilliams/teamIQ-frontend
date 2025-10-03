"use client";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Column } from "@/components/Column";
import { useTasks } from "@/store/useTask";
import { COLUMNS, INITIAL_TASKS } from "@/components/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TaskForm } from "@/components/task-form";
import Reload from "@/components/icons/Reload";
import { Search } from "lucide-react";

export default function TasksPage() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200, 
      tolerance: 5, 
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  const { tasks, handleDragEnd, searchQuery, setSearchQuery } = useTasks();
  console.log("Rendering TasksPage with tasks:", tasks);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-[#141414] mb-4">Task Board</h1>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Reload size="20" />
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={16}
            />
            <Input
              type="search"
              placeholder="Search for a task"
              value={searchQuery}
              className="pl-10 pr-4 py-2 w-[200px] md:w-[250px] lg:w-[300px]"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="Date"
                className="font-bold text-[#000]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastmonth">Last Month</SelectItem>
              <SelectItem value="lastweek">Last Week</SelectItem>
              <SelectItem value="today">Today</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder="All Tasks"
                className="font-bold text-[#000]"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="inprogress">Inprogress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {COLUMNS.map((column) => (
            <div
              key={column.id}
              className="min-w-[300px] max-w-[320px] flex-shrink-0"
            >
              <Column
                key={column.id}
                column={column}
                tasks={filteredTasks.filter(
                  (task) => task.status === column.id
                )}
              />
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
