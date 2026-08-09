"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StarBackground from "@/components/ui/StarBackground";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { Mic, MicOff, Sparkles, Loader2 } from "lucide-react";

export default function InterviewRoomPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Array<{ sender: "ai" | "user"; text: string }>>([]);
  const [isListening, setIsListening] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qaHistory, setQaHistory] = useState<Array<{ question: string; answer: string }>>([]);
  const [setupConfig, setSetupConfig] = useState<any>(null);

  useEffect(() => {
    // Session Storage se setup details read karein
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

    // Context based first question trigger
    generateInitialQuestion(config);
  }, []);

  const generateInitialQuestion = async (config: any) => {
    setIsGenerating(true);
    const initialPrompt = `Welcome candidate to the interview. Ask the first distinct question tailored for Role: ${config.role}, Level: ${config.level}, Round: ${config.round}. Job Details: ${config.jd}. Keep it single-question format.`;
    
    // Static contextual starting fallback matching selected round
    const defaultStart = `Hello! Welcome to your ${config.round} for the ${config.role} position. Let us begin: Based on your domain focus (${config.jd || config.role}), can you briefly walk me through your technical experience and key skills?`;
    
    setMessages([
      {
        sender: "ai",
        text: defaultStart,
      },
    ]);
    setIsGenerating(false);
  };

  const handleSpeechAnswer = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    const currentQuestion = messages[messages.length - 1]?.text || "Interview Question";
    const updatedHistory = [...qaHistory, { question: currentQuestion, answer: spokenText }];
    setQaHistory(updatedHistory);
    sessionStorage.setItem("qa_history", JSON.stringify(updatedHistory));

    // Show user answer in UI
    setMessages((prev) => [...prev, { sender: "user", text: spokenText }]);
    setIsGenerating(true);

    // Setup Context के आधार पर Agla Question Generate करना
    const roundType = setupConfig?.round || "Technical Assessment";
    const roleTitle = setupConfig?.role || "Software Developer";

    let nextQuestionText = "";

    // Round-Specific Dynamic Next Question Logic
    if (qaHistory.length === 0) {
      if (roundType.includes("Behavioral") || roundType.includes("HR")) {
        nextQuestionText = `Thank you. For a ${roundType} scenario, describe a challenging problem you faced in a recent project and how you resolved it with your team.`;
      } else if (roundType.includes("System Design")) {
        nextQuestionText = `Good response. Moving to system design for a ${roleTitle}: How would you architecture high availability and caching in a web application?`;
      } else {
        nextQuestionText = `Great. Let's move to core technical concepts: How do you handle error handling, performance optimization, and async state updates in your projects?`;
      }
    } else if (qaHistory.length === 1) {
      nextQuestionText = `Understood. Next question: How do you ensure code scalability, testing, and proper security best practices before deploying to production?`;
    } else {
      nextQuestionText = `Thank you! You have completed all key evaluation questions for this ${roundType} session. Click 'End & Evaluate' above to view your detailed performance report.`;
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "ai", text: nextQuestionText }]);
      setIsGenerating(false);
    }, 1000);
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

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      <StarBackground />
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 pt-28 pb-12 relative z-10 flex flex-col justify-between space-y-6">
        
        {/* Top Header & End Button */}
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

        {/* Chat History Container (Exact UI Styling) */}
        <div className="flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-y-auto space-y-4 max-h-[520px] shadow-2xl">
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

          {isGenerating && (
            <div className="flex justify-start">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-xs text-indigo-400 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Generating round-specific evaluation question...
              </div>
            </div>
          )}
        </div>

        {/* Mic Control Bar */}
        <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 flex flex-col items-center justify-center space-y-3 shadow-2xl">
          <button
            onClick={toggleMic}
            disabled={isGenerating}
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

      <Footer />
    </div>
  );
}