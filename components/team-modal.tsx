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
import { teamMembers, TeamMember } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";


export const TeamModal : React.FC<{ selectedMember: TeamMember; onClose: () => void; handleSendMessage: () => void }> = ({ selectedMember, onClose, handleSendMessage }) => {
  return (
    <div> 
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
          </div>
  );
}
