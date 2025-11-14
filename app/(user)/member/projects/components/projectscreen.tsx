'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'nextjs-toploader/app';
import Image from 'next/image';
import { useGetMyProjects } from '@/services/hooks/useProjectGet';

const projects = [
  {
    id: 'isentry-website',
    title: 'Isentry Website',
    description:
      'A secure and user-friendly platform designed to provide real-time monitoring and safety solutions, integrating intuitive navigation and responsive design for accessibility.',
    logo: '/images/isentry-logo.png',
    members: 10,
    bg: 'bg-[#1565C0]',
  },
  {
    id: 'goldies',
    title: 'Goldies',
    description:
      'An e-commerce platform showcasing curated fashion and lifestyle products, built to enhance customer experience with smooth browsing, secure checkout, and personalized recommendations.',
    logo: '/images/goldies-logo.png',
    members: 10,
    bg: 'bg-black',
  },
  {
    id: 'team-iq',
    title: 'Team IQ',
    description:
      'A collaborative project management and productivity tool aimed at improving teamwork through task tracking, performance insights, and seamless communication features.',
    logo: '/images/TeamIQLogo.png',
    members: 10,
    bg: 'bg-[#1976D2]',
  },
  {
    id: 'elevero-website',
    title: 'Elevero Website',
    description:
      'An AI-driven solution focused on personal growth and empowerment, providing intelligent recommendations, progress tracking, and resources tailored to individual goals.',
    logo: '/images/elevero-logo.png',
    members: 10,
    bg: 'bg-black',
  },
];

export default function ProjectScreen() {
  const router = useRouter();
  const {data, error, isLoading} = useGetMyProjects()
  console.log("component projects", data)

  const handleProjectClick = (projectId: string) => {
    router.push(`/member/projects/${projectId}`);
  };

  return (
    <div className="w-full">
      {/* Page Title - Remove if parent component already has title */}
      {/* <h1 className="text-2xl font-semibold text-gray-900 mb-8">Projects</h1> */}

      {/* Grid of Project Cards - Responsive */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map(project => (
          <Card
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className={`flex cursor-pointer flex-col !gap-0 overflow-hidden rounded-xl border-0 !p-0 shadow-none transition-all hover:shadow-lg ${project.bg}`}
          >
            <CardContent className="flex h-full flex-col p-0">
              {/* Project Logo Section - Colored Background */}
              <div className="relative flex h-28 items-center justify-center overflow-hidden p-4">
                <Image
                  src={project.logo}
                  width={200}
                  height={100}
                  alt={`${project.title} logo`}
                  className="h-full w-full object-contain"
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* Project Info Section - White Background */}
              <div className="flex min-h-0 flex-1 flex-col bg-white p-4">
                <h2 className="mb-1.5 text-sm font-semibold text-gray-900">
                  {project.title}
                </h2>
                <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-600">
                  {project.description}
                </p>

                {/* Members */}
                <div className="mt-auto flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <Image
                        key={i}
                        width={30}
                        height={30}
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        alt={`Team member ${i + 1}`}
                        className="h-6 w-6 rounded-full border-2 border-white bg-gray-200 object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    +{project.members}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
