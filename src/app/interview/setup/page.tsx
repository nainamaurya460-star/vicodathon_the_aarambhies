"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterviewSetupPage() {
  const router = useRouter();
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry Level");

  const handleStartInterview = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Clear previous historical session cache
    localStorage.removeItem("session_answers");
    localStorage.removeItem("interview_questions");

    // 2. Save active interview config
    const setupData = {
      role: targetRole,
      jd: jobDescription,
      experience: experienceLevel,
    };
    localStorage.setItem("active_interview_config", JSON.stringify(setupData));

    // 3. Initialize default sample questions if needed
    const defaultQuestions = [
      "Tell me about a challenging project you built using modern web frameworks.",
      "How do you handle state management and performance optimization in React/Next.js?",
      "Explain a situation where you had to debug a difficult runtime error."
    ];
    localStorage.setItem("interview_questions", JSON.stringify(defaultQuestions));

    // 4. Navigate to live interview room
    router.push("/interview/1");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-2xl font-bold text-indigo-400 mb-2">AI Interview Setup</h1>
        <p className="text-slate-400 text-sm mb-6">
          Set up your target role and job description to initialize your tailored interview session.
        </p>

        <form onSubmit={handleStartInterview} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Target Role
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Entry Level">Entry Level / Student</option>
              <option value="Mid Level">Mid Level (1-3 yrs)</option>
              <option value="Senior Level">Senior Level (3+ yrs)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
              Job Description / Focus Topics
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 h-28"
              placeholder="Paste job description or main focus areas..."
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition duration-200"
          >
            Launch Contextual AI Interview 🚀
          </button>
        </form>
      </div>
    </div>
  );
}