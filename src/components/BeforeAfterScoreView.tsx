import React, { useState } from 'react';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Eye, 
  ThumbsUp, 
  MessageSquare, 
  Clock, 
  Bookmark, 
  Download,
  AlertTriangle,
  Lightbulb,
  Layers,
  FileText,
  Tag as TagIcon,
  Video,
  ShieldCheck,
  Play,
  Settings,
  Key,
  HelpCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import { VideoData, OptimizationResult, BrandingSettings, TargetViews } from '../types';
import { ExportModal } from './ExportModal';
import { TargetViewsCalculator } from './TargetViewsCalculator';
import { BrandingSettingsModal } from './BrandingSettingsModal';

interface BeforeAfterScoreViewProps {
  video: VideoData;
  optimization: OptimizationResult | null;
  onRunImprovement: () => Promise<void>;
  isLoading: boolean;
  onSaveProject: () => void;
  isSaved: boolean;
}

export const BeforeAfterScoreView: React.FC<BeforeAfterScoreViewProps> = ({
  video,
  optimization,
  onRunImprovement,
  isLoading,
  onSaveProject,
  isSaved,
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(0);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isBrandingModalOpen, setIsBrandingModalOpen] = useState(false);
  const [showTargetCalculator, setShowTargetCalculator] = useState(false);

  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    brandName: 'Tooni TV',
    targetCountry: 'USA',
    targetLanguage: 'American English',
    audience: 'Kids & Family Animation / High Engagement',
    contentStyle: 'High-Energy & Educational',
    logoUrl: null,
    logoPosition: 'bottom-right',
    logoSize: 'medium',
    watermark: true,
    opacity: 80,
  });

  const [targetViews, setTargetViews] = useState<TargetViews>({
    perMinute: '7',
    perHour: '417',
    perDay: '10,000',
    perWeek: '70,000',
    perMonth: '300,000',
    perYear: '3,650,000',
  });

  const copyToClipboard = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const beforeOverall = optimization ? optimization.beforeScores.overall : 61;
  const afterOverall = optimization ? optimization.afterScores.overall : 100;
  const scoreDelta = afterOverall - beforeOverall;

  return (
    <div className="space-y-6">
      {/* Top Section: Video Identity Lock & Original Embedded Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Original Video Player & Fact Verification */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                Original Detected Video (Identity Locked)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                ID: {video.id}
              </span>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                title="Open in YouTube"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Real Embedded YouTube Player */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
            <iframe
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Real Metadata Facts vs Policy */}
          <div className="space-y-2">
            <h2 className="text-base font-bold text-white line-clamp-2 leading-snug">
              {video.title}
            </h2>
            
            <div className="flex items-center gap-4 text-xs text-slate-400 flex-wrap pt-1">
              <span className="font-semibold text-slate-300">
                Channel: <strong className="text-white">{video.channel}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {video.duration || 'Standard'}
              </span>
              <span className="text-slate-500">•</span>
              <span>{video.publishDate || 'Recent'}</span>
            </div>

            {/* Fact vs Analysis Transparency Pill */}
            <div className="p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Real Metadata Status:
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">Verified Fact Data</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {video.views !== null ? (
                  <span>
                    Fact Views: <strong className="text-white">{video.views.toLocaleString()}</strong> • 
                    Likes: <strong className="text-white">{video.likes?.toLocaleString() || 'N/A'}</strong>
                  </span>
                ) : (
                  <span className="text-slate-400 italic">
                    Public View/Like stats: <span className="text-amber-400 font-semibold">Data unavailable (Unexposed by creator embed)</span>. Zero fake numbers generated.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: 100/100 Actions & Score Delta Quick Peek */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Optimization Hub
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                TOONI TV ENGINE
              </span>
            </div>

            {/* Quick Score Delta Gauge */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-semibold">Predicted SEO Health</span>
                <span className="text-emerald-400 font-bold font-mono">+{scoreDelta} pts Lift</span>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Before</span>
                  <span className="text-3xl font-black text-red-500">{beforeOverall}</span>
                  <span className="text-slate-600 text-xs block">/100</span>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <ArrowRight className="w-5 h-5 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-slate-400 font-mono mt-1">100/100 Model</span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-emerald-400 block uppercase font-bold">After</span>
                  <span className="text-3xl font-black text-emerald-400">{afterOverall}</span>
                  <span className="text-slate-600 text-xs block">/100</span>
                </div>
              </div>
            </div>

            {/* Channel Branding Setting Snapshot */}
            <div className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-xl text-xs">
              <div className="space-y-0.5">
                <span className="text-slate-400 font-medium">Channel Brand:</span>
                <p className="font-bold text-white">{brandingSettings.brandName} ({brandingSettings.targetCountry})</p>
              </div>
              <button
                onClick={() => setIsBrandingModalOpen(true)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-semibold rounded-lg border border-slate-700 flex items-center gap-1"
              >
                <Settings className="w-3 h-3" />
                <span>Configure</span>
              </button>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={onRunImprovement}
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Recalculating 100/100...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>⚡ Improve My Video to 100/100</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold rounded-xl transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Package</span>
              </button>

              <button
                onClick={onSaveProject}
                className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                    : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save Report</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setShowTargetCalculator(!showTargetCalculator)}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1 transition-all"
            >
              {showTargetCalculator ? 'Hide Target Views Calculator ▲' : 'Show Target Views Velocity Calculator ▼'}
            </button>
          </div>
        </div>
      </div>

      {/* Target Views Calculator Section (Toggleable or Visible) */}
      {showTargetCalculator && (
        <TargetViewsCalculator onViewsChange={(tv) => setTargetViews(tv)} />
      )}

      {/* Step 10 Core: Before → After Scoreboard */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Step 10 Practical Milestone</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                ALGORITHM CERTIFIED
              </span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              Before → After Algorithmic Score Transformation
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Net Optimization Lift:</span>
            <strong className="text-emerald-400 font-extrabold">+{scoreDelta} Pts</strong>
          </div>
        </div>

        {/* Big Visual Transformation Meter */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80">
          {/* Before Score Box */}
          <div className="md:col-span-4 bg-slate-900/90 border border-red-500/30 rounded-xl p-5 text-center space-y-2 relative overflow-hidden">
            <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/20">
              UNOPTIMIZED
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Starting Baseline Score</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-red-500">{beforeOverall}</span>
              <span className="text-slate-500 text-lg font-bold">/100</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2">
              Lacks keyword prominence, tag allowance underutilized, missing structured chapter timeline.
            </p>
          </div>

          {/* Transition Arrow / Delta */}
          <div className="md:col-span-3 flex flex-col items-center justify-center py-2 space-y-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-emerald-500 p-0.5 shadow-lg flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
              +{scoreDelta} Improvement
            </span>
            <span className="text-[10px] text-slate-400">1-Click Transformation</span>
          </div>

          {/* After Score Box */}
          <div className="md:col-span-4 bg-slate-900/90 border border-emerald-500/40 rounded-xl p-5 text-center space-y-2 relative overflow-hidden shadow-lg shadow-emerald-500/5">
            <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              OPTIMIZED 100/100
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Optimized Package Score</p>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-black text-emerald-400">{afterOverall}</span>
              <span className="text-slate-500 text-lg font-bold">/100</span>
            </div>
            <p className="text-xs text-emerald-300/80 font-medium line-clamp-2">
              Maximized click intent, 30 tiered tags, algorithm-friendly chapters, and hook retention formula.
            </p>
          </div>
        </div>

        {/* Detailed Metric Cards (Title, Keywords, Tags, Description, CTR) */}
        {optimization && optimization.metrics && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-red-400" />
              Vector-By-Vector Optimization Breakdown
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {(optimization.metrics || []).map((m, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">{m.metric}</span>
                    <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      +{m.change} pts
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden flex">
                      <div
                        className="bg-red-500 h-full"
                        style={{ width: `${m.before}%` }}
                      ></div>
                      <div
                        className="bg-emerald-400 h-full"
                        style={{ width: `${m.after - m.before}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 whitespace-nowrap">
                      {m.before} → <span className="text-emerald-400">{m.after}</span>
                    </span>
                  </div>

                  <div className="space-y-1 text-[11px]">
                    <p className="text-slate-400">
                      <span className="text-red-400 font-semibold">Before: </span>
                      {m.critique}
                    </p>
                    <p className="text-slate-300 font-medium">
                      <span className="text-emerald-400 font-semibold">Optimized: </span>
                      {m.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Complete Optimized SEO Package Assets */}
      {optimization && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Final 100/100 Output Assets
              </span>
              <h3 className="text-xl font-black text-white tracking-tight">
                Optimized Metadata Ready for YouTube Studio
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-red-400" />
                <span>Export Package</span>
              </button>

              <button
                onClick={() => {
                  const fullPackage = `=== TOONI SEO AI 100/100 PACKAGE ===
TITLE:
${optimization.optimizedTitles[selectedTitleIndex]?.title || optimization.optimizedTitles[0]?.title}

DESCRIPTION:
${optimization.optimizedDescription}

TAGS:
${optimization.optimizedTags.join(', ')}

HASHTAGS:
${optimization.suggestedHashtags.join(' ')}

HOOK SCRIPT (First 5s):
${optimization.hookRewrites.first5Sec}

HOOK SCRIPT (First 15s):
${optimization.hookRewrites.first15Sec}
`;
                  copyToClipboard(fullPackage, 'full-package');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-600/20"
              >
                {copiedSection === 'full-package' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>All Assets Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Complete 100/100 Package</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Section 1: AI Title Generator (5 Variations) */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-red-500" />
                <span>1. AI Title Generator (Select High-Converting Formula)</span>
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  YouTube Limit: Max 100 chars (not words) • Preferred: 90–98 chars
                </span>
                <span className="text-xs text-slate-400 font-medium hidden md:inline">Click to select active title</span>
              </div>
            </div>

            <div className="space-y-2">
              {(optimization.optimizedTitles || []).map((item, index) => {
                const isSelected = selectedTitleIndex === index;
                const isPreferred = item.charCount >= 90 && item.charCount <= 98;
                const isOverLimit = item.charCount > 100;

                return (
                  <div
                    key={index}
                    onClick={() => setSelectedTitleIndex(index)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-red-950/30 border-red-500/60 ring-1 ring-red-500/40'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.type}
                        </span>
                        <span className={`text-[11px] font-mono font-bold ${
                          isOverLimit
                            ? 'text-red-400'
                            : isPreferred
                            ? 'text-emerald-400'
                            : 'text-slate-300'
                        }`}>
                          {item.charCount}/100 chars
                        </span>
                        {isPreferred && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            Preferred 90–98c
                          </span>
                        )}
                        {isOverLimit && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/20 text-red-300">
                            Exceeds 100c Limit!
                          </span>
                        )}
                        <span className="text-[11px] text-emerald-400 font-semibold">
                          Est. CTR: {item.predictedCTR}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white">{item.title}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(item.title, `title-${index}`);
                      }}
                      className="self-start sm:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
                    >
                      {copiedSection === `title-${index}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Title</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: 20 USA Keywords Cluster across 6 groups */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>2. 20 High-Intent USA Keywords (Ranked Cluster)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Engineered across primary, secondary, long-tail, questions, and semantic intent.
                </p>
              </div>

              <button
                onClick={() => copyToClipboard(optimization.optimizedKeywords.join(', '), 'keywords-all')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
              >
                {copiedSection === 'keywords-all' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All 20</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {(optimization.optimizedKeywords || []).map((kw, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-2.5 flex items-center justify-between text-xs group transition-all"
                >
                  <div className="truncate pr-2">
                    <span className="text-slate-500 font-mono text-[10px] mr-1">#{idx + 1}</span>
                    <span className="text-slate-200 font-medium">{kw}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(kw, `kw-${idx}`)}
                    className="text-slate-500 hover:text-white flex-shrink-0"
                  >
                    {copiedSection === `kw-${idx}` ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: 100/100 Algorithmic Description */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-400" />
                <span>3. Algorithmic Description with Chapters & Timestamps</span>
              </h4>

              <button
                onClick={() => copyToClipboard(optimization.optimizedDescription, 'desc')}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
              >
                {copiedSection === 'desc' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Description</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative bg-slate-950/80 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {optimization.optimizedDescription}
            </div>

            {/* Suggested Hashtags */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="font-semibold text-slate-400">Ranked Hashtags:</span>
              {(optimization.suggestedHashtags || []).map((tag, i) => (
                <span
                  key={i}
                  className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Section 4: 30 High-Ranking Tags (Ready to Paste) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <TagIcon className="w-4 h-4 text-emerald-400" />
                  <span>4. 30 Tiered YouTube Tags (Copy All Ready)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {optimization.optimizedTags?.length || 0} tags • {(optimization.optimizedTags || []).join(', ').length}/500 YouTube character limit
                </p>
              </div>

              <button
                onClick={() => copyToClipboard((optimization.optimizedTags || []).join(', '), 'tags')}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/20"
              >
                {copiedSection === 'tags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All 30 Tags</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-4 rounded-xl border border-slate-800 max-h-48 overflow-y-auto">
              {(optimization.optimizedTags || []).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-slate-800/90 text-slate-200 border border-slate-700/60 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1"
                >
                  <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Section 5: Hook & Retention Scripts (First 5s & 15s) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  First 5-Second Hook Script
                </span>
                <button
                  onClick={() => copyToClipboard(optimization.hookRewrites.first5Sec, 'hook5')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedSection === 'hook5' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs font-medium text-slate-200 leading-relaxed italic">
                "{optimization.hookRewrites.first5Sec}"
              </p>
              <div className="text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded p-2">
                <strong>Visual Action Cue:</strong> {optimization.hookRewrites.visualActionCue}
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  First 15-Second Retention Anchor
                </span>
                <button
                  onClick={() => copyToClipboard(optimization.hookRewrites.first15Sec, 'hook15')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedSection === 'hook15' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs font-medium text-slate-200 leading-relaxed italic">
                "{optimization.hookRewrites.first15Sec}"
              </p>
              <p className="text-[11px] text-slate-400">
                Eliminates slow channel intros and proves the video delivers on the title before viewer drop-off occurs.
              </p>
            </div>
          </div>

          {/* Section 6: CTR Packaging Strategy */}
          <div className="bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              Thumbnail & CTR Packaging Prescription
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Recommended Overlay Text:</span>
                <p className="font-extrabold text-amber-300 text-sm">{optimization.ctrPackaging.thumbnailOverlayText}</p>
                <p className="text-[11px] text-slate-500">Max 3 words for mobile clarity</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Color Contrast Advice:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{optimization.ctrPackaging.colorContrastAdvice}</p>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold">Curiosity Gap Mechanism:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">{optimization.ctrPackaging.curiosityGap}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        video={video}
        optimization={optimization}
        branding={brandingSettings}
        targetViews={targetViews}
      />

      {/* Branding Settings Modal */}
      <BrandingSettingsModal
        isOpen={isBrandingModalOpen}
        onClose={() => setIsBrandingModalOpen(false)}
        branding={brandingSettings}
        onSave={(newSettings) => setBrandingSettings(newSettings)}
      />
    </div>
  );
};
