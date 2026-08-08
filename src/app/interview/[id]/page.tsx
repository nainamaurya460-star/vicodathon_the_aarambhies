"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Eye, EyeOff, Clock, Sparkles, ShieldCheck } from "lucide-react";

export default function InterviewWorkspacePage() {
  const params = useParams();
  const router = useRouter();

  // State Management
  const [focusMode, setFocusMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);

  const recognitionRef = useRef<any>(null);

  const currentQuestion =
    "Can you explain the difference between Server Components and Client Components in Next.js App Router, and when you would choose one over the other?";

  // Countdown Timer Effect
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Web Speech API Initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setTranscript(currentTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error("Speech Recognition Error:", event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, []);

  const toggleVoiceRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex >= 5) {
      router.push(`/report/${params?.id || "demo"}`);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTranscript("");
      setTimeLeft(120);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center">
      <main className="w-full max-w-5xl space-y-6">
        
        {/* Header Controls */}
        <div className="flex justify-between items-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-xs text-indigo-400 font-mono font-semibold uppercase tracking-wider">
              AB Talks AI Interview Workspace
            </span>
            <h1 className="text-xl font-bold">Session ID: #{params?.id || "Active"}</h1>
          </div>

          <Button
            variant="outline"
            onClick={() => setFocusMode(!focusMode)}
            className={`text-xs flex items-center gap-2 border transition-all ${
              focusMode
                ? "bg-emerald-950/80 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-900/30"
                : "border-slate-700 hover:bg-slate-800 text-slate-300"
            }`}
          >
            {focusMode ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4" />}
            {focusMode ? "Focus Mode: ON (Calm View)" : "Focus Mode: OFF"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Question & Answer Column */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Question Card */}
            <Card className="bg-slate-900/90 border-slate-800 text-white p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  Question {currentQuestionIndex} of 5
                </span>

                {!focusMode && (
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-mono bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>⏱️ Time Left: {formatTime(timeLeft)}</span>
                  </div>
                )}
              </div>

              <CardHeader className="p-0 mb-3">
                <CardTitle className="text-lg md:text-xl font-medium leading-relaxed text-slate-100">
                  "{currentQuestion}"
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Answer Input Area */}
            <Card className="bg-slate-900/90 border-slate-800 p-6 space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Your Response
                </label>

                <Button
                  type="button"
                  onClick={toggleVoiceRecording}
                  className={`text-xs flex items-center gap-2 transition-all ${
                    isListening
                      ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isListening ? "Stop Recording" : "Voice Input"}
                </Button>
              </div>

              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Type your response or click 'Voice Input' to speak..."
                className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600"
              />

              <div className="flex justify-end">
                <Button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 px-6"
                >
                  {currentQuestionIndex >= 5 ? "Finish & View Scorecard" : "Submit Answer"} <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar Guidance Tips */}
          <div className="space-y-6">
            <Card className="bg-slate-900/90 border-slate-800 p-5 text-white">
              <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Live Interview Guidance
              </h3>
              <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
                <li>Use the <strong>STAR method</strong> (Situation, Task, Action, Result) for structured responses.</li>
                <li>Keep your answer concise and highlight key technical terms.</li>
                <li>Turn on <strong>Focus Mode</strong> if live timers distract you.</li>
              </ul>
            </Card>

            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-300">Tip:</strong> Click <span className="text-indigo-400">Voice Input</span> to speak your answer naturally. Web Speech API will auto-transcribe your speech.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}