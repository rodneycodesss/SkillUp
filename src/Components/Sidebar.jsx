import React from 'react';
import { X, Target, BookOpen, Trophy, User, Zap } from 'lucide-react';
import { useAppContext } from "../Context/Appcontext";

export default function Sidebar() {
  const { darkMode, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen } = useAppContext();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];
  
  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-64 h-screen shadow-lg fixed left-0 top-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
            <h2 className="text-lg font-bold">SkillUp</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden">
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                currentPage === item.id 
                  ? 'bg-purple-500 text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}