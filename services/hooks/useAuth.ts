'use client';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/services/axios';
import { auth } from '../api';


export const useLogin = () => { 
    return useMutation({
        mutationFn: async (payload: { email: string; password: string }) => {
            console.log('Payload being sent:', payload);
            const { data } = await axiosInstance.post(auth.login, payload);
            return data;
        }
    })
}