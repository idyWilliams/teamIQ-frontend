"use client";
import { useParams } from 'next/navigation';
import React from 'react'

export default function ProjectDetails() {
  const { id } = useParams()
  
  console.log(id);
  
  return (
    <div>
      Project Details - {id}
    </div>
  )
}
