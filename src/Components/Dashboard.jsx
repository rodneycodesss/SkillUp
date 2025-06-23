import React from 'react';
import {
  Trophy,
  Target,
  Star,
  ArrowRight,
  Award,
  Code,
  Briefcase,
  DollarSign,
} from 'lucide-react';
import { useAppContext } from '../Context/Appcontext';

export default function Dashboard() {
  const {
    darkMode = false,
    user,
    courses,
    setCurrentPage,
    setSelectedCourse,
  } = useAppContext();

  // Safe defaults
  const safeUser = {
    name: user?.name || 'Learner',
    completedCourses: user?.completedCourses || 0,
    xp: user?.xp || 0,
    badges: user?.badges || [],
    streak: user?.streak || 0,
  };

  const safeCourses = Array.isArray(courses) ? courses : [];
  const recentCourses = safeCourses.filter(c => c.progress > 0).slice(0, 3);

  const StatCard = ({ icon, title, value, color }) => {
    const bgColors = {
      purple: 'bg-purple-100 dark:bg-purple-900',
      orange: 'bg-orange-100 dark:bg-orange-900',
      yellow: 'bg-yellow-100 dark:bg-yellow-900',
    };

    return (
      <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${bgColors[color]} rounded-lg flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-600 dark:text-gray-400">{title}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 text-gray-900 dark:text-white bg-white dark:bg-gray-900 min-h-screen">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold">Welcome back, {safeUser.name.split(' ')[0]}!</h2>
        <p className="text-gray-600 dark:text-gray-400">Ready to level up your skills today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<Trophy className="text-purple-500" size={24} />} title="Courses Completed" value={safeUser.completedCourses} color="purple" />
        <StatCard icon={<Target className="text-orange-500" size={24} />} title="Day Streak" value={safeUser.streak} color="orange" />
        <StatCard icon={<Star className="text-yellow-500" size={24} />} title="XP Points" value={safeUser.xp} color="yellow" />
      </div>

      {/* Continue Learning */}
      <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Continue Learning</h3>
          <button
            onClick={() => setCurrentPage?.('Courses')}
            className="text-purple-500 hover:text-purple-600 flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentCourses.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 col-span-full">
              No active courses yet. Start one today!
            </p>
          ) : (
            recentCourses.map(course => (
              <div
                key={course.id || course.title}
                className="p-4 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedCourse?.(course);
                  setCurrentPage?.('Lesson');
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  {course.category === 'Tech' && <Code size={16} className="text-blue-500" />}
                  {course.category === 'Hustles' && <Briefcase size={16} className="text-green-500" />}
                  {course.category === 'Personal Finance' && <DollarSign size={16} className="text-yellow-500" />}
                  <span className="text-sm text-gray-600 dark:text-gray-400">{course.category}</span>
                </div>
                <h4 className="font-medium mb-2">{course.title}</h4>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{course.duration} min</span>
                  <span>{course.progress}% complete</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full transition-all duration-300" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Badges */}
      <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Your Badges</h3>
        <div className="flex flex-wrap gap-3">
          {safeUser.badges.length > 0 ? (
            safeUser.badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm">
                <Award size={16} />
                {badge}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">No badges yet. Complete courses to earn some!</p>
          )}
        </div>
      </div>
    </div>
  );
}


