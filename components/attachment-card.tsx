import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import CloudUploadLinear from "./icons/CloudUploadLinear";

const AttachmentCard = () => {
  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col gap-4">
      <p className="text-[#141414] font-medium text-base">Attach</p>

      <Card className="bg-[#F7F7F7] flex flex-col items-center ">
        <CardContent className="flex flex-col items-center justify-center gap-2 py-6">
          <label className=" cursor-pointer">
            <input type="file" className="hidden" />
            <CloudUploadLinear size="30" />

          </label>
          <p className="text-xs font-medium text-[#062444]">
            Upload project image
          </p>
        </CardContent>
      </Card>
      <p className="text-[#141414] font-medium text-base mt-2 mb-4">File name</p>
      <Input placeholder="Enter a display text for the file" className="mb-4"/>
      <Button className="bg-[#086ACE] text-white w-full">Insert</Button>
    </div>
  );
};

export default AttachmentCard;
