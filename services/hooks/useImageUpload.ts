import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';

interface UploadImageParams {
  file: File;
  imageType: 'profile' | 'organization' | 'general' | 'task' | 'project';
  updateDb?: boolean;
}

export const useImageUpload = () => {
  return useMutation({
    mutationFn: async ({ file, imageType, updateDb = false }: UploadImageParams) => {
      const formData = new FormData();
      formData.append('file', file);

      const params = new URLSearchParams({
        image_type: imageType,
        update_db: updateDb.toString(),
      });

      const response = await axiosInstance.post(`/image?${params}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return response.data; 
    },
  });
};