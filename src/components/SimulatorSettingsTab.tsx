import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  RotateCcw,
  Save,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { SimulationAssumptions, AppSimulatorSettings } from '../types';
import { DEFAULT_ASSUMPTIONS, saveSimulatorSettings } from '../utils/growthSimulatorEngine';

interface SimulatorSettingsTabProps {
  currentAssumptions: SimulationAssumptions;
  onUpdateAssumptions: (newAssumptions: SimulationAssumptions) => void;
}

export const SimulatorSettingsTab: React.FC<SimulatorSettingsTabProps> = ({
  currentAssumptions,
  onUpdateAssumptions
}) => {
  const [assumptions, setAssumptions] = useState<SimulationAssumptions>(currentAssumptions);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    onUpdateAssumptions(assumptions);
    saveSimulatorSettings({
      assumptions,
      defaultTimerMinutes: 10,
      animationSpeed: 'normal',
      currency: 'USD ($)',
      theme: 'dark'
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    setAssumptions(DEFAULT_ASSUMPTIONS);
    onUpdateAssumptions(DEFAULT_ASSUMPTIONS);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            Simulator Configuration & Mathematical Assumptions
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Admin Engagement Assumptions & Model Calibration
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl">
          Adjust the baseline conversion ranges used across the dashboard, watch time calculator, and growth simulations.
        </p>
      </div>

      {/* Assumptions Configuration Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Configurable Engagement Rate Brackets</span>
          </h4>

          {savedSuccess && (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Settings Saved!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Like Rate Assumption (3% - 8%) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-bold">Estimated Like Rate Range:</label>
              <span className="text-amber-400 font-mono font-bold">
                {assumptions.likeRateMin}% – {assumptions.likeRateMax}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Min Like Rate (%)</span>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="15"
                  value={assumptions.likeRateMin}
                  onChange={(e) => setAssumptions({ ...assumptions, likeRateMin: parseFloat(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Max Like Rate (%)</span>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="25"
                  value={assumptions.likeRateMax}
                  onChange={(e) => setAssumptions({ ...assumptions, likeRateMax: parseFloat(e.target.value) || 5 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Industry standard benchmark: 3% to 8% of total views.</p>
          </div>

          {/* Subscriber Conversion (0.5% - 3.0%) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-bold">Subscriber Conversion Rate:</label>
              <span className="text-emerald-400 font-mono font-bold">
                {assumptions.subConversionMin}% – {assumptions.subConversionMax}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Min Sub Rate (%)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="5"
                  value={assumptions.subConversionMin}
                  onChange={(e) => setAssumptions({ ...assumptions, subConversionMin: parseFloat(e.target.value) || 0.5 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Max Sub Rate (%)</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={assumptions.subConversionMax}
                  onChange={(e) => setAssumptions({ ...assumptions, subConversionMax: parseFloat(e.target.value) || 3 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Industry standard benchmark: 0.5% to 3.0% conversion.</p>
          </div>

          {/* Comment Rate (0.1% - 1.0%) */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-bold">Estimated Comment Rate:</label>
              <span className="text-indigo-400 font-mono font-bold">
                {assumptions.commentRateMin}% – {assumptions.commentRateMax}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Min Comment Rate (%)</span>
                <input
                  type="number"
                  step="0.05"
                  min="0.05"
                  max="2"
                  value={assumptions.commentRateMin}
                  onChange={(e) => setAssumptions({ ...assumptions, commentRateMin: parseFloat(e.target.value) || 0.1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Max Comment Rate (%)</span>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  max="5"
                  value={assumptions.commentRateMax}
                  onChange={(e) => setAssumptions({ ...assumptions, commentRateMax: parseFloat(e.target.value) || 1 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Industry standard benchmark: 0.1% to 1.0% comments.</p>
          </div>

          {/* Audience Retention & CTR */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-200 font-bold">Default Retention & CTR Baselines:</label>
              <span className="text-cyan-300 font-mono font-bold">
                {assumptions.avgViewDurationPercent}% AVD | {assumptions.ctrAverage}% CTR
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Retention APV (%)</span>
                <input
                  type="number"
                  step="1"
                  min="15"
                  max="90"
                  value={assumptions.avgViewDurationPercent}
                  onChange={(e) => setAssumptions({ ...assumptions, avgViewDurationPercent: parseFloat(e.target.value) || 40 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block mb-1">Average CTR (%)</span>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="20"
                  value={assumptions.ctrAverage}
                  onChange={(e) => setAssumptions({ ...assumptions, ctrAverage: parseFloat(e.target.value) || 5.5 })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400">Determines default watch time multiplier calculations.</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Industry Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-black shadow-lg shadow-red-600/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply Assumptions</span>
          </button>
        </div>
      </div>
    </div>
  );
};
