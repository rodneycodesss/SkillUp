import React from 'react';
import { AppProvider } from '/context/AppContext';
import Header from '/components/Header';
import Sidebar from '/components/Sidebar';
import Dashboard from '/components/Dashboard';
import Courses from '/components/Courses';
import Lesson from '/components/Lesson';
import Progress from '/components/Progress';
import Profile from '/components/Profile';
import { useAppContext } from '/context/AppContext';

function AppContent() {
  const { darkMode, currentPage } = useAppContext();
  
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <Courses />;
      case 'lesson':
        return <Lesson />;
      case 'progress':
        return <Progress />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };
  
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}