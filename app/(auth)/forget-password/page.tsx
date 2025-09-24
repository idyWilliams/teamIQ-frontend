import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function ForgetPassword() {
  return (
    <div className="max-w-lg w-full mx-4">
      <h1 className="text-center md:mb-10 mb-8 text-black text-2xl font-semibold">
        Forgot Password
      </h1>
      <form action="">
        <div>
          <Label htmlFor="email" className="mb-4 font-normal text-[15px] ">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]"
          />
        </div>
        <Button className="bg-[#086ACE] hover:cursor-pointer hover:bg-[#086bcebe] text-white mt-10 w-full py-3 h-auto rounded-md">
          Continue
        </Button>
      </form>
    </div>
  );
}
