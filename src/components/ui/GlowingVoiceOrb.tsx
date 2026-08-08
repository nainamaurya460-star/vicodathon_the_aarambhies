"use client";

import React, { useRef } from "react";
import { Mic, LoaderCircle } from "lucide-react";

interface GlowingVoiceOrbProps {
  isListening: boolean;
  setIsListening?: (listening: boolean) => void;
}

export default function GlowingVoiceOrb({ isListening, setIsListening }: GlowingVoiceOrbProps) {
  // 1. Yahan useRef declare kiya hai taaki mic stream ko track kar sakein
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // 2. Mic click handle karne ka function jisme physical stream kill fix hai
  const handleMicClick = async () => {
    const nextState = !isListening;

    if (nextState) {
      try {
        // Mic on hone par hardware stream capture karein
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
        setIsListening?.(true);
      } catch (err) {
        console.error("Microphone access denied or error:", err);
      }
    } else {
      // Mic band/mute hone par physical hardware stream ko poori tarah kill/stop kar dein
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setIsListening?.(false);
    }
  };

  const statusText = isListening ? "I'm listening... speak now" : "Tap the mic to start answering";

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-8 w-full">
      <div className="relative flex items-center justify-center">
        {!isListening && (
          <div className="absolute w-48 h-48 rounded-full bg-cyan-900/20 border border-cyan-500/10 blur-sm animate-pulse" style={{ animationDuration: '3s' }}></div>
        )}

        {isListening && (
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 blur-3xl opacity-70 animate-pulse"></div>
        )}

        <div 
          className={`relative w-40 h-40 rounded-full p-1 flex items-center justify-center transition-all duration-1000 
            ${isListening ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 animate-spin' : 'bg-slate-700/50'}`}
          style={{ animationDuration: '7s' }}
        >
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center shadow-2xl">
            <button 
              onClick={handleMicClick}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-105 group
                ${isListening ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                <LoaderCircle className="w-10 h-10 animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
        
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border text-[10px] font-semibold tracking-widest flex items-center gap-1.5 transition-all duration-500 
          ${isListening ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-inner' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
          <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
          {isListening ? "LIVE" : "IDLE"}
        </div>
      </div>

      <div className="text-center min-h-6">
        <p className={`text-sm font-medium tracking-wide transition-all duration-500 ${isListening ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400 animate-pulse' : 'text-slate-400'}`}>
          {statusText}
        </p>
      </div>
    </div>
  );
}