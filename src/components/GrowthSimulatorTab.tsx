import React, { useState, useEffect, useRef } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Eye,
  ThumbsUp,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  Zap,
  ShieldCheck,
  Target
} from 'lucide-react';
import { VideoData, SimulationAssumptions } from '../types';
import { calculateEstimatedMetrics, DEFAULT_ASSUMPTIONS } from '../utils/growthSimulatorEngine';

interface GrowthSimulatorTabProps {
  currentVideo: VideoData;
  targetViews?: number;
  assumptions?: SimulationAssumptions;
  onNavigateTab?: (tab: string) => void;
}

export const GrowthSimulatorTab: React.FC<GrowthSimulatorTabProps> = ({
  currentVideo,
  targetViews = 100000,
  assumptions = DEFAULT_ASSUMPTIONS,
  onNavigateTab
}) => {
  // Preset timer duration in minutes
  const [selectedDurationMinutes, setSelectedDurationMinutes] = useState<number>(10);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(20); // 20x default for pleasant demonstration

  // Simulation execution state
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Target values to simulate up to
  const estimates = calculateEstimatedMetrics(targetViews, 480, assumptions, currentVideo);

  // Current animated metrics
  const totalDurationSeconds = selectedDurationMinutes * 60;
  const progressRatio = totalDurationSeconds > 0 ? Math.min(1, elapsedSeconds / totalDurationSeconds) : 0;
  // Apply realistic S-curve adoption model for views growth
  const adoptionFactor = Math.pow(progressRatio, 1.35);

  const currentSimViews = Math.round(adoptionFactor * estimates.views);
  const currentSimLikes = Math.round(adoptionFactor * estimates.likes.average);
  const currentSimSubs = Math.round(adoptionFactor * estimates.subscribers.average);
  const currentSimComments = Math.round(adoptionFactor * estimates.comments.average);
  const currentSimHours = Number((adoptionFactor * estimates.watchTimeHours).toFixed(1));

  // Timer Ref
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isRunning && !isPaused && !isComplete) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1 * (speedMultiplier / 5);
          if (next >= totalDurationSeconds) {
            setIsRunning(false);
            setIsComplete(true);
            clearInterval(timerRef.current);
            return totalDurationSeconds;
          }
          return next;
        });
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, isPaused, isComplete, totalDurationSeconds, speedMultiplier]);

  // Action Handlers
  const handleStart = () => {
    setIsComplete(false);
    setIsPaused(false);
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    setIsComplete(false);
    setElapsedSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress Log Stages
  const getLogStages = () => {
    const stages = [
      { minute: 0, text: 'Simulation started — Baseline metadata & search indexing analyzed' },
      { minute: Math.round(selectedDurationMinutes * 0.2), text: 'Traffic analysis updated — Initial impressions dispatched' },
      { minute: Math.round(selectedDurationMinutes * 0.4), text: 'SEO recommendations active — First wave organic search CTR recorded' },
      { minute: Math.round(selectedDurationMinutes * 0.7), text: 'Suggested video clusters engaged — View velocity acceleration' },
      { minute: selectedDurationMinutes, text: 'Simulation Complete — Forecasted performance scenario finalized' },
    ];
    return stages;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 sm:p-5 shadow-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-extrabold uppercase tracking-wider text-amber-300 block text-xs">
            SIMULATION — NOT REAL YOUTUBE DATA
          </span>
          <p className="text-slate-300 leading-relaxed">
            This timer simulates how a video's velocity, likes, subscribers, and watch time might evolve over time at a {targetViews.toLocaleString()} view pace. <strong>It does not create fake views, automated engagement, or bots on YouTube.</strong>
          </p>
        </div>
      </div>

      {/* Main Simulation Control Center */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1.5">
                <Timer className="w-4 h-4" />
                Live Animated Growth Simulator
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800">
                Target: {targetViews.toLocaleString()} Views
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Algorithmic Growth Time-Lapse
            </h3>
            <p className="text-xs text-slate-400">
              Run real-time or accelerated time-lapse simulations to preview growth dynamics.
            </p>
          </div>

          {/* Timer Presets: 5m, 10m, 20m, 30m */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold px-2">Duration:</span>
            {[5, 10, 20, 30].map((mins) => (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  setSelectedDurationMinutes(mins);
                  handleReset();
                }}
                disabled={isRunning}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  selectedDurationMinutes === mins
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white disabled:opacity-50'
                }`}
              >
                {mins} Min
              </button>
            ))}
          </div>
        </div>

        {/* Big Timer Clock & Playback Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Clock Display */}
          <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Simulation Timer Progress
            </div>
            <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight text-white">
              {formatTime(elapsedSeconds)}
              <span className="text-xl text-slate-500 font-normal"> / {formatTime(totalDurationSeconds)}</span>
            </div>

            {/* Status indicator */}
            <div className="flex items-center justify-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                isComplete
                  ? 'bg-emerald-400'
                  : isRunning && !isPaused
                  ? 'bg-red-500 animate-pulse'
                  : isPaused
                  ? 'bg-amber-400'
                  : 'bg-slate-600'
              }`} />
              <span className="text-xs font-bold text-slate-300">
                {isComplete
                  ? '✓ Simulation Complete'
                  : isRunning && !isPaused
                  ? 'Simulating Active Traffic Flow...'
                  : isPaused
                  ? 'Simulation Paused'
                  : 'Ready to Start'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressRatio * 100}%` }}
              />
            </div>
          </div>

          {/* Controls & Speed Selector */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {!isRunning || isPaused ? (
                <button
                  type="button"
                  onClick={isPaused ? handleResume : handleStart}
                  className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-black text-sm rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{isPaused ? 'Resume Simulation' : 'Start Simulation'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-black text-sm rounded-xl shadow-lg shadow-amber-600/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Pause className="w-4 h-4 fill-white" />
                  <span>Pause Simulation</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-slate-400" />
                <span>Reset</span>
              </button>
            </div>

            {/* Speed Multiplier */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300 font-semibold">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simulation Speed:</span>
              </div>
              <div className="flex gap-1.5">
                {[
                  { label: '1x (Real)', val: 5 },
                  { label: '5x', val: 25 },
                  { label: '20x', val: 100 },
                  { label: '60x (Turbo)', val: 300 }
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setSpeedMultiplier(s.val)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      speedMultiplier === s.val
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              * Tip: Use <strong>20x or 60x (Turbo)</strong> to test full 30-minute campaign progression in seconds.
            </p>
          </div>
        </div>

        {/* Live Animated Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5 pt-2">
          {/* Simulated Views */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Simulated Views
            </span>
            <div className="text-2xl font-black text-white font-mono">
              {currentSimViews.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">
              Goal: {estimates.views.toLocaleString()}
            </span>
          </div>

          {/* Simulated Likes */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Simulated Likes
            </span>
            <div className="text-2xl font-black text-amber-300 font-mono">
              {currentSimLikes.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">
              Avg: {estimates.likes.average.toLocaleString()}
            </span>
          </div>

          {/* Simulated Subs */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Simulated Subs
            </span>
            <div className="text-2xl font-black text-emerald-300 font-mono">
              +{currentSimSubs.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">
              Avg: {estimates.subscribers.average.toLocaleString()}
            </span>
          </div>

          {/* Simulated Comments */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Simulated Comments
            </span>
            <div className="text-2xl font-black text-indigo-300 font-mono">
              {currentSimComments.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-400">
              Avg: {estimates.comments.average.toLocaleString()}
            </span>
          </div>

          {/* Simulated Watch Time */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Watch Time (Hrs)
            </span>
            <div className="text-2xl font-black text-cyan-300 font-mono">
              {currentSimHours.toLocaleString()}h
            </div>
            <span className="text-[10px] text-slate-400">
              Avg: {estimates.watchTimeHours.toLocaleString()}h
            </span>
          </div>
        </div>

        {/* Progression Stage Log Timeline */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Campaign Progression Milestones
          </span>
          <div className="space-y-2 text-xs">
            {getLogStages().map((stage, idx) => {
              const stagePassed = elapsedSeconds >= stage.minute * 60;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                    stagePassed
                      ? 'bg-slate-900 text-slate-200 border border-slate-800'
                      : 'text-slate-500 opacity-60'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    stagePassed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                  }`}>
                    {stagePassed ? '✓' : idx + 1}
                  </span>
                  <span className="font-mono text-slate-400 font-semibold w-12">
                    {stage.minute.toString().padStart(2, '0')}:00
                  </span>
                  <span className="flex-1">{stage.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-200">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <strong className="text-emerald-300 block text-sm">Simulation Complete!</strong>
                <span>Projected target results generated based on current algorithmic models.</span>
              </div>
            </div>
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('comparison')}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-sm"
              >
                View 50K/100K Comparison Matrix &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
