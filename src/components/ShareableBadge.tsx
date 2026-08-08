'use client';

import { useState } from 'react';
import { Award, Share2, CheckCircle2 } from 'lucide-react';

export default function ShareableBadge() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-md mx-auto text-center space-y-6 shadow-xl">
      <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/30">
        <Award className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-indigo-400 font-semibold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          AB Talks Synergy Badge
        </span>
        <h3 className="text-2xl font-bold text-slate-100">Job Readiness Certified</h3>
        <p className="text-sm text-slate-400">
          Successfully verified core technical competencies and AI interview evaluation metrics.
        </p>
      </div>

      <div className="bg-slate-950/50 border border-slate-800/80 rounded-xl p-4 flex items-center justify-between text-left">
        <div>
          <p className="text-xs text-slate-400">Performance Status</p>
          <p className="text-sm font-semibold text-emerald-400">Top Tier Candidate</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Readiness Score</p>
          <p className="text-sm font-semibold text-indigo-400">88% Verified</p>
        </div>
      </div>

      <button
        onClick={handleShare}
        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
      >
        {copied ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            Link Copied to Clipboard!
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share Badge & Profile
          </>
        )}
      </button>
    </div>
  );
}