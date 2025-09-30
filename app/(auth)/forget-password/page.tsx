"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgetPassword() {
  // Initializing react-hook-form with Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submit
  const onSubmit = (data: any) => {
    console.log("Form values:", data);
  };

  return (
    <div className="max-w-lg w-full">
      <h1 className="text-center mb-16 text-black text-2xl font-semibold">
        Forget Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email" className="mb-3 font-normal text-[15px]">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <Button className="bg-[#086ACE] text-white mt-20 w-full py-3 h-auto rounded-md">
          Continue
        </Button>
      </form>
    </div>
  );
}
