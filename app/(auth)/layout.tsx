"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Non-auth routes: simple centered container
  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className=" h-screen w-full flex justify-center gap-10 items-center bg-white">
        {children}
      </section>
    );
  }

  // Auth routes: two-column (desktop) with full-bleed illustration
  const isLogin = pathname === "/login";

  const formColClass = cn(
    "h-screen overflow-y-auto bg-white px-4 sm:px-8 lg:px-12",
    // width + horizontal centering wrapper behaviour delegated to child page
    isLogin
      ? "flex items-center justify-center" // center login vertically
      : "flex justify-center pt-6 pb-10" // top-align signup (and future similar) so header is visible
  );

  return (
    <section className="grid h-screen w-full grid-cols-1 lg:grid-cols-2 relative">
      {/* Illustration column (desktop only) */}
      <div className="hidden lg:block sticky top-0 h-screen w-full">
        <Image
          src="/images/TeamIQLogo.png"
          alt="TeamIQLogo"
          width={70}
          height={100}
          priority
          className=" z-99 lg:w-25  absolute top-0 md:top-10 lg:top-14 lg:left:10 md:left-7"
        />
        <div className="h-screen w-full relative  ">
          <Image
            src={"/images/authbg.jpg"}
            alt="login-graphics"
            width={5000}
            height={1066}
            priority
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none bg-blue-950/50">
            <div className="bg-[#F3F8FF2E] text-white rounded-lg p-3 text-xs sm:text-sm md:text-[12px] lg:text-[16px]   max-w-[90%] w-full lg:w-[600px] text-left shadow-lg">
              Bridging the gap between potential and achievement by making
              progress visible and actionable
            </div>
          </div>
        </div>
      </div>
      {/* Form column (scrollable on desktop, full-width on mobile) */}
      <div className={formColClass}>{children}</div>
    </section>
  );
}
