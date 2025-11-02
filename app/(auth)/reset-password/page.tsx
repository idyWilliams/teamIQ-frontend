'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePasswordResetConfirm } from '@/services/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

// Validation schema
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function ResetPassword() {
  // Initializing react-hook-form with Yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle form submit
  const onSubmit = (data: any) => {
    if (!token) {
      toast.error('Invalid or missing token.');
      return;
    }

    resetMutation.mutate(
      { token, password: data.password },
      {
        onSuccess: () => {
          toast.success('Password reset successful! Redirecting to login...');
          router.push('/login'); // redirect after success
        },
      }
    );
  };

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const resetMutation = usePasswordResetConfirm();

  return (
    <div className="mx-4 w-full max-w-lg">
      <h1 className="mb-10 text-center text-2xl font-semibold text-[#0A427B]">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <div>
            <Label htmlFor="password" className="mb-3 text-[15px] font-normal">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Password"
                {...register('password')}
                className="h-auto border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-3 pr-10 shadow-none outline-0 placeholder:text-[#B3C4D6]"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B3C4D6] focus:outline-none"
                onClick={() => setShowPassword(prev => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <Eye
                    size={20}
                    className="text-[#939393] sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                ) : (
                  <EyeOff
                    size={20}
                    className="text-[#939393] sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="mb-3 text-[15px] font-normal"
            >
              Re-enter Password
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                placeholder="Re-enter Password"
                {...register('confirmPassword')}
                className="h-auto border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-3 pr-10 shadow-none outline-0 placeholder:text-[#B3C4D6]"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B3C4D6] focus:outline-none"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <Eye
                    size={20}
                    className="text-[#939393] sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                ) : (
                  <EyeOff
                    size={20}
                    className="text-[#939393] sm:h-4 sm:w-4 md:h-5 md:w-5"
                  />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message as string}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={resetMutation.isPending}
          className="bg-iq-500 mt-10 h-auto w-full rounded-md py-3 text-white hover:cursor-pointer hover:bg-[#086bcec0]"
        >
          {resetMutation.isPending ? 'Resetting...' : 'Reset'}
        </Button>
      </form>
    </div>
  );
}
