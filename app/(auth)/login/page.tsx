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
import { useRouter } from 'nextjs-toploader/app';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader } from 'lucide-react';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';

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
  const [isRedirecting, setIsRedirecting] = React.useState(false);

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
  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    mutate(data, {
      onSuccess: res => {
        toast.success('Login successful!');
        setIsRedirecting(true);

        const role = res?.data?.organization?.role || res?.data?.user?.role;
        authenticate({
          user: res?.data?.user,
          organization: res?.data?.organization,
          token: res?.data?.access_token,
        });

        if (role === 'organization') {
          router.push('/organization');
        } else {
          
          if (!res?.data?.user?.onboarding_completed) router.push('/account-setup');
          else router.push('/member');
        }

        reset();
      },
      onError: (error: AxiosError) => {
        toast.error(
          (error?.response?.data as any)?.detail ||
          'Login failed. Please check your credentials.'
        );
      },
    });
  };

  if (isRedirecting) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F1A]">
        <div className="relative flex flex-col items-center">
          <div className="size-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent shadow-lg shadow-blue-500/20" />
          <div className="mt-8 flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">Preparing your dashboard</h2>
            <p className="text-slate-400 font-medium">Setting up your team intelligence workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Mobile Branding (hidden on desktop where the illustration handles it) */}
      <div className="mb-10 flex items-center justify-center gap-2 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/20 text-lg">
          IQ
        </div>
        <span className="text-xl font-bold tracking-tight text-white">Team IQ</span>
      </div>

      <div className="mb-10">
        <h3 className="text-3xl font-semibold tracking-tight text-white mb-2">Welcome back</h3>
        <p className="text-slate-400 text-sm">Enter your credentials to access your account.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="email" className="mb-2 block font-medium text-slate-300">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="name@company.com"
            {...register('email')}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 shadow-sm transition-colors focus-visible:border-blue-500/50 focus-visible:bg-white/10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="mb-2 block font-medium text-slate-300">
            Password
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 shadow-sm transition-colors focus-visible:border-blue-500/50 focus-visible:bg-white/10 focus-visible:ring-1 focus-visible:ring-blue-500/50"
                {...field}
              />
            )}
          />
          {errors.password && (
            <span className="mt-2 block text-sm text-red-400">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98]"
            disabled={isPending}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader className="animate-spin h-5 w-5" />
                <span>Authenticating...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>

          <div className="mt-6 flex items-center justify-between">
            <Label htmlFor="remember" className="flex items-center gap-2 font-medium text-slate-300 cursor-pointer">
              <Checkbox id="remember" className="rounded-md border-white/20 data-[state=checked]:bg-blue-500 data-[state=checked]:text-white" />
              <span className="text-sm">Remember me</span>
            </Label>
            <Link href="/forget-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="py-2">
          <div className="flex items-center justify-center gap-4">
            <hr className="grow border-t border-white/10" />
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Or continue with</span>
            <hr className="grow border-t border-white/10" />
          </div>

          <div className="mt-6 mb-8 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-white/10 bg-white/5 py-6 hover:bg-white/10 hover:text-white transition-all text-white border"
            >
              <span className="icon-[devicon--google] mr-2 text-xl"></span>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-white/10 bg-white/5 py-6 hover:bg-white/10 hover:text-white transition-all text-white border"
            >
              <span className="icon-[logos--microsoft-icon] mr-2 text-xl"></span>
              Microsoft
            </Button>
          </div>

          <p className="text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </motion.div>
  );
}
