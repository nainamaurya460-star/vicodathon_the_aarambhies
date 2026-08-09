"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import QuestionTimer from "@/components/ui/QuestionTimer";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Sparkles, ArrowRight, BrainCircuit, FileText, Briefcase } from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();

  const [question, setQuestion] = useState("Analyzing Resume & JD to prepare initial question...");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const totalQuestions = 5;

  const [sessionConfig, setSessionConfig] = useState<{
    role: string;
    seniority: string;
    topic: string;
    jdText?: string;
    resumeText?: string;
  } | null>(null);

<<<<<<< HEAD
  // Fetch Real-world Interview Question from Gemini API
=======
  // Fetch Question from Gemini API
>>>>>>> b991c99
  const fetchNextQuestion = useCallback(async (config: any, previousAns: string) => {
    try {
      const res = await fetch("/api/interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: config?.role,
          seniority: config?.seniority,
          topic: config?.topic,
          jdText: config?.jdText,
          resumeText: config?.resumeText,
          previousAnswer: previousAns,
        }),
      });

      const data = await res.json();
      if (data?.question) {
        setQuestion(data.question);
      } else {
        setQuestion("Can you describe a challenging technical architectural decision you made in your past project?");
      }
    } catch (err) {
      console.error("Failed to fetch question:", err);
      setQuestion("Can you describe a challenging technical architectural decision you made in your past project?");
    }
  }, []);

<<<<<<< HEAD
  // Sync Session Config from Setup
=======
  // Initialize Session
>>>>>>> b991c99
  useEffect(() => {
    const savedConfig = sessionStorage.getItem("active_interview_config");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setSessionConfig(parsed);
      fetchNextQuestion(parsed, "");
    } else {
<<<<<<< HEAD
=======
      // Default fallback
>>>>>>> b991c99
      const defaultConfig = { role: "Software Engineer", seniority: "Mid-Level", topic: "Technical Core" };
      setSessionConfig(defaultConfig);
      fetchNextQuestion(defaultConfig, "");
    }
  }, [fetchNextQuestion]);

  const handleAnswerSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const answerToSubmit = currentAnswer.trim() || "No response provided (Time Expired / Left Blank)";
    const existingHistory = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    const updatedHistory = [...existingHistory, { question, answer: answerToSubmit }];
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    if (questionCount >= totalQuestions) {
      router.push("/interview/report");
    } else {
      setQuestionCount((prev) => prev + 1);
      setCurrentAnswer("");
      await fetchNextQuestion(sessionConfig, answerToSubmit);
      setIsSubmitting(false);
    }
  }, [isSubmitting, currentAnswer, question, questionCount, totalQuestions, router, sessionConfig, fetchNextQuestion]);

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-8 pt-28 pb-12 space-y-6 relative z-10">
        
        {/* Workspace Header */}
        <div className="flex items-center justify-between bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl p-4 rounded-2xl shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                {sessionConfig?.topic || "Technical Core"} • Question {questionCount} of {totalQuestions}
              </span>
<<<<<<< HEAD
              {sessionConfig?.resumeText && (
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <FileText className="w-3 h-3" /> Resume Parsed
                </span>
              )}
              {sessionConfig?.jdText && (
                <span className="inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  <Briefcase className="w-3 h-3" /> JD Matched
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Role: <span className="text-slate-200 font-semibold">{sessionConfig?.role || "Software Engineer"}</span> ({sessionConfig?.seniority || "Mid-Level"})
=======
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Role: <span className="text-slate-200 font-semibold">{sessionConfig?.role || "Software Engineer"}</span>
>>>>>>> b991c99
            </p>
          </div>

          <QuestionTimer key={questionCount} durationInSeconds={120} onTimeUp={handleAnswerSubmit} />
        </div>

        {/* Real-time Adaptive Interviewer Card */}
        <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-indigo-500" /> Real Interviewer Question
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            "{question}"
          </h2>
        </div>

        {/* Candidate Response Workspace */}
        <div className="space-y-4 bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl p-5 rounded-2xl">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Candidate Response
            </label>
            <VoiceRecorder onTranscriptChange={(text) => setCurrentAnswer(text)} />
          </div>

          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
<<<<<<< HEAD
            placeholder="Your voice transcription will stream here automatically. You can also edit or type manually..."
=======
            placeholder="Your voice transcription will stream here automatically..."
>>>>>>> b991c99
            className="w-full h-36 bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600 backdrop-blur-md"
          />

          <button
            onClick={handleAnswerSubmit}
            disabled={isSubmitting}
            style={{ background: "linear-gradient(to right, #4f46e5, #0891b2)" }}
            className="w-full py-3.5 hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25 cursor-pointer"
          >
            {isSubmitting ? (
<<<<<<< HEAD
              <>Analyzing Answer & Generating Contextual Question...</>
=======
              "Processing..."
>>>>>>> b991c99
            ) : questionCount === totalQuestions ? (
              <>Finish Interview & View Scorecard <Sparkles className="w-4 h-4" /></>
            ) : (
              <>Submit Answer <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}