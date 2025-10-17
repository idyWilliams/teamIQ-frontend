import React from 'react';
import RightArrow from '../../icons/RightArrow';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import DownArrow from '../../icons/DownArrow';
import ConnectionTool from '../stepper-forms/connection-tool';

interface StepFourProps {
  next: () => void;
}

const StepFour = ({ next }: StepFourProps) => {

  return (
    <div className="w-full">
      <Accordion
        type="single"
        collapsible
        defaultValue="communication-tool"
        className="w-full"
      >
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
             <ConnectionTool onSubmit={next} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StepFour;
