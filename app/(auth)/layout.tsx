"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const banner =
    pathname === "/login" ? "/images/userloginGraphics.png" : "/images/signup-graphics.png";

  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className=" h-screen w-full flex justify-center items-center bg-white">
        {children}
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 h-screen w-full">
      <div className="relative h-full w-full p-8 ">
        <h1 className="text-[#0A427B] font-medium text-4xl relative z-[1]">
          TeamIQ
        </h1>
        <Image
          src={banner}
          alt="login-graphics"
          width={5000}
          height={1366}
          priority
          className="absolute top-0 left-1/2 z-0 -translate-x-1/2 w-auto h-full"
        />
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </section>
  );
}
