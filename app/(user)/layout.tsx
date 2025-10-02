import Link from "next/link";
import React from "react";

type LayoutProps = {
children: React.ReactNode
}

const navLinks = [
  {label: "Dashboard", url: "/member"},
  {label: "Projects", url: "/member/projects"},
  {label: "Tasks", url: "/member/tasks"},
  {label: "My Skills", url: "/member/my-skills"},
  {label: "Settings", url: "/member/settings"},
]

export default function TeamDashboardLayout({children}: LayoutProps) {
  return <>
    <h1>Layout</h1>

    <div className="flex gap-4">
      {navLinks.map((link) => <Link key={link.label} href={link.url} className="underline">{link.label }</Link>)}
    </div>
    
    {children}</>
}