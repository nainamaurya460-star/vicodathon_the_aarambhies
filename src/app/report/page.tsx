"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InterviewRoomPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    // 1. Load configuration and questions setup in Step 1
    const storedConfig = JSON.parse(localStorage.getItem("active_interview_config") || "{}");
    const storedQuestions = JSON.parse(localStorage.getItem("interview_questions") || "[]");

    setConfig(storedConfig);

    if (storedQuestions.length > 0) {
      setQuestions(storedQuestions);
    } else {
      // Fallback default dynamic questions if missing
      setQuestions([
        "Tell me about a challenging project you built using modern web frameworks.",
        "How do you handle state management and performance optimization in React/Next.js?",
        "Explain a situation where you had to debug a difficult runtime error."
      ]);
    }
  }, []);

  const handleNextQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAnswer.trim()) return;

    // 2. Append answer to session_answers cache
    const existingAnswers = JSON.parse(localStorage.getItem("session_answers") || "[]");
    const newAnswerObj = {
      question: questions[currentIndex],
      answer: userAnswer
    };
    const updatedAnswers = [...existingAnswers, newAnswerObj];
    localStorage.setItem("session_answers", JSON.stringify(updatedAnswers));

    // Clear textarea input
    setUserAnswer("");

    // 3. Navigate to next question or finalize to report page
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push("/report/1");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-6">
      {/* Header Info */}
      <header className="flex justify-between items-center max-w-4xl w-full mx-auto pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
            {config?.role || "Software Engineer"} Candidate Assessment
          </span>
          <h2 className="text-lg font-bold">
            Question {questions.length > 0 ? currentIndex + 1 : 0} of {questions.length}
          </h2>
        </div>
        <button
          onClick={() => router.push("/report/1")}
          className="text-xs bg-red-950 hover:bg-red-900 text-red-300 px-3 py-1.5 rounded-lg border border-red-800"
        >
          Finish Session Early
        </button>
      </header>

      {/* Main Question & Answer Interface */}
      <main className="max-w-4xl w-full mx-auto my-auto py-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-6">
          <p className="text-sm text-slate-400 mb-1 font-medium">Interviewer Question:</p>
          <h3 className="text-xl font-semibold text-slate-100">
            {questions[currentIndex] || "Loading interviewer question..."}
          </h3>
        </div>

        <form onSubmit={handleNextQuestion} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
              Your Verbal / Text Response
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-white focus:outline-none focus:border-indigo-500 h-40"
              placeholder="Type your response or use mic voice input..."
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium transition"
            >
              {currentIndex < questions.length - 1 ? "Submit & Next Question →" : "Submit & Complete Interview 🏁"}
            </button>
          </div>
        </form>
      </main>

      {/* Footer Status */}
      <footer className="text-center text-xs text-slate-500">
        AI Evaluation Engine Active • Vicodathon Session
      </footer>
    </div>
  );
}