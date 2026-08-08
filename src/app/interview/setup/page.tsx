"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { UserCheck, Code2, Cpu, Users, Sparkles, ArrowRight, Briefcase, Clock, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

const roles = [
  { id: "frontend", title: "Frontend Engineer", icon: Code2, desc: "React, Next.js, UI Architecture" },
  { id: "aiml", title: "AI/ML Engineer", icon: Sparkles, desc: "Python, LLMs, PyTorch, RAG" },
  { id: "fullstack", title: "Full Stack Developer", icon: Zap, desc: "Node.js, PostgreSQL, System Design" },
  { id: "product", title: "Product Manager", icon: Briefcase, desc: "Strategy, PRDs, Roadmap Metrics" },
];

const durationOptions = ["10 mins", "15 mins", "20 mins"];

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

export default function SetupPage() {
  const router = useRouter();
  
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [role, setRole] = useState("Frontend Engineer");
  const [seniority, setSeniority] = useState("Mid-Level");
  const [selectedRound, setSelectedRound] = useState("Technical Core");
  const [duration, setDuration] = useState("15 mins");
  const [skills, setSkills] = useState("React, Next.js, TypeScript, Tailwind CSS");
  const [focusMode, setFocusMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStartInterview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const activeRoleObj = roles.find((r) => r.id === selectedRole);
      
      const interviewConfig = {
        role: activeRoleObj ? activeRoleObj.title : role,
        seniority: seniority,
        duration: duration,
        topic: `${selectedRound} - ${skills}`,
        focusMode: focusMode,
        createdAt: new Date().toISOString(),
      };

      sessionStorage.setItem("active_interview_config", JSON.stringify(interviewConfig));
      sessionStorage.removeItem("qa_history");
      router.push("/interview");
    } catch (error) {
      console.error("Failed to initialize session configuration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8 z-10 my-auto">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Suite v1.0
          </div>
          
          <h1 
            className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff, #e2e8f0, #94a3b8)" }}
          >
            Configure Your Mock Session
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Customize role dynamics, technical topics, and adaptive evaluation modes before entering the room.
          </p>
        </div>

        {/* Glassmorphism Main Form */}
        <form onSubmit={handleStartInterview} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl shadow-black/50">
          
          {/* Target Job Role Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Select Target Job Role
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r.id);
                      setRole(r.title);
                    }}
                    className={`flex items-start gap-4 p-4 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "bg-indigo-600/15 border-indigo-500/80 shadow-lg shadow-indigo-500/10"
                        : "bg-slate-800/40 border-slate-800 hover:border-slate-700 hover:bg-slate-800/70"
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="font-semibold text-slate-200 text-sm flex items-center justify-between">
                        {r.title}
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 inline ml-2" />}
                      </div>
                      <p className="text-xs text-slate-400">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interview Round Selection */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Select Interview Round
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {rounds.map((rnd) => {
                const IconComponent = rnd.icon;
                const isSelected = selectedRound === rnd.id;
                return (
                  <button
                    key={rnd.id}
                    type="button"
                    onClick={() => setSelectedRound(rnd.id)}
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
                        {rnd.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold ${isSelected ? "text-indigo-300" : "text-slate-200"}`}>
                        {rnd.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {rnd.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seniority Level & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Seniority Level
              </label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Junior">Entry / Junior Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior">Senior / Lead Level</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" /> Estimated Duration
              </label>
              <div className="flex bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
                {durationOptions.map((dur) => (
                  <button
                    key={dur}
                    type="button"
                    onClick={() => setDuration(dur)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                      duration === dur
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {dur}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Topics / Technical Stack */}
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

          {/* Stress-Free Focus Mode Toggle */}
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

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition-all duration-200 disabled:opacity-50"
            style={{ backgroundImage: "linear-gradient(to right, #4f46e5, #6366f1, #06b6d4)" }}
          >
            {isSubmitting ? "Initializing Session..." : "Start AI Interview Session"} 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}