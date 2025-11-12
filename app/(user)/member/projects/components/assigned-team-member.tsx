"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import TeamMemberCard from '@/app/(user)/member/projects/components/MemberCardItem';

interface TopSkill {
  name: string;
  rating: number;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  status: string;
  email: string;
  slack: string;
  skills: string[];
  specialties: string[];
  tasksCompleted: number;
  monthlyKPI: number;
  topSkills: TopSkill[];
}

interface AssignedTeamMembersProps {
  teamMembers?: TeamMember[];
}

export const defaultTeamMembers: TeamMember[] = [
  {
    name: "Kristin Watson",
    role: "Product Designer",
    avatar: "/images/avatar.jpg",
    rating: 4.3,
    status: "Available",
    email: "kristinwaston@company.com",
    slack: "kristinwaston@company.com",
    skills: [
      "Node.js",
      "Python",
      "PostgreSQL",
      "Redis",
      "React",
      "Microservices",
    ],
    specialties: ["API Design", "Database Optimization", "System Architecture"],
    tasksCompleted: 123,
    monthlyKPI: 67,
    topSkills: [
      { name: "React", rating: 70, color: "bg-purple-500" },
      { name: "React", rating: 70, color: "bg-blue-500" },
      { name: "React", rating: 70, color: "bg-orange-500" },
    ],
  },
  {
    name: "Robert Fox",
    role: "Backend Developer",
    avatar: "/images/gent.jpg",
    rating: 4.5,
    status: "Available",
    email: "robertfox@company.com",
    slack: "robertfox@company.com",
    skills: ["Node.js", "Python", "PostgreSQL"],
    specialties: ["API Design", "Database Optimization"],
    tasksCompleted: 98,
    monthlyKPI: 72,
    topSkills: [
      { name: "Node.js", rating: 85, color: "bg-green-500" },
      { name: "Python", rating: 80, color: "bg-blue-500" },
      { name: "PostgreSQL", rating: 75, color: "bg-indigo-500" },
    ],
  },
  {
    name: "Darrell Steward",
    role: "Product Manager",
    avatar: "/images/gent1.jpg",
    rating: 4.7,
    status: "Busy",
    email: "darrellsteward@company.com",
    slack: "darrellsteward@company.com",
    skills: ["Agile", "Scrum", "Leadership"],
    specialties: ["Product Strategy", "Team Management"],
    tasksCompleted: 145,
    monthlyKPI: 89,
    topSkills: [
      { name: "Leadership", rating: 90, color: "bg-yellow-500" },
      { name: "Agile", rating: 85, color: "bg-red-500" },
      { name: "Strategy", rating: 88, color: "bg-pink-500" },
    ],
  },
  {
    name: "Leslie Alexander",
    role: "Frontend Developer",
    avatar: "/images/lady.jpg",
    rating: 4.4,
    status: "Available",
    email: "lesliealexander@company.com",
    slack: "lesliealexander@company.com",
    skills: ["React", "TypeScript", "CSS"],
    specialties: ["UI Development", "Performance Optimization"],
    tasksCompleted: 112,
    monthlyKPI: 78,
    topSkills: [
      { name: "React", rating: 88, color: "bg-blue-500" },
      { name: "TypeScript", rating: 82, color: "bg-blue-600" },
      { name: "CSS", rating: 85, color: "bg-pink-500" },
    ],
  },
  {
    name: "Esther Howard",
    role: "Product Designer",
    avatar: "/images/lady1.jpg",
    rating: 4.6,
    status: "Available",
    email: "estherhoward@company.com",
    slack: "estherhoward@company.com",
    skills: ["Figma", "UI/UX", "Prototyping"],
    specialties: ["User Research", "Design Systems"],
    tasksCompleted: 87,
    monthlyKPI: 71,
    topSkills: [
      { name: "Figma", rating: 92, color: "bg-purple-500" },
      { name: "UI/UX", rating: 88, color: "bg-indigo-500" },
      { name: "Prototyping", rating: 85, color: "bg-blue-500" },
    ],
  },
  {
    name: "Jacob Jones",
    role: "QA Tester",
    avatar: "/images/gent2.jpg",
    rating: 4.2,
    status: "Available",
    email: "jacobjones@company.com",
    slack: "jacobjones@company.com",
    skills: ["Selenium", "Jest", "Cypress"],
    specialties: ["Test Automation", "Bug Tracking"],
    tasksCompleted: 156,
    monthlyKPI: 82,
    topSkills: [
      { name: "Selenium", rating: 87, color: "bg-green-500" },
      { name: "Jest", rating: 80, color: "bg-red-500" },
      { name: "Cypress", rating: 83, color: "bg-teal-500" },
    ],
  },
  {
    name: "Floyd Miles",
    role: "Content Writer",
    avatar: "/images/gent4.jpg",
    rating: 4.8,
    status: "Available",
    email: "floydmiles@company.com",
    slack: "floydmiles@company.com",
    skills: ["Copywriting", "SEO", "Research"],
    specialties: ["Technical Writing", "Content Strategy"],
    tasksCompleted: 201,
    monthlyKPI: 94,
    topSkills: [
      { name: "Copywriting", rating: 95, color: "bg-orange-500" },
      { name: "SEO", rating: 88, color: "bg-green-500" },
      { name: "Research", rating: 90, color: "bg-blue-500" },
    ],
  },
];

export default function AssignedTeamMembers({ teamMembers = defaultTeamMembers }: AssignedTeamMembersProps) {
	const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleMemberClick = (member: TeamMember) => {
		setSelectedMember(member);
		setIsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setIsDialogOpen(false);
		setTimeout(() => setSelectedMember(null), 200);
	};

	const handleSendMessage = () => {
		if (!selectedMember) return;
		
		const mailtoLink = `mailto:${selectedMember.email}?subject=Message from Team Portal&body=Hi ${selectedMember.name},%0D%0A%0D%0A`;
		window.location.href = mailtoLink;
	};

	// Close on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isDialogOpen) {
				handleCloseDialog();
			}
		};
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [isDialogOpen]);

	// Prevent body scroll when dialog is open
	useEffect(() => {
		if (isDialogOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isDialogOpen]);

  return (
    <div className="w-full">
      {/* Tabs */}
      {/* <div className="flex gap-6 border-b border-gray-200 mb-6">
				<Link href="/member/projects" className="pb-3 px-1 text-gray-500 hover:text-gray-700 transition-colors">
					Project Overview
				</Link>
				<Link href="/member/projects/tasks" className="pb-3 px-1 text-gray-500 hover:text-gray-700 transition-colors">
					Tasks
				</Link>
				<Link href="/member/projects/team" className="pb-3 px-1 text-blue-600 font-medium border-b-2 border-blue-600">
					Assigned Team Members
				</Link>
			</div> */}

			{/* Search Bar */}
			<div className="my-6">
				<div className="relative w-full max-w-sm">
					<svg
						className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="text"
						placeholder="Search for a task"
						className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
			</div>

			{/* Team Grid - Now using reusable TeamMemberCard */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
				{teamMembers.map((member) => (
					<TeamMemberCard
						key={member.name}
						name={member.name}
						role={member.role}
						avatar={member.avatar}
						onClick={() => handleMemberClick(member)}
					/>
				))}
			</div>

			{/* Custom Dialog Modal */}
			{isDialogOpen && (
				<div 
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
					onClick={handleCloseDialog}
				>
					{/* Lighter overlay - matches ShadCN style */}
					<div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
					
					{/* Modal Content */}
					<div 
						className="relative bg-white rounded-2xl max-w-4xl w-full my-auto shadow-xl z-10 max-h-[90vh]"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="overflow-y-auto max-h-[90vh]">
						{selectedMember && (
							<div className="p-8">
								{/* Close Button */}
								<button
									onClick={handleCloseDialog}
									className="absolute top-6 right-6 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>

								{/* Header */}
								<div className="flex items-start gap-6 mb-8">
									<Image
										src={selectedMember.avatar}
										alt={`${selectedMember.name} profile picture`}
										width={96}
										height={96}
										className="w-24 h-24 rounded-full object-cover"
									/>
									<div className="flex-1">
										<div className="flex items-center gap-3 mb-2">
											<h2 className="text-2xl font-bold text-gray-900">{selectedMember.name}</h2>
											<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
												{selectedMember.status}
											</span>
										</div>
										<p className="text-gray-600 mb-2">{selectedMember.role}</p>
										<div className="flex items-center gap-1">
											<svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
												<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
											</svg>
											<span className="font-semibold text-gray-900">{selectedMember.rating}</span>
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
													<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
													</svg>
													<span className="break-all">{selectedMember.email}</span>
												</div>
												<div className="flex items-center gap-3 text-gray-700">
													<svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
														<path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/>
													</svg>
													<span className="break-all">{selectedMember.slack}</span>
												</div>
											</div>
										</div>

										{/* Top Skill Rating */}
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
									</div>

									{/* Right Column */}
									<div>
										{/* Skills */}
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

										{/* Specialties */}
										<div className="mb-6">
											<h3 className="text-lg font-semibold text-gray-900 mb-4">Specialties</h3>
											<ul className="space-y-2">
												{selectedMember.specialties.map((specialty) => (
													<li key={specialty} className="flex items-center gap-2 text-gray-700">
														<span className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0"></span>
														{specialty}
													</li>
												))}
											</ul>
										</div>

										{/* Performance */}
										<div className="bg-gray-50 rounded-lg p-6">
											<h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
											<div className="grid grid-cols-2 gap-6">
												<div>
													<div className="text-4xl font-bold text-gray-900 mb-1">{selectedMember.tasksCompleted}</div>
													<div className="text-sm text-gray-600">Task completed</div>
												</div>
												<div>
													<div className="text-4xl font-bold text-gray-900 mb-1">{selectedMember.monthlyKPI}%</div>
													<div className="text-sm text-gray-600">Monthly KPI</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* Message Button */}
								<div className="mt-8">
									<button 
										onClick={handleSendMessage}
										className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
									>
										Message
									</button>
								</div>
							</div>
						)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
