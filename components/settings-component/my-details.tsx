"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const MyDetails = () => {
  // two modal states
  const [isMainDialogOpen, setIsMainDialogOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  // which image is being edited
  const [editType, setEditType] = useState<"profile" | "cover" | null>(null);

  // store images
  const [images, setImages] = useState({
    profile: "/placeholder-profile.jpg",
    cover: "/placeholder-cover.jpg",
  });
  // preview for upload
  const [preview, setPreview] = useState<string | null>(null);

  // handle choosing image type
  const handleChoose = (type: "profile" | "cover") => {
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
      setImages((prev) => ({ ...prev, [editType]: preview }));
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
    name: "James Alfred",
    phone: "09012345678",
    location: "Abuja, Nigeria",
    email: "james@gmail.com",
  };

  type Userkeys = keyof typeof user;

  const infos: { key: Userkeys; label: string; editable: boolean }[] = [
    { key: "name", label: "Full Name:", editable: true },
    { key: "email", label: "Email Address:", editable: false },
    { key: "phone", label: "Contact:", editable: true },
    { key: "location", label: "Location:", editable: true },
  ];

  //   mock connected accounts data

  const Accounts = [
    {
      avatarUrl: "/images/basil_windows-outline.svg",
      device: "Windows",
      time: "12 mins ago",
    },
    {
      avatarUrl: "/images/fluent_phone-24-regular.svg",
      device: "SamsungA23",
      time: "1hr ago",
    },
    {
      avatarUrl: "/images/basil_windows-outline.svg",
      device: "Windows",
      time: "2hr  ago",
    },
  ];

  const [editingInfo, setEditingInfo] = useState<string | null>(null); // state for handling editing

  const [formData, setFormData] = useState(user); //state for changing users data

  // function for changing users data
  function handleChange(key: string, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  // function for saving data
  function handleSaveInfo() {
    setEditingInfo(null);
  }
  return (
    <div>
      {/* details cover picture */}
      <div className="relative">
        <div className=" h-[200px] max-sm:h-[150px] w-full rounded-tl-[96px] opacity-70 bg-muted-foreground mt-10">
          <img
            src={images.cover}
            alt="Cover"
            className=" object-cover h-[200px] max-sm:h-[150px] w-full rounded-tl-[96px]"
          />
        </div>
        <div className="border-5 border-primary-foreground absolute rounded-full max-sm:size-[85px] size-[150px] bg-iq top-[75%] left-[10%]  ">
          <img
            src={images.profile}
            alt="Profile"
            className="max-sm:size-[80px] size-[142px] rounded-full object-cover"
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
            <Button onClick={() => handleChoose("profile")}>Upload Profile Picture</Button>
            <Button onClick={() => handleChoose("cover")}>Upload Cover Image</Button>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* --- SECOND MODAL (upload and preview) --- */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType === "profile" ? "Upload Profile Picture" : "Upload Cover Image"}
            </DialogTitle>
          </DialogHeader>

          {!preview ? (
            <>
              <p className="text-sm text-muted-foreground mb-3">
                Select a new image to upload.
              </p>
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              </div>
            </>
          ) : (
            <>
              <img
                src={preview}
                alt="Preview"
                className={`w-full rounded-lg object-cover ${
                  editType === "profile" ? "h-32" : "h-40"
                }`}
              />
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* details profile pic  */}

      <div className="flex items-center justify-between px-6 pt-7 ">
        <div className="ml-[26%] max-sm:ml-0 max-sm:mt-8 ">
          <p>Profile</p>
          <p>Update your details</p>
        </div>

        <div>
          <button onClick={() => setIsMainDialogOpen(true)} className="flex text-iq max-sm:text-sm  ">
            Edit
            <Avatar>
              <AvatarImage
                src={"/images/tabler_edit.svg"}
                alt="edit"
              ></AvatarImage>
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
          </button>
        </div>
      </div>

      {/* details edit my information */}
      <div className="my-12">
        {infos.map((info) => (
          <div
            key={info.key}
            className="gap-2 flex w-full justify-between py-3 px-6 border-b-1 border-b-border rounded-[8px] "
          >
            <div className="flex gap-x-15 max-sm:flex-col">
              <p className="font-medium max-sm:text-sm">{info.label}</p>
              {editingInfo === info.key ? (
                <input
                  className="max-sm:text-sm"
                  value={formData[info.key]}
                  onChange={(e) => handleChange(info.key, e.target.value)}
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
                      className="max-sm:text-xs text-sm text-primary-foreground rounded-[7px] bg-iq px-3 py-1 "
                      onClick={handleSaveInfo}
                    >
                      save
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingInfo(info.key)}
                      className="flex text-iq max-sm:text-sm "
                    >
                      Edit
                      <Avatar>
                        <AvatarImage
                          src={"/images/tabler_edit.svg"}
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
                  className="max-sm:text-sm opacity-30 cursor-not-allowed flex text-iq "
                >
                  Edit
                  <Avatar>
                    <AvatarImage
                      src={"/images/tabler_edit.svg"}
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
      <div className="flex gap-2 flex-col">
        <p className="text-[18px] font-medium mb-4">Connected Accounts</p>
        {Accounts.map((acc, i) => (
          <div
            key={i}
            className="border-1 border-border py-3 px-4 max-w-[350px] rounded-[8px] flex justify-between items-center"
          >
            <div>
              <div className="flex gap-1 items-center ">
                <Avatar>
                  <AvatarImage src={acc.avatarUrl} alt="device"></AvatarImage>
                  <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <p>{acc.device}</p>{" "}
              </div>
              <p className="text-sm text-muted-foreground">
                last seen {acc.time}
              </p>
            </div>
            <Avatar>
              <AvatarImage src={"images/minus-cirlce.svg"} alt="circle" />
              <AvatarFallback>O</AvatarFallback>
            </Avatar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDetails;
