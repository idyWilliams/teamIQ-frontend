"use client";

import PlanSettings from "@/components/plan";
import Link from "next/link";

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            <Link href="/member/settings/details">
              <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                My Details
              </span>
            </Link>

            <Link href="/member/settings/notification">
              <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                Notifications
              </span>
            </Link>

            <Link href="/member/settings/password">
              <span className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm transition-colors">
                Password
              </span>
            </Link>

            <Link href="/member/settings/plan">
              <span className="py-4 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm transition-colors">
                Plan
              </span>
            </Link>
          </nav>
        </div>

        {/* Plan Content */}
        <PlanSettings />
      </div>
    </div>
  );
}
