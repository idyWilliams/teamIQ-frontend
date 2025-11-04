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
import VersionControlSetup from '../stepper-forms/version-control-setup';

interface StepThreeProps {
  next: () => void;
}

const StepThree = ({ next }: StepThreeProps) => {
  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="version-control-setup"
        className="w-full"
      >
        <AccordionItem value="version-control-setup">
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
              Version Control Setup
            </p>
          </AccordionTrigger>

          <AccordionContent>
            <VersionControlSetup onSubmit={next} hideButton={false} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepThree;
