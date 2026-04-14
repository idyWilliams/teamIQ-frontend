'use client';

import React from 'react';
import { Bell, X } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function UserNotification() {
  const { user } = useAuthStore();

  // Example mock data notifications for user
  const notifications = [
    {
      id: 1,
      type: 'project',
      message: 'Your task "Landing Page Design" was approved',
      time: '2 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'team',
      message: 'John invited you to join "Marketing Campaign"',
      time: '1 hour ago',
      read: false,
    },
    {
      id: 3,
      type: 'system',
      message: 'Your subscription will renew in 3 days',
      time: 'Yesterday',
      read: true,
    },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-iq-500" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        <button 
          onClick={() => window.dispatchEvent(new Event('closeNotification'))}
          className="rounded-full p-1 hover:bg-gray-100"
        >
          <X size={20} />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-gray-500">
            No new notifications
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`rounded-lg border p-4 transition-all ${
                notif.read ? 'bg-white' : 'bg-iq-500/5 border-iq-500/20'
              }`}
            >
              <p className="text-sm text-neutral-800">{notif.message}</p>
              <p className="mt-2 text-xs text-gray-500">{notif.time}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4 text-center">
        <button className="text-sm text-iq-500 hover:underline">
          Mark all as read
        </button>
      </div>
    </div>
  );
}