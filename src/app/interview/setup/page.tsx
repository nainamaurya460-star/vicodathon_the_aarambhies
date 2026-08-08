"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { UserCheck, Code2, Cpu, Users, Sparkles, ArrowRight } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();

  // Form State
  const [role, setRole] = useState("Software Engineer");
  const [seniority, setSeniority] = useState("Mid-Level");
  const [selectedRound, setSelectedRound] = useState("Technical Core");

  // Round Selection Options
  const rounds = [
    {
      id: "HR & Behavioral",
      title: "General HR / Behavioral",
      desc: "Culture fit, self-introduction, conflict resolution, and situational questions.",
      icon: Users,
      badge: "Non-Technical",
    },
    {
      id: "Technical Core",
      title: "Technical Round",
      desc: "Core domain concepts, framework architecture, and deep technical evaluation.",
      icon: Cpu,
      badge: "Domain Specific",
    },
    {
      id: "Coding & DSA",
      title: "Coding Round",
      desc: "Data structures, algorithmic problem solving, time complexity, and logic.",
      icon: Code2,
      badge: "Problem Solving",
    },
    {
      id: "System Design",
      title: "System Design",
      desc: "Scalability, microservices, API architecture, caching, and data modeling.",
      icon: UserCheck,
      badge: "Architecture",
    },
  ];

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();

    // Store interview parameters in sessionStorage for active session
    const config = {
      role,
      seniority,
      topic: selectedRound,
    };

    sessionStorage.setItem("active_interview_config", JSON.stringify(config));
    sessionStorage.removeItem("qa_history"); // Clear previous session history

    router.push("/interview");
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-8 space-y-8 my-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Preparation
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Configure Your Mock Session
          </h1>
          <p className="text-sm text-slate-400">
            Select your targeted interview round and parameters for realistic evaluation.
          </p>
        </div>

        <form onSubmit={handleStart} className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          
          {/* Round Selection Panel */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Interview Round
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rounds.map((r) => {
                const IconComponent = r.icon;
                const isSelected = selectedRound === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setSelectedRound(r.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? "bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                        : "bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400"}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {r.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className={`text-sm font-semibold ${isSelected ? "text-indigo-300" : "text-slate-200"}`}>
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {r.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Role & Seniority Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Job Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, HR Manager"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Seniority Level
              </label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Junior">Entry / Junior Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior / Lead Level</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
          >
            Start AI Interview Session <ArrowRight className="w-4 h-4" />
          </button>

        </form>
      </main>

      <Footer />
    </div>
  );
}