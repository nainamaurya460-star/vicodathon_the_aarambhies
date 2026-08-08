import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="max-w-3xl space-y-6">
          <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-semibold tracking-wide uppercase">
            Powered by Advanced AI & Next.js
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Next-Gen AI Interview & Talent Evaluation Platform
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Simulate real-world technical interviews, receive instant AI-driven evaluations, and accelerate your career readiness.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/interview/setup"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-500/25 transition"
            >
              Start Interview
            </Link>
            <Link
              href="/report"
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium transition"
            >
              View Reports
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}