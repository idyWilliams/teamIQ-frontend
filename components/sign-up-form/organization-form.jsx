'use client';
import React from 'react';
import CountrySelect from './country-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput } from '../ui/password-input';
import PasswordChecklist from 'react-password-checklist';

// Validation schema using Yup

const validationSchema = yup.object().shape({
  organization_name: yup
    .string()
    .trim()
    .required('Organization name is required')
    .min(3, 'Organization name must be at least 3 characters')
    .max(20, 'Organization name must not exceed 20 characters')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),

  team_size: yup
    .number()
    .min(1, 'Team size must be at least 1')
    .typeError('Team size must be a number')
    .required('Team size is required'),

  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),

  country: yup.string().required('Country is required'),

  password: yup.string().required('Password is required'),
  // .min(8, 'Password must be at least 8 characters')
  // .max(30, 'Password must not exceed 30 characters')
  // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  // .matches(/[0-9]/, 'Password must contain at least one number')
  // .matches(
  //   /[.@$!%*?&]/,
  //   'Password must contain at least one special character'
  // )

  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat password is required'),
});

function OrganizationForm() {
  // Reusable input & select trigger style (aligned with IndividualForm)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      organization_name: '',
      team_size: '',
      email: '',
      country: '',
      password: '',
      repeatPassword: '',
    },
  });

  const onSubmit = data => {
    console.log('User Input:', data);
    toast.success('Form submitted successfully!');
    reset();
  };

  const onError = errors => {
    console.log('Validation Errors:', errors);
    toast.error('Please fix the errors in the form.');
  };

  const styleInput =
    '!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md bg-[#F7F7F7] focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#086ACE] focus-visible:ring-0';

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="w-full sm:flex-2">
            <Label
              htmlFor="organization_name"
              className="mb-4 block font-normal"
            >
              Organization Name
            </Label>
            <Input
              type="text"
              id="organization_name"
              placeholder="Enter Organization Name"
              {...register('organization_name')}
              className={styleInput}
              autoComplete="organization"
              aria-invalid={!!errors.organization_name}
            />
            {errors.organization_name && (
              <span className="mt-1 block text-xs leading-snug text-red-500">
                {errors.organization_name.message}
              </span>
            )}
          </div>

          <div className="w-full sm:flex-1">
            <Label htmlFor="team_size" className="mb-4 block font-normal">
              Team Size
            </Label>
            <Controller
              name="team_size"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    className={`${styleInput} w-full`}
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
              <span className="mt-1 block text-xs leading-snug text-red-500">
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
            {...register('email')}
            className={styleInput}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="mt-1 block text-xs leading-snug text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <CountrySelect
            control={control}
            name="country"
            label="Country"
            errors={errors}
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-4 font-normal">
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="password"
                placeholder="Enter a Password"
                className={styleInput}
                {...field}
              >
                <PasswordChecklist
                  rules={['minLength', 'specialChar', 'number', 'capital']}
                  minLength={8}
                  maxLength={30}
                  value={field.value}
                  messages={{
                    minLength: 'At least 8 characters',
                    specialChar: 'One special character',
                    number: 'One number',
                    capital: 'One uppercase letter',
                  }}
                  className="mt-2 text-sm"
                />
              </PasswordInput>
            )}
          />
          {errors.password && (
            <span className="mt-1 block text-xs leading-snug text-red-500">
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
                placeholder="Repeat Password"
                className={styleInput}
                {...field}
              />
            )}
          />
          {errors.repeatPassword && (
            <span className="mt-1 block text-xs leading-snug text-red-500">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <div className="mt-10">
          <Button
            className="h-auto w-full rounded-md bg-[#086ACE] px-6 py-3 text-white md:px-4"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </div>

        <div className="">
          <div className="flex items-center justify-center gap-3">
            <hr className="grow border-0 border-t" />
            or
            <hr className="grow border-0 border-t" />
          </div>

          <div>
            <div className="mt-8 mb-10 flex items-center justify-center gap-5">
              <Button
                variant={'ghost'}
                className="size-12 rounded-full border p-0"
              >
                <span className="icon-[devicon--google] size-5"></span>
              </Button>
              <Button
                variant={'ghost'}
                className="size-12 rounded-full border p-0"
              >
                <span className="icon-[logos--microsoft-icon] size-5"></span>
              </Button>
            </div>
            <p className="mb-5 text-center text-sm">
              Already have an account?{' '}
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
