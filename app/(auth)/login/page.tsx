'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'sonner';
import { PasswordInput } from '@/components/ui/password-input';
import { useLogin } from '@/services/hooks/useAuth';
import { useRouter } from 'nextjs-toploader/app'
import { useAuthStore } from '@/store/useAuthStore';
import { Loader } from 'lucide-react';


// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function Login() {
  const { isPending, mutate } = useLogin();
  const authenticate = useAuthStore(state => state.authorize);

  const router = useRouter();
  // Initializing react-hook-form with Yup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Handle form submit
  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: res => {
        console.log('Form values:', data, res);
        toast.success('Login successful!');

        const role = res?.data?.organization?.role;
        console.log('User role:', role);
        if (role === 'organization') {
          authenticate({
            user: res?.data?.organization || res?.data?.user,
            token: res?.data?.access_token,
            refreshToken: '',
          });
          router.push('/organization');
        } else if (role === 'intern') {
          router.push('/member');
        }
         
        reset();
      },
      onError: err => {
        console.error('Login error:', err);
        toast.error('Login failed. Please check your credentials.');
      },
    });
  };

  return (
    <div className="mx-auto w-full lg:max-w-lg xl:max-w-xl">
      <h3 className="mb-10 text-4xl font-medium text-[#0B0B0B]">Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" className="mb-2 font-normal">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="example@gmail.com"
            {...register('email')}
            className="!placeholder:text-[#B3C4D6] h-auto rounded-md border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-2 shadow-none outline-0 placeholder:text-sm focus-visible:border-b-[#086ACE] focus-visible:bg-[#F0F6FC] focus-visible:ring-0 md:py-3 md:placeholder:text-base"
          />
          {errors.email && (
            <p className="text-iq-err-300 mt-1 text-sm">
              {errors.email.message as string}
            </p>
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
              <PasswordInput
                id="password"
                placeholder="Enter a Password"
                className="!placeholder:text-[#B3C4D6] h-auto rounded-md border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-2 shadow-none outline-0 placeholder:text-sm focus-visible:border-b-[#086ACE] focus-visible:bg-[#F0F6FC] focus-visible:ring-0 md:py-3 md:placeholder:text-base"
                {...field}
              ></PasswordInput>
            )}
          />
          {errors.password && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="bg-iq-500 hover:bg-iq-500 h-auto w-full rounded-md py-3 text-white hover:cursor-pointer"
            disabled={isPending}
          >
            {isPending ? <> <Loader className="animate-spin" /> Loading... </> : 'Login'}
          </Button>
          <div className="mt-6 flex items-center justify-between">
            <Label htmlFor="" className="font-normal">
              <Checkbox className="size-6" />
              <span>Remember me</span>
            </Label>
            <Link href="/forget-password" className="text-sm font-normal">
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-center gap-3">
            <hr className="grow border-0 border-t" />
            or
            <hr className="grow border-0 border-t" />
          </div>
          <div>
            <div className="mt-6 mb-8 flex items-center justify-center gap-5">
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
            <p className="text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-iq-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
