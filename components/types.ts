export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';

export type TaskAvatar = {
  src?: string;
  alt?: string;
  name?: string;
  email?: string;
  fallback: string;
};

export type Task = {
  id: string;
  display_task_id: string;
  status: TaskStatus;
  status_color: string;
  category_color: string;
  title: string;
  description: string;
  category?: string;
  priority?: string;
  file_count: number;
  attachment_count: number;
  message_count: number;
  avatars?: TaskAvatar[];
  // Keep legacy fields for compatibility if needed during transition, 
  // but prioritize new ones.
  taskId?: string; 
  files?: number;
  attachments?: number;
  messages?: number;
};

export type Column = {
  id: TaskStatus;
  title: string;
  subTitle?: string;
  taskCount?: number;
  textColor: string;
  bgColor: string;
};