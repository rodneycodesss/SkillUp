import React from "react";
import { AppProvider } from "./Context/Appcontext";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import SkillUpAuth from './Components/Login';
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Courses from "./Components/Courses";
import Lesson from "./Components/Lesson";
import Progress from "./Components/Progress";
import Profile from "./Components/Profile";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<SkillUpAuth />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/courses" element={<Layout><Courses /></Layout>} />
          <Route path="/lesson" element={<Layout><Lesson /></Layout>} />
          <Route path="/progress" element={<Layout><Progress /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<Layout><div className="text-center text-red-500 mt-10">404 - Page Not Found</div></Layout>} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}
