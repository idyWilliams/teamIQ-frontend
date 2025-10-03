"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  // Initializing react-hook-form with Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);

  // Handle form submit
  const onSubmit = (data: any) => {
    console.log("Form values:", data);
  };

  return (
    <div className=" w-full mx-auto">
      <h3 className="text-[#0B0B0B] font-medium text-4xl mb-10">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" className="mb-2 font-normal">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="password" className="mb-2 font-normal">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              {...register("password")}
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto pr-10"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3C4D6] focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}>
              {showPassword ? (
                <Eye
                  size={20}
                  className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5"
                />
              ) : (
                <EyeOff
                  size={20}
                  className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5"
                />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <div className="mt-8">
          <Button
            type="submit"
            className="bg-[#086ACE] hover:cursor-pointer hover:bg-[#086bcecc] text-white w-full py-3 h-auto rounded-md">
            Login
          </Button>
          <div className="mt-6 flex items-center justify-between">
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
            <div className="flex justify-center items-center gap-5 mt-6 mb-8">
              <Button
                variant={"ghost"}
                className="border rounded-full size-12 p-0">
                <span className="icon-[devicon--google] size-5"></span>
              </Button>
              <Button
                variant={"ghost"}
                className="border rounded-full size-12 p-0">
                <span className="icon-[logos--microsoft-icon] size-5"></span>
              </Button>
            </div>
            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#086ACE]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
