"use client";
import React from "react";
import { Award, Share2, Sparkles } from "lucide-react";

interface BadgeProps {
  score: number;
  role: string;
}

export default function ReadinessBadge({ score, role }: BadgeProps) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 backdrop-blur-md shadow-xl text-center flex flex-col items-center gap-4">
      <div className="p-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
        <Award className="w-10 h-10" />
      </div>

      <div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
          AB Talks Certified
        </span>
        <h3 className="text-2xl font-bold text-white mt-2">
          {score}% Job Ready
        </h3>
        <p className="text-sm text-gray-400 mt-1">
          Target Role: <span className="text-indigo-300">{role || "AI Engineer"}</span>
        </p>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
        <Sparkles className="w-4 h-4" />
        +50 Synergy Points Unlocked
      </div>

      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          alert("Scorecard link copied to clipboard!");
        }}
        className="mt-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-600/25"
      >
        <Share2 className="w-4 h-4" />
        Share Readiness Badge
      </button>
    </div>
  );
}