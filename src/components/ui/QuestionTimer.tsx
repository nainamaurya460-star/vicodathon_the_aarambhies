"use client";

import React, { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface QuestionTimerProps {
  durationInSeconds?: number;
  onTimeUp?: () => void;
  keyTrigger?: string | number;
}

export default function QuestionTimer({
  durationInSeconds = 120,
  onTimeUp,
  keyTrigger,
}: QuestionTimerProps) {
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  const onTimeUpRef = useRef(onTimeUp);
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    setTimeLeft(durationInSeconds);
  }, [durationInSeconds, keyTrigger]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUpRef.current) {
        onTimeUpRef.current();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progressPercentage = (timeLeft / durationInSeconds) * 100;
  const strokeDashoffset = 100 - progressPercentage;

  const isLowTime = timeLeft <= 20;

  return (
    <div
      className={`relative flex items-center gap-3 px-3.5 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 ${
        isLowTime
          ? "bg-red-950/40 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.25)] animate-pulse"
          : "bg-slate-900/80 border-slate-800/80 shadow-lg hover:border-slate-700"
      }`}
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className={isLowTime ? "text-red-900/40" : "text-slate-800"}
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={`transition-all duration-500 ease-linear ${
              isLowTime ? "text-red-500" : "text-indigo-500"
            }`}
            strokeDasharray="100, 100"
            strokeDashoffset={strokeDashoffset}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          {isLowTime ? (
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
          ) : (
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider leading-none">
          {isLowTime ? "Time Expiring" : "Time Remaining"}
        </span>
        <span
          className={`font-mono text-sm font-bold tracking-wider leading-tight ${
            isLowTime ? "text-red-400" : "text-white"
          }`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
}