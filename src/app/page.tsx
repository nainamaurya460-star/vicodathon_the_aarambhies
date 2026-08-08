"use client";

import { useEffect, useState, useRef } from "react";
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

  // Handle Question Timer & Auto-Submit
  useEffect(() => {
    if (loading) return; // Don't run timer while question is loading

    setTimeLeft(120); // Reset timer to 2 mins for new question
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current as NodeJS.Timeout);
          handleAutoSubmit(); // Time's up -> Auto Submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questionCount, loading]);

  const handleAutoSubmit = () => {
    console.log("Time's up! Auto-submitting response...");
    handleAnswerSubmit();
  };

  // Adaptive Loop: Candidate Answer -> Gemini API -> Next Dynamic Question
  const fetchNextQuestion = async (sessionConfig: any, previousAnswer: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/interview/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: sessionConfig.role,
          seniority: sessionConfig.seniority,
          topic: sessionConfig.topic,
          previousAnswer: previousAnswer,
        }),
      });
      const data = await res.json();
      if (data.question) {
        setQuestion(data.question);
      } else {
        setQuestion(`In the context of ${sessionConfig.topic}, explain how you manage system scalability and edge cases.`);
      }
    } catch (err) {
      console.error("Adaptive question generation error:", err);
      setQuestion(`In the context of ${sessionConfig.topic}, explain how you manage system scalability and edge cases.`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setSubmitting(true);

    if (questionCount >= 5) {
      router.push("/interview/report");
      return;
    }

    const currentAns = userAnswer;
    setUserAnswer("");
    setQuestionCount((prev) => prev + 1);

    await fetchNextQuestion(config, currentAns);
    setSubmitting(false);
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col justify-center space-y-6">
        {/* Session Header & Live Timer Widget */}
        <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              Question {questionCount} of 5
            </span>
            <h3 className="text-lg font-bold text-white">{config?.role || "Software Engineer"}</h3>
          </div>

          {/* 2-Minute Circular/Pill Countdown Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
            <Clock className={`w-4 h-4 ${timeLeft <= 30 ? "text-red-400 animate-pulse" : "text-emerald-400"}`} />
            <span className={`text-xs font-mono font-bold ${timeLeft <= 30 ? "text-red-400" : "text-slate-200"}`}>
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

        {/* Answer Entry Area (Voice + Manual Text Box Fallback) */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 space-y-4">
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
              disabled={submitting || loading}
              onClick={handleAnswerSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              {submitting ? "Evaluating Response..." : "Submit Answer"} 
              {questionCount >= 5 ? <ArrowRight className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {/* 1. AB Talks +50 Synergy Points Awarded Banner */}
          <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/40 rounded-2xl p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center text-white font-bold justify-center">
                +50
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">AB Talks Synergy Points Awarded!</h4>
                <p className="text-xs text-slate-400">Successfully completed the mock interview question/session.</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-indigo-600/30 border border-indigo-500/50 text-indigo-300 text-xs font-medium rounded-lg">
              Unlocked
            </span>
          </div>

          {/* 2. AI Ideal Answer vs Candidate Answer Comparison Panel */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
            <h3 className="text-sm font-semibold text-indigo-400">🤖 AI Ideal Answer vs Your Answer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 font-semibold block mb-1">Your Response:</span>
                <p className="text-slate-300">Your submitted or recorded voice response will display here.</p>
              </div>
              <div className="bg-indigo-950/30 p-3 rounded-lg border border-indigo-900/40">
                <span className="text-indigo-300 font-semibold block mb-1">AI Best Practice / Ideal Answer:</span>
                <p className="text-slate-300">Expert structured guideline and model answer framework generated by AI.</p>
              </div>
            </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}