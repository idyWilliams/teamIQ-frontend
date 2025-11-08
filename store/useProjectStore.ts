import { create } from 'zustand';

interface Member {
  id?: string;
  name: string;
  email: string;
}

interface SlackData {
  channelName?: string;
  workspace?: string;
  webhookUrl?: string;
}

interface ProjectStore {
  projectId: string | null;
  slackData: SlackData | null;
  members: Member[];
  setProjectId: (id: string) => void;
  setSlackData: (data: SlackData) => void;
  addMember: (member: Member) => void;
}

export const useProjectStore = create<ProjectStore>(set => ({
  projectId: null,
  slackData: null,
  members: [],

  setProjectId: id => set({ projectId: id }),
  setSlackData: data => set({ slackData: data }),
  addMember: member => set(state => ({ members: [...state.members, member] })),
}));
