import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CircleCheck, FlaskConical, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

export default function projectReadiness() {
  return (
    <>
      <div className="m-6 items-center rounded-3xl border border-gray-200">
        <h4 className="m-6 text-base font-semibold">Project Readiness</h4>
        <div className="m-6 grid grid-cols-1 gap-2 lg:grid-cols-3">
          {projectUpdates.map(projectStatus => (
            <Card
              key={projectStatus.id}
              className={`px-4 py-6 text-white ${
                projectStatus.id === 0 ? 'bg-pink-600' : 'bg-purple-600'
              }`}
            >
              <CardContent className="gap-2">
                <h4 className="text-lg font-bold">{projectStatus.title}</h4>
                <p className="">{projectStatus.status}</p>
                <div>
                  {Object.entries(projectStatus.skills).map(
                    ([skill, value]) => {
                      const normalizedSkill = skill.toLowerCase();
                      const iconSource =
                        projectStatus.id === 0
                          ? CircleCheck
                          : skillsIcons[normalizedSkill] || CircleCheck;

                      return (
                        <p key={skill} className="flex items-center gap-2">
                          {typeof iconSource === 'string' ? (
                            <Image
                              src={iconSource}
                              alt={skill}
                              width={5}
                              height={5}
                            />
                          ) : (
                            React.createElement(iconSource, {
                              className: 'w-5 h-5',
                            })
                          )}
                          <span className="capitalize">{skill}:</span>
                          <span>{value} People</span>
                        </p>
                      );
                    }
                  )}
                </div>
              </CardContent>
              <Button
                className={`bg-white hover:bg-gray-100 ${
                  projectStatus.id === 0 ? 'text-pink-600' : 'text-purple-600'
                }`}
              >
                View
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
const skillsIcons: Record<string, React.ElementType> = {
  // python: '/images/teenyicons_tick-circle-outline.png',
  python: FlaskConical,
  React: CircleCheck,
  Need: TriangleAlert,
};

const projectUpdates = [
  {
    id: 0,
    title: 'Goldies',
    status: `Status - Ready`,
    skills: {
      Python: 9,
      React: 5,
      Testing: 3,
    },
  },
  {
    id: 1,
    title: 'Elevero',
    status: `Status - Not Ready`,
    skills: {
      Python: 9,
      React: 5,
      Need: 1,
    },
  },
];
