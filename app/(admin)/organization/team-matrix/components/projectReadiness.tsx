'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../../../../components/ui/card';
import { Button } from '../../../../../components/ui/button';
import {
  CircleCheck,
  FlaskConical,
  TriangleAlert,
  Code,
  Cpu,
  Server,
} from 'lucide-react';

type Project = {
  id: number;
  title: string;
  statusType: 'ready' | 'not_ready';
  skills: Record<string, number>;
};

export default function ProjectReadiness() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openModal, setOpenModal] = useState(false);

  /* =========================
     HANDLE CLICK
  ========================= */
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenModal(false);
      }
    };

    if (openModal) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [openModal]);

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-6">
      
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-900">
          Project Readiness
        </h4>
      </div>

      {/* GRID */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {projectUpdates.map((project) => {
          const statusStyle = 
            statusStyles[project.statusType] || statusStyles.not_ready;

          return (
            <Card
              key={project.id}
              className={`border-0 bg-gray-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${statusStyle.bg}`}
            >
              <CardContent className="p-3">
                
                {/* TITLE */}
                <h4 className="text-lg font-semibold text-gray-900">
                  {project.title}
                </h4>

                {/* STATUS */}
                <div className="mt-2">
                  <span className={`inline-block px-2 py-1 text-xs rounded-full bg-white ${statusStyle.text}`}>
                    {statusStyle.label}
                  </span>
                </div>

                {/* SKILLS */}
                <div className="mt-3 space-y-1.5">
                  {Object.entries(project.skills).slice(0, 3).map(([skill, value]) => {
                    const Icon = skillsIcons[skill.toLowerCase()] || CircleCheck;

                    return (
                      <div
                        key={skill}
                        className="flex items-center justify-between text-sm text-gray-700"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-500" />
                          <span className="capitalize">{skill}</span>
                        </div>
                        <span className="font-medium">{value} people</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>

              {/* BUTTON */}
              <div className="px-3 pb-2 pt-1">
                <Button
                  onClick={() => handleViewProject(project)}
                  className="w-full text-xs bg-iq-500 hover:bg-iq-300 mt-1 cursor-pointer"
                >
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* MODAL */}
      {openModal && selectedProject && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl"
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>

            {/* HEADER */}
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedProject.title}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Status: {statusStyles[selectedProject.statusType]?.label || 'Unknown'}
            </p>

            {/* SKILLS DETAIL */}
            <div className="mt-6 space-y-3">
              {Object.entries(selectedProject.skills).map(
                ([skill, value]: [string, any]) => {
                  const Icon =
                    skillsIcons[skill.toLowerCase()] || CircleCheck;

                return (
                  <div
                    key={skill}
                    className="flex items-center justify-between border-b pb-2 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-gray-600" />
                      <span className="capitalize">{skill}</span>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {value} people
                    </span>
                  </div>
                );
              })}
            </div>

            {/* FOOTER ACTION */}
            <div className="mt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Assign Team / Manage Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   ICON MAP
========================= */
const skillsIcons: Record<string, React.ElementType> = {
  python: FlaskConical,
  react: Code,
  java: Cpu,
  backend: Server,
  testing: CircleCheck,
  need: TriangleAlert,
};

/* =========================
   STATUS STYLES
========================= */
const statusStyles: Record<string, { label: string; bg: string; text: string }> = {
  ready: {
    label: 'Ready',
    bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
    text: 'text-emerald-600',
  },
  not_ready: {
    label: 'Not Ready',
    bg: 'bg-gradient-to-br from-red-50 to-rose-100',
    text: 'text-rose-600',
  },
} as const;

/* =========================
   DATA
========================= */
const projectUpdates: Project[] = [
  {
    id: 0,
    title: 'Goldies',
    statusType: 'ready',
    skills: {
      Python: 9,
      React: 5,
      Testing: 3,
    },
  },
  {
    id: 1,
    title: 'Elevero',
    statusType: 'not_ready',
    skills: {
      Python: 9,
      React: 5,
      Need: 1,
    },
  },
  {
    id: 2,
    title: 'NovaX',
    statusType: 'ready',
    skills: {
      Java: 6,
      Backend: 4,
      Testing: 2,
    },
  },
];