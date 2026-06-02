'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'nextjs-toploader/app';
import { useGetMyProjects } from '@/services/hooks/useProjectGet';
import { Badge } from '@/components/ui/badge';
import { Layout } from 'lucide-react';

export default function ProjectScreen() {
  const router = useRouter();
  const { data: projects, error, isLoading } = useGetMyProjects();

  const handleProjectClick = (projectId: string) => {
    router.push(`/member/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-64 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 rounded-full bg-gray-50 p-6">
          <Layout className="h-12 w-12 text-gray-300" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">No projects yet</h3>
        <p className="text-sm text-gray-500 max-w-xs">You haven&apos;t been added to any projects or haven&apos;t created one yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map(project => (
          <Card
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className="flex cursor-pointer flex-col overflow-hidden rounded-xl border-0 shadow-sm transition-all hover:shadow-md hover:translate-y-[-2px] bg-white group"
          >
            <CardContent className="flex h-full flex-col p-0">
              {/* Project Cover Section */}
              <div className="relative h-32 w-full bg-gray-100 overflow-hidden">
                {project.project_image_url ? (
                  <img
                    src={project.project_image_url}
                    alt={project.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <Layout className="h-10 w-10 text-white/50" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-white/90 text-blue-600 hover:bg-white text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm border-0 shadow-sm">
                    {project.project_type?.replace('_', ' ') || 'Project'}
                  </Badge>
                </div>
              </div>

              {/* Project Info Section */}
              <div className="flex flex-1 flex-col p-4 border-t">
                <h2 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h2>
                <p className="mb-4 line-clamp-2 text-[11px] leading-relaxed text-gray-500 h-8">
                  {project.description || 'No description provided for this project.'}
                </p>

                {/* Footer: Members & Progress */}
                <div className="mt-auto pt-3 border-t flex items-center justify-between">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {project.members?.slice(0, 4).map((member, i) => (
                      <div key={member.id} className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-600 overflow-hidden" title={member.display_name}>
                        {member.avatar_url ? (
                          <img src={member.avatar_url} alt="" className="h-full w-full object-cover" />
                        ) : (
                          member.display_name.charAt(0)
                        )}
                      </div>
                    ))}
                    {(project.members?.length || 0) > 4 && (
                      <div className="h-6 w-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
                        +{(project.members?.length || 0) - 4}
                      </div>
                    )}
                    {(project.members?.length || 0) === 0 && (
                      <span className="text-[10px] text-gray-400 font-medium italic">Solo project</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${project.completion_percentage || 0}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-700">
                      {project.completion_percentage || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
