'use client';

import Image from 'next/image';

export default function PlanSettings() {
  return (
    <div className="w-full">
      <div className="bg-white sm:p-12">
        <div className="mx-auto max-w-md text-center">
          {/* UFO Illustration */}
          <div className="relative mb-8 inline-block">
            {/* Replace the SVG with your UFO image */}
            <Image
              src="/images/save.png"
              alt="UFO illustration"
              width={412}
              height={291}
            />
          </div>

          <h1 className="mb-3 text-2xl font-semibold text-gray-900">
            Coming Soon
          </h1>
          <p className="text-sm leading-relaxed text-gray-600">
            We&apos;re working on a plan designed to give you more value,
            flexibility, and benefits. Stay tuned, it&apos;s almost ready.
          </p>
        </div>
      </div>
    </div>
  );
}
