export interface SkillAnalysis {
  skill_gaps: string[];
  avg_proficiency: number;
  trend: 'up' | 'down' | 'stable';
}

export interface TrackData {
  track_name: string;
  member_count: number;
  active_members: {
    id: string;
    avatar_url: string | null;
    display_name: string;
  }[];
  uncompleted_task_count: number;
}

export interface ActiveBlocker {
  id: string;
  name: string;
  project_name: string;
  severity: 'low' | 'medium' | 'high';
  time_active?: string;
}

export interface UpcomingDeadline {
  id: string;
  task_name: string;
  deadline: string;
  time_remaining_string: string;
}

export interface OrgDashboardResponse {
  tracks: TrackData[];
  skill_analysis: SkillAnalysis;
  active_blockers: ActiveBlocker[];
  upcoming_deadlines: UpcomingDeadline[];
}

export interface UserDashboardResponse {
  productivity_scores: {
    overall: number;
    weekly_change: number;
  };
  streaks: {
    current: number;
    longest: number;
  };
  skill_proficiency: {
    skill: string;
    percentage: number;
  }[];
}
