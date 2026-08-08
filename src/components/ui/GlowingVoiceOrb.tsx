"use client";

import React from "react";
import { Mic, LoaderCircle } from "lucide-react";

interface GlowingVoiceOrbProps {
  isListening: boolean;
  setIsListening?: (listening: boolean) => void;
}

export default function GlowingVoiceOrb({ isListening, setIsListening }: GlowingVoiceOrbProps) {
  // Dynamic text based on state
  const statusText = isListening ? "I'm listening... speak now" : "Tap the mic to start answering";

  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-8 w-full">
      {/* Outer Container */}
      <div className="relative flex items-center justify-center">
        
        {/* 
           💡 STEP 1: IDLE / INACTIVE STATE 
           Jab sun nahi raha, toh ek halki si cyan glow dikhegi 
        */}
        {!isListening && (
          <div className="absolute w-48 h-48 rounded-full bg-cyan-900/20 border border-cyan-500/10 blur-sm animate-pulse" style={{ animationDuration: '3s' }}></div>
        )}

        {/* 
           💡 STEP 2: ACTIVE / LISTENING STATE 
           Jab sun raha ho, toh background mein bada gradient pulse karega 
        */}
        {isListening && (
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 blur-3xl opacity-70 animate-pulse"></div>
        )}

        {/* 
           💡 STEP 3: THE MAIN ORB / RING 
           Idle pe halka border, Active pe ghumta hua gradient ring 
        */}
        <div 
          className={`relative w-40 h-40 rounded-full p-1 flex items-center justify-center transition-all duration-1000 
            ${isListening ? 'bg-gradient-to-tr from-cyan-400 via-indigo-500 to-fuchsia-500 animate-spin' : 'bg-slate-700/50'}`}
          style={{ animationDuration: '7s' }} // Very slow smooth spin
        >
          {/* Inner Dark Circle */}
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center shadow-2xl">
            
            {/* 
               💡 STEP 4: MIC ICON & CLICK BUTTON 
               Idle pe gray, Active pe white + glowing shadow 
            */}
            <button 
              onClick={() => setIsListening?.(!isListening)}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 transform hover:scale-105 group
                ${isListening ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/50' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              aria-label={isListening ? "Stop listening" : "Start listening"}
            >
              {isListening ? (
                // Active animation
                <LoaderCircle className="w-10 h-10 animate-spin" style={{ animationDuration: '3s' }} />
              ) : (
                // Idle icon
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>
        </div>
        
        {/* LIVE/IDLE Indicator Tag */}
        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border text-[10px] font-semibold tracking-widest flex items-center gap-1.5 transition-all duration-500 
          ${isListening ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-inner' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
          <span className={`w-2 h-2 rounded-full ${isListening ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`}></span>
          {isListening ? "LIVE" : "IDLE"}
        </div>
      </div>

      {/* Animated Status Text */}
      <div className="text-center min-h-6">
        <p className={`text-sm font-medium tracking-wide transition-all duration-500 ${isListening ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-fuchsia-400 animate-pulse' : 'text-slate-400'}`}>
          {statusText}
        </p>
      </div>
    </div>
  );
}