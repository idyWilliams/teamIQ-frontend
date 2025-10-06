"use client";

import { useState } from "react";
import type { Task } from "@/components/types";
import { DragEndEvent } from "@dnd-kit/core";

export function useTasks(initialTasks: Task[]) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  }

  return { tasks, handleDragEnd };
}
