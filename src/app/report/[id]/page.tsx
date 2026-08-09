'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, ArrowLeft, BarChart3, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

interface EvaluationItem {
  question?: string;
  answer?: string;
  technicalScore?: number;
  communicationScore?: number;
  confidenceScore?: number;
  overallScore?: number;
  feedback?: string;
  improvements?: string[];
  modelAnswer?: string;
}

export default function ReportPage() {
  const [techScore, setTechScore] = useState<number>(0);
  const [commScore, setCommScore] = useState<number>(0);
  const [confScore, setConfScore] = useState<number>(0);
  const [overallScore, setOverallScore] = useState<number>(0);
  const [evaluations, setEvaluations] = useState<EvaluationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // LocalStorage se actual API evaluation responses load karein
    const savedData = localStorage.getItem('evaluation_results');
    
    if (savedData) {
      try {
        const parsed: EvaluationItem[] = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvaluations(parsed);

          const totalTech = parsed.reduce((acc, item) => acc + (item.technicalScore || 0), 0);
          const totalComm = parsed.reduce((acc, item) => acc + (item.communicationScore || 0), 0);
          const totalConf = parsed.reduce((acc, item) => acc + (item.confidenceScore || 0), 0);
          const totalOverall = parsed.reduce((acc, item) => acc + (item.overallScore || 0), 0);

          const count = parsed.length;
          setTechScore(Math.round(totalTech / count));
          setCommScore(Math.round(totalComm / count));
          setConfScore(Math.round(totalConf / count));
          setOverallScore(Math.round(totalOverall / count));
        }
      } catch (e) {
        console.error('Error loading evaluation results:', e);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex justify-center items-center">
        <p className="text-slate-400 animate-pulse">Loading real evaluation scorecard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col items-center pt-24">
      <div className="max-w-3xl w-full space-y-6">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Interview Performance Report
          </h1>
          <Link href="/interview" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Practice
          </Link>
        </div>

        {/* Overall Score Badge Card */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-2">
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider">Overall Candidate Readiness</h2>
          <div className="text-5xl font-extrabold text-white my-2">
            {overallScore}<span className="text-2xl text-indigo-400">%</span>
          </div>
          <p className="text-xs text-slate-400">
            {overallScore >= 70 ? '🎉 Excellent performance! Ready for live technical interviews.' : '⚠️ Needs practice. Focus on improving technical precision and clarity.'}
          </p>
        </div>

        {/* Graphical Skill Breakdown */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Skill Breakdown Analysis</h2>

          {/* Technical Knowledge Score */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> Technical Accuracy
              </span>
              <span className="text-indigo-400 font-bold">{techScore}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: `${techScore}%` }}
              />
            </div>
          </div>

          {/* Communication Score */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-300 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-400" /> Communication & Clarity
              </span>
              <span className="text-emerald-400 font-bold">{commScore}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${commScore}%` }}
              />
            </div>
          </div>

          {/* Confidence Score */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-slate-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" /> Confidence & Delivery
              </span>
              <span className="text-amber-400 font-bold">{confScore}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-500"
                style={{ width: `${confScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Individual Questions Feedback Log */}
        {evaluations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Detailed Response Evaluation</h2>
            {evaluations.map((item, index) => (
              <div key={index} className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-xs font-semibold text-indigo-300">Q{index + 1}: {item.question || 'Interview Question'}</p>
                  <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                    (item.overallScore || 0) < 40 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {item.overallScore || 0}%
                  </span>
                </div>
                <p className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded border border-slate-800/60">
                  <span className="text-slate-500 font-medium">Your Answer: </span>
                  {item.answer || 'No response recorded.'}
                </p>
                {item.feedback && (
                  <p className="text-xs text-slate-400 leading-relaxed pt-1">
                    <span className="text-indigo-400 font-medium">AI Feedback: </span>{item.feedback}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}