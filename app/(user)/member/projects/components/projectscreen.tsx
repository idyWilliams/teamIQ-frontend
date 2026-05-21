'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'nextjs-toploader/app';
import Image from 'next/image';
import { useGetMyProjects } from '@/services/hooks/useProjectGet';

const DEFAULT_PROJECT_IMAGE = '/images/TeamIQLogo.png';

export default function ProjectScreen() {
  const router = useRouter();
  const { data, error, isLoading } = useGetMyProjects();
  
  console.log("component projects", data);

  const handleProjectClick = (projectId: string) => {
    router.push(`/member/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse overflow-hidden rounded-xl border-0 shadow-none">
              <div className="h-28 bg-gray-200" />
              <div className="bg-white p-4">
                <div className="mb-1.5 h-5 w-3/4 rounded bg-gray-200" />
                <div className="mb-3 h-8 w-full rounded bg-gray-200" />
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 w-6 rounded-full bg-gray-200" />
                    ))}
                  </div>
                  <div className="h-4 w-8 rounded bg-gray-200" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="rounded-lg bg-red-50 p-4 text-center">
          <p className="text-red-600">Error loading projects: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full">
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <p className="text-gray-500">No projects found. Create your first project!</p>
        </div>
      </div>
    );
  }

  // Generate random pastel colors based on project name for background
  const getProjectBgColor = (projectName: string) => {
    const colors = [
      'bg-blue-500',
    ];
    const index = projectName.length % colors.length;
    return colors[index];
  };

  // Generate random member count (since API doesn't provide members yet)
  const getMemberCount = () => {
    return Math.floor(Math.random() * 20) + 1;
  };

  // Generate random avatar URLs for members (since API doesn't provide member list)
  const getMemberAvatars = () => {
    const count = Math.min(6, Math.floor(Math.random() * 6) + 3);
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      src: `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
    }));
  };

  return (
    <div className="w-full">
      {/* Page Title - Remove if parent component already has title */}
      {/* <h1 className="text-2xl font-semibold text-gray-900 mb-8">Projects</h1> */}

      {/* Grid of Project Cards - Responsive */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((project) => {
          const memberAvatars = getMemberAvatars();
          const memberCount = getMemberCount();
          
          return (
            <Card
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              className={`flex cursor-pointer flex-col !gap-0 overflow-hidden rounded-xl border-0 !p-0 shadow-none transition-all hover:shadow-lg ${getProjectBgColor(project.name)}`}
            >
              <CardContent className="flex h-full flex-col p-0">
                {/* Project Logo Section - Colored Background */}
                <div className="relative flex h-28 items-center justify-center overflow-hidden p-4">
                  <Image
                    src={project.project_image_url || DEFAULT_PROJECT_IMAGE}
                    width={200}
                    height={100}
                    alt={`${project.name} logo`}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* Project Info Section - White Background */}
                <div className="flex min-h-0 flex-1 flex-col bg-white p-4">
                  <h2 className="mb-1.5 text-sm font-semibold text-gray-900 line-clamp-1">
                    {project.name}
                  </h2>
                  <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {project.description || 'No description provided'}
                  </p>

                  {/* Stacks/Tech Stack */}
                  {project.stacks && project.stacks.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                      {project.stacks.slice(0, 3).map((stack, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600"
                        >
                          {stack}
                        </span>
                      ))}
                      {project.stacks.length > 3 && (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                          +{project.stacks.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="mb-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : project.status === 'completed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {/* Members */}
                  <div className="mt-auto flex items-center gap-1.5">
                    <div className="flex -space-x-1.5">
                      {memberAvatars.map((member) => (
                        <Image
                          key={member.id}
                          width={30}
                          height={30}
                          src={member.src}
                          alt={`Team member ${member.id + 1}`}
                          className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-700">
                      +{memberCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}