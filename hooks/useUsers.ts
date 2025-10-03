"use client";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users"); // fetch from jsonplaceholder
      return res.data;
    },
  });
}
