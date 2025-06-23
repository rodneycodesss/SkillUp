import React from 'react';
import { useAppContext } from "../Context/Appcontext";
import { Trophy, Star, Flame } from 'lucide-react';

export default function Progress() {
  const { user, courses, darkMode } = useAppContext();

  // Calculate overall course progress percentage
  const totalCourses = courses.length;
  const totalProgress = courses.reduce((sum, c) => sum + (c.progress || 0), 0);
  const progressPercent = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Your Progress</h2>
        <p className="text-gray-600 dark:text-gray-400">Track how far you’ve come!</p>
      </div>

      {/* Animated Circular Progress */}
      <div className="flex justify-center items-center">
        <div className="relative w-32 h-32">
          <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={darkMode ? "#374151" : "#e5e7eb"}
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="10"
              strokeDasharray="282.6"
              strokeDashoffset={282.6 - (progressPercent / 100) * 282.6}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1s ease-out",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {progressPercent}%
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-xl shadow-lg`}>
        <h3 className="text-lg font-semibold mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <Trophy className="text-purple-500" size={20} />
            <span>{user.completedCourses || 0} courses completed</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="text-orange-500" size={20} />
            <span>{user.streak || 0} day streak</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-400" size={20} />
            <span>{user.xp || 0} XP earned</span>
          </div>
        </div>
      </div>
    </div>
  );
}
 