"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertCircle } from "lucide-react";

interface TimerProps {
  durationInSeconds?: number;
  onTimeUp?: () => void;
  isPaused?: boolean;
}

export default function QuestionTimer({
  durationInSeconds = 120,
  onTimeUp,
  isPaused = false,
}: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

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
}