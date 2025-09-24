"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export default function ResetPassword() {
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submit
  const onSubmit = (data: any) => {
    console.log("Form values:", data);
  };

  return (
    <div className="max-w-lg w-full mx-4">
      <h1 className="text-center mb-10 text-[#0A427B] text-2xl font-semibold">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="password" className="mb-3 font-normal text-[15px]">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Password"
                {...register("password")}
                className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7] pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3C4D6] focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}>
                {showPassword ? (
                  <Eye size={20} className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5" />
                ) : (
                  <EyeOff size={20} className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="mb-3 font-normal text-[15px]">
              Re-enter Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Re-enter Password"
                {...register("confirmPassword")}
                className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7] pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B3C4D6] focus:outline-none"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                tabIndex={-1}>
                {showConfirmPassword ? (
                  <Eye size={20} className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5" />
                ) : (
                  <EyeOff size={20} className="sm:w-4 text-[#939393] sm:h-4 md:w-5 md:h-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className="bg-[#086ACE] hover:cursor-pointer hover:bg-[#086bcec0] text-white mt-10 w-full py-3 h-auto rounded-md">
          Reset
        </Button>
      </form>
    </div>
  );
}
