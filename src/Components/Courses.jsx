import React, { useState, useEffect } from 'react';
import { useAppContext } from '../Context/Appcontext';
import {
  Search,
  Clock,
  Star,
  PlayCircle,
  Code,
  Briefcase,
  DollarSign
} from 'lucide-react';

export default function Courses() {
  const { darkMode, courses, setSelectedCourse, setCurrentPage } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'Tech', 'Hustles', 'Personal Finance'];

  const filteredCourses = courses.filter(course => {
    const matchCategory = category === 'All' || course.category === category;
    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Explore Courses</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and start learning today.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute top-3 left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm ${
              darkMode
                ? 'bg-gray-800 text-white border-gray-600'
                : 'bg-white border-gray-300 text-gray-800'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition ${
                category === cat
                  ? 'bg-purple-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
            No courses found.
          </div>
        ) : (
          filteredCourses.map(course => (
            <div
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setCurrentPage('lesson');
              }}
              className={`cursor-pointer rounded-xl p-5 shadow hover:shadow-xl transition ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-2 text-sm mb-2">
                {course.category === 'Tech' && <Code size={18} className="text-blue-500" />}
                {course.category === 'Hustles' && <Briefcase size={18} className="text-green-500" />}
                {course.category === 'Personal Finance' && <DollarSign size={18} className="text-yellow-500" />}
                <span className="text-gray-500 dark:text-gray-300">{course.category}</span>
              </div>

              <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-300 mb-2">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {course.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400" /> {course.rating || 'N/A'}
                </span>
                <span className="flex items-center gap-1">
                  <PlayCircle size={14} /> {course.lessonsCount || 0} lessons
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress || 0}%` }}
                ></div>
              </div>

              <div className="text-xs text-right text-gray-400 mt-1">
                {course.progress || 0}% complete
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
