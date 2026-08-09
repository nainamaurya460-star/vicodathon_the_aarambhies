


"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";
import React from "react";

"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";


interface QuestionTimerProps {
  timeLeft: number; // Time in seconds
}

export const QuestionTimer = ({ timeLeft }: QuestionTimerProps) => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");




  // 1. Countdown logic (Seperated from triggering callbacks)
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  // 2. Safe TimeUp Trigger (Wrapped in Microtask/Timeout to prevent React Render Phase Conflict)
  useEffect(() => {
    if (timeLeft === 0 && onTimeUp) {
      const timeout = setTimeout(() => {
        onTimeUp();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 30 && timeLeft > 0;
  const isTimeUp = timeLeft === 0;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all ${
        isTimeUp
          ? "border-red-600 bg-red-950/80 text-red-300 animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          : isWarning
          ? "border-red-500/50 bg-red-500/10 text-red-400 animate-pulse"
          : "border-purple-500/20 bg-purple-500/5 text-purple-200"
      }`}
    >
      {isTimeUp ? (
        <AlertCircle className="w-4 h-4 text-red-400 animate-spin" />
      ) : (
        <Clock className="w-4 h-4" />
      )}

      <span className="font-mono text-sm font-semibold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}

  // Warning state jab 15 seconds se kam time bacha ho
  const isWarning = timeLeft <= 15;

  return (
    <div className="w-full max-w-xs mx-auto my-3 p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm shadow-xl flex flex-col items-center justify-center transition-all">
      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mb-1">
        Time Remaining
      </span>
      <span
        className={`text-3xl md:text-4xl font-extrabold tracking-wider transition-colors duration-300 ${
          isWarning ? "text-red-500 animate-pulse" : "text-cyan-400"
        }`}
      >
        {minutes}:{seconds}

  // 1. Countdown logic (Seperated from triggering callbacks)
  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  // 2. Safe TimeUp Trigger (Wrapped in Microtask/Timeout to prevent React Render Phase Conflict)
  useEffect(() => {
    if (timeLeft === 0 && onTimeUp) {
      const timeout = setTimeout(() => {
        onTimeUp();
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 30 && timeLeft > 0;
  const isTimeUp = timeLeft === 0;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all ${
        isTimeUp
          ? "border-red-600 bg-red-950/80 text-red-300 animate-bounce shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          : isWarning
          ? "border-red-500/50 bg-red-500/10 text-red-400 animate-pulse"
          : "border-purple-500/20 bg-purple-500/5 text-purple-200"
      }`}
    >
      {isTimeUp ? (
        <AlertCircle className="w-4 h-4 text-red-400 animate-spin" />
      ) : (
        <Clock className="w-4 h-4" />
      )}

      <span className="font-mono text-sm font-semibold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}

      </span>

      {/* Visual Time's Up Indicator */}
      {isTimeUp && (
        <span className="text-xs font-sans font-bold text-red-300 ml-1 border-l border-red-500/40 pl-2">
          Time's Up! Submitting...
        </span>
      )}
    </div>
  );
};

export default QuestionTimer;