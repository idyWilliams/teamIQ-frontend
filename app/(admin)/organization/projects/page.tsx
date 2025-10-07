"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Plus, Calendar, Circle } from "lucide-react";
import { Button } from "@/components/ui/button"; // ✅ using shadcn button

export default function ProjectPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock Image component (to allow the code to run without requiring a specific image loader)
const Image = ({ src, alt, width, height, className }) => (
  <div
    style={{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
    className={className}
    title={alt}
  />
);


  const iconMap: Record<string, string> = {
    slack: "/images/slack.png",
    jira: "/images/jira.png",
    github: "/images/github.png",
    gitlab: "/images/gitlab.png",
    figma: "/images/figma.png",
    firebase: "/images/clickup.png",
  };

  const projects = [
    {
      id: 1,
      name: "Project XYZ",
      app: ["slack", "jira", "gitlab"],
      teamLead: "Kate Morrison",
      teamMembers: ["Mia", "Tom", "Leo", "Tina"],
      startDate: "Feb 15, 2025",
      endDate: "Apr 20, 2025",
      status: "In Progress",
      progress: 65,
    },
    {
      id: 2,
      name: "Project XYZ",
      app: ["slack", "github"],
      teamLead: "Kate Morrison",
      teamMembers: ["Ava", "Ryan", "Noah"],
      startDate: "Jan 20, 2025",
      endDate: "Mar 30, 2025",
      status: "Pending",
      progress: 25,
    },
    {
      id: 3,
      name: "Project XYZ",
      app: ["figma", "jira"],
      teamLead: "Kate Morrison",
      teamMembers: ["Ben", "Ella", "Mark", "Zoe"],
      startDate: "Feb 1, 2025",
      endDate: "May 10, 2025",
      status: "In Progress",
      progress: 50,
    },
    {
      id: 4,
      name: "Project XYZ",
      app: ["github", "firebase", "slack"],
      teamLead: "Kate Morrison",
      teamMembers: ["Fatima", "Sifan", "Adefolayo"],
      startDate: "Jan 10, 2025",
      endDate: "Jun 1, 2025",
      status: "Complete",
      progress: 100,
    },
    {
      id: 5,
      name: "Project XYZ",
      app: ["jira", "gitlab"],
      teamLead: "Kate Morrison",
      teamMembers: ["Andrew", "Kabreer", "Suraya"],
      startDate: "Mar 1, 2025",
      endDate: "Jun 15, 2025",
      status: "In Progress",
      progress: 70,
    },
  ];

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">Projects</h1>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} /> New Project
        </Button>
      </div>

      {/* Table Wrapper for Responsiveness */}
      <div className="overflow-x-auto">
        <table className="min-w-[900px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b">
              <th className="p-3 text-left font-semibold">Project Name</th>
              <th className="p-3 text-left font-semibold">App</th>
              <th className="p-3 text-left font-semibold">Team Lead</th>
              <th className="p-3 text-left font-semibold">Team Members</th>
              <th className="p-3 text-left font-semibold">Start Date</th>
              <th className="p-3 text-left font-semibold">End Date</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-left font-semibold">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="border-t hover:bg-gray-50 transition-all"
              >
                <td className="p-3 font-medium">{project.name}</td>

                {/* App Icons */}
                <td className="p-3 flex gap-2 items-center">
                  {project.app.map((app, i) => (
                    <Image
                      key={i}
                      src={iconMap[app]}
                      alt={app}
                      width={20}
                      height={20}
                      className="rounded-md"
                    />
                  ))}
                </td>

                {/* Team Lead - Updated to 28x28 and better alignment */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src="/images/profile.2.jpg"
                      alt="Lead"
                      width={28}
                      height={28}
                      className="rounded-full border-2 border-white object-cover shadow-sm bg-gray-600"
                    />
                    <span className="text-gray-700 font-medium whitespace-nowrap">
                        {project.teamLead}
                    </span>
                  </div>
                </td>

                {/* Team Members - Updated to overlapping stack with -space-x-3 */}
                <td className="p-4">
                  <div className="flex items-center">
                    {/* Overlapping stack for the first two members */}
                    <div className="flex -space-x-3">
                      {project.teamMembers.slice(0, 2).map((member, i) => (
                        <Image
                          key={i}
                          src={`/images/member${i + 1}.jpg`}
                          alt={member}
                          width={28}
                          height={28}
                          // Use z-10 on the first element to ensure it overlaps the second
                          className={`rounded-full border-2 border-white object-cover shadow-sm bg-white ${i === 0 ? 'z-10' : 'z-0'}`}
                        />
                      ))}
                    </div>
                    
                    {/* +X Counter positioned slightly after the stack */}
                    {project.teamMembers.length > 2 && (
                      <span className="ml-4 text-gray-600 text-xs font-semibold whitespace-nowrap">
                        +{project.teamMembers.length - 2}
                      </span>
                    )}
                  </div>
                </td>


                 {/* Team Lead 
                <td className="p-3">
                  <div className="flex items-center gap-2">
                  {/* TODO: Fetch actual profile image of team lead from backend 
                  <Image
                    src="/images/profile.2.jpg"
                    alt="Lead"
                    width={20}
                    height={20}
                    className="rounded-full border-2 border-white"
                  />
                  {project.teamLead}
                  </div>
                </td>*/}

                {/* Team Members 
                <td className="p-3">
                  <div className="flex items-center gap-2">
                  {project.teamMembers.slice(0, 2).map((member, i) => (
                    <Image
                      key={i}
                      src={`/images/member${i + 1}.jpg`}
                      alt={member}
                      width={28}
                      height={28}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                  {project.teamMembers.length > 2 && (
                    <span className="ml-3 text-gray-500 text-xs">
                      +{project.teamMembers.length - 2}
                    </span>
                  )}
                  </div>
                </td>*/}

                {/* Start Date */}
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {project.startDate}
                  </div>
                </td>

                {/* End Date */}
                <td className="p-3 text-gray-600">
                  <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  {project.endDate}
                  </div>
                </td>

                 {/* Status */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                  <Circle
                    size={8}
                    fill={
                      project.status === "Complete"
                        ? "green"
                        : project.status === "In Progress"
                        ? "blue"
                        : "orange"
                    }
                    className={
                      project.status === "Complete"
                        ? "text-green-500"
                        : project.status === "In Progress"
                        ? "text-blue-500"
                        : "text-yellow-500"
                    }
                  />
                  <span
                    className={`font-medium ${
                      project.status === "Complete"
                        ? "text-green-600"
                        : project.status === "In Progress"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {project.status}
                  </span>
                  </div>
                </td>


                 {/* Progress */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          project.status === "Complete"
                            ? "bg-green-500"
                            : project.status === "In Progress"
                            ? "bg-blue-500"
                            : "bg-yellow-400"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {project.progress}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


       {/* Blank Modal (to be connected to backend later) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4">New Project</h2>
            <p className="text-gray-600 mb-4">
              This modal is currently blank — form integration will come after backend setup.
            </p>
            <Button
              variant="secondary"
              className="mt-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
