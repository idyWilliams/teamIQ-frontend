'use client';

import React from 'react';
import { Edit } from 'lucide-react';
import { organizationData } from '@/utils/organisationData';

const OrganisationProfile = () => {
  return (
    <div className="mx-auto w-full">
      {organizationData.map(org => (
        <div key={org.id} className="mx-auto p-5">
          <h2 className="p-2 text-lg">{org.title}</h2>
          <div className="p1 flex flex-col gap-2 rounded-xl border p-4">
            {org.fields.map((field, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 space-y-1">
                  <span className="text-sm text-[#0B0B0B]">{field.label}:</span>
                  <span className="text-sm">
                    {Array.isArray(field.value)
                      ? field.value.join(', ')
                      : field.value}
                  </span>
                </div>
                <button className="flex cursor-pointer items-center justify-between gap-1 bg-transparent text-sm text-[#3c3c3c] hover:text-[#e4e7ec]">
                  <span className="text-[16px]">Edit</span>
                  <Edit size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrganisationProfile;
