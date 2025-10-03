"use client";

export default function PlanSettings() {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-8 sm:p-12">
        <div className="max-w-md mx-auto text-center">
          {/* UFO Illustration */}
          <div className="mb-8 relative inline-block">
            <svg
              viewBox="0 0 200 200"
              className="w-48 h-48 mx-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Stars */}
              <text x="60" y="40" fontSize="20" fill="#CBD5E0">+</text>
              <text x="140" y="50" fontSize="20" fill="#CBD5E0">+</text>
              <text x="100" y="140" fontSize="16" fill="#CBD5E0">+</text>
              <text x="70" y="170" fontSize="16" fill="#CBD5E0">+</text>
              <text x="130" y="160" fontSize="16" fill="#CBD5E0">+</text>
              <text x="110" y="185" fontSize="16" fill="#CBD5E0">+</text>
              
              {/* UFO Top Dome */}
              <ellipse cx="100" cy="70" rx="35" ry="20" fill="#E2E8F0" />
              <ellipse cx="100" cy="68" rx="35" ry="20" fill="#F7FAFC" />
              
              {/* UFO Main Body */}
              <ellipse cx="100" cy="85" rx="60" ry="20" fill="#2563EB" />
              <ellipse cx="100" cy="83" rx="60" ry="20" fill="#3B82F6" />
              
              {/* Windows/Lights */}
              <circle cx="70" cy="83" r="5" fill="white" />
              <circle cx="90" cy="83" r="5" fill="white" />
              <circle cx="110" cy="83" r="5" fill="white" />
              <circle cx="130" cy="83" r="5" fill="white" />
              
              {/* Light Beam */}
              <path
                d="M 90 95 L 75 140 L 125 140 L 110 95 Z"
                fill="#93C5FD"
                opacity="0.3"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-900 mb-3">
            Coming Soon
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            We're working on a plan designed to give you more value, flexibility, and benefits. Stay tuned, it's almost ready
          </p>
        </div>
      </div>
    </div>
  );
}