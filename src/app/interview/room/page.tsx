'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldAlert, Cpu, Mic, MicOff } from 'lucide-react';

export default function InterviewRoom() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! Welcome to your technical interview. Let us start with your core tech stack. Can you explain how React handles state updates efficiently?' }
  ]);
  
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    isListeningRef.current = isRecording;
  }, [isRecording]);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onend = () => {
        if (isListeningRef.current) {
          try {
            recognition.start();
          } catch (err) {
            console.error('Speech recognition auto-restart error:', err);
          }
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'no-speech' && isListeningRef.current) {
          try {
            recognition.start();
          } catch (e) {}
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (e) {}
    } else {
      setIsRecording(false);
      try {
        recognitionRef.current?.stop();
      } catch (e) {}

      if (transcript.trim()) {
        setMessages((prev) => [
          ...prev,
          { sender: 'user', text: transcript },
          { sender: 'ai', text: 'Thank you for your response. Let us move to the next coding challenge: Virtual DOM optimization.' }
        ]);
        setTranscript('');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100">
      <header className="border-b border-slate-800/80 p-4 px-6 flex justify-between items-center bg-slate-900/40 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-semibold text-base tracking-wide bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              AI Technical Assessment Room
            </h1>
            <p className="text-xs text-slate-400">Session ID: #AKTU-AI-2026</p>
          </div>
        </div>

        <Link
          href="/report"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/25 text-xs font-medium transition-all duration-300 shadow-sm"
        >
          <ShieldAlert className="w-4 h-4" />
          End & Evaluate
        </Link>
      </header>

      <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col justify-between">
        <div className="space-y-6 overflow-y-auto py-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-xs shadow-indigo-600/20'
                    : 'bg-slate-900/80 border border-slate-800/80 text-slate-200 rounded-bl-xs backdrop-blur-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isRecording && transcript && (
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-xl rounded-2xl px-5 py-3.5 text-sm leading-relaxed bg-indigo-600/40 border border-indigo-500/40 text-slate-200 italic shadow-lg">
                <span className="text-indigo-300 font-semibold not-italic">Listening... </span>
                {transcript}
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Native Voice Controller */}
        <div className="mt-8 border-t border-slate-800/60 pt-6 flex flex-col items-center bg-slate-900/20 rounded-3xl p-6 backdrop-blur-md border border-slate-800/40">
          <button
            onClick={toggleMic}
            className={`p-6 rounded-full transition-all duration-300 flex items-center justify-center border-2 ${
              isRecording
                ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse shadow-lg shadow-red-500/30'
                : 'bg-indigo-600/20 border-indigo-500 text-indigo-400 hover:bg-indigo-600/30'
            }`}
          >
            {isRecording ? <Mic className="w-8 h-8" /> : <MicOff className="w-8 h-8" />}
          </button>
          <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isRecording ? '🔴 Listening (Pause won\'t stop mic)' : 'Tap mic to start answering'}
          </span>
        </div>
      </div>
    </div>
  );
}