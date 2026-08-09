"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceRecorderProps {
  onTranscriptChange: (text: string) => void;
}

export default function VoiceRecorder({ onTranscriptChange }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports Web Speech API
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) {
          onTranscriptChange(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        stopRecording();
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      // Cleanup on unmount: Abort any active recognition
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [onTranscriptChange]);

  const startRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    } else {
      alert("Speech Recognition is not supported in your browser.");
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      try {
        // Stop capturing audio immediately
        recognitionRef.current.stop();
        recognitionRef.current.abort(); // FORCE CLEAR BUFFER & LISTENERS
      } catch (err) {
        console.error("Failed to stop speech recognition:", err);
      }
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleRecording}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-xs transition-all ${
          isRecording
            ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse"
            : "bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30"
        }`}
      >
        {isRecording ? (
          <>
            {/* Active Recording Ripple Effect */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <MicOff className="w-4 h-4" /> Stop Recording
          </>
        ) : (
          <>
            <Mic className="w-4 h-4 text-purple-400" /> Start Voice Input
          </>
        )}
      </button>
    </div>
  );
}