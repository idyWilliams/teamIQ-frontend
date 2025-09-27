import countryList from "@/components/sign-up-form/country-list";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
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

// Yup Validation Schema - This defines all our validation rules
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required").trim()
    .matches(/^[A-Z][a-zA-Z]*$/, "First name must start with a capital letter."),
  

  lastName: yup
    .string()
    .required("Last name is required").trim()
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
    .matches(/[@$!%*?&]/, "Password must contain at least one special character"),

  repeatPassword: yup
    .string()
    .required("Please repeat your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

function IndividualForm() {
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  // React Hook Form setup with Yup validation
  const {
    register, // Function to register form fields
    handleSubmit, // Function to handle form submission
    control, // Control object for controlled components (like Select)
    formState: { errors, isSubmitting }, // Form state including errors
    reset, // Function to reset the form
    watch, // Function to watch field values
  } = useForm({
    resolver: yupResolver(validationSchema), // Connect Yup schema
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

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="firstName" className="mb-4 font-normal">
              First Name
            </Label>
            <Input
              type="text"
              id="firstName"
              placeholder="First Name"
              {...register("firstName")} // Register the field with React Hook Form
              className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
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
              className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-bas border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
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
            className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-bas border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
          />
          {errors.userName && (
            <span className="text-red-500 text-xs">
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
            className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-bas border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
          />
          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
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
                <SelectTrigger className="w-full data-[placeholder]:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
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
            <span className="text-red-500 text-xs">
              {errors.country.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="mb-4 font-normal">
            Password
          </Label>
          <div className="relative w-full">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter Password"
              {...register("password")} // Register the field with React Hook Form
              className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-bas border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="repeatPassword" className="mb-4 font-normal">
            Repeat Password
          </Label>
          <div className="relative w-full">
            <Input
              type={showRepeatPassword ? "text" : "password"}
              id="repeatPassword"
              placeholder="Repeat Password"
              {...register("repeatPassword")} // Register the field with React Hook Form
              className="placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-bas border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
            <button
              type="button"
              aria-label={
                showRepeatPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
            >
              {showRepeatPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.repeatPassword && (
            <span className="text-red-500 text-xs">
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
              <Link href="/signup" className="text-[#086ACE]">
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
