'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axiosInstance from '@/services/axios';
import { Camera, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'nextjs-toploader/app';

// ✅ Yup validation schema
const schema = yup.object({
  track: yup.string().required('Track is required'),
  stack: yup
    .mixed()
    .required('Stack is required')
    .test('minLength', 'Stack must be at least 2 characters', (value: any) => {
      if (!value) return false;
      return String(value).length >= 2;
    })
    .test('stackArray', 'Stacks must be separated by comma', (value: any) => {
      if (!value) return false;
      const stacks = String(value)
        .split(',')
        .map((t: any) => t.trim())
        .filter((t: any) => t.length > 0);
      return stacks.length > 0;
    })
    .transform((value: any) => {
      if (!value) return [];
      return String(value)
        .split(',')
        .map((t: any) => t.trim())
        .filter((t: any) => t.length > 0);
    }),
  profile: yup
    .mixed<File>()
    .nullable()
    .notRequired() // ✅ makes image optional
    .test('fileType', 'Only image files are allowed', value => {
      if (!value) return true; // Skip if no image
      return (
        typeof value === 'object' &&
        ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(
          value.type
        )
      );
    }),
});

type FormData = {
  track: string;
  stack: string[];
  profile?: File | null;
};

export default function AccountSetup() {
  const { user, updateUser } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(schema as any),
  });

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setValue('profile', file);
  };

  const onSubmit = async (data: FormData | any) => {
    try {
      setLoading(true);
      let imageUrl = user?.profile_image;

      // Only upload if user selected a new file
      if (data.profile) {
        const formData = new FormData();
        formData.append('file', data.profile);
        formData.append('image_type', 'profile');
        formData.append('update_db', 'true');

        const uploadResponse = await axiosInstance.post('/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadResponse?.data?.data?.url;
      }

      // Prepare final payload
      const final = {
        track: data.track,
        stacks: data.stack || [],
        profile_image: imageUrl || user?.profile_img,
      };

      // ✅ Use correct PUT endpoint with userId
      const res = await axiosInstance.put(`/users/${user?.id}`, final);

      alert('✅ Profile updated successfully!');
      updateUser(res?.data?.data);
      router.push('/member');
    } catch (error: any) {
      console.error('Profile update failed:', error);

      const msg =
        error?.response?.data?.detail?.[0]?.msg ||
        'Failed to update profile. Try again.';
      alert(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setPreview(user?.profile_image);
      reset({
        track: user?.track || '',
        stack: user?.stacks?.join(', ') || '',
      });
    }
  }, [reset, user]);

  return (
    <section className="mx-4 w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-semibold text-black">Account setup</h1>
          <p className="mt-2 text-[14px] font-normal md:text-[18px]">
            Welcome James, personalize your account.
          </p>

          <div className="mt-5 flex items-center justify-center">
            <div className="relative">
              <Image
                src={preview || '/images/avatar.png'}
                alt="avatar"
                width={100}
                height={100}
                priority
                className="h-24 w-24 rounded-full bg-neutral-100 object-cover"
              />
              <Button
                type="button"
                variant="ghost"
                id="profile"
                className="bg-iq-500 absolute -right-2 bottom-0 h-8 w-8 rounded-full border-2 border-white text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={24} />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            {errors.track && (
              <p className="mt-1 text-sm text-red-500">
                {typeof errors.track.message === 'string'
                  ? errors.track.message
                  : ''}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          {/* Track selection */}
          <div>
            <Label htmlFor="track" className="mb-2 text-[17px] font-normal">
              Select Track
            </Label>
            <Select onValueChange={val => setValue('track', val)}>
              <SelectTrigger className="w-full border-0 border-b border-[#B3C4D6] bg-[#F7F7F7]">
                <SelectValue placeholder="Frontend Developer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Frontend Developer">
                  Frontend Developer
                </SelectItem>
                <SelectItem value="Backend Developer">
                  Backend Developer
                </SelectItem>
                <SelectItem value="QA Tester">QA Tester</SelectItem>
              </SelectContent>
            </Select>
            {errors.track && (
              <p className="mt-1 text-sm text-red-500">
                {typeof errors.track.message === 'string'
                  ? errors.track.message
                  : ''}
              </p>
            )}
          </div>

          {/* Stack input */}
          <div>
            <Label htmlFor="stack" className="mb-2 text-[17px] font-normal">
              Enter stack
              <span className="inline text-xs md:text-sm">
                {' '}
                (Separate them with commas)
              </span>
            </Label>
            <Input
              type="text"
              id="stack"
              placeholder="E.g: JavaScript, React, Python"
              {...register('stack')}
              className="border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-3"
            />
            {errors.track && (
              <p className="mt-1 text-sm text-red-500">
                {typeof errors.track.message === 'string'
                  ? errors.track.message
                  : ''}
              </p>
            )}
          </div>
        </div>

        {/* Submit button with loading spinner */}
        <Button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-auto w-full items-center justify-center gap-2 rounded-md bg-[#086ACE] py-3 text-white hover:bg-[#086bcec0]"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </section>
  );
}
