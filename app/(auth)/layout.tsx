"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Non-auth routes: simple centered container with dark aesthetic
  if (pathname !== "/login" && pathname !== "/signup") {
    return (
      <section className="h-screen w-full flex justify-center gap-10 items-center bg-slate-950 text-white">
        {children}
      </section>
    );
  }

  const isLogin = pathname === "/login";

  const formColClass = cn(
    "h-screen overflow-y-auto bg-slate-950 px-4 sm:px-8 lg:px-12 relative z-10 flex flex-col justify-center",
    !isLogin && "justify-start pt-12 pb-10"
  );

  return (
    <section className="grid h-screen w-full grid-cols-1 lg:grid-cols-2 relative bg-slate-950 overflow-hidden text-white">
      {/* Background Effects for the entire layout */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] h-[40rem] w-[40rem] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      {/* Illustration column (desktop only) */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full flex-col justify-between p-12 relative z-10 overflow-hidden border-r border-white/5 bg-slate-900/50 backdrop-blur-xl">
        <div className="relative z-20 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/20 text-xl">
            IQ
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Team IQ
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-20 max-w-md"
        >
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Elevate your team&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">performance</span>.
          </h2>
          <p className="text-lg text-slate-400">
            Bridging the gap between potential and achievement by making progress visible, actionable, and seamlessly integrated into your daily workflow.
          </p>
        </motion.div>

        {/* Abstract structural graphics */}
        <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 mix-blend-luminosity translate-x-1/4 translate-y-1/4">
          <div className="w-[600px] h-[600px] rounded-full border border-white/10 absolute -bottom-[100px] -right-[100px]" />
          <div className="w-[450px] h-[450px] rounded-full border border-white/10 absolute -bottom-[25px] -right-[25px]" />
          <div className="w-[300px] h-[300px] rounded-full border border-white/10 absolute bottom-[50px] right-[50px] bg-gradient-to-tr from-blue-500/20 to-transparent backdrop-blur-3xl" />
        </div>
      </div>

      {/* Form column */}
      <div className={formColClass}>
        <div className="mx-auto w-full max-w-md lg:max-w-lg relative z-20">
          {children}
        </div>
      </div>
    </section>
  );
}
