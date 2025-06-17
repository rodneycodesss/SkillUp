import React from 'react';
import { Menu, Moon, Sun, Target, Star, Zap, User } from 'lucide-react';
import { useAppContext } from '/context/AppContext';

export default function Header() {
  const { darkMode, toggleDarkMode, setSidebarOpen, user } = useAppContext();
  
  return (
    <header className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Zap className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-bold">SkillUp</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Target size={16} className="text-orange-500" />
            <span>{user.streak} day streak</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500" />
            <span>{user.xp} XP</span>
          </div>
        </div>
        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="text-white" size={16} />
        </div>
      </div>
    </header>
  );
}