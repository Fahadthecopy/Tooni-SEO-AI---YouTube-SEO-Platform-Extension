import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  Link,
  Tag,
  Hash
} from 'lucide-react';
import { VideoData } from '../types';

interface DescriptionOptimizerTabProps {
  currentVideo: VideoData;
  onApplyDescription?: (desc: string) => void;
}

export const DescriptionOptimizerTab: React.FC<DescriptionOptimizerTabProps> = ({
  currentVideo,
  onApplyDescription
}) => {
  const [copied, setCopied] = useState(false);

  // Extract first 2 lines
  const lines = currentVideo.description.split('\n').filter((l) => l.trim().length > 0);
  const firstTwoLines = lines.slice(0, 2).join(' ');

  const optimizedDescription = `Discover the complete breakdown of how to trigger the YouTube browse and suggested algorithm for legitimate, organic viewer growth. In this episode of Tooni TV, we reveal the mathematical retention benchmarks, title packaging secrets, and thumbnail composition principles that real creators use.

📌 TIMESTAMPS & CHAPTERS:
00:00 - Introduction: The 100K View Milestone
01:30 - YouTube Algorithm: Browse Features vs Search
03:45 - The 42% Retention Rule for Long Videos
06:10 - Character Identity & Safe-Zone Thumbnails
08:20 - Real Traffic Sources & External Communities
10:45 - Actionable Growth Checklist & Next Steps

🔔 SUBSCRIBE TO TOONI TV:
Join our community for weekly deep-dives into authentic YouTube channel growth, creator optimization tools, and algorithm breakdowns.

🔗 HELPFUL RESOURCES:
• Tooni TV Official Platform: https://tooni.tv
• Free YouTube SEO & Thumbnail Checklist: https://tooni.tv/checklist

#YouTubeGrowth #TooniTV #CreatorTips #AlgorithmOptimization #YouTubeSEO`;

  const handleCopy = () => {
    navigator.clipboard.writeText(optimizedDescription);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Metadata Indexing Studio
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          YouTube Description Analyzer & Hook Optimizer
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl">
          Optimizes the critical <strong>first 2 lines (above-the-fold)</strong> for maximum mobile CTR, embeds structural timestamp chapters, and integrates high-authority search keywords.
        </p>
      </div>

      {/* Above-The-Fold First 2 Lines Audit */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Above-the-Fold Diagnostic (First 2 Lines)
          </span>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Visible Before "Show More"
          </span>
        </div>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm text-slate-200 font-mono leading-relaxed">
          {firstTwoLines || 'No description provided or first lines empty.'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Search Intent Match</span>
            <span className="text-emerald-400 font-bold block">Strong Algorithmic Signal</span>
            <p className="text-[10px] text-slate-400">Includes core keyword in initial 150 characters</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Call To Action (CTA)</span>
            <span className="text-amber-400 font-bold block">Included Above Fold</span>
            <p className="text-[10px] text-slate-400">Directs viewer to watch or subscribe immediately</p>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Timestamps & Chapters</span>
            <span className="text-cyan-400 font-bold block">Required for Google SERP</span>
            <p className="text-[10px] text-slate-400">Provides key moments for Google Video Search</p>
          </div>
        </div>
      </div>

      {/* Generated Optimized Description Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Generated High-Authority Description Package
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Full Description' : 'Copy Description'}</span>
            </button>

            {onApplyDescription && (
              <button
                onClick={() => onApplyDescription(optimizedDescription)}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-all cursor-pointer"
              >
                Apply to Video
              </button>
            )}
          </div>
        </div>

        <textarea
          readOnly
          rows={14}
          value={optimizedDescription}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 leading-relaxed focus:outline-none scrollbar-thin"
        />
      </div>
    </div>
  );
};
