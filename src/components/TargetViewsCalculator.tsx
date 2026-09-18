import React, { useState } from 'react';
import { Calculator, Target, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { TargetViews } from '../types';

interface TargetViewsCalculatorProps {
  onViewsChange?: (targetViews: TargetViews) => void;
}

export const TargetViewsCalculator: React.FC<TargetViewsCalculatorProps> = ({ onViewsChange }) => {
  const [dailyTarget, setDailyTarget] = useState<number>(10000);

  // Auto-calculate all intervals from daily target
  const perMinute = Math.max(1, Math.round(dailyTarget / 1440));
  const perHour = Math.max(1, Math.round(dailyTarget / 24));
  const perDay = dailyTarget;
  const perWeek = dailyTarget * 7;
  const perMonth = dailyTarget * 30;
  const perYear = dailyTarget * 365;

  const targetViewsObject: TargetViews = {
    perMinute: perMinute.toLocaleString(),
    perHour: perHour.toLocaleString(),
    perDay: perDay.toLocaleString(),
    perWeek: perWeek.toLocaleString(),
    perMonth: perMonth.toLocaleString(),
    perYear: perYear.toLocaleString(),
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setDailyTarget(val);
    if (onViewsChange) {
      onViewsChange({
        perMinute: Math.max(1, Math.round(val / 1440)).toLocaleString(),
        perHour: Math.max(1, Math.round(val / 24)).toLocaleString(),
        perDay: val.toLocaleString(),
        perWeek: (val * 7).toLocaleString(),
        perMonth: (val * 30).toLocaleString(),
        perYear: (val * 365).toLocaleString(),
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-red-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-red-400">Algorithmic Velocity Modeling</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
            Target Views Velocity Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Calculates required view pacing across all time horizons to reach algorithm recommendation velocity.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
          <Target className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Target Pace:</span>
          <strong className="text-white font-mono">{dailyTarget.toLocaleString()} views/day</strong>
        </div>
      </div>

      {/* Target views presets slider */}
      <div className="space-y-2 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
        <div className="flex justify-between items-center text-xs">
          <label htmlFor="daily-target-slider" className="text-slate-300 font-semibold flex items-center gap-1.5">
            <span>Daily View Goal Slider:</span>
            <span className="text-emerald-400 font-mono font-bold">{dailyTarget.toLocaleString()} views/day</span>
          </label>
          <div className="flex gap-1">
            {[2500, 10000, 50000, 250000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setDailyTarget(preset);
                  if (onViewsChange) {
                    onViewsChange({
                      perMinute: Math.max(1, Math.round(preset / 1440)).toLocaleString(),
                      perHour: Math.max(1, Math.round(preset / 24)).toLocaleString(),
                      perDay: preset.toLocaleString(),
                      perWeek: (preset * 7).toLocaleString(),
                      perMonth: (preset * 30).toLocaleString(),
                      perYear: (preset * 365).toLocaleString(),
                    });
                  }
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  dailyTarget === preset
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {preset >= 1000 ? `${preset / 1000}k` : preset}
              </button>
            ))}
          </div>
        </div>

        <input
          id="daily-target-slider"
          type="range"
          min="500"
          max="500000"
          step="500"
          value={dailyTarget}
          onChange={handleSliderChange}
          className="w-full accent-red-600 cursor-pointer h-2 bg-slate-800 rounded-lg"
        />
      </div>

      {/* Velocity Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Per Minute</span>
          <p className="text-lg font-black text-white font-mono">{targetViewsObject.perMinute}</p>
          <span className="text-[10px] text-slate-400">~{perMinute} v/min</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Per Hour</span>
          <p className="text-lg font-black text-white font-mono">{targetViewsObject.perHour}</p>
          <span className="text-[10px] text-slate-400">~{perHour} v/hr</span>
        </div>

        <div className="bg-slate-950/80 border border-red-500/30 p-3 rounded-xl text-center space-y-1 bg-red-950/10">
          <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Per Day</span>
          <p className="text-lg font-black text-red-400 font-mono">{targetViewsObject.perDay}</p>
          <span className="text-[10px] text-red-300/80">Primary Target</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Per Week</span>
          <p className="text-lg font-black text-white font-mono">{targetViewsObject.perWeek}</p>
          <span className="text-[10px] text-slate-400">7-Day Window</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Per Month</span>
          <p className="text-lg font-black text-emerald-400 font-mono">{targetViewsObject.perMonth}</p>
          <span className="text-[10px] text-emerald-300/80">30-Day Velocity</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Per Year</span>
          <p className="text-lg font-black text-amber-400 font-mono">{targetViewsObject.perYear}</p>
          <span className="text-[10px] text-amber-300/80">Annual Evergreen</span>
        </div>
      </div>
    </div>
  );
};
