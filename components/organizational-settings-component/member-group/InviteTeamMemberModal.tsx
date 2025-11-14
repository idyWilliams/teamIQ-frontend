import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useInviteUser } from '@/services/hooks/useInviteUser';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

type CloseModalProp = {
  open: boolean;
  onClose: () => void;
};

const inviteSchema = yup.object({
  email: yup.string().email('Enter valid email').required('Email is required'),
  track: yup.string().required('Enter invitee track'),
  role: yup.string().default('intern'),
});

type inviteFormDataType = yup.InferType<typeof inviteSchema>;

const InviteTeamMemberModal = ({ open, onClose }: CloseModalProp) => {
  const { mutateAsync } = useInviteUser();
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<inviteFormDataType>({
    resolver: yupResolver(inviteSchema),
    defaultValues: {
      email: '',
      track: '',
      role: 'intern',
    },
  });
  const [inviteLink, setInviteLink] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleInviteSubmit = async (data: inviteFormDataType) => {
    try {
      const res = await mutateAsync(data);
      console.log(res);
      toast.success('Invite sent successfully');
      reset();
      onClose();
    } catch (error) {
      console.error(error, 'failed to send');
      toast.error('Error occur while sendind');
    }
  };

  if (!open) return null;
  return (
    // modal overlay
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      {/* close button */}
      <div
        onClick={e => e.stopPropagation()}
        className={`relative w-full max-w-md transform rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 ease-out sm:mx-0 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 flex cursor-pointer items-center justify-center rounded-full bg-[#052444] p-1 text-gray-100 transition hover:bg-gray-100 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="mb-6 space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">
            Invite Team Member
          </h2>
          <p className="text-sm text-gray-500">
            You can invite a team member with their email
          </p>
        </div>

        <form onSubmit={handleSubmit(handleInviteSubmit)} className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="w-1/2">
              <Input
                type="email"
                id="email"
                {...register('email')}
                placeholder="Enter email address"
                className="shadow-none focus-visible:ring-0 focus-visible:outline-none"
              />
              {errors.email?.message && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="w-1/2">
              <Controller
                name="track"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select value={value} onValueChange={onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Tracks</SelectLabel>
                        <SelectItem value="product-manager">
                          Product Manager
                        </SelectItem>
                         <SelectItem value="qa-engineer">
                          QA Engineers 
                        </SelectItem>
                        <SelectItem value="data-analyst">
                          Data Analyst 
                        </SelectItem>
                        <SelectItem value="software-engineer">
                         Software Engineer
                        </SelectItem>
                        <SelectItem value="product-design">
                          Product Design
                        </SelectItem>
                        <SelectItem value="frontend">Frontend</SelectItem>
                        <SelectItem value="backend">Backend</SelectItem>
                        <SelectItem value="fullstack">Fullstack</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.track?.message && (
                <p className="text-sm text-red-500">{errors.track.message}</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer bg-[#086ACE] text-white hover:bg-[#0655a4]"
            >
              {isSubmitting ? 'Sending...' : 'Send Invite'}
            </Button>
          </div>
          <div>
            <p className="mb-3 font-semibold text-amber-500">
              Note: Copy the link and send to the Intern (Only in Development)
            </p>
            <Link href={inviteLink}>{inviteLink}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteTeamMemberModal;
