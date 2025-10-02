"use client";

import Link from 'next/link';
import { useState } from 'react';
import AssignedTeamMembers from '@/components/assigned-team-member';

export default function TeamMatrixPage() {
  const [search, setSearch] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    alert(`Searching for: ${search}`);
  };

  return (
    <main>
      <h1><b>Isentry Website</b></h1>
      <nav style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid #e5e7eb', marginBottom: '1rem' }}>
        <Link href="/admin/organization/app" style={{ textDecoration: 'none', color: '#222' }}>Project Overview</Link>
        <Link href="/admin/organization/projects" style={{ textDecoration: 'none', color: '#222' }}>Tasks</Link>
        <Link href="/admin/organization/team-matrix" style={{ textDecoration: 'none', color: '#2563eb', borderBottom: '2px solid #2563eb', paddingBottom: '0.25rem' }}>Assigned Team Members</Link>
      </nav>
      <form onSubmit={handleSearch} style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', maxWidth: 400 }}>
        <input
          type="text"
          placeholder="Search for a task"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: 4 }}
        />
      </form>
    
      <AssignedTeamMembers />
    </main>
  );
}