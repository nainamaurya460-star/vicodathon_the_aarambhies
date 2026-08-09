"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { FileText, Briefcase, UserCheck, Sparkles, ArrowRight } from "lucide-react";

export default function InterviewSetupPage() {
  const router = useRouter();

  const [role, setRole] = useState("Software Engineer");
  const [seniority, setSeniority] = useState("Mid-Level");
  const [topic, setTopic] = useState("Full Stack & System Architecture");
  const [jdText, setJdText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStartInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Session Storage Config Package
      const interviewConfig = {
        role,
        seniority,
        topic,
        jdText: jdText.trim(),
        resumeText: resumeText.trim(),
      };

      // Save Context for Interview Session
      sessionStorage.setItem("active_interview_config", JSON.stringify(interviewConfig));
      sessionStorage.removeItem("qa_history"); // Reset previous interview history

      // Navigate to Interview Workspace Room
      router.push("/interview/room");
    } catch (err) {
      console.error("Failed to save config:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Dynamic Moving Stars Canvas Background */}
      <StarBackground />

      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 pt-28 pb-16 relative z-10 space-y-8">
        
        {/* Page Title Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> AI Interview Setup
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Configure Your Mock Interview
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Provide your Target Role, Job Description, and Resume to enable context-aware real-time questions.
          </p>
        </div>

        {/* Glassmorphism Container Card */}
        <form 
          onSubmit={handleStartInterview}
          className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl rounded-3xl p-6 md:p-10 shadow-[0_0_50px_rgba(79,70,229,0.15)] space-y-6"
        >
          {/* Target Role & Seniority Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" /> Target Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Engineer, Fullstack Developer"
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 transition-all backdrop-blur-md"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-cyan-400" /> Seniority Level
              </label>
              <select
                value={seniority}
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 transition-all backdrop-blur-md"
              >
                <option value="Junior">Junior (0-2 Years)</option>
                <option value="Mid-Level">Mid-Level (2-5 Years)</option>
                <option value="Senior">Senior (5+ Years)</option>
                <option value="Lead/Architect">Tech Lead / Architect</option>
              </select>
            </div>
          </div>

          {/* Topic Focus */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Primary Technical Focus Area
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. React, Node.js, System Design, Data Structures"
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/80 transition-all backdrop-blur-md"
              required
            />
          </div>

          {/* Job Description Text */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-400" /> Job Description (Optional)
            </label>
            <textarea
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste the Job Description (JD) here so the AI asks questions matching job requirements..."
              className="w-full h-28 bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/80 transition-all resize-none backdrop-blur-md placeholder:text-slate-600"
            />
          </div>

          {/* Candidate Resume Context */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> Resume / Experience Context (Optional)
            </label>
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your key projects, tech stack, and experience from your resume here to enable personalized cross-examination..."
              className="w-full h-32 bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500/80 transition-all resize-none backdrop-blur-md placeholder:text-slate-600"
            />
          </div>

          {/* Start Interview Action Button */}
          <button
            type="submit"
            disabled={loading}
            style={{ background: "linear-gradient(to right, #4f46e5, #0891b2)" }}
            className="w-full py-4 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(79,70,229,0.4)] cursor-pointer text-sm tracking-wide disabled:opacity-50 hover:opacity-90"
          >
            {loading ? (
              "Initializing Session..."
            ) : (
              <>Launch Contextual AI Interview <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}