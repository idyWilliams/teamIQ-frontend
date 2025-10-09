"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/axios";
import { toast } from "sonner";

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newUser: { name: string; email: string }) => {
      const res = await api.post("/users", newUser);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User added successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to add user.");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user: { id: number; name: string; email: string }) => {
      const res = await api.put(`/users/${user.id}`, user);
      return res.data;
    },
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to update user.");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/users/${id}`);
    },
    onSuccess: () => {
      toast.success("User deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });
};