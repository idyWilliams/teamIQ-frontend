import React from 'react';
import OrganisationProfile from '@/app/(admin)/organization/components/profile-data/OrganisationProfile';
import CompanyLogo from '@/app/(admin)/organization/components/profile-data/CompanyLogo';

const ProfilePage = () => {
  return (
    <section className="flex w-full items-start justify-center gap-7 pt-0">
      <div className="w-[70%]">
        <OrganisationProfile />
      </div>
      <div className="w-[30%]">
        <CompanyLogo />
      </div>
    </section>
  );
};

export default ProfilePage;
