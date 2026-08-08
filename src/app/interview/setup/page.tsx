"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  Clock, 
  Sparkles, 
  Code2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2 
} from "lucide-react";

const roles = [
  { id: "frontend", title: "Frontend Engineer", icon: Code2, desc: "React, Next.js, UI Architecture" },
  { id: "aiml", title: "AI/ML Engineer", icon: Sparkles, desc: "Python, LLMs, PyTorch, RAG" },
  { id: "fullstack", title: "Full Stack Developer", icon: Zap, desc: "Node.js, PostgreSQL, System Design" },
  { id: "product", title: "Product Manager", icon: Briefcase, desc: "Strategy, PRDs, Roadmap Metrics" },
];

const experienceLevels = ["Entry Level", "Mid-Level", "Senior Level"];
const durationOptions = ["10 mins", "15 mins", "20 mins"];

export default function InterviewSetupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("frontend");
  const [experience, setExperience] = useState("Mid-Level");
  const [duration, setDuration] = useState("15 mins");
  const [skills, setSkills] = useState("React, Next.js, TypeScript, Tailwind CSS");
  const [focusMode, setFocusMode] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      sessionStorage.setItem("active_interview_config", JSON.stringify(interviewConfig));
      router.push("/interview");
    } catch (error) {
      console.error("Failed to initialize session configuration:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Customize role dynamics, technical topics, and adaptive evaluation modes before entering the room.
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-8 shadow-2xl shadow-black/50">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-400" /> Select Target Job Role
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
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
                        {role.title}
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 inline ml-2" />}
                      </div>
                      <p className="text-xs text-slate-400">{role.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" /> Experience Level
              </label>
              <div className="flex bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
                {experienceLevels.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperience(lvl)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                      experience === lvl
                        ? "bg-indigo-600 text-white shadow-md"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
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

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleStartInterview}
            className="w-full py-4 rounded-xl text-white font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group transition-all duration-200 disabled:opacity-50"
            style={{ backgroundImage: "linear-gradient(to right, #4f46e5, #6366f1, #06b6d4)" }}
          >
            {isSubmitting ? "Initializing Session..." : "Start AI Interview"} 
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </main>
    </div>
  );
}