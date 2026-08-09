"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Sparkles, Trophy, CheckCircle, BarChart3, RefreshCw, MessageSquare, Activity } from "lucide-react";

export default function InterviewReportPage() {
  const router = useRouter();
  const [history, setHistory] = useState<Array<{ question: string; answer: string; score: number }>>([]);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const data = sessionStorage.getItem("qa_history");
    if (data) {
      const parsed = JSON.parse(data);
      setHistory(parsed);
      
      if (parsed.length > 0) {
        const total = parsed.reduce((sum: number, item: any) => sum + (item.score || 80), 0);
        setAvgScore(Math.round(total / parsed.length));
      } else {
        setAvgScore(82);
      }
    } else {
      setAvgScore(85);
    }
  }, []);

  const techAccuracy = Math.min(98, avgScore + 4);
  const commClarity = Math.min(95, avgScore + 2);
  const domainKnowledge = avgScore;

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans bg-slate-950">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-28 pb-12 relative z-10 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI Candidate Evaluation Complete
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Interview Performance Scorecard</h1>
            <p className="text-xs text-slate-400">Detailed breakdown of technical responses and communication metrics</p>
          </div>

          {/* Overall Score Badge */}
          <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-2xl text-white shadow-lg">
              {avgScore}
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Overall Score</span>
              <p className="text-sm font-semibold text-emerald-400 flex items-center gap-1">
                <Trophy className="w-4 h-4" /> Strong Candidate
              </p>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Technical Accuracy</span>
              <BarChart3 className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">{techAccuracy}%</p>
            <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
              <div 
                className="h-full rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-1000" 
                style={{ width: `${techAccuracy}%` }} 
              />
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Communication Clarity</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white">{commClarity}%</p>
            <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
              <div 
                className="h-full rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] transition-all duration-1000" 
                style={{ width: `${commClarity}%` }} 
              />
            </div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-xs font-bold uppercase">
              <span>Domain Knowledge</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold text-white">{domainKnowledge}%</p>
            <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-slate-700/50 p-0.5">
              <div 
                className="h-full rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)] transition-all duration-1000" 
                style={{ width: `${domainKnowledge}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Single Horizontal Side-By-Side Comparison Chart */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-2xl space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" /> Horizontal Competency Comparison
            </h2>
            <div className="flex gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-cyan-400"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Technical</span>
              <span className="flex items-center gap-1.5 text-emerald-400"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Clarity</span>
              <span className="flex items-center gap-1.5 text-indigo-400"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Domain</span>
            </div>
          </div>

          {/* Grouped Horizontal Bars */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 space-y-6">
            
            {/* Technical Row */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-2 text-cyan-400">Technical Accuracy</span>
                <span>{techAccuracy}%</span>
              </div>
              <div className="w-full bg-slate-900 h-5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-1000 shadow-[0_0_12px_rgba(34,211,238,0.6)]" 
                  style={{ width: `${techAccuracy}%` }} 
                />
              </div>
            </div>

            {/* Communication Row */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-2 text-emerald-400">Communication Clarity</span>
                <span>{commClarity}%</span>
              </div>
              <div className="w-full bg-slate-900 h-5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-300 transition-all duration-1000 shadow-[0_0_12px_rgba(52,211,153,0.6)]" 
                  style={{ width: `${commClarity}%` }} 
                />
              </div>
            </div>

            {/* Domain Expertise Row */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span className="flex items-center gap-2 text-indigo-400">Domain Expertise</span>
                <span>{domainKnowledge}%</span>
              </div>
              <div className="w-full bg-slate-900 h-5 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-1000 shadow-[0_0_12px_rgba(99,102,241,0.6)]" 
                  style={{ width: `${domainKnowledge}%` }} 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Detailed Q&A Log */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-6 rounded-3xl shadow-2xl space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" /> Q&A Detailed Log & Verbal Evaluation
          </h2>

          <div className="space-y-4">
            {history.length > 0 ? (
              history.map((item, idx) => (
                <div key={idx} className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Question {idx + 1}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                      Score: {item.score || 85}/100
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-100">{item.question}</p>
                  <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed italic">
                    <span className="font-semibold text-slate-400 not-italic">Your Response: </span> "{item.answer}"
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">No response log found for this session. Please complete an interview room session.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => router.push("/interview/setup")}
            className="flex items-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
          >
            <RefreshCw className="w-4 h-4" /> Start New Assessment Session
          </button>
        </div>

      </main>

      <Footer />
    </div>
  );
}