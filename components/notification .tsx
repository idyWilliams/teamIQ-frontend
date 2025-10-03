"use client";

import { useState } from 'react';

interface NotificationSettings {
  pushNewTask: boolean;
  pushNewEvent: boolean;
  pushNewTeam: boolean;
  emailTeamUpdates: boolean;
  emailProjectUpdates: boolean;
  emailDailySummaries: boolean;
  inAppDailySummaries: boolean;
}

export default function NotificationsSettings() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    pushNewTask: true,
    pushNewEvent: false,
    pushNewTeam: false,
    emailTeamUpdates: true,
    emailProjectUpdates: true,
    emailDailySummaries: true,
    inAppDailySummaries: false,
  });

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8">

        {/* Title */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Notification Settings
          </h1>
          <p className="text-sm text-gray-500">
            Select the notifications to get about your activities
          </p>
        </div>

        {/* Push Notifications */}
        <div className="mb-8 pb-8 border-b border-gray-200 flex justify-between items-start">
          {/* Left side */}
          <div className="mb-6">
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              Push Notifications
            </h2>
            <p className="text-sm text-gray-500">Notify me when...</p>
          </div>

          {/* Right side - checkboxes in front */}
          <div className="flex flex-col gap-4 w-[572px]">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNewTask}
                onChange={() => toggleNotification('pushNewTask')}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">New task allocation</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNewEvent}
                onChange={() => toggleNotification('pushNewEvent')}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">New event created</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.pushNewTeam}
                onChange={() => toggleNotification('pushNewTeam')}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Added to a new team</span>
            </label>
          </div>
        </div>

        {/* Email Notifications */}
        <div className="mb-8 pb-8 border-b border-gray-200 flex justify-between items-start">
          <div className="mb-6 w-[420px] h-[48px] opacity-100 gap-2">
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              Email Notifications
            </h2>
            <p className="text-sm text-gray-500">
              Get notifications from your organization when you are not online
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* Team Updates */}
            <div className="flex items-center justify-between w-[572px] h-[44px] opacity-100 gap-[110px]">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Team Updates</h3>
                <p className="text-sm text-gray-500">
                  Receive notifications for messages or mentions in team discussions.
                </p>
              </div>
              <button
                onClick={() => toggleNotification('emailTeamUpdates')}
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  notifications.emailTeamUpdates ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    notifications.emailTeamUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Project Updates */}
            <div className="flex items-center justify-between w-[572px] h-[44px] opacity-100 gap-[110px]">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Project Updates</h3>
                <p className="text-sm text-gray-500">
                  Receive notifications for messages on project updates.
                </p>
              </div>
              <button
                onClick={() => toggleNotification('emailProjectUpdates')}
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  notifications.emailProjectUpdates ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    notifications.emailProjectUpdates ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Daily Summaries */}
            <div className="flex items-center justify-between w-[572px] h-[44px] opacity-100 gap-[110px]">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Daily Summaries</h3>
                <p className="text-sm text-gray-500">
                  Receive summaries for project progress and daily activities.
                </p>
              </div>
              <button
                onClick={() => toggleNotification('emailDailySummaries')}
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  notifications.emailDailySummaries ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    notifications.emailDailySummaries ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="mb-8 pb-8 border-b border-gray-200 flex justify-between items-start">
          <div className="mb-6 max-w-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              In-App Notifications
            </h2>
            <p className="text-sm text-gray-500">
              Customize alerts for immediate updates
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between w-[572px] h-[44px] opacity-100 gap-[110px]">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">Daily Summaries</h3>
                <p className="text-sm text-gray-500">
                  Receive summaries for project progress and daily activities.
                </p>
              </div>
              <button
                onClick={() => toggleNotification('inAppDailySummaries')}
                className={`relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out ${
                  notifications.inAppDailySummaries ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                    notifications.inAppDailySummaries ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
