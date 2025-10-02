import countryList from "@/components/sign-up-form/country-list";
import React, { useState } from "react";
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

// React Hook Form imports
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  PasswordInput,
  PasswordInputStrengthChecker,
} from "../ui/password-input";

// Yup Validation Schema - This defines all our validation rules
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .trim()
    .matches(
      /^[A-Z][a-zA-Z]*$/,
      "First name must start with a capital letter."
    ),

  lastName: yup
    .string()
    .required("Last name is required")
    .trim()
    .matches(/^[A-Z][a-zA-Z]*$/, "Last name must start with a capital letter."),

  userName: yup
    .string()
    .required("User name is required")
    .min(3, "User name must be at least 3 characters")
    .max(20, "User name must be at most 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Only letters, numbers, and underscores are allowed"
    )
    .trim(),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim(),

  country: yup.string().required("Country is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must not exceed 32 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[.@$!%*?&]/,
      "Password must contain at least one special character"
    ),

  repeatPassword: yup
    .string()
    .required("Please repeat your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

function IndividualForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onBlur", // Validate on blur
    reValidateMode: "onChange", // Re-validate on change
    defaultValues: {
      // Set default form values
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      country: "",
      password: "",
      repeatPassword: "",
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    // This function only runs if validation passes
    console.log("User Input:", data);
    toast.success("Form submitted successfully!");

    // Reset the form after successful submission
    reset();
  };

  // Handle form submission errors
  const onError = (errors) => {
    console.log("Validation errors:", errors);
    toast.error("Please fix the errors in the form");
  };

  const placeHolder =
    "!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md bg-transparent focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#086ACE] focus-visible:ring-0";

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Label htmlFor="firstName" className="mb-4 font-normal">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName")} // Register the field with React Hook Form
              className={placeHolder}
              autoComplete="given-name"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs mt-1 block leading-snug">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <Label htmlFor="lastName" className="mb-4 font-normal">
              Last Name
            </Label>
            <Input
              type="text"
              id="lastName"
              placeholder="Last Name"
              {...register("lastName")} // Register the field with React Hook Form
              className={placeHolder}
              autoComplete="family-name"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs mt-1 block leading-snug">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="userName" className="mb-4 font-normal">
            User Name
          </Label>
          <Input
            type="text"
            id="userName"
            placeholder="Characters not allowed"
            {...register("userName")} // Register the field with React Hook Form
            className={placeHolder}
            autoComplete="username"
            aria-invalid={!!errors.userName}
          />
          {errors.userName && (
            <span className="text-red-500 text-xs mt-1 block leading-snug">
              {errors.userName.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="mb-1 font-normal">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register("email")} // Register the field with React Hook Form
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
          {/* Controller is needed for custom components like Select */}
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className={`${placeHolder} w-full`}>
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
            className="bg-[#0A427B] text-white w-full py-3 h-auto rounded-md"
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Signing Up..." : "SignUp"}
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
            <p className="text-center text-sm">
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

export default IndividualForm;
