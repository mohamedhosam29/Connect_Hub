import { createSlice } from "@reduxjs/toolkit";

const getSavedNotifications = () => {
  const saved = localStorage.getItem("notifications");
  return saved ? JSON.parse(saved) : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem("notifications", JSON.stringify(notifications));
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: getSavedNotifications(),
    unreadCount: getSavedNotifications().filter((n) => !n.read).length,
    loading: false,
  },
  reducers: {
    addNotification: (state, action) => {
      const newNotification = {
        id: Date.now(),
        message: action.payload,
        read: false,
        createdAt: new Date().toLocaleString(),
      };
      state.notifications.unshift(newNotification);
      state.unreadCount += 1;
      saveNotifications(state.notifications);
    },
    markAllRead: (state) => {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      state.unreadCount = 0;
      saveNotifications(state.notifications);
    },
  },
});

export const { addNotification, markAllRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;