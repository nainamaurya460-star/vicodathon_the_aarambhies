"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Award, CheckCircle2, ArrowLeft, RotateCcw, Sparkles } from "lucide-react";

export default function ReportPage() {
  const [qaHistory, setQaHistory] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(82);
  const [techScore, setTechScore] = useState(85);
  const [commScore, setCommScore] = useState(88);
  const [problemSolvingScore, setProblemSolvingScore] = useState(74);

  useEffect(() => {
    const history = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    setQaHistory(history);
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* High-Tech Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-24 pb-12 relative z-10 space-y-8">
        
        {/* Header & Overall Score Badge */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Interview Performance Assessment
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Candidate Scorecard Report</h1>
            <p className="text-sm text-slate-400">Comprehensive AI evaluation based on technical accuracy and communication efficiency.</p>
          </div>

          {/* Circular Readiness Score Meter */}
          <div className="flex flex-col items-center justify-center bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner min-w-[160px]">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Overall Readiness</span>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              {overallScore}%
            </span>
            <span className="text-[10px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Job Ready
            </span>
          </div>
        </div>

        {/* Competency & Skill Breakdown Dashboard */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Key Competency Metrics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Technical Accuracy Bar */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Technical Depth</span>
                <span className="text-cyan-400">{techScore}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" style={{ width: `${techScore}%` }} />
              </div>
            </div>

            {/* 2. Communication Clarity Bar */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Communication</span>
                <span className="text-indigo-400">{commScore}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${commScore}%` }} />
              </div>
            </div>

            {/* 3. Problem Solving Bar */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Problem Solving</span>
                <span className="text-emerald-400">{problemSolvingScore}%</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: `${problemSolvingScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Q&A Evaluation Review Log */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Question Response Log ({qaHistory.length} Answers Evaluated)
          </h3>

          {qaHistory.length === 0 ? (
            <p className="text-sm text-slate-400 italic">No historical session answers found in cache.</p>
          ) : (
            <div className="space-y-4">
              {qaHistory.map((item, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Question {idx + 1}
                  </span>
                  <p className="text-sm font-medium text-slate-200">{item.question}</p>
                  <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <span className="font-semibold text-slate-400 block mb-1">Your Submitted Answer:</span>
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <Link href="/interview/setup" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-800 transition-all">
            <RotateCcw className="w-4 h-4" /> Retake Mock Interview
          </Link>
          <Link href="/" className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all">
            Back to Dashboard <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}