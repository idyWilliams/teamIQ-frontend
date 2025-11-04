import React, { useState, useEffect } from 'react';
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
import { Loader, X } from 'lucide-react';
import { on } from 'events';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import Link from 'next/link';

type CloseModalProp = {
  open: boolean;
  onClose: () => void;
};

const InviteTeamMemberModal = ({ open, onClose }: CloseModalProp) => {
  const { mutateAsync, isPending } = useInviteUser();
  const [formData, setFormData] = useState({
    email: '',
    stack: '',
    role: '',
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInviteSubmit = async (e: React.FormEvent) => {
    if (!formData.email && !formData.role) return;

    e.preventDefault();
    try {
      await mutateAsync(formData, {
        onSuccess: res => {
          console.log(res);
          setInviteLink(res?.data?.invite_link);
        },
      });
      // onClose();
    } catch (error: any) {
      console.error('Failed to send', error);
      toast.warning(error?.response?.data?.detail || 'Failed to send');
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

        <form className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1/2">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                onChange={handleChange}
                className="shadow-none focus-visible:ring-0 focus-visible:outline-none"
              />
            </div>

            <div className="w-1/2">
              <Select
                onValueChange={value =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="product-design">
                      Product Design
                    </SelectItem>
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="fullstack">Fullstack</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <Button
              type="button"
              onClick={handleInviteSubmit}
              disabled={isPending}
              className="w-full cursor-pointer bg-[#086ACE] text-white hover:bg-[#0655a4]"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Sending...
                </>
              ) : (
                ' Send Invite'
              )}
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
