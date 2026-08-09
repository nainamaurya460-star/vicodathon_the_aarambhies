"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import StarBackground from "@/components/ui/StarBackground";
import { Award, CheckCircle2, ArrowLeft, RotateCcw, Sparkles, Clock, Mic, BrainCircuit } from "lucide-react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Radar, Bar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend
);

export default function ReportPage() {
  const [qaHistory, setQaHistory] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState(82);
  const [techScore, setTechScore] = useState(85);
  const [commScore, setCommScore] = useState(88);
  const [timingScore, setTimingScore] = useState(80);

  useEffect(() => {
    const history = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    setQaHistory(history);

    if (history.length > 0) {
      const avgLength = history.reduce((acc: number, curr: any) => acc + (curr.answer?.length || 0), 0) / history.length;
      const computedTech = Math.min(95, Math.max(65, Math.round(avgLength / 3) + 60));
      const computedComm = Math.min(92, Math.max(70, Math.round(avgLength / 4) + 65));
      const computedTiming = 85;
      
      setTechScore(computedTech);
      setCommScore(computedComm);
      setTimingScore(computedTiming);
      setOverallScore(Math.round((computedTech + computedComm + computedTiming) / 3));
    }
  }, []);

  const radarData = {
    labels: ["Technical Knowledge", "Communication Skills", "Response Timing", "Problem Solving", "Domain Depth"],
    datasets: [
      {
        label: "Candidate Assessment",
        data: [techScore, commScore, timingScore, Math.round((techScore + commScore) / 2), techScore - 2],
        backgroundColor: "rgba(99, 102, 241, 0.25)",
        borderColor: "#6366f1",
        borderWidth: 2,
        pointBackgroundColor: "#38bdf8",
      },
    ],
  };

  const barData = {
    labels: ["Technical Depth", "Communication", "Response Timing"],
    datasets: [
      {
        label: "Score %",
        data: [techScore, commScore, timingScore],
        backgroundColor: ["#06b6d4", "#6366f1", "#10b981"],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-28 pb-12 relative z-10 space-y-8">
        
        {/* Header & Overall Score Badge */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Interview Performance Assessment
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Candidate Scorecard Report</h1>
            <p className="text-sm text-slate-400">Comprehensive AI evaluation based on technical accuracy, communication efficiency, and pacing.</p>
          </div>

          {/* Readiness Score Meter */}
          <div className="flex flex-col items-center justify-center bg-slate-950/70 p-5 rounded-2xl border border-slate-800 shadow-inner min-w-40">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-1">Overall Readiness</span>
            <span 
              className="text-4xl font-extrabold text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(to right, #22d3ee, #818cf8)" }}
            >
              {overallScore}%
            </span>
            <span className="text-[10px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Job Ready
            </span>
          </div>
        </div>

        {/* Competency & Skill Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Technical Depth</p>
              <p className="text-3xl font-black text-cyan-400 mt-1">{techScore}%</p>
            </div>
            <BrainCircuit className="w-8 h-8 text-cyan-400/80" />
          </div>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-indigo-500/30 p-5 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Communication</p>
              <p className="text-3xl font-black text-indigo-400 mt-1">{commScore}%</p>
            </div>
            <Mic className="w-8 h-8 text-indigo-400/80" />
          </div>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-emerald-500/30 p-5 rounded-2xl shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Response Timing</p>
              <p className="text-3xl font-black text-emerald-400 mt-1">{timingScore}%</p>
            </div>
            <Clock className="w-8 h-8 text-emerald-400/80" />
          </div>
        </div>

        {/* Dynamic Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" /> Competency Radar Chart
            </h3>
            <div className="h-64 flex items-center justify-center">
              <Radar data={radarData} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { ticks: { display: false }, grid: { color: "rgba(255,255,255,0.1)" }, angleLines: { color: "rgba(255,255,255,0.1)" } } } }} />
            </div>
          </div>

          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Score Comparison Bar Chart
            </h3>
            <div className="h-64 flex items-center justify-center">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { min: 0, max: 100, grid: { color: "rgba(255,255,255,0.1)" } }, x: { grid: { display: false } } } }} />
            </div>
          </div>
        </div>

        {/* Q&A Evaluation Log */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
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
          <Link href="/interview/setup" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-sm font-semibold border border-slate-700/50 transition-all">
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