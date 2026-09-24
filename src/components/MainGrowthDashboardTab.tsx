import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Target,
  Eye,
  ThumbsUp,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  AlertTriangle,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Share2,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { VideoData, TargetPreset, SimulationAssumptions } from '../types';
import { calculateEstimatedMetrics, DEFAULT_ASSUMPTIONS, saveHistoryRecord } from '../utils/growthSimulatorEngine';

interface MainGrowthDashboardTabProps {
  currentVideo: VideoData;
  onNavigateTab: (tab: string) => void;
  onSelectTarget?: (target: number) => void;
  assumptions?: SimulationAssumptions;
}

export const MainGrowthDashboardTab: React.FC<MainGrowthDashboardTabProps> = ({
  currentVideo,
  onNavigateTab,
  onSelectTarget,
  assumptions = DEFAULT_ASSUMPTIONS
}) => {
  const [targetPreset, setTargetPreset] = useState<TargetPreset>('100k');
  const [customViews, setCustomViews] = useState<number>(100000);
  const [selectedViews, setSelectedViews] = useState<number>(100000);

  // Animated counters state
  const [animatedViews, setAnimatedViews] = useState<number>(0);
  const [animatedLikes, setAnimatedLikes] = useState<number>(0);
  const [animatedSubs, setAnimatedSubs] = useState<number>(0);
  const [animatedComments, setAnimatedComments] = useState<number>(0);
  const [animatedHours, setAnimatedHours] = useState<number>(0);

  const currentViewsCount = currentVideo.views || 12500;
  const currentLikesCount = currentVideo.likes || 680;
  const currentSubsCount = 1850;
  const currentCommentsCount = currentVideo.comments || 42;
  const currentWatchHours = Number(((currentViewsCount * 185) / 3600).toFixed(1));

  // Switch presets
  const handleSelectPreset = (preset: TargetPreset) => {
    setTargetPreset(preset);
    let target = 100000;
    if (preset === '50k') target = 50000;
    else if (preset === '100k') target = 100000;
    else target = customViews;

    setSelectedViews(target);
    if (onSelectTarget) onSelectTarget(target);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1000, parseInt(e.target.value || '0', 10));
    setCustomViews(val);
    setTargetPreset('custom');
    setSelectedViews(val);
    if (onSelectTarget) onSelectTarget(val);
  };

  const remainingViews = Math.max(0, selectedViews - currentViewsCount);

  // Calculate estimated metrics based on current assumptions
  const estimates = calculateEstimatedMetrics(
    selectedViews,
    480, // 8 min default
    assumptions,
    currentVideo
  );

  // Smooth counter animation when target changes
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 750; // ms

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedViews(Math.floor(easeOut * estimates.views));
      setAnimatedLikes(Math.floor(easeOut * estimates.likes.average));
      setAnimatedSubs(Math.floor(easeOut * estimates.subscribers.average));
      setAnimatedComments(Math.floor(easeOut * estimates.comments.average));
      setAnimatedHours(Number((easeOut * estimates.watchTimeHours).toFixed(1)));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [selectedViews, assumptions]);

  // Save analysis snapshot to history
  const handleSaveToHistory = () => {
    saveHistoryRecord({
      id: 'rec-' + Date.now(),
      videoUrl: currentVideo.url,
      videoTitle: currentVideo.title,
      channelName: currentVideo.channel || 'Tooni TV Creator',
      date: new Date().toLocaleDateString(),
      currentViews: currentViewsCount,
      targetViews: selectedViews,
      remainingViews,
      seoScore: estimates.seoScore,
      thumbnailScore: estimates.thumbnailScore,
      targetPreset,
      forecastLikes: estimates.likes.average,
      forecastSubscribers: estimates.subscribers.average,
      forecastComments: estimates.comments.average,
      forecastWatchHours: estimates.watchTimeHours,
      keyTrafficSource: 'YouTube Browse & Suggested'
    });
    alert('Growth forecast snapshot saved to History!');
  };

  return (
    <div className="space-y-6">
      {/* Top Compliance & Anti-Fake Engagement Notice Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-extrabold text-sm sm:text-base">
                Tooni TV Real YouTube Growth Platform & Simulator
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Policy Compliant
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              <strong>Zero Artificial Engagement:</strong> This platform helps creators plan, optimize, and simulate real organic growth. All projections below are <strong>ESTIMATED / SIMULATED</strong> algorithms and mathematical models. We never generate fake views, bot traffic, automated likes, or artificial subscribers.
            </p>
          </div>
        </div>

        <button
          onClick={handleSaveToHistory}
          className="flex-shrink-0 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Save Snapshot</span>
        </button>
      </div>

      {/* Target Options Selector (50K / 100K / Custom) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Target Growth Objectives</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
              Select YouTube Target Views
            </h3>
            <p className="text-xs text-slate-400">
              Calculate projected audience conversion and remaining view gap for legitimate acquisition.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Target Mode:</span>
            <strong className="text-emerald-400 font-mono font-bold uppercase">{targetPreset}</strong>
          </div>
        </div>

        {/* 3 Main Preset Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Preset 1: 50K Views */}
          <button
            type="button"
            onClick={() => handleSelectPreset('50k')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
              targetPreset === '50k'
                ? 'bg-gradient-to-br from-red-600/30 to-slate-900 border-red-500 shadow-lg shadow-red-600/10'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Option 1</span>
              {targetPreset === '50k' && (
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              )}
            </div>
            <div className="text-2xl font-black text-white">50K REAL VIEWS</div>
            <p className="text-xs text-slate-400 mt-1">
              Algorithmic momentum baseline for channel authority breakthrough.
            </p>
          </button>

          {/* Preset 2: 100K Views */}
          <button
            type="button"
            onClick={() => handleSelectPreset('100k')}
            className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
              targetPreset === '100k'
                ? 'bg-gradient-to-br from-red-600/30 to-slate-900 border-red-500 shadow-lg shadow-red-600/10'
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Option 2 (Most Popular)</span>
              {targetPreset === '100k' && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              )}
            </div>
            <div className="text-2xl font-black text-white">100K REAL VIEWS</div>
            <p className="text-xs text-slate-400 mt-1">
              Exponential Browse Feature trigger velocity across global audiences.
            </p>
          </button>

          {/* Custom Target Input */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              targetPreset === 'custom'
                ? 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500 shadow-lg'
                : 'bg-slate-950 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Custom Target</span>
              <span className="text-[10px] text-slate-400">Any Goal</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number"
                min="1000"
                step="5000"
                value={customViews}
                onChange={handleCustomChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-lg font-black text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="e.g. 250000"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Enter any custom view target to model conversion rates.
            </p>
          </div>
        </div>

        {/* Current vs Target vs Remaining Progress Bar */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-2">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Current Views:</span>
              <strong className="text-white font-mono text-sm">{currentViewsCount.toLocaleString()}</strong>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Target Views:</span>
              <strong className="text-emerald-400 font-mono text-sm">{selectedViews.toLocaleString()}</strong>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Remaining Views to Acquire:</span>
              <strong className="text-amber-400 font-mono text-sm">+{remainingViews.toLocaleString()}</strong>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(5, (currentViewsCount / selectedViews) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ANIMATED LIVE-STYLE FORECAST METRICS CARDS               */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Projected Performance At Target — Smooth Live Simulation
            </h4>
          </div>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            SIMULATION — NOT REAL YOUTUBE DATA
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {/* 1. Projected Views */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Views</span>
              <Eye className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-white font-mono">
              {animatedViews.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-400 font-bold block">
              Target Goal Pace
            </span>
            <div className="text-[9px] text-slate-400">ESTIMATED</div>
          </div>

          {/* 2. Projected Likes */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Likes</span>
              <ThumbsUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300 font-mono">
              {animatedLikes.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Range: {estimates.likes.min.toLocaleString()} – {estimates.likes.max.toLocaleString()}
            </span>
            <div className="text-[9px] text-slate-400">{assumptions.likeRateMin}%–{assumptions.likeRateMax}% assumption</div>
          </div>

          {/* 3. Projected Subscribers */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Subs</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300 font-mono">
              +{animatedSubs.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Range: {estimates.subscribers.min.toLocaleString()} – {estimates.subscribers.max.toLocaleString()}
            </span>
            <div className="text-[9px] text-slate-400">{assumptions.subConversionMin}%–{assumptions.subConversionMax}% conversion</div>
          </div>

          {/* 4. Projected Comments */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Estimated Comments</span>
              <MessageSquare className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-300 font-mono">
              {animatedComments.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              Range: {estimates.comments.min.toLocaleString()} – {estimates.comments.max.toLocaleString()}
            </span>
            <div className="text-[9px] text-slate-400">{assumptions.commentRateMin}%–{assumptions.commentRateMax}% assumption</div>
          </div>

          {/* 5. Projected Watch Time */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-1 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Watch Time Hours</span>
              <Clock className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono">
              {animatedHours.toLocaleString()}h
            </div>
            <span className="text-[10px] text-slate-400 font-medium block">
              ~{estimates.watchTimeMinutes.toLocaleString()} mins
            </span>
            <div className="text-[9px] text-slate-400">Views × {assumptions.avgViewDurationPercent}% AVD</div>
          </div>
        </div>
      </div>

      {/* Engagement Rates & Algorithmic Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Engagement Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs text-slate-400 font-semibold block">Total Engagement Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{estimates.engagementRate}%</span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">High Health</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Combined Likes, Comments, and Subscriber conversion over total view volume.
          </p>
        </div>

        {/* Click-Through Rate (CTR) */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs text-slate-400 font-semibold block">Estimated CTR</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-300">{estimates.ctr}%</span>
            <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">Browse Standard</span>
          </div>
          <p className="text-[11px] text-slate-400">
            YouTube browse feed average click rate with clean character-locked thumbnail.
          </p>
        </div>

        {/* Audience Retention */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs text-slate-400 font-semibold block">Audience Retention (AVD)</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-cyan-300">{estimates.audienceRetention}%</span>
            <span className="text-xs text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">Solid Evergreen</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Average percentage viewed per impression session across recommended channels.
          </p>
        </div>

        {/* SEO Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs text-slate-400 font-semibold block">Algorithmic Readiness</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400">{estimates.seoScore}/100</span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Optimized</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Metadata keyword alignment, 100-char title pacing, and video indexing strength.
          </p>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Next Planning & Optimization Steps</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Test progression timer, configure traffic sources, or optimize video packaging.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigateTab('simulator')}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Live Timer Simulator</span>
          </button>

          <button
            onClick={() => onNavigateTab('traffic-planner')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real Traffic Planner</span>
          </button>

          <button
            onClick={() => onNavigateTab('ads-planner')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Google Ads Calculator</span>
          </button>

          <button
            onClick={() => onNavigateTab('thumbnail')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Thumbnail Studio</span>
          </button>
        </div>
      </div>
    </div>
  );
};
