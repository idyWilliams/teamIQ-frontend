"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {

  function handleToast() {
    toast.error("An error occured!")
  }
  return (
    <div className="">
      <h1 className="text-6xl font-bold text-iq-100">Team IQ</h1>
      <Link href="/login">Login</Link>
      <Link href="/organization">Organizatin</Link>
      <Button onClick={handleToast}>Error</Button>
      <Link href="/member">user</Link>
    </div>
  );
}
