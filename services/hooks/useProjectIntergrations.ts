import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axios';
import { useProjectStore } from '@/store/useProjectStore';

interface StepFourProps {
  comm_tool: string;
  comm_integration_method: 'oauth2' | 'apikey';
  comm_channel_id: string;
  comm_api_key: string;
  comm_webhook_url: string;
  comm_notifications: {
    pmt_updates: boolean;
    code_events: boolean;
    sentiment_monitoring: boolean;
    custom_commands: boolean;
  };
}

interface StepFiveProps {
  members: {
    user_id: number;
    role: string;
  } [];
}

export const useProjectIntegrations = () => {
  const queryClient = useQueryClient();
  const { projectId, setSlackData, addMember } = useProjectStore();

  
  
  return { integrateSlack, addTeamMember };
};

export const useIntegrateSlack = () => {

  return useMutation({
    mutationFn: (payload: StepFourProps) =>
      axiosInstance.patch(
        `projects/{project_id}/step4-communication-tool`,
        payload
      ),
    // onSuccess: res => {
    //   setSlackData(res.data);
    // },
    // onError: error => {
    //   console.error('Slack integration failed:', error);
    // },
  });
}
  


const addTeamMember = useMutation({
  mutationFn: (payload: StepFiveProps) =>
    axiosInstance.post(`/projects/{project_id}/step5-add-members`, payload),
  onSuccess: res => {
    addMember(res.data);
    queryClient.invalidateQueries({
      queryKey: ['projectMembers', projectId],
    });
  },
  onError: error => {
    console.error('Add member failed:', error);
  },
});

