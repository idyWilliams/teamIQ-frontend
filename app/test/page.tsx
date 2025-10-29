'use client';

import { useQuery } from "@tanstack/react-query";
import api from "@/services/axios";
import { projects } from "@/services/api";
import { useInviteUser } from "@/services/hooks/useInviteUser";

export default function TestPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const res = await api.get(projects.list);
      return res.data;
    },
  });



  if (isLoading) return <p>Loading projects...</p>;
  if (isError) return <p>Error fetching projects.</p>;

  return (
    <div className="p-4">
      <h1 className="mb-2 text-xl font-bold">Projects</h1>
      <ul>
        {data?.slice(0, 5).map((project: any) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}
