export interface Activity {
  id: string;
  source_tool: 'Slack' | 'GitHub' | 'ClickUp' | 'Notion' | 'Jira';
  action_taken: string;
  user: {
    name: string;
    avatar_url: string | null;
  };
  timestamp: string;
}

export interface TimelineResponse {
  activities: Activity[];
}
