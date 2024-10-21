import { useNotification } from "../NotificationContext";

const Notification = () => {
  const { notification } = useNotification();

  console.log('Notification:', notification);  // Log the notification state

  const style = {
    border: 'solid 1px red',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  if (!notification.visible) return null;  // Don't render if notification is hidden

  return (
    <div style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;

