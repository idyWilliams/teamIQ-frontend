import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTasks } from "@/store/useTask";
import { v4 as uuidv4 } from "uuid";
import { Task , TaskStatus} from "./types";
import { toast } from "sonner";

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup.string().required("Description is required"),
});

interface TaskFormData {
  title: string;
  description: string;
}


interface TaskFormProps {
  defaultStatus?: TaskStatus; 
  onClose?: () => void;
}


export const TaskForm: React.FC<TaskFormProps> = ({
  defaultStatus = "TODO",
  onClose,
}) => {
  const { addTask, isLoading, setLoading, setError } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: TaskFormData) => {
    try {
      setLoading(true);
      const newTask: Task = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        status: defaultStatus, 
        display_task_id: `#U${Math.floor(Math.random() * 1000)}`,
        file_count: 0,
        attachment_count: 0,
        message_count: 0,
        avatars: [],
        status_color: "bg-blue-100 text-blue-800",
        category_color: "#3B82F6", // Default color
      };
      addTask(newTask);
      toast.success("Task added successfully!");
      reset();
      onClose?.(); 
    } catch (error) {
      setError("Failed to add task");
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded-lg shadow-sm"
    >
      <div>
        <Input placeholder="Task Title" {...register("title")} className="w-full" />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Textarea
          placeholder="Task Description"
          {...register("description")}
          className="w-full"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
};
