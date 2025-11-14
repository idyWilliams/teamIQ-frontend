'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/services/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profile_image?: string;
  cover_image?: string;
}

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */
const MyDetails = () => {
  const { user, updateUser } = useAuthStore();

  /* ------------------------------- STATE ----------------------------------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  const [editingInfo, setEditingInfo] = useState<string | null>(null);

  const [images, setImages] = useState({
    profile: '/placeholder-profile.jpg',
    cover: '/placeholder-cover.jpg',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [editType, setEditType] = useState<'profile' | 'cover' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  /* --------------------------- LOAD USER DATA ----------------------------- */
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        location: user.location ?? '',
      });

      setImages({
        profile: user.profile_image || '/placeholder-profile.jpg',
        cover: user.cover_image || '/placeholder-cover.jpg',
      });
    }
  }, [user]);

  /* --------------------------- CLEANUP PREVIEW --------------------------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* --------------------------- TEXT EDITING ----------------------------- */
  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveInfo = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const payload = {
        name: formData.name || user.name,
        email: user.email, // read-only
        phone: formData.phone || user.phone,
        location: formData.location || user.location,
      };

      const { data } = await axiosInstance.put(`/users/${user.id}`, payload);
      updateUser(data.data);
      setEditingInfo(null);
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  /* --------------------------- IMAGE UPLOAD ----------------------------- */
  const handleChoose = (type: 'profile' | 'cover') => {
    setEditType(type);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be ≤ 5 MB');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleSaveImage = async () => {
    if (!preview || !editType || !user || !fileInputRef.current?.files?.[0]) return;

    const file = fileInputRef.current.files[0];
    const form = new FormData();
    form.append('image', file);

    try {
      setLoading(true);
      const { data } = await axiosInstance.post('/image', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = data.data.url; // adjust if API returns differently

      // Update local images
      setImages((prev) => ({ ...prev, [editType]: imageUrl }));

      // Update backend user record
      const payload = {
        ...user,
        [editType === 'profile' ? 'profile_image' : 'cover_image']: imageUrl,
      };
      const { data: userRes } = await axiosInstance.put(`/users/${user.id}`, payload);
      updateUser(userRes.data);

      toast.success(`${editType === 'profile' ? 'Profile' : 'Cover'} image updated`);
      handleCancel();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setEditType(null);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* --------------------------- TIME AGO --------------------------------- */
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const activity = new Date(dateString);
    const diff = Math.floor((now.getTime() - activity.getTime()) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  /* --------------------------- MOCK DATA -------------------------------- */
  const Accounts = [
    { avatarUrl: '/images/basil_windows-outline.svg', device: 'Windows', time: '2025-09-23T15:00:00Z' },
    { avatarUrl: '/images/fluent_phone-24-regular.svg', device: 'SamsungA23', time: '2025-09-23T15:00:00Z' },
    { avatarUrl: '/images/basil_windows-outline.svg', device: 'Windows', time: '2025-09-23T15:00:00Z' },
  ];

  const infos = [
    { key: 'name' as const, label: 'Full Name:', editable: true },
    { key: 'email' as const, label: 'Email Address:', editable: false },
    { key: 'phone' as const, label: 'Contact:', editable: true },
    { key: 'location' as const, label: 'Location:', editable: true },
  ];

  /* ---------------------------------------------------------------------- */
  return (
    <div>
      {/* ----------------------- COVER & PROFILE ----------------------- */}
      <div className="relative">
        <div className="bg-muted-foreground mt-10 h-[200px] w-full rounded-tl-[96px] max-sm:h-[150px]">
          <Image
            src={images.cover}
            alt="cover"
            width={1200}
            height={200}
            className="h-[200px] w-full object-cover rounded-tl-[96px] max-sm:h-[150px]"
          />
        </div>

        <div className="absolute top-[75%] left-[10%] size-[150px] rounded-full border-5 border-primary-foreground max-sm:size-[85px] bg-iq">
          <Image
            src={images.profile}
            alt="profile"
            width={150}
            height={150}
            className="size-[142px] rounded-full object-cover max-sm:size-[80px]"
          />
        </div>
      </div>

      {/* ----------------------- EDIT BUTTONS ----------------------- */}
      <div className="flex items-center justify-between px-6 pt-7">
        <div className="ml-[30%] max-sm:ml-0 max-sm:mt-8">
          <p>Profile</p>
          <p>Update your details</p>
        </div>

        <button
          onClick={() => setIsMainDialogOpen(true)}
          className="flex items-center gap-2 text-iq text-sm hover:underline"
        >
          Edit
          <Avatar className="size-5">
            <AvatarImage src="/images/tabler_edit.svg" alt="edit" />
            <AvatarFallback>E</AvatarFallback>
          </Avatar>
        </button>
      </div>

      {/* ----------------------- INFO FIELDS ----------------------- */}
      <div className="my-12">
        {infos.map((info) => (
          <div
            key={info.key}
            className="flex w-full items-center justify-between gap-2 px-6 py-3 border-b-[1px] border-b-border rounded-[8px]"
          >
            <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-y-1">
              <p className="w-[130px] font-medium max-sm:text-sm">{info.label}</p>

              {editingInfo === info.key && info.editable ? (
                <input
                  className="border border-border rounded-md py-1 px-2 focus:outline-none focus:ring-2 focus:ring-iq max-sm:text-sm"
                  value={formData[info.key] ?? ''}
                  onChange={(e) => handleChange(info.key, e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-left max-sm:text-sm">
                  {info.key === 'email' ? user?.email : formData[info.key] ?? user?.[info.key]}
                </p>
              )}
            </div>

            <div className="flex items-center">
              {info.editable ? (
                editingInfo === info.key ? (
                  <Button
                    size="sm"
                    onClick={handleSaveInfo}
                    disabled={loading}
                    className="bg-iq text-primary-foreground rounded-[7px]"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-1 size-3 animate-spin" />
                        Saving…
                      </>
                    ) : (
                      'Save'
                    )}
                  </Button>
                ) : (
                  <button
                    onClick={() => setEditingInfo(info.key)}
                    className="flex items-center gap-2 text-iq text-sm hover:underline"
                  >
                    Edit
                    <Avatar className="size-4">
                      <AvatarImage src="/images/tabler_edit.svg" alt="edit" />
                      <AvatarFallback>E</AvatarFallback>
                    </Avatar>
                  </button>
                )
              ) : (
                <button
                  disabled
                  className="flex items-center gap-2 text-iq text-sm opacity-30 cursor-not-allowed"
                >
                  Edit
                  <Avatar className="size-4">
                    <AvatarImage src="/images/tabler_edit.svg" alt="edit" />
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ----------------------- CONNECTED ACCOUNTS ----------------------- */}
      <div className="flex flex-col gap-2">
        <p className="mb-4 text-[18px] font-medium">Connected Accounts</p>
        {Accounts.map((acc, i) => (
          <div
            key={i}
            className="flex max-w-[350px] items-center justify-between px-4 py-3 border-1 border-border rounded-[8px]"
          >
            <div>
              <div className="flex items-center gap-1">
                <Avatar className="size-8">
                  <AvatarImage src={acc.avatarUrl} alt="device" />
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <p>{acc.device}</p>
              </div>
              <p className="text-muted-foreground text-sm">{timeAgo(acc.time)}</p>
            </div>
            <Avatar className="size-6">
              <AvatarImage src="/images/minus-cirlce.svg" alt="remove" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
            {/* (you can add a “disconnect” handler later) */}
          </div>
        ))}
      </div>

      {/* ----------------------- MAIN IMAGE DIALOG ----------------------- */}
      <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button onClick={() => handleChoose('profile')}>Upload Profile Picture</Button>
            <Button onClick={() => handleChoose('cover')}>Upload Cover Image</Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ----------------------- UPLOAD DIALOG ----------------------- */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === 'profile' ? 'Upload Profile Picture' : 'Upload Cover Image'}
            </DialogTitle>
          </DialogHeader>

          {!preview ? (
            <>
              <p className="text-muted-foreground mb-3 text-sm">
                Select a new image (max 5 MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="w-full rounded-[8px] border-1 border-border bg-iq px-3 py-3 text-primary-foreground file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm"
                onChange={handleFileChange}
              />
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <Image
                src={preview}
                alt="Preview"
                width={400}
                height={editType === 'profile' ? 128 : 160}
                className={`w-full rounded-lg object-cover ${
                  editType === 'profile' ? 'h-32' : 'h-40'
                }`}
              />
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSaveImage} disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Uploading…
                    </>
                  ) : (
                    'Save'
                  )}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyDetails;