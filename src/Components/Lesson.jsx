import React, { useState, useEffect } from 'react';
import { useAppContext } from "../Context/Appcontext";
import { ArrowLeft, Download, CheckCircle } from 'lucide-react';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export default function Lesson() {
  const {
    selectedCourse,
    currentLessonIndex = 0,
    setCurrentLessonIndex,
    setCurrentPage,
    markLessonComplete,
    darkMode,
  } = useAppContext();

  const [completed, setCompleted] = useState(false);
  const [note, setNote] = useState(null);
  const [loadingNote, setLoadingNote] = useState(false);

  useEffect(() => {
    if (!selectedCourse) return;
    setLoadingNote(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${currentLessonIndex + 1}`)
      .then(res => res.json())
      .then(data => {
        setNote(data);
        setLoadingNote(false);
      })
      .catch(() => setLoadingNote(false));
  }, [selectedCourse, currentLessonIndex]);

  if (!selectedCourse) {
    return (
      <div className="p-8 text-center">
        <p>No course selected.</p>
        <button
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
          onClick={() => setCurrentPage('courses')}
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const lessons = selectedCourse.lessons || [];
  const lesson = lessons[currentLessonIndex] || lessons[0] || {};

  const handleComplete = () => {
    setCompleted(true);
    markLessonComplete(selectedCourse.id, lesson.id);
  };

  const handlePrev = () => {
    if (currentLessonIndex > 0) setCurrentLessonIndex(currentLessonIndex - 1);
  };

  const handleNext = () => {
    if (currentLessonIndex < lessons.length - 1) setCurrentLessonIndex(currentLessonIndex + 1);
  };

  const ytEmbedUrl = getYouTubeEmbedUrl(lesson.videoUrl);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <button
        className="flex items-center gap-2 text-purple-600 hover:underline mb-2"
        onClick={() => setCurrentPage('courses')}
      >
        <ArrowLeft size={18} /> Back to Courses
      </button>

      <div className={`rounded-xl shadow p-6 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="text-xl font-bold">{lesson.title || 'Lesson'}</h2>

        {/* Video */}
        {ytEmbedUrl ? (
          <div className="w-full aspect-video mb-4 rounded-lg overflow-hidden bg-black">
            <iframe
              src={ytEmbedUrl}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-lg mb-4">
            <span className="text-gray-500">No video available</span>
          </div>
        )}

        {/* Transcript */}
        {lesson.transcript && (
          <div>
            <h3 className="font-semibold mb-1">Transcript</h3>
            <div className="bg-gray-100 dark:bg-gray-900 rounded p-3 text-sm whitespace-pre-line max-h-48 overflow-y-auto">
              {lesson.transcript}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="mt-2">
          <h3 className="font-semibold mb-1">Downloadable Notes</h3>
          {loadingNote ? (
            <span className="text-gray-500">Loading notes...</span>
          ) : note ? (
            <a
              href={`data:text/plain;charset=utf-8,${encodeURIComponent(note.body)}`}
              download={`lesson-${currentLessonIndex + 1}-notes.txt`}
              className="inline-flex items-center gap-2 text-purple-600 hover:underline"
            >
              <Download size={16} /> Download Notes
            </a>
          ) : (
            <span className="text-gray-500">No notes available.</span>
          )}
        </div>

        {/* Completion Button */}
        <button
          className={`mt-4 px-4 py-2 rounded flex items-center gap-2 ${
            completed
              ? 'bg-green-500 text-white cursor-default'
              : 'bg-purple-500 text-white hover:bg-purple-600'
          }`}
          onClick={completed ? undefined : handleComplete}
          disabled={completed}
        >
          <CheckCircle size={18} />
          {completed ? 'Completed' : 'Mark as Complete'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
          onClick={handlePrev}
          disabled={currentLessonIndex === 0}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded bg-purple-500 text-white disabled:opacity-50"
          onClick={handleNext}
          disabled={currentLessonIndex === lessons.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
