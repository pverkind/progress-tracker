//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
//import { Button } from "@/components/ui/button";

const lessons = [
  "Introduction", "Printing", "Variables", "Loops", "Functions", "Lists",
  "Dictionaries", "Files", "Errors", "Modules", "OOP", "Final Project"
];

const avatars = [
  "🐱", "🐶", "🐰", "🐼", "🦊", "🐸", "🐷", "🐨"
];

export default function ProgressTracker() {
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    return localStorage.getItem("selectedAvatar") || avatars[0];
  });
  const [completedLessons, setCompletedLessons] = useState(() => {
    return JSON.parse(localStorage.getItem("completedLessons")) || [];
  });

  useEffect(() => {
    localStorage.setItem("selectedAvatar", selectedAvatar);
  }, [selectedAvatar]);

  useEffect(() => {
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons));
  }, [completedLessons]);

  const toggleLesson = (lesson) => {
    setCompletedLessons((prev) =>
      prev.includes(lesson)
        ? prev.filter((l) => l !== lesson)
        : [...prev, lesson]
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Python Lesson Tracker</h1>
      <div className="flex space-x-2 my-2">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            className={`text-2xl p-2 ${selectedAvatar === avatar ? "border border-black" : ""}`}
            onClick={() => setSelectedAvatar(avatar)}
          >
            {avatar}
          </button>
        ))}
      </div>
      <div className="flex space-x-4 overflow-auto p-4 bg-gray-100 rounded-lg">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson}
            className="flex flex-col items-center"
            animate={{ opacity: completedLessons.includes(lesson) ? 1 : 0.5 }}
          >
            <div
              className="text-4xl cursor-pointer"
              onClick={() => toggleLesson(lesson)}
            >
              {selectedAvatar}
            </div>
            <span className="text-sm">{lesson}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
