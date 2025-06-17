import React, { createContext, useContext, useState } from 'react';
import { sampleUser, sampleCourses } from '/Data/sampleData';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(sampleUser);
  const [courses, setCourses] = useState(sampleCourses);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const markLessonComplete = (courseId, lessonId) => {
    setCourses(prev => prev.map(course => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map(lesson => 
          lesson.id === lessonId ? { ...lesson, completed: true } : lesson
        );
        const completedCount = updatedLessons.filter(l => l.completed).length;
        const progress = (completedCount / updatedLessons.length) * 100;
        
        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    }));
    
    // Update user XP
    setUser(prev => ({ ...prev, xp: prev.xp + 50 }));
  };

  const value = {
    user,
    courses,
    darkMode,
    currentPage,
    selectedCourse,
    selectedLesson,
    sidebarOpen,
    setUser,
    setCourses,
    toggleDarkMode,
    setCurrentPage,
    setSelectedCourse,
    setSelectedLesson,
    setSidebarOpen,
    markLessonComplete
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}