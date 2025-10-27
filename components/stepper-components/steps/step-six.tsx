import React from 'react';
import RightArrow from '../../icons/RightArrow';
import { Button } from '../../ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import DownArrow from '@/components/icons/DownArrow';
import ConnectionTool from '../stepper-forms/connection-tool';
import UserPermission from '../stepper-forms/user-permission';

interface StepSixProps {
  onSubmit: () => void;
}

const StepSix = ({ onSubmit }: StepSixProps) => {
  return (
    <div className="w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="communication-tool">
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
              Communication Tool Setup
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <ConnectionTool onSubmit={()=> {}} hideButton={true} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
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
            <UserPermission onSubmit={()=>{}} hideButton={true}/>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="mt-8 flex gap-4">
        <Button
          className="mt-4 w-full cursor-pointer bg-[#086ACE] p-6 text-base font-semibold"
          type="submit"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepSix;
