"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";

interface VoiceRecorderProps {
  onTranscriptChange: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({ onTranscriptChange, disabled }: VoiceRecorderProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Web Speech API browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in this browser. Please type your answer.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      onTranscriptChange(currentTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone permission denied. Please allow mic access or use text input.");
      } else {
        setError("Voice input error. You can continue typing manually.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onTranscriptChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setError(null);
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button
          type="button"
          disabled={disabled || !!error}
          onClick={toggleListening}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${
            isListening
              ? "bg-rose-500/10 border-rose-500/50 text-rose-400 animate-pulse shadow-lg shadow-rose-500/20"
              : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
          } disabled:opacity-50`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isListening ? "Stop Recording" : "Start Voice Input"}
        </button>

        {isListening && (
          <span className="text-xs text-rose-400 flex items-center gap-1.5 animate-pulse font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Transcribing speech in real-time...
          </span>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}