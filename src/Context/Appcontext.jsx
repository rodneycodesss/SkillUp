import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { sampleCourses } from '../Data/Sampledata';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(sampleCourses);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          ...firebaseUser,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email,
          xp: 0,
          streak: 0,
          completedCourses: 0,
          badges: ['Beginner', 'Fast Learner']
        });
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const markLessonComplete = (courseId, lessonId) => {
    setCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const updatedLessons = course.lessons.map(lesson =>
            lesson.id === lessonId ? { ...lesson, completed: true } : lesson
          );
          const completedCount = updatedLessons.filter(l => l.completed).length;
          const progress = Math.round((completedCount / updatedLessons.length) * 100);
          
          // Check if course is now completed
          const isCompleted = completedCount === updatedLessons.length;
          const newBadges = isCompleted ? ['Course Master'] : [];
          
          return { 
            ...course, 
            lessons: updatedLessons, 
            progress,
            completed: isCompleted
          };
        }
        return course;
      })
    );

    setUser(prev => {
      if (!prev) return null;
      
      const xp = prev.xp + 50;
      let badges = [...prev.badges];
      
      // Check for XP milestones
      if (xp >= 500 && !badges.includes('XP Master')) {
        badges.push('XP Master');
      }
      
      return { 
        ...prev, 
        xp,
        badges,
        completedCourses: prev.completedCourses + 1
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        darkMode,
        toggleDarkMode,
        courses,
        setCourses,
        selectedCourse,
        setSelectedCourse,
        selectedLesson,
        setSelectedLesson,
        sidebarOpen,
        setSidebarOpen,
        markLessonComplete
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);