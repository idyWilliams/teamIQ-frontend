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

  // Non-auth routes: simple centered container
  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className="h-screen w-full flex justify-center items-center bg-white">
        {children}
      </section>
    );
  }

  // Auth routes: two-column (desktop) with full-bleed illustration
  return (
    <section className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
      {/* Illustration column (desktop only) */}
      <div className="relative hidden w-full h-full lg:block">
        <Image
          src={banner}
          alt="TeamIQ authentication illustration"
          fill
          priority
          sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 50vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 flex flex-col">
          <div className="p-8">
            <h1 className="text-[#0A427B] font-medium text-4xl drop-shadow-sm select-none">
              TeamIQ
            </h1>
          </div>
          <div className="pointer-events-none mt-auto h-40 bg-gradient-to-t from-[#F3F9FF]/80 via-[#F3F9FF]/40 to-transparent" />
        </div>
      </div>
      {/* Form column */}
      <div className="flex justify-center items-center px-4 sm:px-8 lg:px-12 bg-white">
        {children}
      </div>
    </section>
  );
}
