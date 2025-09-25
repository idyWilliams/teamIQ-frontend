
import countryList from '@/components/sign-up-form/country-list'
import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";



function OrganizationForm() {
  const [form, setForm] = useState({
    organizationName: '',
    teamSize: '',
    email: '',
    country: '',
    password: '',
    repeatPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value, name } = e.target;
    setForm((prev) => ({
      ...prev,
      [id || name]: value,
    }));
  };

  const handleTeamSizeChange = (value) => {
    setForm((prev) => ({ ...prev, teamSize: value }));
  };

  const handleCountryChange = (value) => {
    setForm((prev) => ({ ...prev, country: value }));
  };

  const validate = () => {
      const newErrors = {};
      // Required checks
      if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';

      // Username: required, allowed chars, and length
      const userName = form.userName.trim();
      if (!userName) {
        newErrors.userName = 'User name is required';
      } else {
        const userNamePattern = /^[a-zA-Z0-9_]+$/; // letters, numbers, underscores
        if (userName.length < 3) newErrors.userName = 'User name must be at least 3 characters';
        else if (userName.length > 20) newErrors.userName = 'User name must be at most 20 characters';
        else if (!userNamePattern.test(userName)) newErrors.userName = 'Only letters, numbers, and underscores are allowed';
      }

      const email = form.email.trim();
      if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = 'Valid email required';

      if (!form.country) newErrors.country = 'Country is required';

      if (!form.password) newErrors.password = 'Password is required';
      else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (form.password !== form.repeatPassword) newErrors.repeatPassword = 'Passwords do not match';

      return newErrors;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const validationErrors = validate();
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
        console.log('User Input:', form);
        toast.success("Form submitted successfully!");
        setForm({
          firstName: '',
          lastName: '',
          userName: '',
          email: '',
          country: '',
          password: '',
          repeatPassword: ''
        });
      }
    
    };

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Label htmlFor="organizationName" className="mb-4 font-normal">
                Organization Name
              </Label>
              <Input
                type="text"
                id="organizationName"
                placeholder="Enter Organization Name"
                value={form.organizationName}
                onChange={handleChange}
                className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
              />
              {errors.organizationName && <span className="text-red-500 text-xs">{errors.organizationName}</span>}
            </div>

            <div>
              <Label htmlFor="teamSize" className="mb-4 font-normal">
                Team Size
              </Label>
              <Select value={form.teamSize} onValueChange={handleTeamSizeChange}>
                <SelectTrigger className="w-full data-[placeholder]:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2-5">2 - 5</SelectItem>
                  <SelectItem value="6-10">6 - 20</SelectItem>
                  <SelectItem value="20+">20+</SelectItem>
                </SelectContent>
              </Select>
              {errors.teamSize && <span className="text-red-500 text-xs">{errors.teamSize}</span>}
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
              value={form.email}
              onChange={handleChange}
              className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>

          <div>
            <Label className="mb-4 font-normal">Enter Country</Label>
            <Select value={form.country} onValueChange={handleCountryChange}>
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
            {errors.country && <span className="text-red-500 text-xs">{errors.country}</span>}
          </div>

          <div>
            <Label htmlFor="password" className="mb-4 font-normal">
              Password
            </Label>
            <div className='relative w-full'>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>

          <div>
            <Label htmlFor="repeatPassword" className="mb-4 font-normal">
              Repeat Password
            </Label>
            <div className='relative w-full'>
              <Input
                type={showRepeatPassword ? "text" : "password"}
                id="repeatPassword"
                name="repeatPassword"
                placeholder="Repeat Password"
                value={form.repeatPassword}
                onChange={handleChange}
                className="placeholder:text-[#B3C4D6] border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-3 px-4 h-auto"
              />
              <button
                type="button"
                aria-label={showRepeatPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700'
              >
                {showRepeatPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
              {errors.repeatPassword && <span className="text-red-500 text-xs">{errors.repeatPassword}</span>}
          </div>

          <div className="mt-10">
            <Button className="bg-[#0A427B] text-white w-full py-3 h-auto rounded-md" type="submit">
              SignUp
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
                Already have an account? <Link href="/login" className='text-[#086ACE]'>Log In</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
  )
}

export default OrganizationForm