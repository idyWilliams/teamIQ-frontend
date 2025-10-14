"use client";

import { useState } from "react";
import OrganizationMemberCard from "@/components/OrganisationMemberCard";
import { UserPlus, Calendar } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

interface TeamMember {
  name: string;
  tasks: string;
  lastSeen: string;
  avatar: string;
  role?: string;
  rating?: number;
  status?: string;
  email?: string;
  slack?: string;
  skills?: string[];
  specialties?: string[];
  tasksCompleted?: number;
  monthlyKPI?: number;
  topSkills?: { name: string; rating: number; color: string }[];
}

export default function OrganizationTeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const teamMembers: TeamMember[] = [
    { 
      name: "Jacob Jones", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent.jpg",
      role: "Product Designer",
      rating: 4.3,
      status: "Available",
      email: "jacobjones@company.com",
      slack: "jacobjones@company.com",
      skills: ["Node.js", "Python", "PostgreSQL"],
      specialties: ["API Design", "Database Optimization", "System Architecture"],
      tasksCompleted: 123,
      monthlyKPI: 67,
      topSkills: [
        { name: "React", rating: 70, color: "bg-purple-500" },
        { name: "Python", rating: 70, color: "bg-blue-500" },
        { name: "Typescript", rating: 70, color: "bg-orange-500" }
      ]
    },
    { 
      name: "Ronald Richards", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent1.jpg", 
      role: "Backend Developer",
      rating: 4.5,
      status: "Available",
      email: "ronaldrichards@company.com",
      slack: "ronaldrichards@company.com",
      skills: ["Node.js", "MongoDB", "Express", "Docker"],
      specialties: ["Microservices", "API Development", "DevOps"],
      tasksCompleted: 98,
      monthlyKPI: 72,
      topSkills: [
        { name: "Node.js", rating: 85, color: "bg-green-500" },
        { name: "MongoDB", rating: 78, color: "bg-blue-500" },
        { name: "Docker", rating: 82, color: "bg-indigo-500" }
      ]
    },
    { 
      name: "Darrell Steward", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent2.jpg", 
      role: "Product Manager",
      rating: 4.7,
      status: "Busy",
      email: "darrellsteward@company.com",
      slack: "darrellsteward@company.com",
      skills: ["Agile", "Scrum", "Jira", "Leadership"],
      specialties: ["Product Strategy", "Team Management", "Stakeholder Communication"],
      tasksCompleted: 145,
      monthlyKPI: 89,
      topSkills: [
        { name: "Leadership", rating: 90, color: "bg-yellow-500" },
        { name: "Agile", rating: 85, color: "bg-red-500" },
        { name: "Strategy", rating: 88, color: "bg-pink-500" }
      ]
    },
    { 
      name: "Cameron Williamson", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent4.jpg", 
      role: "Full Stack Developer",
      rating: 4.4,
      status: "Available",
      email: "cameronwilliamson@company.com",
      slack: "cameronwilliamson@company.com",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      specialties: ["Full Stack Development", "Cloud Architecture", "Performance Optimization"],
      tasksCompleted: 110,
      monthlyKPI: 75,
      topSkills: [
        { name: "React", rating: 88, color: "bg-blue-500" },
        { name: "TypeScript", rating: 82, color: "bg-blue-600" },
        { name: "AWS", rating: 79, color: "bg-orange-500" }
      ]
    },
    { 
      name: "Bessie Cooper", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent3.jpg", 
      role: "UI/UX Designer",
      rating: 4.6,
      status: "Available",
      email: "bessiecooper@company.com",
      slack: "bessiecooper@company.com",
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      specialties: ["User Research", "Design Systems", "Wireframing"],
      tasksCompleted: 87,
      monthlyKPI: 71,
      topSkills: [
        { name: "Figma", rating: 92, color: "bg-purple-500" },
        { name: "UI/UX", rating: 88, color: "bg-indigo-500" },
        { name: "Prototyping", rating: 85, color: "bg-pink-500" }
      ]
    },
    { 
      name: "Ralph Edwards", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent5.jpg", 
      role: "Frontend Developer",
      rating: 4.2,
      status: "Available",
      email: "ralphedwards@company.com",
      slack: "ralphedwards@company.com",
      skills: ["React", "Vue.js", "CSS", "JavaScript"],
      specialties: ["Responsive Design", "Component Libraries", "Animation"],
      tasksCompleted: 102,
      monthlyKPI: 68,
      topSkills: [
        { name: "React", rating: 80, color: "bg-blue-500" },
        { name: "Vue.js", rating: 75, color: "bg-green-500" },
        { name: "CSS", rating: 85, color: "bg-pink-500" }
      ]
    },
    { 
      name: "Marvin McKinney", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent6.jpg", 
      role: "QA Tester",
      rating: 4.8,
      status: "Available",
      email: "marvinmckinney@company.com",
      slack: "marvinmckinney@company.com",
      skills: ["Selenium", "Jest", "Cypress", "Postman"],
      specialties: ["Test Automation", "Bug Tracking", "Performance Testing"],
      tasksCompleted: 156,
      monthlyKPI: 82,
      topSkills: [
        { name: "Selenium", rating: 87, color: "bg-green-500" },
        { name: "Jest", rating: 80, color: "bg-red-500" },
        { name: "Cypress", rating: 83, color: "bg-teal-500" }
      ]
    },
    { 
      name: "Jerome Bell", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent7.jpg", 
      role: "DevOps Engineer",
      rating: 4.5,
      status: "Busy",
      email: "jeromebell@company.com",
      slack: "jeromebell@company.com",
      skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
      specialties: ["Infrastructure", "Automation", "Cloud Services"],
      tasksCompleted: 134,
      monthlyKPI: 78,
      topSkills: [
        { name: "Docker", rating: 90, color: "bg-blue-500" },
        { name: "Kubernetes", rating: 85, color: "bg-indigo-500" },
        { name: "AWS", rating: 88, color: "bg-orange-500" }
      ]
    },
    { 
      name: "Guy Hawkins", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent8.jpg", 
      role: "Graphic Designer",
      rating: 4.3,
      status: "Available",
      email: "guyhawkins@company.com",
      slack: "guyhawkins@company.com",
      skills: ["Photoshop", "Illustrator", "InDesign", "Branding"],
      specialties: ["Brand Identity", "Visual Design", "Print Design"],
      tasksCompleted: 95,
      monthlyKPI: 70,
      topSkills: [
        { name: "Photoshop", rating: 92, color: "bg-purple-500" },
        { name: "Illustrator", rating: 88, color: "bg-orange-500" },
        { name: "Branding", rating: 85, color: "bg-pink-500" }
      ]
    },
    { 
      name: "Savannah Nguyen", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent9.jpg", 
      role: "Mobile Developer",
      rating: 4.6,
      status: "Available",
      email: "savannahnguyen@company.com",
      slack: "savannahnguyen@company.com",
      skills: ["React Native", "Swift", "Kotlin", "Flutter"],
      specialties: ["iOS Development", "Android Development", "Cross-platform Apps"],
      tasksCompleted: 118,
      monthlyKPI: 76,
      topSkills: [
        { name: "React Native", rating: 86, color: "bg-blue-500" },
        { name: "Swift", rating: 82, color: "bg-orange-500" },
        { name: "Kotlin", rating: 80, color: "bg-purple-500" }
      ]
    },
    { 
      name: "Leslie Alexander", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/lady.jpg", 
      role: "Frontend Developer",
      rating: 4.4,
      status: "Available",
      email: "lesliealexander@company.com",
      slack: "lesliealexander@company.com",
      skills: ["React", "TypeScript", "CSS", "Tailwind"],
      specialties: ["UI Development", "Performance Optimization", "Accessibility"],
      tasksCompleted: 112,
      monthlyKPI: 78,
      topSkills: [
        { name: "React", rating: 88, color: "bg-blue-500" },
        { name: "TypeScript", rating: 82, color: "bg-blue-600" },
        { name: "CSS", rating: 85, color: "bg-pink-500" }
      ]
    },
    { 
      name: "Floyd Miles", 
      tasks: "12 active tasks", 
      lastSeen: "12:12", 
      avatar: "/images/gent4.jpg", 
      role: "Content Writer",
      rating: 4.8,
      status: "Available",
      email: "floydmiles@company.com",
      slack: "floydmiles@company.com",
      skills: ["Copywriting", "SEO", "Content Strategy", "Research"],
      specialties: ["Technical Writing", "Content Strategy", "Blog Writing"],
      tasksCompleted: 201,
      monthlyKPI: 94,
      topSkills: [
        { name: "Copywriting", rating: 95, color: "bg-orange-500" },
        { name: "SEO", rating: 88, color: "bg-green-500" },
        { name: "Research", rating: 90, color: "bg-blue-500" }
      ]
    },
  ];

  const blockers = [
    { name: "Alex", description: "Blocked on API dependencies", time: "2 hours" },
    { name: "Maria", description: "Waiting for design review", time: "30 min" },
    { name: "John", description: "Database schema conflict", time: "1 hour" },
    { name: "Tanya", description: "Missing access to production API", time: "3 hours" },
  ];

  const handleMemberClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const handleSendMessage = () => {
    if (!selectedMember) return;
    const mailtoLink = `mailto:${selectedMember.email}?subject=Message from Team Portal&body=Hi ${selectedMember.name},%0D%0A%0D%0A`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-6 border-b border-gray-200">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-2">
            <Image src="/images/isentry-logo.jpeg" alt="Logo" width={32} height={32} />
            <h1 className="font-semibold text-lg text-gray-800">ISentry Technologies</h1>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="flex gap-6 border-b border-gray-100 px-1">
            <TabsTrigger value="overview" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="status" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm">
              Project Status
            </TabsTrigger>
            <TabsTrigger value="team" className="data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 pb-2 text-gray-600 text-sm">
              Team
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      {/* Content */}
      <div className="flex gap-8">
        {/* Team Members */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Team Members</h2>
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline">
                  <UserPlus size={16} /> Add Team Member
                </button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    You can invite your team members with their email.
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="Enter email" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="developer">Developer</SelectItem>
                        <SelectItem value="designer">Designer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Send Invite
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {teamMembers.map((member, index) => (
              <div key={index} onClick={() => handleMemberClick(member)}>
                <OrganizationMemberCard {...member} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Blockers */}
        <aside className="rounded-xl border border-gray-200 bg-white shadow-sm" style={{ width: "382px", height: "620px", padding: "24px 16px", gap: "24px" }}>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Blockers</h2>

          <div className="flex flex-col gap-4 overflow-y-auto h-[540px] pr-1">
            {blockers.map((blocker, index) => (
              <div key={index} className="relative flex justify-between items-center w-[350px] h-[60px] gap-5 border border-gray-200 bg-gray-50 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition-all">
                <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-l-lg"></span>
                <div className="ml-2">
                  <p className="font-medium text-gray-800">{blocker.name}</p>
                  <p className="text-sm text-gray-500">{blocker.description}</p>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <Calendar size={14} className="text-gray-400" />
                  <span>{blocker.time}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Member Details Modal */}
      <Dialog open={isMemberModalOpen} onOpenChange={setIsMemberModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {selectedMember && (
            <div className="p-2">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <Image
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  width={96}
                  height={96}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {selectedMember.status || "Available"}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{selectedMember.role}</p>
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-gray-900">{selectedMember.rating || 4.3}</span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  {/* Contact Information */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{selectedMember.email || "email@company.com"}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
                        </svg>
                        <span>{selectedMember.slack || "slack@company.com"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Skill Rating */}
                  {selectedMember.topSkills && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skill Rating</h3>
                      <div className="space-y-3 mb-4">
                        {selectedMember.topSkills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-4">
                            <div className="flex-1 bg-gray-200 rounded-full h-10 overflow-hidden">
                              <div
                                className={`${skill.color} h-full rounded-full flex items-center justify-center text-white font-semibold text-sm`}
                                style={{ width: `${skill.rating}%` }}
                              >
                                {skill.rating}%
                              </div>
                            </div>
                            <span className="font-medium text-gray-900 w-20 text-right text-sm">{skill.name}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
                        View in Github
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  {/* Skills */}
                  {selectedMember.skills && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.skills.map((skill) => (
                          <span key={skill} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Specialties */}
                  {selectedMember.specialties && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
                      <ul className="space-y-2">
                        {selectedMember.specialties.map((specialty) => (
                          <li key={specialty} className="flex items-center gap-2 text-gray-700">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Performance */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{selectedMember.tasksCompleted || 123}</div>
                        <div className="text-sm text-gray-600">Task completed</div>
                      </div>
                      <div>
                        <div className="text-4xl font-bold text-gray-900 mb-1">{selectedMember.monthlyKPI || 67}%</div>
                        <div className="text-sm text-gray-600">Monthly KPI</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Button */}
              <div className="mt-8">
                <Button 
                  onClick={handleSendMessage}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}