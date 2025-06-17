import React from 'react';
import { useAppContext } from '/context/AppContext';
import { Award, Flame, CheckCircle } from 'lucide-react';

export default function Progress() {
  const { user, courses, darkMode, streak, xp } = useAppContext();

  // Calculate completed courses and progress
  const completedCourses = courses.filter(c => c.progress === 100);
  const totalCourses = courses.length;
  const progressPercent = totalCourses
    ? Math.round((completedCourses.length / totalCourses) * 100)
    : 0;

  // Example badges (replace with your logic)
  const badges = [
    { name: 'First Steps', earned: completedCourses.length > 0 },
    { name: 'Streak Starter', earned: streak >= 3 },
    { name: 'XP Champ', earned: xp >= 100 },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-2">Your Progress</h2>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
            {progressPercent}% Complete
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {completedCourses.length} of {totalCourses} courses
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-purple-500 h-3 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Daily Streak */}
      <div className="flex items-center gap-3 bg-orange-100 dark:bg-orange-900 rounded-lg p-4">
        <Flame size={28} className="text-orange-500" />
        <div>
          <div className="font-semibold text-orange-700 dark:text-orange-300">
            {streak} day streak
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Keep learning daily to grow your streak!
          </div>
        </div>
      </div>

      {/* XP Points */}
      <div className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
        <Award size={28} className="text-blue-500" />
        <div>
          <div className="font-semibold text-blue-700 dark:text-blue-300">
            {xp} XP Points
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Earn XP by completing lessons and quizzes.
          </div>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="font-semibold mb-2">Badges</h3>
        <div className="flex gap-4 flex-wrap">
          {badges.map(badge => (
            <div
              key={badge.name}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                badge.earned
                  ? 'bg-green-100 dark:bg-green-900 border-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60'
              }`}
            >
              <CheckCircle
                size={18}
                className={badge.earned ? 'text-green-500' : 'text-gray-400'}
              />
              <span className="text-sm">{badge.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed Courses List */}
      <div>
        <h3 className="font-semibold mb-2">Completed Courses</h3>
        {completedCourses.length === 0 ? (
          <div className="text-gray-500 dark:text-gray-400">No courses completed yet.</div>
        ) : (
          <ul className="list-disc ml-6 space-y-1">
            {completedCourses.map(course => (
              <li key={course.id} className="text-gray-700 dark:text-gray-200">
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}