"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Mic, MicOff, Sparkles, Loader2, ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";

export default function InterviewRoomPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{ question: string; answer: string; score: number }>>([]);
  const [setupConfig, setSetupConfig] = useState<any>(null);

  // Pop-up Modal State
  const [showNextModal, setShowNextModal] = useState(false);
  const [nextQuestion, setNextQuestion] = useState("");
  const [lastFeedback, setLastFeedback] = useState("");

  useEffect(() => {
    const storedSetup = sessionStorage.getItem("interview_setup");
    const config = storedSetup
      ? JSON.parse(storedSetup)
      : {
          role: "Software Engineer",
          level: "Entry Level",
          round: "Technical Assessment",
          jd: "React, Next.js, Node.js",
          resumeText: "",
        };

    setSetupConfig(config);

    const initialQ = `Hello! Welcome to your ${config.round} for the ${config.role} position. Based on your domain focus (${config.jd || config.role}), can you briefly walk me through your technical experience and key skills?`;

    setMessages([{ sender: "ai", text: initialQ }]);
  }, []);

  const handleSpeechAnswer = (spokenText: string) => {
    if (!spokenText.trim()) return;

    // 1. Validation for extremely short / invalid answers
    if (spokenText.trim().split(" ").length < 3) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: spokenText },
        {
          sender: "ai",
          text: "Could you please elaborate a bit more on your answer? That response was too short to evaluate your technical knowledge properly.",
        },
      ]);
      return;
    }

    // Show user answer in chat
    setMessages((prev) => [...prev, { sender: "user", text: spokenText }]);
    setIsEvaluating(true);

    const currentQuestion = messages[messages.length - 1]?.text || "Interview Question";
    const roundType = setupConfig?.round || "Technical Assessment";

    // 2. Simple Answer Evaluation & Dynamic Compliment Logic
    let score = Math.min(95, Math.max(65, spokenText.length * 2 + 50));
    let compliment = "Good response!";
    if (spokenText.toLowerCase().includes("react") || spokenText.toLowerCase().includes("state") || spokenText.toLowerCase().includes("api")) {
      compliment = "Excellent points highlighted regarding your core stack!";
      score += 5;
    } else {
      compliment = "Thank you for sharing your experience.";
    }

    // Save to history for Scorecard Report
    const updatedHistory = [...qaHistory, { question: currentQuestion, answer: spokenText, score }];
    setQaHistory(updatedHistory);
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    // Determine Next Question based on count
    let upcomingQ = "";
    if (updatedHistory.length === 1) {
      upcomingQ = `How do you handle error handling, performance optimization, and async state updates in your projects?`;
    } else if (updatedHistory.length === 2) {
      upcomingQ = `What strategies do you use for component modularity, system scalability, and code review best practices?`;
    } else {
      upcomingQ = `You have completed all primary questions for this ${roundType} session! Click 'End & Evaluate' to view your full scorecard.`;
    }

    setTimeout(() => {
      setIsEvaluating(false);
      setLastFeedback(compliment);
      setNextQuestion(upcomingQ);

      // Append AI feedback in chat
      setMessages((prev) => [...prev, { sender: "ai", text: `${compliment} Let's proceed.` }]);

      // Trigger Pop-up Modal for Next Question
      setShowNextModal(true);
    }, 1200);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcriptResult = event.results[0][0].transcript;
          setIsListening(false);
          handleSpeechAnswer(transcriptResult);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      }
    } else {
      setIsListening(false);
    }
  };

  const proceedToNextQuestion = () => {
    setShowNextModal(false);
    if (nextQuestion) {
      setMessages((prev) => [...prev, { sender: "ai", text: nextQuestion }]);
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-28 pb-12 relative z-10 flex flex-col justify-between space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> AI Technical Assessment Room
            </h2>
            <p className="text-xs text-slate-400">
              Role: <span className="text-indigo-400 font-semibold">{setupConfig?.role || "Software Engineer"}</span> | Round: <span className="text-cyan-400 font-semibold">{setupConfig?.round || "Technical"}</span>
            </p>
          </div>
          <button
            onClick={() => router.push("/report")}
            className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-500 text-white font-semibold text-xs border border-rose-500/50 transition-all shadow-lg"
          >
            End & Evaluate
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-y-auto space-y-4 max-h-[500px] shadow-2xl">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-indigo-600/90 text-white rounded-br-none shadow-lg border border-indigo-400/30"
                    : "bg-slate-950/80 text-slate-200 border border-slate-800 rounded-bl-none shadow-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isEvaluating && (
            <div className="flex justify-start">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs text-indigo-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Evaluating response & scoring performance...
              </div>
            </div>
          )}
        </div>

        {/* Mic Control Bar */}
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center space-y-3 shadow-2xl">
          <button
            onClick={toggleMic}
            disabled={isEvaluating || showNextModal}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border ${
              isListening
                ? "bg-rose-600/90 border-rose-400 animate-pulse ring-8 ring-rose-500/20"
                : "bg-indigo-600/80 hover:bg-indigo-500 border-indigo-400/50 hover:scale-105"
            } disabled:opacity-50`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            {isListening ? "Listening to your response..." : "Tap mic to start answering"}
          </span>
        </div>

      </main>

      {/* 🚀 Next Question Modal Pop-up */}
      {showNextModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500" />
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" /> Answer Evaluated
            </div>

            <p className="text-sm text-indigo-300 italic font-medium">"{lastFeedback}"</p>

            <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl text-left space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /> Next Question:
              </span>
              <p className="text-sm font-semibold text-slate-100 leading-relaxed">{nextQuestion}</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={proceedToNextQuestion}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
              >
                Proceed to Answer <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}