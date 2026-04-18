'use client';

import React, { useState } from 'react';
import { useGetNotifications, useMarkAsRead } from '@/services/hooks/useNotifications';

const RightSideBar = () => {
  const { data: notifications, isLoading } = useGetNotifications();
  const { mutate: readNotification } = useMarkAsRead();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (isLoading)
    return <p className="p-2 text-center text-xl">Loading...</p>;

  const content = (
    <div className="flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
      {notifications?.length === 0 ? (
        <p className="text-center text-gray-500">No notifications yet</p>
      ) : (
        notifications.map((notify: any) => (
          <div
            key={notify.id}
            className={`rounded-lg border p-3 ${
              notify.read ? 'bg-gray-100' : 'bg-blue-500 text-white'
            }`}
          >
            <p className="font-medium">{notify.title}</p>
            <p className="text-sm">{notify.message}</p>

            {!notify.read && (
              <button
                className={`mt-2 underline text-sm ${
                  notify.read ? 'text-blue-600' : 'text-white'
                } hover:text-gray-200`}
                onClick={() => readNotification(notify.id)}
              >
                Mark as read
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="fixed bottom-4 right-4 z-50 md:hidden bg-blue-500 text-white p-3 rounded-full shadow-lg"
        onClick={() => setIsMobileOpen(true)}
      >
        Notifications
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-full rounded-md border p-4 bg-white">
        <h2 className="text-center text-xl mb-4">Notifications</h2>
        {content}
      </aside>

      {/* Mobile Slide-in Sidebar */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-[80%] max-w-sm h-full bg-white p-4 rounded-l-xl shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <button
                className="text-gray-500 text-xl font-bold"
                onClick={() => setIsMobileOpen(false)}
              >
                ×
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default RightSideBar;