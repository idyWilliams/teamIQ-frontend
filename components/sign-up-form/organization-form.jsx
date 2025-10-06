import countryList from "@/components/sign-up-form/country-list";
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "../ui/password-input";

const validationSchema = yup.object().shape({
  organization_name: yup
    .string()
    .required("Organization name is required")
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "Organization name must start with a capital letter."
    ),
  team_size: yup
    .number()
    .min(1, "Team size must be at least 1")
    .typeError("Team size must be a number")
    .required("Team size is required"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[.@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Repeat password is required"),
});

function OrganizationForm() {
  // Reusable input & select trigger style (aligned with IndividualForm)
  const placeHolder =
    "!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md bg-[#F7F7F7] focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#086ACE] focus-visible:ring-0";

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      organization_name: "",
      team_size: "",
      email: "",
      country: "",
      password: "",
      repeatPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("User Input:", data);

    toast.success("Form submitted successfully!");
    reset();
  };

  const onError = (errors) => {
    console.log("Validation Errors:", errors);
    toast.error("Please fix the errors in the form.");
  };

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="sm:flex-2 w-full">
            <Label
              htmlFor="organization_name"
              className=" font-normal block mb-4"
            >
              Organization Name
            </Label>
            <Input
              type="text"
              id="organization_name"
              placeholder="Enter Organization Name"
              {...register("organization_name")}
              className={placeHolder}
              autoComplete="organization"
              aria-invalid={!!errors.organization_name}
            />
            {errors.organization_name && (
              <span className="text-red-500 text-xs mt-1 block leading-snug">
                {errors.organization_name.message}
              </span>
            )}
          </div>

          <div className="sm:flex-1 w-full">
            <Label htmlFor="team_size" className=" font-normal block mb-4">
              Team Size
            </Label>
            <Controller
              name="team_size"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`${placeHolder} w-full`}
                    aria-invalid={!!errors.team_size}
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-auto">
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.team_size && (
              <span className="text-red-500 text-xs mt-1 block leading-snug">
                {errors.team_size.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 font-normal">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")}
            className={placeHolder}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block leading-snug">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <Label className="mb-4 font-normal">Enter Country</Label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  className={`${placeHolder} w-full`}
                  aria-invalid={!!errors.country}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-auto">
                  {countryList.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />

          {errors.country && (
            <span className="text-red-500 text-xs mt-1 block leading-snug">
              {errors.country.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="mb-4 font-normal">
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput id="password" className={placeHolder} {...field}>
                <PasswordInputStrengthChecker />
              </PasswordInput>
            )}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block leading-snug">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="repeatPassword" className="mb-4 font-normal">
            Repeat Password
          </Label>
          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="repeatPassword"
                className={placeHolder}
                {...field}
              />
            )}
          />
          {errors.repeatPassword && (
            <span className="text-red-500 text-xs mt-1 block leading-snug">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <div className="mt-10">
          <Button
            className="bg-[#0A427B] text-white w-full py-3 px-6 md:px-4  h-auto rounded-md"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
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
            <p className="text-center text-sm mb-5">
              Already have an account?{" "}
              <Link href="/login" className="text-[#086ACE]">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrganizationForm;
