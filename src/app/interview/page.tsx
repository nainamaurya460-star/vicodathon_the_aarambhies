"use client";

import React, { useState, useEffect } from "react";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import QuestionTimer from "@/components/ui/QuestionTimer";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Sparkles, ArrowRight, BrainCircuit } from "lucide-react";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import QuestionTimer from "@/components/ui/QuestionTimer"; // Added Timer Component
import { Sparkles, Send, ArrowRight } from "lucide-react";

export default function InterviewPage() {
  const router = useRouter();
  const [config, setConfig] = useState<{ role?: string; topic?: string; seniority?: string } | null>(null);
  const [question, setQuestion] = useState<string>("Initializing adaptive AI question...");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes countdown timer per question

  // State Management
  const [question, setQuestion] = useState("Loading AI Interview Question...");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const totalQuestions = 5;

  // Session Config Parameters
  const [sessionConfig, setSessionConfig] = useState<{
    role: string;
    seniority: string;
    topic: string;
    jdText?: string;
    resumeText?: string;
  } | null>(null);

  // Load Session Config & Initial Question
  useEffect(() => {
    const savedConfig = sessionStorage.getItem("active_interview_config");
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setSessionConfig(parsed);
      fetchNextQuestion(parsed, "");
    } else {
      fetchNextQuestion({ role: "Software Engineer", seniority: "Mid-Level", topic: "Technical Core" }, "");
    }
  }, []);

  // Fetch Next Question from Gemini API Route
  const fetchNextQuestion = async (config: any, previousAns: string) => {
  // Timer Countdown Effect
  useEffect(() => {
    if (loading || submitting) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, submitting]);

  const fetchNextQuestion = async (sessionConfig: any, previousAnswer: string) => {
    setLoading(true);
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
        setQuestion("How do you handle error boundaries and asynchronous state management in production?");
      }
    } catch (err) {
      console.error("Failed to fetch question:", err);
      setQuestion("How do you handle error boundaries and asynchronous state management in production?");
    }
  };

  // Submit Answer
  const handleAnswerSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
      console.error("Adaptive question generation error:", err);
      setQuestion(`In the context of ${sessionConfig.topic}, explain how you manage system scalability and edge cases.`);
    } finally {
      setLoading(false);
      setTimeLeft(120); // Reset timer to 2 mins for new question
    }
  };

  const handleAnswerSubmit = useCallback(async () => {
    setSubmitting(true);

    const answerToSubmit = userAnswer.trim() || "No response provided (Time Expired / Left Blank)";

    const existingHistory = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    const updatedHistory = [...existingHistory, { question, answer: currentAnswer }];
    const updatedHistory = [
      ...existingHistory,
      { question: question, answer: answerToSubmit }
    ];
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    if (questionCount >= totalQuestions) {
      router.push("/interview/report");
    } else {
      setQuestionCount((prev) => prev + 1);
      setCurrentAnswer("");
      await fetchNextQuestion(sessionConfig, currentAnswer);
      setIsSubmitting(false);
    }
  };

    setUserAnswer("");
    setQuestionCount((prev) => prev + 1);

    await fetchNextQuestion(config, answerToSubmit);
    setSubmitting(false);
  }, [userAnswer, question, questionCount, config, router]);

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* High-Tech Background Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Sticky High Z-Index Navbar */}
      <Navbar />

      {/* FIXED TOP PADDING: pt-32 ensures full clearance from fixed navbar */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 md:p-8 pt-32 pb-12 space-y-6">
        
        {/* Workspace Header Bar */}
        <div className="flex items-center justify-between bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-lg">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
              {sessionConfig?.topic || "Technical Core"} • Question {questionCount} of {totalQuestions}
      {/* Main Container with pt-24 Padding to prevent Header Overlap */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-24 pb-8 relative z-10 flex flex-col justify-center space-y-6">
        
        {/* Top Bar: Progress & Target Tech Stack */}
        <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-lg">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              Question {questionCount} of 5
            </span>
            <p className="text-xs text-slate-400 mt-1">
              Role: <span className="text-slate-200 font-semibold">{sessionConfig?.role || "Software Engineer"}</span> ({sessionConfig?.seniority || "Mid-Level"})
            </p>
          </div>

          {/* 2-Minute Live Per-Question Timer */}
          <QuestionTimer durationInSeconds={120} onTimeUp={handleAnswerSubmit} />
        </div>

        {/* Dynamic AI Question Card Display */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
        {/* Live Question Timer Component */}
        <QuestionTimer timeLeft={timeLeft} onTimeUp={handleAnswerSubmit} />

        {/* AI Question Box */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-indigo-500" /> Active Interviewer Question
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
            "{question}"
          </h2>
        </div>

        {/* Dual Voice & Manual Text Input Area */}
        <div className="space-y-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
        {/* Candidate Answer Box & Controls */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Candidate Answer
            </label>
            <VoiceRecorder onTranscriptChange={(text) => setCurrentAnswer(text)} />
          </div>

          {/* Fallback & Primary Textarea for manual editing */}
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Your voice transcription will stream here automatically. You can also edit or type manually..."
            className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600"
          />

          <button
            onClick={handleAnswerSubmit}
            disabled={isSubmitting}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/25"
          >
            {isSubmitting ? (
              <>Evaluating & Loading Next Question...</>
            ) : questionCount === totalQuestions ? (
              <>Finish Interview & View Scorecard <Sparkles className="w-4 h-4" /></>
            ) : (
              <>Submit Answer <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
          <div className="flex justify-end">
            <button
              type="button"
              disabled={submitting || loading || !userAnswer.trim()}
              onClick={handleAnswerSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? "Evaluating Response..." : "Submit Answer"} 
              {questionCount >= 5 ? <ArrowRight className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}