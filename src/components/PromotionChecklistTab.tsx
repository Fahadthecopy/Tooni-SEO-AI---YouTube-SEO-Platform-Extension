import React, { useState } from 'react';
import {
  CheckSquare,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: 'PACKAGING' | 'ALGORITHM' | 'DISTRIBUTION' | 'MONITORING';
  title: string;
  description: string;
  isCompleted: boolean;
}

const INITIAL_ITEMS: ChecklistItem[] = [
  {
    id: 'c1',
    category: 'PACKAGING',
    title: 'Title Length & Emotional Hook Pacing',
    description: 'Ensure title is strictly ≤ 100 characters with primary keyword in first 35 characters for mobile display.',
    isCompleted: true,
  },
  {
    id: 'c2',
    category: 'PACKAGING',
    title: 'Above-The-Fold Description First 2 Lines',
    description: 'Hook the reader before the "Show More" cut and include core search intent keyword.',
    isCompleted: true,
  },
  {
    id: 'c3',
    category: 'PACKAGING',
    title: 'Character-Locked 4K Thumbnail with Mobile 120px Test',
    description: 'Thumbnail features high subject contrast, readable text (max 4 words), and no obstruction in timestamp bottom-right corner.',
    isCompleted: true,
  },
  {
    id: 'c4',
    category: 'ALGORITHM',
    title: 'Timestamps & Video Chapters (00:00 Intro)',
    description: 'Enables Google Video SERP key moment indexing and improves viewer session navigation.',
    isCompleted: false,
  },
  {
    id: 'c5',
    category: 'ALGORITHM',
    title: 'Closed Captions / Subtitles Uploaded',
    description: 'Accurate .srt or transcript enables YouTube search algorithm to crawl all spoken keywords.',
    isCompleted: false,
  },
  {
    id: 'c6',
    category: 'ALGORITHM',
    title: 'Tags Under 500-Character Threshold',
    description: 'Targeted contextual tags without spam or celebrity misdirection.',
    isCompleted: true,
  },
  {
    id: 'c7',
    category: 'DISTRIBUTION',
    title: 'Companion YouTube Short Hook Teaser',
    description: 'Create a 9:16 vertical teaser with seamless loop to funnel viewers to the full long-form video.',
    isCompleted: false,
  },
  {
    id: 'c8',
    category: 'DISTRIBUTION',
    title: 'Value-First Niche Subreddit & Community Dispatch',
    description: 'Share non-spam value posts on relevant Reddit communities, Discord servers, or Facebook groups.',
    isCompleted: false,
  },
  {
    id: 'c9',
    category: 'DISTRIBUTION',
    title: 'Cross-Posting to TikTok & Instagram Reels',
    description: 'Repurpose the best 30-second punchline or hook for external discovery.',
    isCompleted: false,
  },
  {
    id: 'c10',
    category: 'DISTRIBUTION',
    title: 'YouTube Community Tab Teaser & Poll',
    description: 'Post an engaging poll or behind-the-scenes question 2 hours prior to video launch.',
    isCompleted: false,
  },
  {
    id: 'c11',
    category: 'DISTRIBUTION',
    title: 'End Screens & Interactive Info Cards',
    description: 'Link to a tailored playlist or "Best for Viewer" recommendation in final 20 seconds.',
    isCompleted: true,
  },
  {
    id: 'c12',
    category: 'DISTRIBUTION',
    title: 'Targeted Google In-Feed Discovery Ads Setup',
    description: 'Optional $10-50 test budget on In-Feed discovery targeting exact keyword search intent.',
    isCompleted: false,
  },
  {
    id: 'c13',
    category: 'MONITORING',
    title: 'Audit First 24-Hour Retention Curve (AVD)',
    description: 'Check audience retention graph in YouTube Studio to locate any immediate drop-offs in first 30 seconds.',
    isCompleted: false,
  },
  {
    id: 'c14',
    category: 'MONITORING',
    title: 'Review Traffic Source Ratio for Browse Features',
    description: 'Verify if Browse Features & Suggested Videos begin climbing above 30% of total views.',
    isCompleted: false,
  },
];

export const PromotionChecklistTab: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(INITIAL_ITEMS);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.isCompleted).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Creator Execution Protocol
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Promotion & Algorithmic Launch Checklist
            </h3>
            <p className="text-xs text-slate-400">
              Step-by-step verified action items to maximize organic recommendation momentum upon release.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300 font-semibold">Launch Readiness:</span>
            <strong className="text-emerald-400 font-mono text-sm">{completedCount} / {items.length} ({progressPercent}%)</strong>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              item.isCompleted
                ? 'bg-slate-950/90 border-emerald-500/30 text-slate-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => {}} // handled by parent onClick
              className="mt-1 w-4 h-4 accent-emerald-500 rounded cursor-pointer flex-shrink-0"
            />
            <div className="flex-1 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${item.isCompleted ? 'text-white' : 'text-slate-300'}`}>
                  {item.title}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded ${
                  item.category === 'PACKAGING' ? 'bg-red-500/20 text-red-400' :
                  item.category === 'ALGORITHM' ? 'bg-emerald-500/20 text-emerald-400' :
                  item.category === 'DISTRIBUTION' ? 'bg-indigo-500/20 text-indigo-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
            {item.isCompleted && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
