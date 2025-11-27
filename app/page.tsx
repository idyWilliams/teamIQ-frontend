'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src={'/images/authbg.jpg'}
        alt="login-graphics"
        width={5000}
        height={1066}
        priority
        className="absolute top-0 left-0 h-full w-full object-cover object-center"
      />
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center bg-blue-950/70 backdrop-blur-[10px]">
        <h1 className="mb-10 text-6xl font-bold text-white">
          Welcome to Team IQ
        </h1>

        <div className="flex gap-3">
          <Link
            href="/login"
            className="inline-block rounded-2xl bg-white px-8 py-3 text-blue-800"
          >
            Login
          </Link>
          <Link
            href="/organization"
            className="inline-block rounded-2xl bg-white px-8 py-3 text-blue-800"
          >
            Organization
          </Link>
          <Link
            href="/member"
            className="inline-block rounded-2xl bg-white px-8 py-3 text-blue-800"
          >
            Team Member
          </Link>
        </div>
      </div>
    </div>
  );
}
