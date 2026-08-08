import React from "react";

interface QuestionTimerProps {
  timeLeft: number; // Time in seconds
}

export const QuestionTimer = ({ timeLeft }: QuestionTimerProps) => {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

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
      </span>
    </div>
  );
};

export default QuestionTimer;