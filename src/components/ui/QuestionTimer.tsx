"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

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

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 30;

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md transition-all ${
        isWarning
          ? "border-red-500/50 bg-red-500/10 text-red-400 animate-pulse"
          : "border-white/10 bg-white/5 text-gray-300"
      }`}
    >
      <Clock className="w-4 h-4" />
      <span className="font-mono text-sm font-semibold">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}