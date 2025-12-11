'use client';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
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
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PasswordInput } from '@/components/ui/password-input';
import { PasswordInputStrength } from './password-input';
import { calculateStrength } from '@/utils/passwordStrength';
import { useSignupOrg } from '@/services/hooks/useAuth';
// Validation schema using Yup

const validationSchema = yup.object().shape({
  organization_name: yup
    .string()
    .trim()
    .required('Organization name is required')
    .min(3, 'Organization name must be at least 3 characters')
    .max(20, 'Organization name must not exceed 20 characters')
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Only letters and a single space between words are allowed'),

  team_size: yup
    .string()
    .required('Team size is required')
    .oneOf(
      ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'],
      'Invalid team size'
    ),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),

  country: yup.string().required('Country is required'),

  password: yup.string().required('Password is required'),

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
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
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

  const password = useWatch({ control, name: 'password' });
  const repeatPassword = useWatch({ control, name: 'repeatPassword' });

  const { status } = calculateStrength(password || '', 8);

  const router = useRouter();
  const authStore = useAuthStore(state => state.authorize);

  const { mutate: signupOrg, isPending } = useSignupOrg();

  const onSubmit = data => {
    signupOrg(
      {
        ...data,
        team_size: String(data.team_size),
      },
      {
        onSuccess: () => {
          // Step 1: Success message
          toast.success(
            'Organization created successfully! Redirecting to login...'
          );

          // Step 2: Reset form
          reset();

          // Step 3: Redirect to login page
          router.push('/login');
        },

        onError: error => {
          toast.error(
            error.response?.data?.detail || 'Signup failed. Try again.'
          );
        },
      }
    );
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
              <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
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
                    <SelectItem value="1-10">1-10</SelectItem>
                    <SelectItem value="11-50">11-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="501-1000">501-1000</SelectItem>
                    <SelectItem value="1000+">1000+</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.team_size && (
              <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
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
                    ? 'bg-[#D2FAF3]' // light green when passwords match
                    : 'bg-[#FFE7E3]'; // light red when not matching

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
            className="bg-iq-500 hover:bg-iq-500 h-auto w-full cursor-pointer rounded-md px-6 py-3 text-white hover:text-white md:px-4"
            type="submit"
            disabled={!isValid || isSubmitting || status !== 'Strong'}
          >
            {isPending ? 'Signing Up...' : 'Sign Up'}
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

export default OrganizationForm;
