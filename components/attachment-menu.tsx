"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import MenuDotsOutline from "./icons/MenuDotsOutline";

interface AttachmentItemProps {
  name: string;
  fileUrl?: string;
}

export const AttachmentItem: React.FC<AttachmentItemProps> = ({
  name,
  fileUrl,
}) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, "_blank");
    } else {
      alert("No file available to download.");
    }
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <Image
          src="/images/vector-menu.png"
          width={20}
          height={20}
          className="object-contain"
          alt="file icon"
        />
        <p className="text-[16px] font-medium text-[#141414]">{name}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 w-6 h-6">
            <MenuDotsOutline size="20" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDownload}>
            <p className="text-[#141414] font-bold text-base">Download</p>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <p className="text-[#E22200] font-bold text-base">Remove</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="">
              Are you sure you want to remove?
            </DialogTitle>
            <DialogDescription className="text-[#939393] font-normal text-sm">
              Remove this attachment? There is no undo.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="w-full bg-[#E22200] text-white hover:bg-[#C01C00]"
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
