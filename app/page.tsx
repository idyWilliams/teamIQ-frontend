'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Globe,
  Lock
} from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Users className="h-6 w-6 text-blue-400" />,
    title: 'Organization Management',
    description: 'Streamline your corporate structure with intuitive hierarchical controls.'
  },
  {
    icon: <BarChart3 className="h-6 w-6 text-blue-400" />,
    title: 'Advanced Analytics',
    description: 'Gain deep insights into team performance and project trajectories.'
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and role-based access for complete peace of mind.'
  },
  {
    icon: <Zap className="h-6 w-6 text-blue-400" />,
    title: 'Real-time Collaboration',
    description: 'Connect your global workforce with instantaneous updates and communication.'
  },
  {
    icon: <Globe className="h-6 w-6 text-blue-400" />,
    title: 'Global Scalability',
    description: 'Built on robust cloud infrastructure to grow alongside your ambition.'
  },
  {
    icon: <Lock className="h-6 w-6 text-blue-400" />,
    title: 'Compliance Ready',
    description: 'SOC2 and GDPR compliant out of the box to meet regulatory demands.'
  }
];

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[30rem] w-[30rem] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[40rem] w-[40rem] rounded-full bg-cyan-600/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-slate-950/50 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/20">
              IQ
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Team IQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden text-sm font-semibold text-white md:block hover:text-blue-400 transition-colors">
              Sign in
            </Link>
            <Link
              href="/organization"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200 hover:scale-105 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-32 lg:pt-48">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 md:pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm">
                Next Generation Enterprise Management
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-8"
            >
              Elevate Your Team&apos;s <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
                Performance & Synergy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl mx-auto"
            >
              Transform the way your organization operates. Team IQ provides granular visibility, unifies communication, and drives productivity across your entire enterprise architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/organization"
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25 px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-blue-500/40 hover:scale-105 active:scale-95"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/member"
                className="flex w-full sm:w-auto items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600"
              >
                Member Portal
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Dashboard Preview Image/Element */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto max-w-7xl px-6 lg:px-8 mt-4 mb-32"
        >
          <div className="relative rounded-2xl md:rounded-[2rem] border border-white/10 bg-slate-900/50 p-2 md:p-4 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />

            {/* Mockup UI Window */}
            <div className="relative rounded-xl md:rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner">
              <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
              </div>
              <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
                <Image
                  src="/images/authbg.jpg"
                  alt="Platform Preview"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900/80 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <section id="features" className="relative z-10 py-24 sm:py-32 bg-slate-950/50 border-t border-white/5">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-400">Everything you need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                A command center for your entire company
              </p>
              <p className="mt-6 text-lg leading-8 text-slate-400">
                We&apos;ve built a comprehensive suite of tools designed specifically for modern, distributed teams pushing the boundaries of what&apos;s possible.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
            >
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="flex flex-col relative rounded-2xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/10 hover:-translate-y-1"
                  >
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                      {feature.icon}
                    </div>
                    <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7 text-white mb-4">
                      {feature.title}
                    </dt>
                    <dd className="flex flex-auto flex-col text-base leading-7 text-slate-400">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 font-bold text-white text-xs">
              IQ
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Team IQ</span>
          </div>
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Team IQ Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
