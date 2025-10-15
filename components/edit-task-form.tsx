import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTasks } from '@/store/useTask';
import { Task } from './types';
import { toast } from "sonner"

const schema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
}).required();

interface EditTaskFormData {
  title: string;
  description: string;
}

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onClose }) => {
  const { updateTask, isLoading, setLoading, setError } = useTasks();
  const { register, handleSubmit, formState: { errors } } = useForm<EditTaskFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
  });

  const onSubmit = async (data: EditTaskFormData) => {
    try {
      setLoading(true);
      updateTask(task.id, { title: data.title, description: data.description });
      toast.success('Task updated successfully!');
      onClose();
    } catch (error) {
      setError('Failed to update task');
      toast.error('Failed to update task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div>
        <Input placeholder="Task Title" {...register('title')} className="w-full" disabled={isLoading} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Textarea placeholder="Task Description" {...register('description')} className="w-full" disabled={isLoading} />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Task'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
};