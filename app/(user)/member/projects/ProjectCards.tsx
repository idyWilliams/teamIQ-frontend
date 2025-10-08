"use client";

import React from "react";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type projects = {
  id: string;
  title: string;
};

type ProjectProps = {
  projects: projects[];
};

export default function ProjectCards({ projects }: ProjectProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full">
      {projects.map((project) => {
        const projectId = project.id;
        return (
          <Link
            key={projectId}
            href={`/member/projects/${projectId}`}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            <Card className="h-[70%]">
              <CardHeader className="p-28">
                <CardTitle>{project.title}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <p>User Dashboard</p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
