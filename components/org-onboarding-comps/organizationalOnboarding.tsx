'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState, useRef, ChangeEvent } from 'react';
import { useOnboardingComplete } from '@/services/hooks/useAuth';
import axiosInstance from '@/services/axios';
import { toast } from 'sonner';
import OnboardingSuccess from './onboardingSuccess';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useAuthStore } from '@/store/useAuthStore';
import { users } from '@/services/api';
import { DialogTitle } from '@radix-ui/react-dialog';

// Regex
const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/;
const sectorRegex = /^[A-Za-z\s]+$/;
const DescripRegex = /^[A-Z].*/;
const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/;
const urlRegex = /^https?:\/\/.+/;
const phoneRegex = /^(\+?\d{10,15})$/;

// Validation schema using Yup

const validationSchema = yup.object({
  organization_name: yup
    .string()
    .required('Organization name is required')
    .trim()
    .min(3, 'Minimum 3 characters')
    .max(40, 'Maximum 20 characters')
    .matches(nameRegex, 'Each word must start with a capital letter'),
  description: yup
    .string()
    .trim()
    .required('Description is required')
    .min(10, 'Minimum 10 characters')
    .matches(DescripRegex, 'Description must start with a capital letter'),
  address: yup
    .string()
    .trim()
    .min(3, 'Minimum 10 characters'),
  domain_link: yup
    .string()
    .trim()
    .required('Domain link is required')
    .matches(domainRegex, 'Enter a valid domain like example.com'),
  sector: yup
    .string()
    .trim()
    .optional()
    .required('Sector is required')
    .matches(sectorRegex, 'Only letters and spaces allowed'),
  social_media_handles: yup.object().shape({
    additionalProp1: yup.string().trim().matches(urlRegex, 'Invalid URL'),
    additionalProp2: yup.string().trim().matches(urlRegex, 'Invalid URL'),
    additionalProp3: yup.string().trim().matches(urlRegex, 'Invalid URL'),
  }),
  website: yup.string().trim(),
  phone_number: yup
    .string()
    .trim()
    .optional()
    .matches(phoneRegex, 'Invalid phone number'),
  favourite_tools: yup
    .string()
    .trim()
    .optional()
    .matches(/^[A-Za-z,\s]*$/, 'Only letters and commas allowed'),
  organization_image: yup
    .mixed()
    .required('Organization image is required')
    .test('fileType', 'Only image files allowed', (value: any) => {
      // If value is a FileList or array, take the first item. If it's a File, take it directly.
      const file = value instanceof File ? value : value?.[0];
      if (!file) return false;

      const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      return allowedTypes.includes(file.type);
    }),
});

type OrganizationForm = yup.InferType<typeof validationSchema>;
interface organizationalDetailsprops {
  onClose?: () => void;
  onSuccess?: () => void;
}

// Organizational Details Component
const OrganizationalDetails = ({
  onClose,
  onSuccess,
}: organizationalDetailsprops) => {
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuthStore();

  const [preview, setPreview] = useState<string | null>('');
  const imgUploadRef = useRef<HTMLInputElement | null>(null);
  // Fn for Handling File Upload
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    if (e.target.files)
      setValue('organization_image', e.target.files[0] as any);
  }

  // Modal state for success modal

  // React Hook Form setup

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrganizationForm>({
    resolver: yupResolver(validationSchema) as any,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      organization_name: '',
      description: '',
      domain_link: '',
      sector: '',
      social_media_handles: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: '',
      },
      website: '',
      phone_number: '',
      favourite_tools: '',
    },
  });

  const onboarding = useOnboardingComplete();

  const submit = async (data: OrganizationForm | any) => {
    console.log(`Onboarding Data`, data);
    try {
      setLoading(true);

      // 1️⃣ Upload image to /image endpoint
      const formData = new FormData();
      formData.append('file', data.organization_image);
      formData.append('image_type', 'organization_image');
      formData.append('update_db', 'true');

      const uploadResponse = await axiosInstance.post('/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = uploadResponse?.data?.data?.url; // depends on backend response shape

      // 2️⃣ Get user_id (replace with actual logic or state)
      const userId = user?.id; // You’ll likely get this from auth context or local storage
      if (!imageUrl) return;
      const final = {
        ...data,
        organization_image: imageUrl || user?.profile_img,
        users: {
          byId: (id: string) => {
            return {
              id,
              email: user?.email,
              name: user?.name,
              organization_image: user?.profile_img,
            };
          },
        },
      };

      // 3️⃣
      onboarding.mutate(final, {
        onSuccess: () => {
          toast.success('Onboarding completed successfully!');
          onSuccess?.();
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message || 'Failed to complete onboarding.'
          );
        },
      });
    } catch (error: any) {
      console.error(' update failed:', error);
      alert('❌ Failed to update. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const styleInput =
    '!placeholder:text-[#B3C4D6] placeholder:text-sm md:placeholder:text-base border-[#B3C4D6] border-0 border-b shadow-none outline-0 py-2 md:py-3 px-4 h-auto rounded-md bg-[#F7F7F7] focus-visible:bg-[#F0F6FC] focus-visible:border-b-[#086ACE] focus-visible:ring-0';

  // Render Component
  return (
    <div className="mx-auto w-[576px] p-10">
      <h2 className="mb-4 pt-5 text-center text-2xl font-semibold max-sm:text-xl">
        Organization Details
      </h2>
      <p className="mb-12 text-center text-xl">
        Kindly fill in your details to get verified.
      </p>

      <Button
        variant="ghost"
        onClick={onClose}
        className="ring-offset-background focus:ring-ring absolute -top-1 -right-4 cursor-pointer rounded-sm opacity-70 transition-opacity"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      <form className="space-y-4" onSubmit={handleSubmit(submit)}>
        <div className="w-full">
          <div className="my-12 flex justify-center">
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              ref={imgUploadRef}
              onChange={e => handleFileChange(e)}
            />
            <div
              className="relative flex size-[148px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-full bg-neutral-50"
              onClick={() => imgUploadRef?.current?.click?.()}
            >
              {preview ? (
                <Image
                  src={preview}
                  alt=""
                  fill={true}
                  className="object-cover"
                />
              ) : (
                <>
                  <span className="icon-[et--upload] size-7"></span>
                  <p className="text-[14px]">Upload image</p>
                </>
              )}
            </div>
            {errors.organization_image && (
              <span className="text-iq-err-300 mt-2 block text-center text-xs leading-snug">
                {errors.organization_image.message}
              </span>
            )}
          </div>
          <Label htmlFor="organization_name" className="mb-4 block font-normal">
            Organization Name
          </Label>
          <Input
            type="text"
            id="organization_name"
            placeholder="Enter Organization Name"
            className={styleInput}
            autoComplete="organization"
            aria-invalid={!!errors.organization_name}
            {...register('organization_name')}
          />
          {errors.organization_name && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.organization_name.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="description" className="mb-4 font-normal">
            Description
          </Label>
          <Input
            type="text"
            id="description"
            placeholder="Short description about your organization"
            className="!placeholder:text-[#B3C4D6] h-auto rounded-md border-0 border-b border-[#B3C4D6] bg-[#F7F7F7] px-4 py-4 shadow-none outline-0 placeholder:text-sm focus-visible:border-b-[#086ACE] focus-visible:bg-[#F0F6FC] focus-visible:ring-0 md:py-6 md:placeholder:text-base"
            aria-invalid={!!errors.description}
            {...register('description')}
          />
          {errors.description && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.description.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="domain_link" className="mb-4 font-normal">
            Organization Domain Link
          </Label>
          <Input
            type="text"
            id="domain_link"
            placeholder="e.g example@co.ng"
            className={styleInput}
            aria-invalid={!!errors.domain_link}
            {...register('domain_link')}
          />
          {errors.domain_link && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.domain_link.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="organization_sector" className="mb-4 font-normal">
            Organization Sector
          </Label>
          <Input
            type="text"
            id="organization_sector"
            placeholder="e.g Fintech"
            className={styleInput}
            {...register('sector')}
          />
          {errors.sector && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.sector.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="SM-links" className="mb-4 font-normal">
            Social Media Links
            <span className="text-xs">
              (We&apos;ll use this to verify your organization&apos;s online
              presence)
            </span>
          </Label>
          <div className="flex flex-col gap-4">
            <Input
              type="text"
              id="additionalProp1"
              placeholder="Linkedin link"
              className={styleInput}
              {...register('social_media_handles.additionalProp1')}
            />
            <Input
              type="text"
              id="twitter"
              placeholder="Twitter link"
              className={styleInput}
              {...register('social_media_handles.additionalProp2')}
            />
            <Input
              type="text"
              id="sm_link"
              placeholder="Instagram/Facebook (optional)"
              className={styleInput}
              {...register('social_media_handles.additionalProp3')}
            />
            {errors.social_media_handles && (
              <div className="flex flex-col gap-1">
                {errors.social_media_handles.additionalProp1 && (
                  <span className="text-iq-err-300 text-xs">
                    Linkedin: {errors.social_media_handles.additionalProp1.message}
                  </span>
                )}
                {errors.social_media_handles.additionalProp2 && (
                  <span className="text-iq-err-300 text-xs">
                    Twitter: {errors.social_media_handles.additionalProp2.message}
                  </span>
                )}
                {errors.social_media_handles.additionalProp3 && (
                  <span className="text-iq-err-300 text-xs">
                    Other: {errors.social_media_handles.additionalProp3.message}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="address" className="mb-4 font-normal">
            Address
          </Label>
          <Input
            type="text"
            id="website"
            placeholder="e.g 8558 Green Rd."
            className={styleInput}
            {...register('website')}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="mb-4 font-normal">
            Phone Number
          </Label>
          <Input
            type="tel"
            id="phone"
            placeholder="e.g (319) 555-0115"
            className={styleInput}
            {...register('phone_number')}
          />{' '}
          {errors.phone_number && (
            <span className="text-iq-err-300 mt-1 block text-xs leading-snug">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        <div>
          <Label htmlFor="tools" className="mb-4 font-normal">
            Favourite Tools
          </Label>
          <Input
            type="text"
            id="tools"
            placeholder="e.g Jira, clickup."
            className={styleInput}
            {...register('favourite_tools')}
          />
        </div>

        <div className="mt-10">
          <Button
            className="bg-iq-500 hover:bg-iq-500 h-auto w-full cursor-pointer rounded-md px-6 py-3 text-white hover:text-white md:px-4"
            type="submit"
            disabled={onboarding.isPending || loading}
          >
            {onboarding.isPending || loading
              ? 'Reviewing and Submitting...'
              : 'Review and Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrganizationalDetails;
