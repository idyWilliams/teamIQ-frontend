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
import NewProjectDetails from '../stepper-forms/project-details';

interface StepOneProps {
  next: () => void;
}

const StepOne = ({ next }: StepOneProps) => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="user-permission"
        className="w-full"
      >
        <AccordionItem value="user-permission">
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
            <NewProjectDetails onSubmit={next} hideButton={false} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepOne;
