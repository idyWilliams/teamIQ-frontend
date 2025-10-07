import React from "react";
import Image from "next/image";

function OrgAppCard({ apps = [] }) {
  return (
    <>
      <div className="grid gap-5 grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch">
        {apps.length > 0 ? (
          apps.map((app) => (
            <div
              key={app.name}
              className="rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between p-6 h-full"
            >
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={29}
                  height={28}
                />
                <h3 className="font-semibold text-base">{app.name}</h3>
              </div>
              <p className="text-black-400 text-sm leading-relaxed">
                {app.description}
              </p>
            </div>
          ))
        ) : (
          <p className="text-black-800 text-lg leading-relaxed text-center">
            No apps found.
          </p>
        )}
      </div>
    </>
  );
}

export default OrgAppCard;
