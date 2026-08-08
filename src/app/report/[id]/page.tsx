'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ArrowLeft, BarChart3, CheckCircle2 } from 'lucide-react';

export default function ReportPage() {
  const [techScore, setTechScore] = useState(85);
  const [commScore, setCommScore] = useState(90);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Interview Performance Report
          </h1>
          <Link href="/interview/room" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Room
          </Link>
        </div>

        {/* Graphical Breakdown Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-6">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Skill Breakdown Analysis</h2>

          {/* Technical Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Technical Knowledge
              </span>
              <span className="text-indigo-400 font-bold">{techScore}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 shadow-lg shadow-indigo-500/30" 
                style={{ width: `${techScore}%` }}
              ></div>
            </div>
          </div>

          {/* Communication Score */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" /> Communication & Clarity
              </span>
              <span className="text-emerald-400 font-bold">{commScore}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-1000 shadow-lg shadow-emerald-500/30" 
                style={{ width: `${commScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}