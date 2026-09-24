import React, { useState } from 'react';
import {
  Clock,
  Calculator,
  Film,
  Smartphone,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Award,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { calculateWatchTimeDetails } from '../utils/growthSimulatorEngine';

export const WatchTimeCalculatorTab: React.FC = () => {
  const [videoType, setVideoType] = useState<'Long Video' | 'Short'>('Long Video');
  const [videoLengthMinutes, setVideoLengthMinutes] = useState<number>(8);
  const [videoLengthSeconds, setVideoLengthSeconds] = useState<number>(30);
  const [viewsInput, setViewsInput] = useState<number>(50000);
  const [retentionPercent, setRetentionPercent] = useState<number>(45);

  const totalLengthInSeconds =
    videoType === 'Short'
      ? Math.min(60, videoLengthSeconds || 45)
      : videoLengthMinutes * 60 + videoLengthSeconds;

  const result = calculateWatchTimeDetails(
    videoType,
    totalLengthInSeconds,
    viewsInput,
    undefined,
    retentionPercent
  );

  // YouTube Monetization benchmark: 4,000 public watch hours
  const monetizationProgress = Math.min(100, Math.round((result.totalHoursWatched / 4000) * 100));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            Dedicated YouTube Watch Time & Retention Engine
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Watch Time & View Duration Calculator
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl">
          Calculates total minutes and hours watched using the standard YouTube algorithm formula: <strong>Watch Time = Total Views × Average View Duration (AVD)</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Inputs */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Calculation Parameters</span>
          </h4>

          {/* Video Type Toggle: Long vs Short */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Video Format:</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setVideoType('Long Video');
                  setRetentionPercent(45);
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  videoType === 'Long Video'
                    ? 'bg-cyan-600 text-white border-cyan-500 shadow-md shadow-cyan-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" />
                <span>Long Video (Standard)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setVideoType('Short');
                  setRetentionPercent(85);
                  setVideoLengthSeconds(45);
                }}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                  videoType === 'Short'
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md shadow-amber-600/20'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>YouTube Short (Vertical)</span>
              </button>
            </div>
          </div>

          {/* Video Length Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Video Length:
            </label>
            {videoType === 'Long Video' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Minutes</span>
                  <input
                    type="number"
                    min="0"
                    max="600"
                    value={videoLengthMinutes}
                    onChange={(e) => setVideoLengthMinutes(Math.max(0, parseInt(e.target.value || '0', 10)))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Seconds</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={videoLengthSeconds}
                    onChange={(e) => setVideoLengthSeconds(Math.max(0, parseInt(e.target.value || '0', 10)))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Duration (max 60s)</span>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={videoLengthSeconds}
                  onChange={(e) => setVideoLengthSeconds(Math.min(60, Math.max(5, parseInt(e.target.value || '0', 10))))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}
          </div>

          {/* Total Views Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-semibold">Total Views Projected:</label>
              <span className="text-cyan-400 font-mono font-bold">{viewsInput.toLocaleString()}</span>
            </div>
            <input
              type="number"
              min="100"
              step="5000"
              value={viewsInput}
              onChange={(e) => setViewsInput(Math.max(0, parseInt(e.target.value || '0', 10)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-cyan-500"
            />
            <div className="flex gap-2 pt-1">
              {[10000, 50000, 100000, 250000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setViewsInput(preset)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    viewsInput === preset
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {preset >= 1000 ? `${preset / 1000}k` : preset}
                </button>
              ))}
            </div>
          </div>

          {/* Retention Slider */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="retention-slider" className="text-slate-300 font-semibold">Average Retention (APV %):</label>
              <span className="text-emerald-400 font-mono font-bold text-sm">{retentionPercent}%</span>
            </div>
            <input
              id="retention-slider"
              type="range"
              min="10"
              max="100"
              step="1"
              value={retentionPercent}
              onChange={(e) => setRetentionPercent(parseInt(e.target.value, 10))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>Low (20%)</span>
              <span>Average (45%)</span>
              <span>Viral Loop (85%+)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Output Results */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Calculation Output Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Watch Time Calculation Result</span>
            </h4>

            {/* Formula Banner */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-0.5">Formula Applied:</span>
              <p className="text-emerald-400 font-bold">{result.formulaDescription}</p>
            </div>

            {/* Metrics Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Hours Watched
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono">
                  {result.totalHoursWatched.toLocaleString()}h
                </div>
                <p className="text-[10px] text-slate-400">Equivalent to {(result.totalHoursWatched / 24).toFixed(1)} consecutive days</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Total Minutes Watched
                </span>
                <div className="text-3xl font-black text-white font-mono">
                  {result.totalMinutesWatched.toLocaleString()}m
                </div>
                <p className="text-[10px] text-slate-400">{Math.round(result.totalMinutesWatched * 60).toLocaleString()} total seconds</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Average View Duration (AVD)
                </span>
                <div className="text-2xl font-black text-amber-300 font-mono">
                  {Math.floor(result.averageViewDurationSeconds / 60)}m {result.averageViewDurationSeconds % 60}s
                </div>
                <p className="text-[10px] text-slate-400">{result.averagePercentageViewed}% of total duration</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Format Performance
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {videoType}
                </div>
                <p className="text-[10px] text-slate-400">{videoType === 'Short' ? 'Fast loop velocity' : 'Long-form compounding'}</p>
              </div>
            </div>

            {/* Benchmark Feedback */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 leading-relaxed">
                {result.benchmarkFeedback}
              </p>
            </div>
          </div>

          {/* Monetization Goal Progress (4,000 Hours Milestone) */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950/40 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white uppercase tracking-wider">
                  YouTube Partner Program (YPP) Watch Hours Tracker
                </span>
              </div>
              <span className="font-mono font-bold text-amber-400">{monetizationProgress}% of 4,000 hrs</span>
            </div>

            <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${monetizationProgress}%` }}
              />
            </div>

            <div className="flex justify-between items-center text-[11px] text-slate-400">
              <span>{result.totalHoursWatched.toLocaleString()} Hours Simulated</span>
              <span>4,000 Hours Required for Monetization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
