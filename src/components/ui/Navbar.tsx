import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo / Title */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
            AI Interviewer
          </span>
        </Link>

        {/* Navigation Links / Status Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Live Session</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;