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
import { users } from '@/services/api';
import { toast } from 'sonner';


// ✅ Yup validation schema
const schema = yup.object({
  track: yup
    .string()
    .required('Track is required')
    .oneOf(
      ['Frontend Developer', 'Backend Developer', 'QA Tester'],
      'Invalid track'
    ),

  stack: yup
    .string()
    .required('Stack is required')
    .test(
      'valid-stacks',
      'Each stack must be at least 2 characters and contain only letters, numbers',
      value => {
        if (!value) return false;
        const stacks = value.split(',').map(s => s.trim());
        return stacks.every(s => /^[a-zA-Z0-9+#.\-]{2,}$/.test(s));
      }
    ),
  // profile: yup.mixed<File>().optional().nullable(),
});

type FormData = yup.InferType<typeof schema>;

export default function AccountSetup() {
  const { user, updateUser } = useAuthStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [theStack, setTheStack] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      track: '',
      stack: '',
      // profile: null, 
    },
  });

  const handleFileUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    // setValue('profile', file);
  };

  const onSubmit = async (data: FormData | any) => {
    const selectedFile = fileInputRef.current?.files?.[0];
    const newStack = data.stack.split(',').map((s: string) => s.trim());

    try {
      setLoading(true);
      let imageUrl = user?.profile_image;
      // Only upload if user selected a new file
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('image_type', 'profile');
        formData.append('update_db', 'true');

        const uploadResponse = await axiosInstance.post('/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadResponse?.data?.data?.url;
      }


      setTheStack(data.stack.split(',').map((s: string) => s.trim()));

      // Prepare final payload
      const final = {
        track: data.track,
        stacks: theStack,
        profile_image: imageUrl || user?.profile_img,
      };

      // ✅ Use correct PUT endpoint with userId
      const res = await axiosInstance.put(users.byId(user?.id), final);

      alert('✅ Profile updated successfully!');
      updateUser(res?.data?.data);
      router.push('/member');
    } catch (error: any) {
      console.error('Profile update failed:', error);

      const msg =
        error?.response?.data?.detail?.[0]?.msg ||
        'Failed to update profile. Try again.';
      // alert(`❌ ${msg}`);
      toast.error(msg);
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
        // profile: null,
      });
    }
  }, [reset, user]);

  return (
    <section className="mx-4 w-full max-w-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-semibold text-white">Account setup</h1>
          <p className="mt-2 text-[14px] font-normal md:text-[18px]">
            Welcome {user?.first_name}, personalize your account.
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

              <SelectTrigger className="w-full border-0 border-b border-[#B3C4D6] bg-[#020618]">
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
              className="border-0 border-b border-[#B3C4D6] bg-[#020618] px-4 py-3"
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
          disabled={!isValid} // disable if form is invalid
          className={`mt-6 h-auto w-full rounded-md bg-[#086ACE] py-3 text-white hover:cursor-pointer hover:bg-[#086bcec0] md:mt-8 ${!isValid ? 'cursor-not-allowed opacity-50' : ''}`}
        >
          Submit
        </Button>
      </form>
    </section>
  );
}