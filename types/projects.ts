import { TaskStatus } from "@/components/types";

export interface UserOut {
  id: string;
  email: string;
  display_name: string;
  job_title: string;
  avatar_url: string | null;
  online_status: 'online' | 'offline';
  skills: {
    name: string;
    proficiency_score: number;
  }[];
}

export interface ProjectTask {
  id: string;
  display_task_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  status_color: string;
  category_color: string;
  message_count: number;
  file_count: number;
  attachment_count: number;
  assignees: UserOut[];
  comments: {
    id: string;
    content: string;
    user: UserOut;
    created_at: string;
  }[];
}

export interface ProjectResponse {
  id: string;
  name: string;
  description: string;
  project_image_url: string | null;
  visibility: 'public' | 'private';
  completion_percentage: number;
  members: UserOut[];
  tasks: ProjectTask[];
  integrated_apps: {
    name: string;
    is_active: boolean;
    logo_url: string;
  }[];
}

export interface IntegratedData {
  github?: {
    commits: any[];
    pull_requests: any[];
  };
  clickup?: {
    tasks: any[];
  };
  slack?: {
    messages: any[];
  };
}
