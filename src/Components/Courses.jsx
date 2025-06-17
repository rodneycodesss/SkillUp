import React, { useState, useRef } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { Search, Clock, Star, PlayCircle, Code, Briefcase, DollarSign } from 'lucide-react';
import { useAppContext } from '/context/AppContext';

export default function Courses() {
  const { darkMode, courses, setSelectedCourse, setCurrentPage } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const gridRef = useRef();

  const categories = ['All', 'Tech', 'Hustles', 'Personal Finance'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Responsive columns
  const getColumnCount = () => {
    if (window.innerWidth < 640) return 1; // mobile
    if (window.innerWidth < 1024) return 2; // tablet
    return 3; // desktop
  };

  const [columnCount, setColumnCount] = useState(getColumnCount());

  React.useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rowCount = Math.ceil(filteredCourses.length / columnCount);
  const columnWidth = window.innerWidth < 640 ? window.innerWidth - 32 : 340; // px
  const rowHeight = 260; // px

  const Cell = ({ columnIndex, rowIndex, style }) => {
    const idx = rowIndex * columnCount + columnIndex;
    if (idx >= filteredCourses.length) return null;
    const course = filteredCourses[idx];
    return (
      <div
        style={style}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer m-2`}
        onClick={() => {
          setSelectedCourse(course);
          setCurrentPage('lesson');
        }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            {course.category === 'Tech' && <Code size={20} className="text-blue-500" />}
            {course.category === 'Hustles' && <Briefcase size={20} className="text-green-500" />}
            {course.category === 'Personal Finance' && <DollarSign size={20} className="text-yellow-500" />}
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{course.category}</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">{course.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{course.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400" />
                <span>{course.rating || 'N/A'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <PlayCircle size={16} />
              <span>{course.lessonsCount || 0} lessons</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${course.progress || 0}%` }}
            ></div>
          </div>
          <div className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
            {course.progress || 0}% completed
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Explore Courses</h2>
        <p className="text-gray-600 dark:text-gray-400">Discover bite-sized lessons to boost your skills</p>
      </div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : `${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'} hover:bg-gray-100 dark:hover:bg-gray-700`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Virtualized Course Grid */}
      <div style={{ width: '100%', height: rowCount === 0 ? 100 : Math.min(rowCount * rowHeight, 800) }}>
        {filteredCourses.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">
            No courses found.
          </div>
        ) : (
          <Grid
            ref={gridRef}
            columnCount={columnCount}
            columnWidth={columnWidth}
            height={Math.min(rowCount * rowHeight, 800)}
            rowCount={rowCount}
            rowHeight={rowHeight}
            width={columnCount * columnWidth}
          >
            {Cell}
          </Grid>
        )}
      </div>
    </div>
  );
}