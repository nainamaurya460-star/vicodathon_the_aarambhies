"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Sparkles, Rocket, Briefcase, GraduationCap, FileText } from "lucide-react";

export default function SetupPage() {
  const router = useRouter();
  const [role, setRole] = useState("Software Engineer");
  const [level, setLevel] = useState("Entry Level / Student");
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save setup config in sessionStorage
    const setupData = { role, level, jd };
    sessionStorage.setItem("interview_setup", JSON.stringify(setupData));

    setTimeout(() => {
      router.push("/interview/room");
    }, 800);
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 pt-28 pb-12 relative z-10 flex flex-col justify-center">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Interview Setup
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">Initialize Your Session</h1>
            <p className="text-xs md:text-sm text-slate-400">
              Configure your role and domain context to start your AI-powered mock interview.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Target Role */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-indigo-400" /> Target Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-slate-950/70 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                placeholder="e.g. Full Stack Developer, UI/UX Designer"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" /> Experience Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all cursor-pointer"
              >
                <option value="Entry Level / Student">Entry Level / Student (0-1 yrs)</option>
                <option value="Mid Level">Mid Level (1-3 yrs)</option>
                <option value="Senior Level">Senior Level (3+ yrs)</option>
              </select>
            </div>

            {/* Job Description / Focus Areas */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Job Description / Focus Topics
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={4}
                className="w-full bg-slate-950/70 border border-slate-700/60 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500 resize-none"
                placeholder="Paste job description or main focus areas (e.g., React, Next.js, Node.js, System Design)..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Initializing Session...
                </>
              ) : (
                <>
                  Launch Contextual AI Interview <Rocket className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}