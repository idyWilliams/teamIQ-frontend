"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {
  // function handleToast() {
  //   toast.error("An error occured!");
  // }
  return (
    <div className="w-screen h-screen">
      <h1 className="text-center">Hello World</h1>
    </div>
  );
}
