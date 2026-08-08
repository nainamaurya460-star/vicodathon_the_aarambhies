"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { UserCheck, Code2, Cpu, Users, Sparkles, ArrowRight } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();

<<<<<<< HEAD
  // Form State
  const [role, setRole] = useState("Software Engineer");
  const [seniority, setSeniority] = useState("Mid-Level");
  const [selectedRound, setSelectedRound] = useState("Technical Core");
=======
  const handleStartInterview = async () => {
    setIsSubmitting(true);
    try {
      const activeRoleObj = roles.find((r) => r.id === selectedRole);

      const interviewConfig = {
        role: activeRoleObj ? activeRoleObj.title : "Software Engineer",
        seniority: experience,
        duration: duration,
        topic: skills,
        focusMode: focusMode,
        createdAt: new Date().toISOString(),
      };
>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63

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
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-center items-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <main className="w-full max-w-4xl z-10 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Suite v1.0
          </div>

          <h1 
            className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff, #e2e8f0, #94a3b8)" }}
          >
            Your Mock Interview
>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63
          </h1>
          <p className="text-sm text-slate-400">
            Select your targeted interview round and parameters for realistic evaluation.
          </p>
        </div>

<<<<<<< HEAD
        <form onSubmit={handleStart} className="space-y-6 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
          
          {/* Round Selection Panel */}
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Select Interview Round
=======
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl shadow-black/50">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Select Target Job Role
>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63
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

<<<<<<< HEAD
          {/* Role & Seniority Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Target Job Role
=======
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Experience Level
>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63
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

<<<<<<< HEAD
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Seniority Level
=======
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" /> Estimated Duration
>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63
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

<<<<<<< HEAD
          {/* Submit Action */}
=======
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-4 h-4 text-violet-400" /> Core Topics / Technical Stack
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g. React, Next.js, PostgreSQL, System Design"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/40 border border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Stress-Free Focus Mode</h4>
                <p className="text-xs text-slate-400">Hide live scorebars during interview to maintain calm and focus.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setFocusMode(!focusMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${
                focusMode ? "bg-indigo-600 justify-end" : "bg-slate-800 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

>>>>>>> 522210edfb9d29ea82017ae3ccc858d54b4aaf63
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