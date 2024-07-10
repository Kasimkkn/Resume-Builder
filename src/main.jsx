// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home/index.jsx';
import Dashboard from './pages/dashboard/index.jsx';
import EditResume from './pages/dashboard/resume/[resumeId]/edit/index.jsx';
import ViewResume from './pages/my-resume/[resumeId]/view/index.jsx';
import SignUpPage from './auth/sign-up/index.jsx';
import LoginPage from './auth/sign-in/index.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import AuthRoute from './components/AuthRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    element: <App />,
    children: [
      {
        path: '/dashboard',
        element: (
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        )
      },
      {
        path: '/dashboard/resume/:resumeId/edit',
        element: (
          <AuthRoute>
            <EditResume />
          </AuthRoute>
        )
      },
    ]
  },
  {
    path: '/auth/sign-in',
    element: <LoginPage />
  },
  {
    path: '/auth/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/my-resume/:resumeId/view',
    element: <ViewResume />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
