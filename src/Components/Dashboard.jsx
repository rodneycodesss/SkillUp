import React from 'react';
import { Trophy, Target, Star, ArrowRight, Award, Code, Briefcase, DollarSign } from 'lucide-react';
import { useAppContext } from "../Context/Appcontext";

export default function Dashboard() {
  const { darkMode, user, courses, setCurrentPage, setSelectedCourse } = useAppContext();
  
  const recentCourses = courses.filter(c => c.progress > 0).slice(0, 3);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-gray-600 dark:text-gray-400">Ready to level up your skills today?</p>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Trophy className="text-purple-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{user.completedCourses}</p>
              <p className="text-gray-600 dark:text-gray-400">Courses Completed</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <Target className="text-orange-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{user.streak}</p>
              <p className="text-gray-600 dark:text-gray-400">Day Streak</p>
            </div>
          </div>
        </div>
        
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
              <Star className="text-yellow-500" size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{user.xp}</p>
              <p className="text-gray-600 dark:text-gray-400">XP Points</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Continue Learning */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Continue Learning</h3>
          <button onClick={() => setCurrentPage('courses')} className="text-purple-500 hover:text-purple-600 flex items-center gap-1">
            View All <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCourses.map(course => (
            <div key={course.id} className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow`} 
                 onClick={() => {
                   setSelectedCourse(course);
                   setCurrentPage('lesson');
                 }}>
              <div className="flex items-center gap-2 mb-2">
                {course.category === 'Tech' && <Code size={16} className="text-blue-500" />}
                {course.category === 'Hustles' && <Briefcase size={16} className="text-green-500" />}
                {course.category === 'Personal Finance' && <DollarSign size={16} className="text-yellow-500" />}
                <span className="text-sm text-gray-600 dark:text-gray-400">{course.category}</span>
              </div>
              <h4 className="font-medium mb-2">{course.title}</h4>
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                <span>{course.duration}</span>
                <span>{course.progress}% complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{width: `${course.progress}%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Badges */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Your Badges</h3>
        <div className="flex flex-wrap gap-3">
          {user.badges.map((badge, index) => (
            <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm">
              <Award size={16} />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}