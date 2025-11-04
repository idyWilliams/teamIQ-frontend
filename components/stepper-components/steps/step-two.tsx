'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import DownArrow from '../../icons/DownArrow';
import RightArrow from '@/components/icons/RightArrow';
import ProjectMgmtSetup from '../stepper-forms/project-mgmt-setup';

interface StepTwoProps {
  next: () => void;
}

const StepTwo = ({ next }: StepTwoProps) => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="project-management-tool"
        className="w-full"
      >
        <AccordionItem value="project-management-tool">
          <AccordionTrigger className="group flex cursor-pointer items-center gap-2 hover:no-underline [&_.lucide-chevron-down]:hidden [&>svg]:!rotate-0">
            <RightArrow
              size="20"
              className="block group-data-[state=open]:hidden"
            />
            <DownArrow
              size="20"
              className="hidden group-data-[state=open]:block"
            />
            <p className="flex-1 text-xl font-semibold">
              Project Management Tool Setup
            </p>
          </AccordionTrigger>

          <AccordionContent>
            <ProjectMgmtSetup onSubmit={next} hideButton={false} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepTwo;
