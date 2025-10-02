"use client";
import AssignedTeamMembers from "@/components/assigned-team-member";
import React, { useState } from "react";

const AssignTeamMember = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    alert(`Searching for: ${search}`);
  };

  return (
    <div>
      {/* <form
        onSubmit={handleSearch}
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          gap: "0.5rem",
          maxWidth: 400,
        }}
      >
        <input
          type="text"
          placeholder="Search for a task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #e5e7eb",
            borderRadius: 4,
          }}
        />
      </form> */}

      <AssignedTeamMembers />
    </div>
  );
};

export default AssignTeamMember;
