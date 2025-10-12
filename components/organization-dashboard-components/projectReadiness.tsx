import React from 'react'
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

export default function projectReadiness() {
    
  return (
    <>
      <div className="border border-gray-200 rounded-3xl m-6">
        <h4 className=" m-6 text-base font-semibold">Project Readiness</h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 m-6">
          {projectUpdates.map((projectStatus) => (
            <Card
              key={projectStatus.id}
              className={`py-6 px-4 text-white ${
                projectStatus.id === 0 ? "bg-pink-600" : "bg-purple-600"
              }`}
            >
              <CardContent>
                <h4 className="font-bold text-lg">{projectStatus.title}</h4>
                <p>{projectStatus.status}</p>
                {/* <p>{projectStatus.skills} people</p> */}
              </CardContent>
              <Button
                className={`bg-white ${
                  projectStatus.id === 0 ? "text-pink-600" : "text-purple-600"
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

const projectUpdates = [
  {
    id: 0,
    title: "Goldies",
    status: `Status - Ready`,
    skills: {
      python: 9,
      react: 5,
      // testing: 3,
    },
  },
  {
    id: 1,
    title: "Elevero",
    status: `Status - Not Ready`,
    skills: {
      python: 9,
      react: 5,
      // need: 1,
    },
  },
];
