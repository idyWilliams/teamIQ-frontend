"use client";

export default function PlanSettings() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
        <div className="max-w-md mx-auto text-center">
          {/* UFO Illustration */}
          <div className="mb-8 relative inline-block">
            {/* Replace the SVG with your UFO image */}
            <img
              src="/images/save.png"
              alt="UFO illustration"
              className="w-48 h-auto mx-auto"
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Coming Soon
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            We&apos;re working on a plan designed to give you more value,
            flexibility, and benefits. Stay tuned, it&apos;s almost ready.
          </p>
        </div>
      </div>
    </div>
  );
}
