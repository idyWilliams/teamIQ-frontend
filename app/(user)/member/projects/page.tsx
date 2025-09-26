"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function ProjectPage() {
  const pathname = usePathname();
  return (
    <div className="w-full">
      Project Page
      <Link href={`${pathname}/isentry-website`}>One</Link>
      <Link href={`${pathname}/2`}>Two</Link>
      <Link href={`${pathname}/3`}>Three</Link>
    </div>
  );
}
