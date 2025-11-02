'use client';
import React from 'react';
import CountrySelect from './country-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { toast } from 'sonner';
//  Register Api integration
import { useRegisterIndividual } from '@/services/hooks/useAuth';
// React Hook Form imports
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PasswordInput } from '../ui/password-input';
import { PasswordInputStrength } from './password-input';
import { calculateStrength } from '../../utils/passwordStrength';

// Yup Validation Schema - This defines all our validation rules
const validationSchema = yup.object().shape({
  first_name: yup
    .string()
    .trim()
    .required('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(20, 'First name must not exceed 20 characters')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),

  last_name: yup
    .string()
    .trim()
    .required('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(20, 'Last name must be at most 20 characters')
    .matches(/^[a-zA-Z]+$/, 'Only letters are allowed'),

  username: yup
    .string()
    .trim()
    .required('User name is required')
    .min(3, 'User name must be at least 3 characters')
    .max(20, 'User name must be at most 20 characters')
    .matches(
      /^[a-zA-Z0-9_]+$/,
      'Only letters, numbers, and underscores are allowed'
    )
    .trim(),

  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Please enter a valid email address'),

  country: yup.string().required('Country is required'),

  password: yup.string().required('Password is required'),

  repeatPassword: yup
    .string()
    .required('Please repeat your password')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

function IndividualForm() {
  const { mutate } = useRegisterIndividual();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Trigger validation as the user types
    reValidateMode: 'onChange', // Re-validate on change
    defaultValues: {
      // Set default form values
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      country: '',
      password: '',
      repeatPassword: '',
    },
  });

  const password = useWatch({ control, name: 'password' });
  const repeatPassword = useWatch({ control, name: 'repeatPassword' });

  const { status } = calculateStrength(password || '', 8);

  // Form submission handler
  const onSubmit = data => {
    // This function only runs if validation passes
    console.log('User Input:', data);
    mutate(data);
    // Reset the form after successful submission
    reset();
  };

  // Handle form submission errors
  const onError = errors => {
    console.log('Validation errors:', errors);
    toast.error('Please fix the errors in the form');
  };

  const styleInput =
    '!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md  focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#B3C4D6] focus-visible:ring-0 bg-[#F7F7F7]';

  return (
    <div>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor="first_name" className="mb-4 font-normal">
              First Name
            </Label>
            <Input
              type="text"
              id="first_name"
              placeholder="First Name"
              {...register('first_name')} // Register the field with React Hook Form
              className={styleInput}
              autoComplete="given-name"
              aria-invalid={!!errors.first_name}
            />
            {errors.first_name && (
              <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
                {errors.first_name.message}
              </span>
            )}
          </div>

          <div className="flex-1">
            <Label htmlFor="last_name" className="mb-4 font-normal">
              Last Name
            </Label>
            <Input
              type="text"
              id="last_name"
              placeholder="Last Name"
              {...register('last_name')} // Register the field with React Hook Form
              className={styleInput}
              autoComplete="family-name"
              aria-invalid={!!errors.last_name}
            />
            {errors.last_name && (
              <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
                {errors.last_name.message}
              </span>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="username" className="mb-4 font-normal">
            User Name
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="Characters not allowed"
            {...register('username')} // Register the field with React Hook Form
            className={styleInput}
            autoComplete="username"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.username.message}
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
            {...register('email')} // Register the field with React Hook Form
            className={styleInput}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
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
          <Controller
            id="password"
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInputStrength
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.password && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="repeatPassword" className="mb-4 font-normal">
            Repeat Password
          </Label>
          <Controller
            id="repeatPassword"
            name="repeatPassword"
            control={control}
            render={({ field }) => {
              const matchBg =
                repeatPassword === ''
                  ? 'bg-[#F7F7F7]' // default gray background
                  : repeatPassword === password
                    ? 'bg-[#D2FAF3]' //  light green when passwords match
                    : 'bg-[#FFE7E3]'; //  light red when not matching

              return (
                <PasswordInput
                  id="repeatPassword"
                  placeholder="Repeat Password"
                  className={`${styleInput} ${matchBg}`}
                  {...field}
                />
              );
            }}
          />
          {errors.repeatPassword && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.repeatPassword.message}
            </span>
          )}
        </div>

        <div className="mt-10">
          <Button
            className="bg-iq-500 hover:bg-iq-500 h-auto w-full cursor-pointer rounded-md py-3 text-white hover:text-white"
            type="submit"
            disabled={!isValid || isSubmitting || status !== 'Strong'} // Disable button until all validation passes
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
              <Link href="/login" className="text-iq-500">
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
