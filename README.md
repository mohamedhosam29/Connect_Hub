# ConnectHub

ConnectHub is a Single Page Application (SPA) that simulates the core functionality of a social media platform. Users can register, log in, create posts, like and comment on content, follow other users, search for people, browse an integrated quotes feature, and receive notifications — all built as a frontend-only React application.

## Tech Stack

- **React** (functional components + hooks)
- **React Router** — client-side routing and protected routes
- **Redux Toolkit** — global state management
- **Axios** — HTTP requests, centralized instance with interceptors
- **React Bootstrap** — select UI components
- **CSS** — custom stylesheet with light/dark theme support

## Features

- **Authentication** — register, login, logout, client-side validation (required fields, email format, password length, confirm password, duplicate email check)
- **Protected Routes** — pages requiring authentication redirect unauthenticated users to `/login`
- **News Feed** — posts with author avatar/username, content, image, timestamp, like count, comment count, like/comment/share/edit/delete actions
- **Create, Edit, Delete Posts** — with ownership checks (only the post's author can edit/delete)
- **Comments** — add, view, and delete your own comments on any post
- **Likes** — toggle like/unlike with live count updates
- **User Profiles** — avatar, username, follower/following counts, follow/unfollow, user's own posts
- **User Search** — debounced search by name
- **Notifications** — generated from real actions (likes, follows, comments), with an unread count badge
- **Quotes Page** — fetches and displays a random quote from an external API, with loading/error handling and a refresh button
- **Dark Mode** — app-wide theme toggle via React Context
- **Responsive Layout** — sidebar collapses on smaller screens

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, Sidebar, PostCard, Modal, etc.)
├── pages/            # Route-level page components
├── services/         # Axios instance and API service functions
├── slices/           # Redux Toolkit slices (auth, posts, comments, users, quotes, notifications)
├── app/              # Redux store configuration
├── hooks/             # Custom hooks (useAuth, useDebounce)
├── context/           # ThemeContext for dark/light mode
├── routes/            # ProtectedRoute component
├── App.js
├── App.css
└── index.js
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

You can log in immediately with:

- `mohamed@example.com` / `12345678`
- `hossam@example.com` / `87654321`

Or register a new account directly from the app.
