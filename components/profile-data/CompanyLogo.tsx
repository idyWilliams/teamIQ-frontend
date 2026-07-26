import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';

const CompanyLogo = () => {
  const {user} = useAuthStore();
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={user?.organization_image}
        alt="company logo"
        width={250}
        height={350}
        className="rounded-lg object-contain shadow-lg"
      />
      <p className="w-60 text-center text-sm text-[#0B0B0B]">
        This logo appears in all official documents and sites
      </p>
    </div>
  );
};

export default CompanyLogo;
