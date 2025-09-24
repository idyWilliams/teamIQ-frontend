import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function AccountSetup() {
  return (
    <section className="max-w-lg w-full mx-4">
      <div className="text-center mb-12">
        <h1 className=" text-black text-2xl font-semibold">Account setup</h1>
        <p className="mt-2 font-normal text-[14px] md:text-[18px]">
          Welcome James, Personalize your account.
        </p>

        <div className="">
          <div className="flex items-center justify-center mt-5">
            <div className="relative">
              <Image
                src="/images/avatar.jpg"
                alt="avatar"
                width={100}
                height={100}
                priority
                className="rounded-full object-center object-cover size-[90]"
              />
              {/* Online status indicator */}
              <span
                className="absolute bottom-4 -right-1 md:-right-2 w-5 h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-white bg-[#D9D9D9]"
                title="Online"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="track" className="mb-3 font-normal text-[17px]">
            Select Track{" "}
          </Label>
          <Select>
            <SelectTrigger className="w-full data-[placeholder]:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]">
              <SelectValue placeholder="Frontend Developer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Frontend Developer</SelectItem>
              <SelectItem value="dark">Backend Developer</SelectItem>
              <SelectItem value="system">QA Tester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label
            htmlFor="stack"
            className="mb-3 font-normal text-[17px]">
            Enter stack
            <span className="inline text-xs md:text-sm ">
              (Separate them with commas to select multiple)
            </span>
          </Label>
          <Input
            type="text"
            id="stack"
            name="stack"
            placeholder="E.g: JavaScript, React, Python"
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]"
          />
        </div>
      </div>
      <Button className="bg-[#086ACE] hover:bg-[#086bcec0] hover:cursor-pointer text-white mt-6 md:mt-8 w-full py-3 h-auto rounded-md">
        Submit
      </Button>
    </section>
  );
}
