"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Send, Eye, EyeOff, Clock, Sparkles } from "lucide-react";

export default function InterviewWorkspacePage() {
  const params = useParams();
  const router = useRouter();

  const [focusMode, setFocusMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);

  const recognitionRef = useRef<any>(null);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Web Speech API initialization
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
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
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

  const handleSubmit = () => {
    // Navigate to dynamic report page on submit
    router.push(`/report/${params.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 flex flex-col items-center">
      <main className="w-full max-w-4xl space-y-6">
        {/* Header Controls */}
        <div className="flex justify-between items-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-xs text-indigo-400 font-mono font-semibold uppercase tracking-wider">
              AI Interview Workspace
            </span>
            <h1 className="text-xl font-bold">Session ID: #{params.id}</h1>
          </div>

          <Button
            variant="outline"
            onClick={() => setFocusMode(!focusMode)}
            className="border-slate-700 hover:bg-slate-800 text-slate-300 text-xs flex items-center gap-2"
          >
            {focusMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            {focusMode ? "Disable Focus Mode" : "Focus Mode"}
          </Button>
        </div>

        {/* Question Card */}
        <Card className="bg-slate-900/90 border-slate-800 text-white p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              Question 1 of 5
            </span>

            {!focusMode && (
              <div className="flex items-center gap-2 text-amber-400 text-sm font-mono bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}</span>
              </div>
            )}
          </div>

          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg font-medium leading-relaxed text-slate-100">
              Can you explain the difference between Server Components and Client Components in Next.js App Router?
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Answer Input Area with Live Voice Control */}
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
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2 px-6"
            >
              Submit Answer <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Guidance Tips */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300">Tip:</strong> Use the STAR method (Situation, Task, Action, Result) for structured technical responses. Click <span className="text-indigo-400">Voice Input</span> to speak your answer naturally.
          </p>
        </div>
      </main>
    </div>
  );
}