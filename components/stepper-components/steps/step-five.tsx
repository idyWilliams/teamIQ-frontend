'use client';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import DownArrow from '../../icons/DownArrow';
import UserPermission from '../stepper-forms/user-permission';
import RightArrow from '@/components/icons/RightArrow';

interface StepFiveProps {
  next: () => void;
  projectId?: number;
}

const StepFive = ({ next, projectId }: StepFiveProps) => {
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
            <p className="flex-1 text-xl font-semibold">
              User & Permission Sync
            </p>
          </AccordionTrigger>

          <AccordionContent>
            <UserPermission
              onSubmit={next}
              hideButton={false}
              projectId={projectId}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepFive;
