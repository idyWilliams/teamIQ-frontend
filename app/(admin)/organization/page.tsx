import Image from "next/image";
import React from "react";

export default function OverviewPage() {
  return (
    <section>
      <div className="flex gap-3 items-center px-4 lg:px-6 py-3">
        <Image
          src="/images/avatar.jpg"
          alt="avatar"
          width={100}
          height={100}
          priority
          className="rounded-full object-center object-cover size-8"
        />
        <span>Isentry Technology</span>
      </div>
    </section>
  );
}
