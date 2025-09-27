import { create } from "zustand";
import { Task, TaskStatus } from "@/components/types";
import { INITIAL_TASKS } from "@/components/constants";
import { DragEndEvent } from '@dnd-kit/core';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void; 
  handleDragEnd: (event: DragEndEvent) => void;
}

export const useTasks = create<TaskState>((set) => ({
  tasks: INITIAL_TASKS,
  archivedTasks: [],
  assignees: [
  ],
  isLoading: false,
  error: null,
  searchQuery: "", 
  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, newTask],
      isLoading: false,
      error: null,
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
      isLoading: false,
      error: null,
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      isLoading: false,
      error: null,
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  handleDragEnd: (event) => {
    {
      const { active, over } = event;
      if (over) {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === active.id
              ? { ...task, status: over.id as TaskStatus }
              : task
          ),
        }));
      }
    }
  },
}));
