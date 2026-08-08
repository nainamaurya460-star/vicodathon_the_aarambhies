"use client";

import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";

export default function InterviewReportPage() {
  const params = useParams();
  const router = useRouter();

  const score = 82;

  const skillBreakdown = [
    { skill: "Technical Accuracy", score: 85, color: "bg-cyan-500" },
    { skill: "Communication Clarity", score: 80, color: "bg-indigo-500" },
    { skill: "Problem Solving (STAR)", score: 78, color: "bg-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12 flex flex-col items-center">
      <main className="w-full max-w-4xl space-y-8">
        {/* Top Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => router.push("/interview/setup")}
            className="border-slate-800 text-slate-300 hover:bg-slate-900 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Start New Interview
          </Button>
          <span className="text-xs font-mono text-slate-500">Report ID: {params.id}</span>
        </div>

        {/* Hero Score Card */}
        <Card className="bg-slate-900/90 border-slate-800 text-white p-8 backdrop-blur-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
              <Award className="w-4 h-4" /> Performance Summary
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Interview Evaluation</h1>
            <p className="text-slate-400 text-sm">Target Role: Frontend Engineer (Mid-Level)</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-slate-800 w-36 h-36">
            <span className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              {score}%
            </span>
            <span className="text-xs text-slate-400 font-medium mt-1">Overall Score</span>
          </div>
        </Card>

        {/* Skill Gap Breakdown */}
        <Card className="bg-slate-900/90 border-slate-800 p-6 space-y-4">
          <CardHeader className="p-0 mb-2">
            <CardTitle className="text-lg text-slate-200">Skill Gap Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            {skillBreakdown.map((item) => (
              <div key={item.skill} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium text-slate-300">
                  <span>{item.skill}</span>
                  <span>{item.score}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strengths & Action Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-900/90 border-slate-800 p-6 space-y-3">
            <h3 className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li>Strong understanding of React State Management and Context API.</li>
              <li>Clear articulation during technical explanations.</li>
            </ul>
          </Card>

          <Card className="bg-slate-900/90 border-slate-800 p-6 space-y-3">
            <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Improvement Areas
            </h3>
            <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
              <li>Elaborate more on Redux Middleware (Thunk/Saga) comparison.</li>
              <li>Structure answers strictly using the STAR method for scenario questions.</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}