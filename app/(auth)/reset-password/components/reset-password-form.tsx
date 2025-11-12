'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePasswordResetConfirm } from '@/services/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';

const schema = yup.object().shape({
  new_password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Passwords must match')
    .required('Please confirm your password'),
});

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const resetMutation = usePasswordResetConfirm();

  const onSubmit = (data: any) => {
    if (!token) {
      toast.error('Invalid or missing token.');
      return;
    }

    resetMutation.mutate(
      { token, new_password: data.new_password },
      {
        onSuccess: () => {
          toast.success('Password reset successful! Redirecting...');
          router.push('/login');
        },
      }
    );
  };

  return (
    <div className="mx-4 w-full max-w-lg">
      <h1 className="mb-10 text-center text-2xl font-semibold text-[#0A427B]">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Password */}
          <div>
            <Label htmlFor="password" className="mb-3 text-[15px] font-normal">
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter Password"
                {...register('new_password')}
                className="h-auto border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-3 pr-10 shadow-none outline-0 placeholder:text-[#B3C4D6]"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B3C4D6]"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.new_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
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
                className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B3C4D6]"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={resetMutation.isPending}
          className="bg-iq-500 mt-10 h-auto w-full rounded-md py-3 text-white hover:bg-[#086bcec0]"
        >
          {resetMutation.isPending ? 'Resetting...' : 'Reset'}
        </Button>
      </form>
    </div>
  );
}
