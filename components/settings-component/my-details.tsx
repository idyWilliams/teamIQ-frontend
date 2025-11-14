'use client';

import React, { useEffect, useRef, useState } from 'react';
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

/* -------------------------------------------------------------
   Types
   ------------------------------------------------------------- */
type UserFromStore = {
  id: number | string;
  first_name?: string;
  last_name?: string;
  username?: string;
  profile_image?: string | null;
  cover_image?: string | null;
  email?: string | null;
  phone_number?: string | null;
  country?: string | null;
  bio?: string;
  // compatibility fields
  name?: string;
  phone?: string;
  location?: string;
};

/* -------------------------------------------------------------
   Component
   ------------------------------------------------------------- */
export default function MyDetails() {
  const { user, updateUser } = useAuthStore() as {
    user: UserFromStore | null;
    updateUser: (payload: Partial<UserFromStore>) => void;
  };

  /* ---------- UI state ---------- */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [editingInfo, setEditingInfo] = useState<null | 'name' | 'phone' | 'location'>(null);
  const [images, setImages] = useState({
    profile: '/placeholder-profile.jpg',
    cover: '/placeholder-cover.jpg',
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [editType, setEditType] = useState<'profile' | 'cover' | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------- Sync store → UI ---------- */
  useEffect(() => {
    if (!user) return;

    const uiName =
      (user.first_name && user.last_name && `${user.first_name} ${user.last_name}`) ||
      user.username ||
      user.name ||
      '';

    setFormData({
      name: uiName,
      email: user.email ?? '',
      phone: (user.phone_number as string) ?? (user.phone as string) ?? '',
      location: (user.country as string) ?? (user.location as string) ?? '',
    });

    setImages({
      profile: user.profile_image ?? '/placeholder-profile.jpg',
      cover: user.cover_image ?? '/placeholder-cover.jpg',
    });
  }, [user]);

  /* ---------- Blob preview cleanup ---------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  /* ---------- Build payload for profile update ----------
     → always include every field the backend already knows
     → then overwrite with edited values                     */
  const buildPayloadFromForm = (): Record<string, any> => {
    const payload: Record<string, any> = {
      ...(user?.first_name && { first_name: user.first_name }),
      ...(user?.last_name && { last_name: user.last_name }),
      ...(user?.username && { username: user.username }),
      ...(user?.email && { email: user.email }),
      ...(user?.phone_number && { phone_number: user.phone_number }),
      ...(user?.country && { country: user.country }),
      ...(user?.bio && { bio: user.bio }),
    };

    const { name, phone, location } = formData;

    if (name?.trim()) {
      const parts = name.trim().split(/\s+/);
      if (parts.length >= 2) {
        payload.first_name = parts.shift()!;
        payload.last_name = parts.join(' ');
      } else {
        payload.username = parts[0];
        payload.first_name = parts[0];
      }
    }

    if (phone?.trim()) payload.phone_number = phone.trim();
    if (location?.trim()) payload.country = location.trim();

    return payload;
  };

  /* ---------- Text field editing ---------- */
  const handleChange = (key: 'name' | 'phone' | 'location' | 'email', value: string) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const handleSaveInfo = async () => {
    if (!user) return toast.error('No user found');

    const payload = buildPayloadFromForm();

    if (Object.keys(payload).length === 0) {
      toast('No changes to save');
      setEditingInfo(null);
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.put(`/api/v1/users/${user.id}`, payload);
      const updated = res?.data?.data ?? res?.data;
      if (updated) updateUser(updated);
      setEditingInfo(null);
      toast.success('Profile updated');
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      if (detail) {
        const msg = Array.isArray(detail)
          ? detail.map((d: any) => d.msg || d).join(' — ')
          : String(detail);
        toast.error(msg);
      } else {
        toast.error(err?.response?.data?.message || 'Failed to update profile');
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Image upload flow ---------- */
  const handleChoose = (type: 'profile' | 'cover') => {
    setEditType(type);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(true);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return toast.error('Please select an image file');
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be ≤ 5 MB');

    setPreview(URL.createObjectURL(file));
  };

  const handleSaveImage = async () => {
    if (!user || !editType) return toast.error('Upload failed: missing user or target');

    const file = fileInputRef.current?.files?.[0];
    if (!file) return toast.error('No file selected');

    const form = new FormData();
    form.append('file', file);

    // backend expects image_type & update_db as **query params**
    const params = new URLSearchParams({
      image_type: editType === 'profile' ? 'profile' : 'general', // cover → general (or add enum on backend)
      update_db: 'true',
    });

    try {
      setLoading(true);

      // ---- 1. Upload image -------------------------------------------------
      const uploadRes = await axiosInstance.post(
        `/api/v1/upload/image?${params}`,
        form,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const imageUrl: string = uploadRes.data?.url ?? uploadRes.data?.data?.url;
      if (!imageUrl) throw new Error('No URL returned from upload');

      // ---- 2. Update UI instantly -----------------------------------------
      setImages((p) => ({ ...p, [editType]: imageUrl }));

      // ---- 3. Persist to user record ---------------------------------------
      const putPayload: any = {
        ...(editType === 'profile' ? { profile_image: imageUrl } : { cover_image: imageUrl }),
      };
      const putRes = await axiosInstance.put(`/api/v1/users/${user.id}`, putPayload);
      const updated = putRes?.data?.data ?? putRes?.data;
      if (updated) updateUser(updated);

      toast.success(`${editType === 'profile' ? 'Profile' : 'Cover'} image updated`);
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      const msg = detail
        ? Array.isArray(detail)
          ? detail.map((d: any) => d.msg).join(' — ')
          : String(detail)
        : err?.response?.data?.message ?? 'Upload failed';
      toast.error(msg);
    } finally {
      setLoading(false);
      setPreview(null);
      setEditType(null);
      setIsUploadDialogOpen(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setEditType(null);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  /* ---------- Helper: time ago ---------- */
  const timeAgo = (dateString: string) => {
    try {
      const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
      if (diff < 60) return 'just now';
      if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
      return `${Math.floor(diff / 86400)} days ago`;
    } catch {
      return '';
    }
  };

  /* ---------- Mocked accounts ---------- */
  const Accounts = [
    { avatarUrl: '/images/basil_windows-outline.svg', device: 'Windows', time: '2025-09-23T15:00:00Z' },
    { avatarUrl: '/images/fluent_phone-24-regular.svg', device: 'SamsungA23', time: '2025-09-23T15:00:00Z' },
    { avatarUrl: '/images/basil_windows-outline.svg', device: 'Windows', time: '2025-09-23T15:00:00Z' },
  ];

  /* ---------- UI field config ---------- */
  const infos = [
    { key: 'name' as const, label: 'Full Name', editable: true },
    { key: 'email' as const, label: 'Email Address', editable: false },
    { key: 'phone' as const, label: 'Contact', editable: true },
    { key: 'location' as const, label: 'Location', editable: true },
  ];

  /* -------------------------------------------------------------
     Render
     ------------------------------------------------------------- */
  return (
    <div>
      {/* COVER + PROFILE */}
      <div className="relative">
        <div className="bg-muted-foreground mt-10 h-[200px] w-full rounded-tl-[96px] max-sm:h-[150px]">
          <Image
            src={images.cover}
            alt="cover"
            width={1200}
            height={200}
            className="h-[200px] w-full object-cover rounded-tl-[96px] max-sm:h-[150px]"
            unoptimized
          />
        </div>

        <div className="absolute top-[75%] left-[10%] size-[150px] rounded-full border-5 border-primary-foreground max-sm:size-[85px] bg-iq overflow-hidden">
          <Image
            src={images.profile}
            alt="profile"
            width={150}
            height={150}
            className="size-[142px] rounded-full object-cover max-sm:size-[80px]"
            unoptimized
          />
        </div>
      </div>

      {/* Header + Edit button */}
      <div className="flex items-center justify-between px-6 pt-7">
        <div className="ml-[30%] max-sm:ml-0 max-sm:mt-8">
          <p className="text-sm font-medium">Profile</p>
          <p className="text-xs text-muted-foreground">Update your details</p>
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

      {/* INFO FIELDS */}
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
                  value={(formData as any)[info.key] ?? ''}
                  onChange={(e) => handleChange(info.key as any, e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-left max-sm:text-sm">
                  {info.key === 'email'
                    ? user?.email ?? ''
                    : (formData as any)[info.key] ??
                      user?.[info.key as keyof UserFromStore] ??
                      ''}
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
                    onClick={() => setEditingInfo(info.key as 'name' | 'phone' | 'location')}
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

      {/* CONNECTED ACCOUNTS (UI-only) */}
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
          </div>
        ))}
      </div>

      {/* MAIN DIALOG – choose image type */}
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

      {/* UPLOAD DIALOG */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === 'profile' ? 'Upload Profile Picture' : 'Upload Cover Image'}
            </DialogTitle>
          </DialogHeader>

          {!preview ? (
            <>
              <p className="text-muted-foreground mb-3 text-sm">Select a new image (max 5 MB)</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="w-full rounded-[8px] border-1 border-border bg-iq px-3 py-3 text-primary-foreground file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm"
                onChange={handleFileChange}
              />
              {/* optional: show selected file name */}
              {fileInputRef.current?.files?.[0] && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {fileInputRef.current.files[0].name}
                </p>
              )}
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="w-full">
                <Image
                  src={preview}
                  alt="Preview"
                  width={800}
                  height={editType === 'profile' ? 128 : 160}
                  className={`w-full rounded-lg object-cover ${
                    editType === 'profile' ? 'h-32' : 'h-40'
                  }`}
                  unoptimized
                />
              </div>

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
}