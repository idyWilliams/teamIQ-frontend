'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import auth from '@/services/axios';
import apiInstance from '@/services/axios';
import { toast } from 'sonner';


export const useLoginIndividual= () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async(data: any) => {
            const res = await apiInstance.post(auth.loginIndividual, data); 
            return res.data
        }
    })
}