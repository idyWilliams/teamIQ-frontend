"use client";

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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Yup schema
const schema = yup.object({
  track: yup.string().required("Track is required"),
  stack: yup
    .string()
    .required("Stack is required")
    .min(2, "Stack must be at least 2 characters"),
});

type FormData = yup.InferType<typeof schema>;

export default function AccountSetup() {
  // Hook form setup with Yup
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Submition handler
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <section className="max-w-lg w-full mx-4">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          {/* Track selection */}
          <div>
            <Label htmlFor="track" className="mb-2 font-normal text-[17px]">
              Select Track
            </Label>
            <Select onValueChange={(val) => setValue("track", val)}>
              <SelectTrigger className="w-full data-[placeholder]:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]">
                <SelectValue placeholder="Frontend Developer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="QA Tester">QA Tester</SelectItem>
              </SelectContent>
            </Select>
            {errors.track && (
              <p className="text-red-500 text-sm mt-1">
                {errors.track.message}
              </p>
            )}
          </div>

          {/* Stack input */}
          <div>
            <Label htmlFor="stack" className="mb-2 font-normal text-[17px]">
              Enter stack
              <span className="inline text-xs md:text-sm ">
                (Separate them with commas to select multiple)
              </span>
            </Label>
            <Input
              type="text"
              id="stack"
              placeholder="E.g: JavaScript, React, Python"
              {...register("stack")}
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto bg-[#F7F7F7]"
            />
            {errors.stack && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stack.message}
              </p>
            )}
          </div>
        </div>
{/* Submition buttton */}
        <Button
          type="submit"
          className="bg-[#086ACE] hover:bg-[#086bcec0] hover:cursor-pointer text-white mt-6 md:mt-8 w-full py-3 h-auto rounded-md">
          Submit
        </Button>
      </form>
    </section>
  );
}
