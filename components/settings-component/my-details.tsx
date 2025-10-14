'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useState } from 'react';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const MyDetails = () => {
  // two modal states
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // which image is being edited
  const [editType, setEditType] = useState<'profile' | 'cover' | null>(null);

  // store images
  const [images, setImages] = useState({
    profile: '/placeholder-profile.jpg',
    cover: '/placeholder-cover.jpg',
  });
  // preview for upload
  const [preview, setPreview] = useState<string | null>(null);

  // handle choosing image type
  const handleChoose = (type: 'profile' | 'cover') => {
    setEditType(type);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(true);
  };

  // handle selecting a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  // save new image
  const handleSave = () => {
    if (editType && preview) {
      setImages(prev => ({ ...prev, [editType]: preview }));
    }
    handleCancel(); // reset everything
  };

  // cancel all dialogs
  const handleCancel = () => {
    setPreview(null);
    setEditType(null);
    setIsMainDialogOpen(false);
    setIsUploadDialogOpen(false);
  };

  // mock user data
  const user = {
    name: 'James Alfred',
    phone: '09012345678',
    location: 'Abuja, Nigeria',
    email: 'james@gmail.com',
  };

  type Userkeys = keyof typeof user;

  const infos: { key: Userkeys; label: string; editable: boolean }[] = [
    { key: 'name', label: 'Full Name:', editable: true },
    { key: 'email', label: 'Email Address:', editable: false },
    { key: 'phone', label: 'Contact:', editable: true },
    { key: 'location', label: 'Location:', editable: true },
  ];

  //   mock connected accounts data

  const Accounts = [
    {
      avatarUrl: '/images/basil_windows-outline.svg',
      device: 'Windows',
      time: '2025-09-23T15:00:00Z',
    },
    {
      avatarUrl: '/images/fluent_phone-24-regular.svg',
      device: 'SamsungA23',
      time: '2025-09-23T15:00:00Z',
    },
    {
      avatarUrl: '/images/basil_windows-outline.svg',
      device: 'Windows',
      time: '2025-09-23T15:00:00Z',
    },
  ];

  const [editingInfo, setEditingInfo] = useState<string | null>(null); // state for handling editing

  const [formData, setFormData] = useState(user); //state for changing users data

  // function for changing users data
  function handleChange(key: string, value: string) {
    setFormData(prev => ({ ...prev, [key]: value }));
  }

  // function for saving data
  function handleSaveInfo() {
    setEditingInfo(null);
  }

  // this functions to show how last time user connected with a device
  function timeAgo(dateString: string): string {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diff = Math.floor((now.getTime() - activityDate.getTime()) / 1000);

    if (diff < 60) return 'justnow';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  return (
    <div>
      {/* details cover picture */}
      <div className="relative">
        <div className="bg-muted-foreground mt-10 h-[200px] w-full rounded-tl-[96px] opacity-70 max-sm:h-[150px]">
          <img
            src={images.cover}
            alt="Cover"
            className="h-[200px] w-full rounded-tl-[96px] object-cover max-sm:h-[150px]"
          />
        </div>
        <div className="border-primary-foreground bg-iq absolute top-[75%] left-[10%] size-[150px] rounded-full border-5 max-sm:size-[85px]">
          <img
            src={images.profile}
            alt="Profile"
            className="size-[142px] rounded-full object-cover max-sm:size-[80px]"
          />
        </div>
      </div>
      {/* --- FIRST MODAL (choose what to edit) --- */}
      <Dialog open={isMainDialogOpen} onOpenChange={setIsMainDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Image</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Button onClick={() => handleChoose('profile')}>
              Upload Profile Picture
            </Button>
            <Button onClick={() => handleChoose('cover')}>
              Upload Cover Image
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- SECOND MODAL (upload and preview) --- */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === 'profile'
                ? 'Upload Profile Picture'
                : 'Upload Cover Image'}
            </DialogTitle>
          </DialogHeader>

          {!preview ? (
            <>
              <p className="text-muted-foreground mb-3 text-sm">
                Select a new image to upload.
              </p>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div className="mt-4 flex justify-end">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className={`w-full rounded-lg object-cover ${
                  editType === 'profile' ? 'h-32' : 'h-40'
                }`}
              />
              <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* details profile pic  */}

      <div className="flex items-center justify-between px-6 pt-7">
        <div className="ml-[26%] max-sm:mt-8 max-sm:ml-0">
          <p>Profile</p>
          <p>Update your details</p>
        </div>

        <div>
          <button
            onClick={() => setIsMainDialogOpen(true)}
            className="text-iq flex max-sm:text-sm"
          >
            Edit
            <Avatar>
              <AvatarImage
                src={'/images/tabler_edit.svg'}
                alt="edit"
              ></AvatarImage>
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* details edit my information */}
      <div className="my-12">
        {infos.map(info => (
          <div
            key={info.key}
            className="border-b-border flex w-full justify-between gap-2 rounded-[8px] border-b-1 px-6 py-3"
          >
            <div className="flex gap-x-15 max-sm:flex-col">
              <p className="font-medium max-sm:text-sm">{info.label}</p>
              {editingInfo === info.key ? (
                <input
                  className="max-sm:text-sm"
                  value={formData[info.key]}
                  onChange={e => handleChange(info.key, e.target.value)}
                  autoFocus
                />
              ) : (
                <p className="text-left max-sm:text-sm">{formData[info.key]}</p>
              )}
            </div>
            <div>
              {/* 1st condition = if button is editable let it work */}
              {info.editable ? (
                <>
                  {/* 2nd condition = if edit button is clicked chnage to save */}
                  {editingInfo === info.key ? (
                    <button
                      className="text-primary-foreground bg-iq rounded-[7px] px-3 py-1 text-sm max-sm:text-xs"
                      onClick={handleSaveInfo}
                    >
                      save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingInfo(info.key)}
                      className="text-iq flex max-sm:text-sm"
                    >
                      Edit
                      <Avatar>
                        <AvatarImage
                          src={'/images/tabler_edit.svg'}
                          alt="edit"
                        ></AvatarImage>
                        <AvatarFallback>E</AvatarFallback>
                      </Avatar>
                    </button>
                  )}
                </>
              ) : (
                <button
                  disabled
                  className="text-iq flex cursor-not-allowed opacity-30 max-sm:text-sm"
                >
                  Edit
                  <Avatar>
                    <AvatarImage
                      src={'/images/tabler_edit.svg'}
                      alt="edit"
                    ></AvatarImage>
                    <AvatarFallback>E</AvatarFallback>
                  </Avatar>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* details connected accounts section */}
      <div className="flex flex-col gap-2">
        <p className="mb-4 text-[18px] font-medium">Connected Accounts</p>
        {Accounts.map((acc, i) => (
          <div
            key={i}
            className="border-border flex max-w-[350px] items-center justify-between rounded-[8px] border-1 px-4 py-3"
          >
            <div>
              <div className="flex items-center gap-1">
                <Avatar>
                  <AvatarImage src={acc.avatarUrl} alt="device"></AvatarImage>
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <p>{acc.device}</p>{' '}
              </div>
              <p className="text-muted-foreground text-sm">
                {timeAgo(acc.time)}
              </p>
            </div>
            <Avatar>
              <AvatarImage src={'images/minus-cirlce.svg'} alt="circle" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDetails;
