# Oz - Firebase Authentication App

A simple React.js application for user authentication using Firebase Authentication & Firestore.This project is part of the Frontend Developer Assessment.

## Features
✔️ User Authentication (Signup/Login via Firebase REST API)\
✔️ Secure Token Handling (Firebase manages authentication state)\
✔️ Password Reset (Request email-based password reset)\
✔️ Profile Management (Edit profile, change name, and email)\
✔️ User Login Tracking (Firestore logs login times)\
✔️ State Management (React hooks for local state)\
✔️ Persistent Authentication (Users stay logged in across sessions)\
✔️ Responsive UI (Using SCSS for styling)\
✔️ Protected Routes (Only authenticated users access certain pages)

## Tech Stack
- React.js (Frontend)
- React Router (Navigation & Protected Routes)
- Firebase Authentication (User management)
- Firestore Database (User data storage & login tracking)
- SCSS (Styling)
- Lucide-React (Icons)
- Date-FNS (Date formatting)
- GitHub Actions (Version control)

## Folder Structure
oz-reactjs/ \
│── src/ \
│   ├── assets/               # Static images, fonts, and styles\
│   ├── components/           # Reusable UI components\
│   ├── pages/                # Main views (Login, Dashboard, Profile)\
│   ├── firebase/             # Firebase config file\
│   ├── styles/               # SCSS global styles & mixins\
│   ├── App.js                # Main React component\
│   ├── index.js              # Entry point\
│── public/                   # Static public assets\
│── .gitignore                # Ignoring sensitive files\
│── package.json              # Dependencies\
│── README.md                 # Project Documentation

## Getting Started

### 1. Clone the Repository

#### `git clone https://github.com/ChrisHelloWord/oz-reactjs.git`
#### `cd oz-reactjs`

### 2. Install Dependencies

#### `npm install`

### 3. Setup Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project and enable Authentication (Email/Password)
3. Enable Cloud Firestore (Database)
4. Create a .env.local file and add:

`REACT_APP_FIREBASE_API_KEY=your_api_key`\
`REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain`\
`REACT_APP_FIREBASE_PROJECT_ID=your_project_id`\
`REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket`\
`REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id`\
`REACT_APP_FIREBASE_APP_ID=your_app_id`

5. Run the App

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Architectural Decisions

### 1. Component-Based Structure

- The project follows a modular architecture with reusable components (e.g., `NotificationBar`, `Profile`, `Dashboard`).
- Pages are structured under /pages/ for clarity.

### 2. Firebase Authentication

- Firebase Authentication handles user login/signup and session persistence.
- Firestore stores user profile info (`name`, `email`, `createdAt`).
- A separate collection (`user_logs`****) tracks login history.

### 3. Protected Routes

- Used `PrivateRoute.js` to ensure only authenticated users can access `/dashboard` & `/profile`.
- If a user is not logged in, they get redirected to Login.

### 4. UI / UX Enhancements

- Loading states (`isLoading` added to buttons)
- Error messages and form validation
- Animated elements for better UX
- Tooltips on icons for better accessibility
- Global SCSS mixins for a responsive and consistent design

## Deployment

### 1. Build the App

Before deploying, run:
#### `npm run build`

### 2. Deploy to Firebase Hosting

`firebase login`\
`firebase init`\
`firebase deploy`

## To-Do / Improvements
- Implement Redux for centralized state management
- Improve unit testing coverage
- Enhance UI animations & dark mode toggle

## Thank you!
If you have any questions, feel free to reach out! 🎉