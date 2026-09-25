import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { markAllRead } from "../slices/notificationslice";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(markAllRead());
  }, [dispatch]);

  return (
    <div className="page-container">
      <h2>Notifications</h2>

      {notifications.length === 0 && <p className="empty-text">No notifications yet.</p>}

      {notifications.map((n) => (
        <div key={n.id} className="card">
          <p style={{ margin: 0 }}>{n.message}</p>
          <small style={{ color: "#888" }}>{n.createdAt}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;