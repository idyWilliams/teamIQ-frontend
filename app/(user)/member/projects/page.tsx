"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const projects = [
  { id: "1", title: "Isentry" },
  { id: "2", title: "Fintech App" },
];
export default function ProjectPage({ params }: { params: { id: string } }) {
  const pathname = usePathname();

  return (
    <div className="w-full">
      <h1 className="text-start p-3">Projects</h1>
    </div>
  );
}
