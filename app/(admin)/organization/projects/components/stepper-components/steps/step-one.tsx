// In your StepOne component
'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DownArrow from '@/components/icons/DownArrow';
import RightArrow from '@/components/icons/RightArrow';
import NewProjectDetails from '../stepper-forms/project-details';

interface StepOneProps {
  next: (projectData: { projectId: number; projectData: any }) => void; // ✅ Update this
}

const StepOne = ({ next }: StepOneProps) => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="project-details"
        className="w-full"
      >
        <AccordionItem value="project-details">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">Project Details</p>
          </AccordionTrigger>

          <AccordionContent>
            {/* ✅ Pass the updated handler */}
            <NewProjectDetails
              onSubmit={result => next(result)}
              hideButton={false}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepOne;
