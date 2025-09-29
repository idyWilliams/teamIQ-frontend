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
    pathname === "/login"
      ? "/images/userloginGraphics.png"
      : "/images/signup bg.jpg";

  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className=" h-screen w-full flex justify-center items-center bg-white">
        {children}
      </section>
    );
  }

  return (
    <section className="grid h-screen w-full grid-cols-1 md:grid-cols-2">
      <div className="relative h-full w-full p-8 bg-[#F3F9FF] md:block hidden">
        <h1 className="text-[#0A427B] font-medium text-4xl relative z-[1]">
          TeamIQ
        </h1>
        <Image
          src={banner}
          alt="auth-graphics"
          width={2145}
          height={3366}
          sizes="(min-width: 768px) 50vw, 0px"
          className="absolute top-0 left-1/2 z-0 -translate-x-1/2 w-auto h-full"
        />
      </div>
      <div className="flex justify-center items-center">{children}</div>
    </section>
  );
}
