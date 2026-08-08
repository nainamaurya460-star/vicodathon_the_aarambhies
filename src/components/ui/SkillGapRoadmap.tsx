"use client";

import React from "react";
import { BookOpen, ExternalLink, Compass } from "lucide-react";

interface SkillGapProps {
  recommendedTopics?: string[];
}

export default function SkillGapRoadmap({ recommendedTopics = [] }: SkillGapProps) {
  const topics = recommendedTopics.length > 0 
    ? recommendedTopics 
    : ["System Architecture", "State Management & React Performance", "API Edge-Case Handling"];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4 shadow-xl">
      <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
        <Compass className="w-4 h-4" /> Recommended Growth Roadmap
      </div>
      
      <p className="text-xs text-slate-400">
        Curated focus areas and learning documentation tailored to your interview performance:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
        {topics.map((topic, index) => (
          <div 
            key={index} 
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between hover:border-indigo-500/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-200">{topic}</span>
            </div>
            <a
              href={`https://google.com/search?q=${encodeURIComponent(topic + " documentation guide")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-indigo-400 transition-colors p-1"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}