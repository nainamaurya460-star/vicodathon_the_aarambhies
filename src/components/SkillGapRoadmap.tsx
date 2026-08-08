'use client';

import { BookOpen, ExternalLink, CheckCircle } from 'lucide-react';

export default function SkillGapRoadmap() {
  const recommendations = [
    {
      title: 'Advanced React Performance & State Optimization',
      description: 'Learn memoization, useMemo, useCallback, and efficient virtual DOM reconciliation.',
      link: 'https://react.dev'
    },
    {
      title: 'Memory Leak Prevention in Custom Hooks',
      description: 'Understand cleanup functions, useEffect dependencies, and resource management.',
      link: 'https://react.dev/reference/react/useEffect'
    }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto space-y-6 shadow-xl">
      <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
        <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center border border-indigo-500/20">
          <BookOpen className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100">Curated Skill Gap Roadmap</h3>
          <p className="text-xs text-slate-400">Personalized documentation links based on your interview areas of improvement.</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((item, index) => (
          <div key={index} className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex items-start justify-between gap-4 transition hover:border-indigo-500/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
              </div>
              <p className="text-xs text-slate-400 pl-6">{item.description}</p>
            </div>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 text-xs font-medium transition flex items-center gap-1 shrink-0"
            >
              Read Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}