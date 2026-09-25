import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authslice";
import postsReducer from "../slices/postslice";
import commentsReducer from "../slices/commentslice";
import quotesReducer from "../slices/quoteslice";
import usersReducer from "../slices/userslice";
import notificationsReducer from "../slices/notificationslice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    comments: commentsReducer,
    quotes: quotesReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
});