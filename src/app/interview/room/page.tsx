'use client';

import { useState } from 'react';
import Link from 'next/link';
// 1. Import Karein
import GlowingVoiceOrb from '@/components/ui/GlowingVoiceOrb';

export default function InterviewRoom() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! Welcome to your technical interview. Let us start with your core tech stack. Can you explain how React handles state updates efficiently?' }
  ]);
  
  // 2. State manage karne ke liye ki abhi mic sun raha hai ya nahi
  const [isRecording, setIsRecording] = useState(false);

  // 3. Function jo recording state ko toggle karega (Click karne par)
  const handleMicClick = (nowListening: boolean) => {
    setIsRecording(nowListening);
    
    // Agar abhi start hui hai, toh 3 second baad AI ko respond karne ka simulation
    if (nowListening) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: 'ai', text: 'Thank you for your response on React state. Let us move to the next question: What is the virtual DOM?' }
        ]);
        // Wapas idle state pe aa jayein
        setIsRecording(false);
      }, 3500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-900/50">
        <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          AI Interview Room
        </h1>
        <Link
          href="/report"
          className="px-4 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 text-sm font-medium transition"
        >
          End & Evaluate
        </Link>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col justify-between">
        <div className="space-y-4 overflow-y-auto py-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl px-4 py-3 text-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* 4. Yahan Call Karein Glowing Orb Component ko */}
        <div className="mt-6 border-t border-slate-800/80 pt-4 flex flex-col items-center">
          <GlowingVoiceOrb 
            isListening={isRecording} 
            setIsListening={handleMicClick} //Recording state change handle karega
          />
        </div>
      </div>
    </div>
  );
}