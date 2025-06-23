import React from 'react';
import { X, Target, BookOpen, Trophy, User, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../Context/Appcontext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { darkMode, sidebarOpen, setSidebarOpen, user } = useAppContext();
  const [collapsed, setCollapsed] = React.useState(false);
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Target },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleNavigation = (pageId) => {
    setSidebarOpen(false);
    navigate(`/${pageId}`);
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      <aside 
        className={`
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} 
          ${collapsed ? 'w-20' : 'w-64'} 
          h-screen shadow-lg fixed left-0 top-0 z-50 
          transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-all duration-300
          flex flex-col
        `}
      >
        {/* Header */}
        <div className={`p-4 border-b border-gray-200 dark:border-gray-700 flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="text-white" size={20} />
              </div>
              <h2 className="text-lg font-bold">SkillUp</h2>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap className="text-white" size={20} />
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleCollapse} 
              className="hidden md:flex items-center justify-center w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label={collapsed ? "Expand" : "Collapse"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="md:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 flex-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${collapsed ? 'justify-center' : ''}
                `}
              >
                <Icon size={20} />
                {!collapsed && item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {user ? (
            <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>
              {!collapsed && (
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className={`
                w-full flex items-center gap-3 p-3 rounded-lg
                bg-purple-500 text-white transition-colors 
                hover:bg-purple-600
                ${collapsed ? 'justify-center' : ''}
              `}
              aria-label={collapsed ? "Sign up" : undefined}
            >
              <User size={20} />
              {!collapsed && "Sign Up"}
            </button>
          )}
        </div>
        
        {/* Mobile collapse toggle */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center md:hidden">
          <button 
            onClick={toggleCollapse}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </aside>
    </>
  );
}