
import {
  useGetNotifications,
  useMarkAsRead,
} from '@/services/hooks/useNotifications';

const Notification = () => {
  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useGetNotifications();
  const { mutate: readNotification } = useMarkAsRead();

  if (isError) {
    console.log('Error while fetching', error);
  }

  if (isLoading) return <p className="p-2 text-center text-xl">Loading...</p>;

  return (
    <div className="h-full w-full overflow-y-auto p-4">
      <h2 className="text-center text-xl">Notifications</h2>

      {notifications?.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications?.map((notify: any) => (
          <div
            key={notify.id}
            className={`mb-3 rounded-lg border p-3 ${
              notify.read ? 'bg-gray-100' : 'bg-blue-500'
            }`}
          >
            <div>
              <p className="font-medium">{notify.title}</p>
              <p className="text-center text-sm">{notify.message}</p>
            </div>

            {!notify.read && (
              <button
                className="text-blue-600 hover:underline"
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
};

export default Notification;
