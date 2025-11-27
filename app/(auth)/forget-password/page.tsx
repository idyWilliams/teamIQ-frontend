'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { usePassword } from '@/services/hooks/useAuth';

// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgetPassword() {
  // Initializing react-hook-form with Yup
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // validate on every change
  });

  const passwordMutation = usePassword();

  // Handle form submit
  const onSubmit = (data: any) => {
    passwordMutation.mutate({ email: data.email });
  };

  return (
    <div className="mx-4 w-full max-w-lg">
      <h1 className="mb-16 text-center text-2xl font-semibold text-black">
        Forget Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email" className="mb-4 block font-normal">
            Email Address
          </Label>
          <Input
            type="email"
            id="email"
            {...register('email')}
            placeholder="example@gmail.com"
            className="!placeholder:text-[#B3C4D6] h-auto rounded-md border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-2 shadow-none outline-0 placeholder:text-sm focus-visible:border-b-[#086ACE] focus-visible:bg-[#F0F6FC] focus-visible:ring-0 md:py-3 md:placeholder:text-base"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-iq-err-300 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={!isValid || passwordMutation.isPending} // disable until valid
          className={`bg-iq-500 hover:bg-iq-500 mt-10 h-auto w-full rounded-md py-3 text-white ${
            !isValid || passwordMutation.isPending
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {passwordMutation.isPending ? 'Sending...' : 'Continue'}
        </Button>
      </form>
    </div>
  );
}
