'use client';

import React, { useState } from 'react';
import { Input } from '../../../../../components/ui/input';
import { Calendar } from '../../../../../components/ui/calendar';
import { Button } from '../../../../../components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../../../../components/ui/popover';
import { RotateCw, Search, ChevronDownIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';

const Subnavbar = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex items-center gap-2 md:flex-none">
        <RotateCw className="h-[30px] w-[30px] p-2 text-[#066ace]" />
        <Search className="absolute top-1/2 left-11 h-5 w-5 -translate-y-1/2 text-[#b4b4b4]" />
        <Input
          type="text"
          placeholder="Search for anything"
          className="h-[32px] w-full rounded-sm border pl-10 text-[#b4b4b4] placeholder:text-[15px] placeholder:text-[#b4b4b4] focus:ring-0 md:w-[200px]"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-3 p-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-[100px] justify-between font-normal text-[#666666]"
              >
                {date ? date.toLocaleDateString() : 'Date'}
                <ChevronDownIcon className="h-4 w-4 text-[#a1a1a1]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={date => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Select>
            <SelectTrigger className="h-[32px] w-[120px] rounded-sm bg-[#E4E7EC]">
              <SelectValue placeholder="All Tasks" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-[#666666]">All Task</SelectLabel>
                <SelectItem value="apple" className="text-[#666666]">
                  Blocking Task
                </SelectItem>
                <SelectItem value="banana" className="text-[#666666]">
                  Todo Task
                </SelectItem>
                <SelectItem value="blueberry" className="text-[#666666]">
                  In Process
                </SelectItem>
                <SelectItem value="grapes" className="text-[#666666]">
                  Done
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Subnavbar;
