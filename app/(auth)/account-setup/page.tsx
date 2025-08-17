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
    <section className="max-w-lg w-full">
      <div className="text-center mb-16">
        <h1 className=" text-[#0A427B] text-2xl font-semibold">
          Account setup
        </h1>
        <p className="mt-2 font-normal">
          Welcome “User”, Personalize your account.
        </p>

        <Image
          src="/images/avatar.jpg"
          alt="avatar"
          width={100}
          height={100}
          priority
          className="rounded-full object-center object-cover size-[90] mt-5 mx-auto"
        />
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="track" className="mb-4 font-normal">
            Select Track{" "}
          </Label>
          <Select>
            <SelectTrigger className="w-full data-[placeholder]:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Frontend</SelectItem>
              <SelectItem value="dark">Backend</SelectItem>
              <SelectItem value="system">QA Tester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="portfolioLink" className="mb-4 font-normal">
            Portfolio Link (Separate them with commas to select multiple)
          </Label>
          <Input
            type="text"
            id="portfolioLink"
            name="portfolioLink"
            placeholder="Enter portfolio link"
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
          />
        </div>
        <div>
          <Label htmlFor="stack" className="mb-4 font-normal">
            Enter stack (Separate them with commas to select multiple)
          </Label>
          <Input
            type="text"
            id="stack"
            name="stack"
            placeholder="E.g: JavaScript, React, Python"
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
          />
        </div>
      </div>
      <Button className="bg-[#0A427B] text-white mt-10 w-full py-3 h-auto rounded-md">
        Continue
      </Button>
    </section>
  );
}
