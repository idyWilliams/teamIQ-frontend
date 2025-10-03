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
import { COLUMNS } from "@/components/constants";
import React from "react";
import Subnavbar from "@/components/user-dashboard-component/task/Subnavbar";

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
    <>
      <section className="p-4">
        <Subnavbar />
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
      </section>
    </>
  );
}
