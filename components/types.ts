export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Task = {
  id: string;
  status: TaskStatus;
  statusColor?: string;
  taskIdColor?: string;
  categoryColor?: string;
  title: string;
  description: string;
  taskId?: string;
  category?: string;
  priority?: string;
  files?: number;
  fileColor?: string;
  fileBackground?: string;
  attachments?: number;
  attachmentColor?: string;
  attahmentBackground?: string;
  messages?: number;
  messageColor?: string;
  messageBackground?: string;
  avatars?: {
    src?: string;
    alt?: string;
    name?: string;
    email?: string;
    fallback: string;
  }[];

};

export type Column = {
  id: TaskStatus;
  title: string;
  subTitle?: string;
  taskCount?: number;
  textColor: string;
  bgColor: string;
};