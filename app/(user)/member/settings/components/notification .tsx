'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

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
      [key]: !prev[key],
    }));
  };

  return (
    <div className="w-full pb-10">
      <div className="bg-white">
        {/* Title */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900">
            Notification Settings
          </h1>
          <p className="text-sm text-gray-500">
            Select the notifications you want to receive about your activities.
          </p>
        </div>

        {/* Push Notifications */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-8 sm:flex-row">
          <div>
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Push Notifications
            </h2>
            <p className="text-sm text-gray-500">Notify me when...</p>
          </div>

          <div className="flex w-[572px] flex-col gap-4">
            {[
              { key: 'pushNewTask', label: 'New tasks allocation' },
              { key: 'pushNewEvent', label: 'New event created' },
              { key: 'pushNewTeam', label: 'Added to a new team' },
            ].map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 text-sm text-gray-700"
              >
                {/* Checkbox BEFORE label */}
                <div className="relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={notifications[key as keyof NotificationSettings]}
                    onChange={() =>
                      toggleNotification(key as keyof NotificationSettings)
                    }
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all duration-200 checked:border-black checked:bg-white"
                  />
                  {/* Vector Tick */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 14 10"
                    className="absolute opacity-0 transition-opacity duration-200 peer-checked:opacity-100"
                    style={{
                      width: '9px',
                      height: '6px',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <path
                      d="M1 5L5 9L13 1"
                      stroke="#2563EB"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Email Notifications */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-8 sm:flex-row">
          <div className="max-w-sm">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              Email Notifications
            </h2>
            <p className="text-sm text-gray-500">
              Get updates from your organization even when you’re offline.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:w-[572px]">
            {[
              {
                key: 'emailTeamUpdates',
                title: 'Team Updates',
                desc: 'Receive notifications for team discussions and mentions.',
              },
              {
                key: 'emailProjectUpdates',
                title: 'Project Updates',
                desc: 'Receive notifications for project messages and progress.',
              },
              {
                key: 'emailDailySummaries',
                title: 'Daily Summaries',
                desc: 'Receive a summary of daily progress and updates.',
              },
            ].map(({ key, title, desc }) => (
              <div
                key={key}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-900">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-500">{desc}</p>
                </div>
                <Switch
                  checked={notifications[key as keyof NotificationSettings]}
                  onCheckedChange={() =>
                    toggleNotification(key as keyof NotificationSettings)
                  }
                  className="data-[state=checked]:bg-blue-600"
                />
              </div>
            ))}
          </div>
        </div>

        {/* In-App Notifications */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="max-w-sm">
            <h2 className="mb-1 text-base font-semibold text-gray-900">
              In-App Notifications
            </h2>
            <p className="text-sm text-gray-500">
              Control alerts and reminders inside the app.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:w-[572px]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-900">
                  Daily Summaries
                </h3>
                <p className="text-sm text-gray-500">
                  Receive in-app updates on project and team progress.
                </p>
              </div>
              <Switch
                checked={notifications.inAppDailySummaries}
                onCheckedChange={() =>
                  toggleNotification('inAppDailySummaries')
                }
                className="data-[state=checked]:bg-blue-600"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
