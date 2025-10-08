"use client";

import { useState } from "react";
import NotificationsSettings from "@/components/notification ";
import PlanSettings from "@/components/plan";

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState<
    "details" | "notifications" | "password" | "plan"
  >("notifications");

  return (
    <div className="max-w-[1332px] mx-auto mt-24 px-4">
      {/* Tabs Header */}
      <div className="grid grid-cols-4 border-b border-gray-200 mb-8 h-9">
        {[
          { key: "details", label: "My Details" },
          { key: "notifications", label: "Notifications" },
          { key: "password", label: "Password" },
          { key: "plan", label: "Plan" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`relative flex items-center justify-center pb-2 text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.key
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {/* Blue underline when active */}
            {activeTab === tab.key && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full transition-all duration-300"></span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "details" && (
          <div className="bg-white p-8 rounded-lg shadow-sm text-gray-700">
            <h2 className="text-xl font-semibold mb-3">My Details</h2>
            <p className="text-sm text-gray-500">My Details Tab.</p>
          </div>
        )}

        {activeTab === "notifications" && <NotificationsSettings />}

        {activeTab === "password" && (
          <div className="bg-white p-8 rounded-lg shadow-sm text-gray-700">
            <h2 className="text-xl font-semibold mb-3">Password</h2>
            <p className="text-sm text-gray-500">Password Tab.</p>
          </div>
        )}

        {activeTab === "plan" && <PlanSettings />}
      </div>
    </div>
  );
}
