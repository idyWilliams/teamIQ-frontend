// components/TaskForm.tsx
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTasks } from '@/store/useTask';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './types';

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
}).required();

interface TaskFormData {
  title: string;
  description: string;
}

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TaskFormData) => {
    const newTask: Task = {
      id: uuidv4(),
      title: data.title,
      description: data.description,
      status: 'TODO',
      taskId: `#U${Math.floor(Math.random() * 1000)}`,
      category: 'Development',
      files: 0,
      attachments: 0,
      messages: 0,
      fileColor: 'text-gray-600',
      fileBackground: 'text-gray-400',
      attachmentColor: 'text-gray-600',
      attahmentBackground: 'text-gray-400',
      messageColor: 'text-gray-600',
      messageBackground: 'text-gray-400',
      avatars: [],
      statusColor: 'bg-blue-100 text-blue-800',
    };
    addTask(newTask);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div>
        <Input placeholder="Task Title" {...register('title')} className="w-full" />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Textarea placeholder="Task Description" {...register('description')} className="w-full" />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
        Add Task
      </Button>
    </form>
  );
};