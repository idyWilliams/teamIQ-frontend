"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

const projects = [
  {
    id: "isentry-website",
    title: "Isentry Website",
    description:
      "A secure and user-friendly platform designed to provide real-time monitoring and safety solutions, integrating intuitive navigation and responsive design for accessibility.",
    logo: "/images/isentry-logo.png",
    members: 10,
    bg: "bg-[#1565C0]",
  },
  {
    id: "goldies",
    title: "Goldies",
    description:
      "An e-commerce platform showcasing curated fashion and lifestyle products, built to enhance customer experience with smooth browsing, secure checkout, and personalized recommendations.",
    logo: "/images/goldies-logo.png",
    members: 10,
    bg: "bg-black",
  },
  {
    id: "team-iq",
    title: "Team IQ",
    description:
      "A collaborative project management and productivity tool aimed at improving teamwork through task tracking, performance insights, and seamless communication features.",
    logo: "/images/TeamIQLogo.png",
    members: 10,
    bg: "bg-[#1976D2]",
  },
  {
    id: "elevero-website",
    title: "Elevero Website",
    description:
      "An AI-driven solution focused on personal growth and empowerment, providing intelligent recommendations, progress tracking, and resources tailored to individual goals.",
    logo: "/images/elevero-logo.png",
    members: 10,
    bg: "bg-black",
  },
];

export default function ProjectScreen() {
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/member/projects/${projectId}/view`);
  };

  return (
    <div className="w-full">
      {/* Page Title - Remove if parent component already has title */}
      {/* <h1 className="text-2xl font-semibold text-gray-900 mb-8">Projects</h1> */}

      {/* Grid of Project Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            onClick={() => handleProjectClick(project.id)}
            className={`rounded-xl overflow-hidden border-0 shadow-none hover:shadow-lg transition-all cursor-pointer flex flex-col !p-0 !gap-0 ${project.bg}`}
          >
            <CardContent className="p-0 flex flex-col h-full">
              {/* Project Logo Section - Colored Background */}
              <div className="flex items-center justify-center h-28 relative overflow-hidden p-4">
  <img
    src={project.logo}
    alt={`${project.title} logo`}
    className="w-full h-full object-contain"
    onError={(e) => {
      e.currentTarget.style.display = 'none';
    }}
  />
</div>


              {/* Project Info Section - White Background */}
              <div className="bg-white p-4 flex-1 flex flex-col min-h-0">
                <h2 className="text-sm font-semibold text-gray-900 mb-1.5">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                  {project.description}
                </p>

                {/* Members */}
                <div className="flex items-center gap-1.5 mt-auto">
                  <div className="flex -space-x-1.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <img
                        key={i}
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        alt={`Team member ${i + 1}`}
                        className="w-6 h-6 rounded-full border-2 border-white object-cover bg-gray-200"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-700 font-medium">
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