import React from "react";
import { AppProvider } from "./Context/Appcontext";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard";
import Courses from "./Components/Courses";
import Lesson from "./Components/Lesson";
import Progress from "./Components/Progress";
import Profile from "./Components/Profile";
import { useAppContext } from "./Context/Appcontext";

function AppContent() {
  const { darkMode, currentPage } = useAppContext();

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "courses":
        return <Courses />;
      case "lesson":
        return <Lesson />;
      case "progress":
        return <Progress />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 md:ml-64 p-6">{renderPage()}</main>
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