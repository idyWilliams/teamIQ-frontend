'use client';

import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from '../../../../../components/task-card';
import { Column as ColumnType, Task } from '../../../../../components/types';
import { Avatar } from '@radix-ui/react-avatar';
import DragOutline from '@/components/icons/DragOutline';

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id: column.id,
  });

  const isDraggingFromColumn = active?.data?.current?.columnId === column.id;
  const showHighlight = isOver || isDraggingFromColumn;

  return (
    <div className="flex h-full flex-col rounded-lg py-4">
      <div className="flex flex-row items-center justify-between">
        <h2 className="mb-4 font-semibold text-[#0E0E0E]">{column.title}</h2>
        <Avatar
          className={`flex h-8 w-8 items-center justify-center rounded-full ${column.bgColor}`}
        >
          <p className={`text-[11px] font-extrabold ${column.textColor}`}>
            {column.taskCount}
          </p>
        </Avatar>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <DragOutline size="20" />
        <p className="text-sm font-normal text-[#626262]">{column.subTitle}</p>
      </div>

      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-2 p-1 ${showHighlight ? 'bg-iq-500/20!' : ''}`}
      >
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
