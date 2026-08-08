"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import VoiceRecorder from "@/components/ui/VoiceRecorder";
import { Sparkles, Send, ArrowRight } from "lucide-react";

export default function ActiveInterviewPage() {
  const router = useRouter();
  const [config, setConfig] = useState<{ role?: string; topic?: string; seniority?: string } | null>(null);
  const [question, setQuestion] = useState<string>("Initializing adaptive AI question...");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [questionCount, setQuestionCount] = useState(1);

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
    if (!userAnswer.trim()) return;

    setSubmitting(true);

    const existingHistory = JSON.parse(sessionStorage.getItem("qa_history") || "[]");
    const updatedHistory = [
      ...existingHistory,
      { question: question, answer: userAnswer }
    ];
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    if (questionCount >= 5) {
      router.push("/report/1");
      return;
    }

    const currentAns = userAnswer;
    setUserAnswer("");
    setQuestionCount((prev) => prev + 1);

    await fetchNextQuestion(config, currentAns);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col justify-center space-y-6">
        <div className="flex items-center justify-between bg-slate-900/60 backdrop-blur-md p-4 rounded-xl border border-slate-800">
          <div>
            <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
              Question {questionCount} of 5
            </span>
            <h3 className="text-lg font-bold text-white">{config?.role || "Software Engineer"}</h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">Target Tech Stack</span>
            <p className="text-sm font-medium text-slate-200">{config?.topic || "Technical Topics"}</p>
          </div>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Dynamic AI Interviewer
          </div>
          <p className="text-lg md:text-xl font-medium text-slate-100 leading-relaxed">
            {loading ? "Synthesizing dynamic follow-up question based on candidate evaluation..." : question}
          </p>
        </div>

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
              disabled={submitting || loading || !userAnswer.trim()}
              onClick={handleAnswerSubmit}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
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