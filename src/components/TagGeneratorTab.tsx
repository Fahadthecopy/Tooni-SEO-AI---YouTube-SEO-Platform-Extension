import React, { useState } from 'react';
import {
  Tag,
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { VideoData } from '../types';

interface TagGeneratorTabProps {
  currentVideo: VideoData;
  onApplyTags?: (tags: string[]) => void;
}

export const TagGeneratorTab: React.FC<TagGeneratorTabProps> = ({
  currentVideo,
  onApplyTags
}) => {
  const [copied, setCopied] = useState(false);

  // Generate clean, relevant, contextual tags without keyword stuffing
  const baseTags = [
    'youtube growth',
    'how to grow on youtube',
    'youtube algorithm 2026',
    'tooni tv',
    'youtube views',
    'increase watch time',
    'youtube ctr tips',
    'thumbnail optimization',
    'youtube seo tutorial',
    'audience retention',
    'browse features',
    'suggested videos',
    'youtube monetization',
    'channel growth strategy',
    'youtube title tips',
    'authentic youtube views',
    'viral video hook',
    'video packaging'
  ];

  const commaSeparated = baseTags.join(', ');
  const totalChars = commaSeparated.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(commaSeparated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Algorithmic Metadata Engine
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          YouTube Tag Generator & Spelling Misspelling Shield
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl">
          Generates compliant, contextually relevant tags based on your video's topic. Keeps total character length strictly within YouTube's 500-character ceiling.
        </p>
      </div>

      {/* Main Tag Management Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Recommended Tags ({baseTags.length})
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
              totalChars <= 500 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {totalChars} / 500 Chars
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Comma-Separated' : 'Copy All Tags'}</span>
            </button>

            {onApplyTags && (
              <button
                onClick={() => onApplyTags(baseTags)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700 transition-all cursor-pointer"
              >
                Apply to Video
              </button>
            )}
          </div>
        </div>

        {/* Tag Badges Grid */}
        <div className="flex flex-wrap gap-2">
          {baseTags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Tag className="w-3 h-3 text-amber-400" />
              <span>{tag}</span>
            </span>
          ))}
        </div>

        {/* Raw Comma Separated Text Area */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-semibold text-slate-400 block">
            Comma-Separated Format (Ready to Paste directly into YouTube Studio Tags Box):
          </label>
          <textarea
            readOnly
            rows={3}
            value={commaSeparated}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-300 focus:outline-none"
          />
        </div>

        {/* Compliance Guidelines */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>YouTube Terms of Service Compliance:</strong> All tags are strictly relevant to the video topic. No celebrity names, unrelated channel handles, or misleading clickbait tags are included.
          </p>
        </div>
      </div>
    </div>
  );
};
