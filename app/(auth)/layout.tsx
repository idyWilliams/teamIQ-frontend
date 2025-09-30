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

  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className=" h-screen w-full flex justify-center gap-10 items-center bg-white">
        {children}
      </section>
    );
  }

  return (
    <section className=" relative grid grid-cols-1   md:grid-cols-2 h-full w-full">
      {/* Left: Image (hidden on small screens) */}
      <div className="w-full hidden md:block  md:h-screen ">
        {" "}
        <Image
          src="/images/TeamIQLogo.png"
          alt="TeamIQLogo"
          width={70}
          height={100}
          priority
          className=" z-99 lg:w-25  absolute top-0 md:top-10 lg:top-14 lg:left:10 md:left-7"
        />
        <div className="h-screen w-full relative">
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
      {/* Right: Login content (always visible, full width on mobile) */}
      <div className="flex mt-12 md:mt-0 flex-col px-4 md:px-10 lg:px-20  justify-center items-center h-screen w-full bg-white">
        {children}
      </div>
    </section>
  );
}
