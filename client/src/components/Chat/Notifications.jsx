import { useState } from "react";

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notifications = [
    { id: 1, text: "New message from John" },
    { id: 2, text: "New message from Jane" },
    { id: 3, text: "New message from Roji" },
  ];
  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          class="bi bi-bell-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
        </svg>
        <span className="notification-count">
          <span>{10}</span>
        </span>
      </div>
      {isOpen ? (
        <div className="notifications-box">
          <div className="notifications-header">
            <h3>Nofications</h3>
            <div className="mark-as-read">Mark as read</div>
          </div>
          {notifications.map((notification, index) => (
            <div key={index} className="notification">
              {notification.text}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Notifications;
