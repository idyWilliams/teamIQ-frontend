'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

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
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submit
  const onSubmit = (data: any) => {
    console.log('Form values:', data);
    toast.success('Password reset email sent');
    reset();
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
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message as string}
            </p>
          )}
        </div>
        <Button className="mt-10 h-auto w-full rounded-md bg-[#086ACE] py-3 text-white">
          Continue
        </Button>
      </form>
    </div>
  );
}
