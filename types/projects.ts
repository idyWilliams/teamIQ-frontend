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
  created_at: string;
  updated_at: string;
  comments: {
    id: string;
    content: string;
    user: UserOut;
    created_at: string;
  }[];
}

export interface IntegratedApp {
  name: string;
  is_active: boolean;
  logo_url: string;
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
  integrated_apps: IntegratedApp[];
  project_lead_name: string;
  created_at: string;
  start_date?: string;
  end_date?: string;
  pct_complete?: number;
  pm_tool?: string;
  vc_tool?: string;
  comm_tool?: string;
  stacks?: string[];
  updated_at?: string;
}

export interface PullRequest {
  id: string;
  title: string;
  status: string;
  url: string;
  author: string;
  created_at: string;
}

export interface ProjectActivity {
  id: string;
  type: string;
  content: string;
  user: UserOut;
  created_at: string;
}

export interface EngineeringHealthData {
  velocity: {
    label: string;
    value: number;
    trend: 'up' | 'down' | 'stable';
    data: { name: string; value: number }[];
  }[];
  code_quality: {
    test_coverage: number;
    maintainability: number;
    reliability: number;
    technical_debt_hours: number;
  };
  team_health: {
    burnout_risk: 'low' | 'medium' | 'high';
    collaboration_score: number;
    skill_distribution: { skill: string; percentage: number }[];
  };
}

export interface ComprehensiveProjectData {
  project: ProjectResponse;
  tasks: ProjectTask[];
  pull_requests: PullRequest[];
  activities: ProjectActivity[];
  engineering_health?: EngineeringHealthData;
}

export interface PersonalStats {
  contribution_percentage: number;
  completion_rate: number;
}

export interface ProjectProgress {
  total: number;
  completed: number;
}

export interface MyProjectData {
  project_progress: ProjectProgress;
  my_stats: PersonalStats;
}

export interface WebhookStep {
  step_number: number;
  instruction: string;
  webhook_url?: string;
  event_checkboxes?: string[];
}

export interface WebhookSetupInstructions {
  steps: WebhookStep[];
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
