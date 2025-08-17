import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <>
      <div className="max-w-lg w-full">
        <h3 className="text-[#0A427B] font-medium text-4xl mb-10">Login</h3>
        <form action="" className="space-y-6">
          <div>
            <Label htmlFor="email" className="mb-4 font-normal">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="example@gmail.com"
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
          </div>
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

          <div className="mt-10">
            <Button className="bg-[#0A427B] text-white w-full py-3 h-auto rounded-md">
              Login
            </Button>
            <div className="mt-8 flex items-center justify-between">
              <Label htmlFor="" className="font-normal">
                <Checkbox className="size-6" />
                <span>Remember me</span>
              </Label>

              <Link href="/forget-password" className="font-normal text-sm">
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-center gap-3">
              <hr className="grow border-0 border-t" />
              or
              <hr className="grow border-0 border-t" />
            </div>

            <div>
              <div className="flex justify-center items-center gap-5 mt-8 mb-10">
                <Button
                  variant={"ghost"}
                  className="border rounded-full size-12 p-0"
                >
                  <span className="icon-[devicon--google] size-5"></span>
                </Button>
                <Button
                  variant={"ghost"}
                  className="border rounded-full size-12 p-0"
                >
                  <span className="icon-[logos--microsoft-icon] size-5"></span>
                </Button>
              </div>
              <p className="text-center text-sm">
                Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
