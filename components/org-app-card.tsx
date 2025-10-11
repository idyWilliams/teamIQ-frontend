import React from 'react';
import Image from 'next/image';

interface App {
  name: string;
  logo: string;
  description: string;
}

interface OrgAppCardProps {
  apps?: App[];
}

function OrgAppCard({ apps = [] }: OrgAppCardProps) {
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-5">
        {apps.length > 0 ? (
          apps.map(app => (
            <div
              key={app.name}
              className="flex h-full flex-col justify-between rounded-2xl p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-2">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={29}
                  height={28}
                />
                <h3 className="text-base font-semibold">{app.name}</h3>
              </div>
              <p className="text-black-400 text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black-800 text-center text-lg leading-relaxed">
            No apps found.
          </p>
        )}
      </div>
    </>
  );
}

export default OrgAppCard;
