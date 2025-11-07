'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState } from 'react';
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
import { users } from '@/services/api';

// ✅ Yup validation schema
const schema = yup.object({
  track: yup.string().required('Track is required'),
  stack: yup
    .string()
    .required('Stack is required')
    .min(2, 'Stack must be at least 2 characters'),
  profile: yup
    .mixed()
    .required('Profile image is required')
    .test('fileType', 'Only image files are allowed', (value: any) => {
      return (
        value &&
        value?.length > 0 &&
        ['image/jpeg', 'image/png', 'image/jpg'].includes(value[0].type)
      );
    }),
});

type FormData = yup.InferType<typeof schema>;

export default function AccountSetup() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData | any) => {
    try {
      setLoading(true);

      // 1️⃣ Upload image to /image endpoint
      const formData = new FormData();
      formData.append('file', data.profile[0]);

      const uploadResponse = await axiosInstance.post('/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = uploadResponse?.data?.url; // depends on backend response shape

      // 2️⃣ Get user_id (replace with actual logic or state)
      const userId = 1; // You’ll likely get this from auth context or local storage

      // 3️⃣ Update profile with track, stack, and image
      await axiosInstance.put(users.byId(userId), {
        track: data.track,
        stack: data.stack,
        image: imageUrl,
      });

      alert('✅ Profile updated successfully!');
    } catch (error: any) {
      console.error('Profile update failed:', error);
      alert('❌ Failed to update profile. Try again.');
    } finally {
      setLoading(false);
    }
  };

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
                src={preview || '/images/avatar.jpg'}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          {/* Profile upload input */}
          <div className="mt-4">
            <Label htmlFor="profile">Upload Profile Image</Label>
            <Input
              type="file"
              accept="image/*"
              {...register('profile')}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) setPreview(URL.createObjectURL(file));
              }}
              className="border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-3"
            />
            {errors.profile && (
              <p className="mt-1 text-sm text-red-500">
                {errors.profile.message}
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
                {errors.track.message}
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
            {errors.stack && (
              <p className="mt-1 text-sm text-red-500">
                {errors.stack.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="mt-6 h-auto w-full rounded-md bg-[#086ACE] py-3 text-white hover:bg-[#086bcec0]"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </section>
  );
}
