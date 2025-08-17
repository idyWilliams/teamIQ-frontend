import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function ForgetPassword() {
  return (
    <div className="max-w-lg w-full">
      <h1 className="text-center mb-16 text-[#0A427B] text-2xl font-semibold">
        Reset Password
      </h1>
      <form action="">
        <div className="space-y-6">
          <div>
            <Label htmlFor="password" className="mb-4 font-normal">
              Password
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-4 font-normal">
              Re-enterPassword
            </Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Re-enter Password"
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
          </div>
        </div>
        <Button className="bg-[#0A427B] text-white mt-20 w-full py-3 h-auto rounded-md">
          Reset
        </Button>
      </form>
    </div>
  );
}
