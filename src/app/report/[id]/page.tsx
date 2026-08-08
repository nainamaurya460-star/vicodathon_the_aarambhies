"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import SkillGapRoadmap from "@/components/ui/SkillGapRoadmap";
import { Trophy, Target, AlertTriangle, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CandidateReportPage() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function evaluateSession() {
      const savedConfig = sessionStorage.getItem("active_interview_config");
      const savedHistory = sessionStorage.getItem("qa_history");

      const parsedConfig = savedConfig ? JSON.parse(savedConfig) : {};
      const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];

      try {
        const res = await fetch("/api/interview/evaluate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: parsedConfig.role || "Software Engineer",
            seniority: parsedConfig.seniority || "Mid-Level",
            topic: parsedConfig.topic || "Technical Core",
            qaHistory: parsedHistory,
          }),
        });

        const data = await res.json();
        setReport(data);
      } catch (err) {
        console.error("Failed to load evaluation scorecard:", err);
      } finally {
        setLoading(false);
      }
    }

    evaluateSession();
  }, []);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Trophy className="w-3.5 h-3.5" /> Session Evaluation Complete
          </div>
          <h1 
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #ffffff, #e2e8f0, #94a3b8)" }}
          >
            Candidate Growth Scorecard
          </h1>
          <p className="text-sm text-slate-400">
            AI-generated performance diagnostics and actionable improvement areas.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm text-slate-400">Synthesizing interview transcripts and calculating metrics...</p>
          </div>
        ) : (
          <>
            {/* Score Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Overall Score</span>
                <div className="text-4xl font-extrabold text-indigo-400">{report?.overallScore || 78}%</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Technical Accuracy</span>
                <div className="text-4xl font-extrabold text-cyan-400">{report?.technicalAccuracy || 75}%</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2 shadow-xl">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Communication</span>
                <div className="text-4xl font-extrabold text-emerald-400">{report?.communicationScore || 82}%</div>
              </div>
            </div>

            {/* Diagnostic Breakdown */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
              <div>
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4" /> Demonstrated Strengths
                </h3>
                <div className="space-y-2">
                  {report?.strengths?.map((str: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-6">
                <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4" /> Targeted Growth Areas
                </h3>
                <div className="space-y-2">
                  {report?.improvements?.map((imp: string, i: number) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                      <span>{imp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skill Gap Roadmap */}
            <SkillGapRoadmap recommendedTopics={report?.recommendedTopics} />

            {/* Action CTA */}
            <div className="flex justify-center pt-4">
              <Link
                href="/interview/setup"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all shadow-lg shadow-indigo-500/20"
              >
                <ArrowLeft className="w-4 h-4" /> Start Another Session
              </Link>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}