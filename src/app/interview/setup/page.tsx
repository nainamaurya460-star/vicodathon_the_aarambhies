"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";

const rounds = [
  { id: "technical", name: "Technical Core", desc: "Data Structures, System Design & Coding Concepts" },
  { id: "behavioral", name: "Behavioral & HR", desc: "Past experiences, teamwork, and situational questions" },
  { id: "system-design", name: "System Architecture", desc: "Scalability, Databases, and API Design" },
  { id: "mixed", name: "Full Mock Round", desc: "A realistic mix of technical and situational prompts" },
];

export default function SetupPage() {
  const router = useRouter();
  const [selectedRound, setSelectedRound] = useState("technical");
  const [role, setRole] = useState("Software Engineer");
  const [seniority, setSeniority] = useState("Mid-Level");

  useEffect(() => {
    // Clear previous interview state when loading setup page
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("qa_history");
      sessionStorage.removeItem("active_interview_config");
    }
  }, []);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const config = { role, seniority, topic: selectedRound };
    sessionStorage.setItem("active_interview_config", JSON.stringify(config));
    router.push("/interview");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" suppressHydrationWarning>
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-8 pt-28 pb-16 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Configure Your Practice Session</h1>
          <p className="text-sm text-slate-400">Select your target role and evaluation domain to get started.</p>
        </div>

        <form onSubmit={handleStart} className="space-y-6" suppressHydrationWarning>
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Interview Domain</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rounds.map((r) => {
                const isSelected = selectedRound === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setSelectedRound(r.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/10"
                        : "border-slate-800 bg-slate-900/50 hover:border-slate-700 text-slate-300"
                    }`}
                  >
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{r.name}</h3>
                      <p className="text-xs text-slate-400">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Target Role</label>
              <input
                type="text"
                value={role}
                suppressHydrationWarning
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, HR Manager"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Seniority Level</label>
              <select
                value={seniority}
                suppressHydrationWarning
                onChange={(e) => setSeniority(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors"
              >
                <option value="Junior / Entry-Level">Junior / Entry-Level</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Senior / Lead">Senior / Lead</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              suppressHydrationWarning
              className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.99]"
            >
              Start Practice Round
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}