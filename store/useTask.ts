import { create } from 'zustand';
import { Task, TaskStatus } from '@/components/types';
import { INITIAL_TASKS } from '@/components/constants';

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  
  handleDragEnd: (event: any) => void;
}

export const useTasks = create<TaskState>((set) => ({
  tasks: INITIAL_TASKS,
  addTask: (newTask) => set((state) => ({ tasks: [...state.tasks, newTask] })),
  handleDragEnd: (event) => {
    const { active, over } = event;
    if (over) {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === active.id ? { ...task, status: over.id as TaskStatus } : task
        ),
      }));
    }
  },
}));