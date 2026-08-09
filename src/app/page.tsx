"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import { Sparkles, Send, ArrowRight, Clock } from "lucide-react";

export default function ActiveInterviewPage() {
  const router = useRouter();
  const [config, setConfig] = useState<{ role?: string; topic?: string; seniority?: string } | null>(null);
  const [question, setQuestion] = useState<string>("Initializing adaptive AI question...");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

  // 2-Minute Timer State (120 seconds per question)
  const [timeLeft, setTimeLeft] = useState(120);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedConfig = sessionStorage.getItem("active_interview_config");
    if (!savedConfig) {
      router.push("/interview/setup");
      return;
    }
    const parsed = JSON.parse(savedConfig);
    setConfig(parsed);

    fetchNextQuestion(parsed, "");
  }, [router]);

  // Handle Answer Submit & History Storage
  const handleAnswerSubmit = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitting(true);

    const submittedText = userAnswer.trim() || "No response provided (Time Expired / Blank)";

    // Save Q&A to Session Storage for Scorecard Report Page
    const existingHistory = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    const updatedHistory = [
      ...existingHistory,
      { question: question, answer: submittedText }
    ];
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    if (questionCount >= 5) {
      router.push("/report/1");
      return;
    }

    const currentAns = submittedText;
    setUserAnswer("");
    setQuestionCount((prev) => prev + 1);

    await fetchNextQuestion(config, currentAns);
    setSubmitting(false);
  }, [userAnswer, question, questionCount, config, router]);

  // Handle Question Timer & Auto-Submit Event
  useEffect(() => {
    if (loading) return;

    setTimeLeft(120); // Reset timer to 2 mins for new question
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          alert("⏱️ Time Over! Aapka response automatically submit ho raha hai.");
          handleAnswerSubmit(); // Auto Submit on Time Over
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questionCount, loading, handleAnswerSubmit]);

  // Adaptive Question Generation
  const fetchNextQuestion = async (sessionConfig: any, previousAnswer: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: sessionConfig?.role,
          seniority: sessionConfig?.seniority,
          topic: sessionConfig?.topic,
          previousAnswer: previousAnswer,
        }),
      });
      const data = await res.json();
      if (data.question) {
        setQuestion(data.question);
      } else {
        setQuestion(`In the context of ${sessionConfig?.topic || "Technical Topics"}, explain how you manage system scalability and edge cases.`);
      }
    } catch (err) {
      console.error("Adaptive question generation error:", err);
      setQuestion(`In the context of ${sessionConfig?.topic || "Technical Topics"}, explain how you manage system scalability and edge cases.`);
    } finally {
      setLoading(false);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* High-Tech Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />

      <Navbar />

      {/* Main Container with pt-24 Padding to prevent Header Overlap */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-24 pb-8 relative z-10 flex flex-col justify-center space-y-6">
        
        {/* Session Header & Live Timer Widget */}
        <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-lg">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              Question {questionCount} of 5
            </span>
            <h3 className="text-lg font-bold text-white">{config?.role || "Software Engineer"}</h3>
          </div>

          {/* 2-Minute Circular/Pill Countdown Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 shadow-inner">
            <Clock className={`w-4 h-4 ${timeLeft <= 30 ? "text-red-400 animate-pulse" : "text-emerald-400"}`} />
            <span className={`text-xs font-mono font-bold ${timeLeft <= 30 ? "text-red-400 animate-pulse" : "text-slate-200"}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400">Target Tech Stack</span>
            <p className="text-sm font-medium text-slate-200">{config?.topic || "Technical Topics"}</p>
          </div>
        </div>

        {/* AI Dynamic Question Area */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Dynamic AI Interviewer
          </div>
          <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
            {loading ? "Synthesizing dynamic follow-up question based on candidate evaluation..." : question}
          </p>
        </div>

        {/* Answer Entry Area (Voice + Manual Text Box) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Candidate Answer Representation
            </label>
            <VoiceRecorder
              onTranscriptChange={(transcribedText) => setUserAnswer(transcribedText)}
              disabled={loading || submitting}
            />
          </div>

          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your voice transcription will stream here automatically. You can also edit or type manually..."
            rows={5}
            className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all resize-none"
          />

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

        {/* Live Answer Feedback Preview Box */}
        {userAnswer.trim() && (
          <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 transition-all">
            <span className="text-xs font-semibold text-indigo-400 block mb-1">🤖 Active Response Stream:</span>
            <p className="text-xs text-slate-300 italic">{userAnswer}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}