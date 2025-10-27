'use client';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Dispatch, SetStateAction, useState } from 'react';

export function DatePicker({
  open,
  setValue,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setValue: Dispatch<SetStateAction<Date | undefined>>;
}) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-picker"
          variant="ghost"
          className="absolute top-1/2 right-2 size-6 -translate-y-1/2 cursor-pointer"
        >
          <CalendarDays />
          <span className="sr-only">Select date</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto overflow-hidden p-0"
        align="end"
        alignOffset={-8}
        sideOffset={10}
      >
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          month={month}
          onMonthChange={setMonth}
          onSelect={date => {
            setDate(date);
            setValue(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
