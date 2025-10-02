"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const projects = [
  {
    id: "isentry-website",
    title: "Isentry Website",
    description:
      "An elegant and interactive web platform built for Goldies, designed to highlight products, promotions, and customer stories. The project emphasizes clean design, easy navigation, and scalability to support future e-commerce integration.",
    logo: "https://via.placeholder.com/80x40?text=I-Sentry",
    members: 10,
    bg: "bg-blue-600 text-white",
  },
  {
    id: "goldies",
    title: "Goldies",
    description:
      "A responsive and user-friendly website developed for ISENTRY, focusing on showcasing services, company profile, and client engagement. The platform integrates modern UI/UX practices and ensures cross-device compatibility to enhance accessibility and brand visibility.",
    logo: "https://via.placeholder.com/80x40?text=Goldies",
    members: 10,
    bg: "bg-black text-white",
  },
  {
    id: "team-iq",
    title: "Team IQ",
    description:
      "A collaborative team management and productivity tool that streamlines project workflows. Team IQ includes features for project tracking, team assignments, and progress monitoring, built with scalability and real-time updates in mind to improve team collaboration and efficiency.",
    logo: "https://via.placeholder.com/80x40?text=TeamIQ",
    members: 10,
    bg: "bg-blue-500 text-white",
  },
  {
    id: "elevero-website",
    title: "Elevero Website",
    description:
      "A modern, professional website designed for Elevero, with a focus on delivering a smooth digital experience for visitors. It incorporates optimized performance, SEO best practices, and a visually appealing layout to strengthen brand presence and support business growth.",
    logo: "https://via.placeholder.com/80x40?text=Elevero",
    members: 10,
    bg: "bg-purple-700 text-white",
  },
];

export default function ProjectScreen() {
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/member/projects/${projectId}/view`);
  };

  return (
    <div className="p-8">
      {/* Page Title */}
      <h1 className="text-2xl mb-6">Projects</h1>

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project, index) => (
          <Card
            key={index}
            onClick={() => handleProjectClick(project.id)}
            className={`rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${project.bg}`}
          >
            <CardContent className="p-6">
              {/* Project Logo */}
              <div className="flex justify-center mb-4">
                <img src={project.logo} alt={project.title} className="h-12" />
              </div>

              {/* Project Info */}
              <h2 className="text-lg font-semibold mb-2">{project.title}</h2>
              <p className="text-sm opacity-90 mb-4">{project.description}</p>

              {/* Members */}
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?img=${i + 10}`}
                      alt="member"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <span className="text-xs opacity-80">+{project.members}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}