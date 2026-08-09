"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const cachedAnswers = JSON.parse(localStorage.getItem("session_answers") || "[]");
    const cachedConfig = JSON.parse(localStorage.getItem("active_interview_config") || "{}");
    setAnswers(cachedAnswers);
    setConfig(cachedConfig);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
            AI Interview Evaluation Summary
          </span>
          <h1 className="text-2xl font-bold mt-1">
            {config?.role || "Software Engineer"} Assessment Report
          </h1>
        </div>
        <button
          onClick={() => router.push("/interview/setup")}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Start New Interview 🔄
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 uppercase font-semibold">Overall Readiness Score</p>
          <p className="text-3xl font-extrabold text-indigo-400 mt-2">
            {answers.length > 0 ? "85%" : "N/A"}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 uppercase font-semibold">Questions Evaluated</p>
          <p className="text-3xl font-extrabold text-indigo-400 mt-2">{answers.length}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <p className="text-xs text-slate-400 uppercase font-semibold">Target Level</p>
          <p className="text-3xl font-extrabold text-indigo-400 mt-2">
            {config?.experience || "Entry Level"}
          </p>
        </div>
      </div>

      {/* Historical Answers Log */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-bold mb-4 text-slate-200">Question & Response History Log</h2>
        {answers.length > 0 ? (
          <div className="space-y-4">
            {answers.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-slate-950 rounded-xl border border-slate-800/80"
              >
                <p className="text-sm font-semibold text-indigo-400 mb-1">
                  Q{index + 1}: {item.question}
                </p>
                <p className="text-sm text-slate-300">
                  <span className="text-slate-500 font-medium">Candidate Answer: </span>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No historical session answers found in cache. Please complete an interview setup.
          </div>
        )}
      </div>
    </div>
  );
}