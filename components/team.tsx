import React from "react";
import ActiveBlockers from "./active-blockers";
import { activeBlockers } from "@/constants";
import TeamMember from "./team-member";
import OrganizationMemberCard from "./team-member";
import TeamPage from "./team-page";

export default function Team() {
  return (
    <div className="space-y-4">

<div className= "flex gap-2">
      <TeamPage />

       <div className="lg:col-span-1 space-y-4">
                <ActiveBlockers blockers={activeBlockers} />
              </div>
              </div>
    </div>

    
  );
}