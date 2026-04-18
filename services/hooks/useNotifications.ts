import axiosInstance from '../axios';
import { userNotification } from '../api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        userNotification.getNotification
      );
      console.log('notifcation data', data);
      return data;
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await axiosInstance.patch(userNotification.markAsRead(id));
      return res.data;
    },
    onSuccess: () => {
      toast.success('Notification marked as read');
      queryClient.invalidateQueries({ queryKey: ['notitication'] });
    },
  });
};
