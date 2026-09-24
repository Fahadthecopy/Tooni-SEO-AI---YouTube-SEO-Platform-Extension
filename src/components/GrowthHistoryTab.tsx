import React, { useState, useEffect } from 'react';
import {
  History,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { GrowthHistoryRecord, VideoData } from '../types';
import { loadHistoryRecords, deleteHistoryRecord, clearAllHistory } from '../utils/growthSimulatorEngine';

interface GrowthHistoryTabProps {
  onSelectRecord?: (record: GrowthHistoryRecord) => void;
}

export const GrowthHistoryTab: React.FC<GrowthHistoryTabProps> = ({ onSelectRecord }) => {
  const [records, setRecords] = useState<GrowthHistoryRecord[]>([]);

  useEffect(() => {
    setRecords(loadHistoryRecords());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteHistoryRecord(id);
    setRecords(updated);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all simulation history snapshots?')) {
      clearAllHistory();
      setRecords([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Local Storage Archive
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Saved Analyses & Growth Forecast History
            </h3>
            <p className="text-xs text-slate-400">
              Review and recall previously modeled video growth projections, target milestones, and SEO scores.
            </p>
          </div>

          {records.length > 0 && (
            <button
              onClick={handleClearAll}
              className="px-3.5 py-2 bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold rounded-xl border border-red-800/60 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All History</span>
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Total Snapshots Stored: <strong>{records.length}</strong></span>
        </div>
      </div>

      {/* History Records List */}
      {records.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <History className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No Saved History Snapshots Yet</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Run an analysis on the Dashboard or Growth Simulator and click "Save Snapshot" to archive your plan here.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                    {rec.videoTitle}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                    <span>Channel: <strong>{rec.channelName}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {rec.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-950 text-emerald-400 border border-slate-800">
                    Target: {rec.targetViews.toLocaleString()} views
                  </span>
                  <button
                    onClick={() => handleDelete(rec.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all cursor-pointer"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Current Views</span>
                  <span className="font-bold text-slate-200">{rec.currentViews.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Remaining Gap</span>
                  <span className="font-bold text-amber-400">+{rec.remainingViews.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Forecasted Subs</span>
                  <span className="font-bold text-emerald-400">+{rec.forecastSubscribers.toLocaleString()}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-sans">Watch Time Hours</span>
                  <span className="font-bold text-cyan-300">{rec.forecastWatchHours.toLocaleString()}h</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
