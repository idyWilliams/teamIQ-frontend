"use client";

import React, { useState } from "react";
import { Input } from "../../ui/input";
import { Calendar } from "../../ui/calendar";
import { Button } from "../../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import { Label } from "../../ui/label";
import { RotateCw, Search, ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

const Subnavbar = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="relative flex gap-2 items-center md:flex-none">
        <RotateCw className="text-[#066ace] w-[30px] h-[30px] p-2" />
        <Search className="text-[#b4b4b4] absolute left-11 top-1/2 -translate-y-1/2 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for anything"
          className="w-full md:w-[200px] h-[32px] border rounded-sm pl-10 text-[#b4b4b4] placeholder:text-[#b4b4b4] placeholder:text-[15px] focus:ring-0"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-3 p-3">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="text-[#666666] w-[100px] justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Date"}
                <ChevronDownIcon className="text-[#a1a1a1] w-4 h-4" />
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
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Select>
            <SelectTrigger className="bg-[#E4E7EC] w-[120px] h-[32px] rounded-sm">
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
