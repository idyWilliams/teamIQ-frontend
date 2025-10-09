"use client";
import Image from "next/image";
import Link from "next/link";
// import { toast } from "sonner";

export default function Home() {
 
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={"/images/authbg.jpg"}
        alt="login-graphics"
        width={5000}
        height={1066}
        priority
        className="w-full h-full object-cover object-center absolute top-0 left-0"
      />
      <div className="bg-blue-950/70 backdrop-blur-[10px] absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-white mb-10 ">
          Welcome to Team IQ
        </h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="py-3 px-8 bg-white text-blue-800 rounded-2xl inline-block"
          >
            Login
          </Link>
          <Link
            href="/organization"
            className="py-3 px-8 bg-white text-blue-800 rounded-2xl inline-block"
          >
            Organization
          </Link>
          <Link
            href="/member"
            className="py-3 px-8 bg-white text-blue-800 rounded-2xl inline-block"
          >
            Team Member
          </Link>
        </div>
      </div>
    </div>
  );
}
