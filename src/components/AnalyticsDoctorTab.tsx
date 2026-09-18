import React, { useState } from 'react';
import { BarChart3, AlertOctagon, HelpCircle, TrendingUp, Sparkles, Upload, FileText, ArrowRight, Check } from 'lucide-react';
import { AnalyticsAudit } from '../types';

export const AnalyticsDoctorTab: React.FC = () => {
  const [impressions, setImpressions] = useState(15000);
  const [ctr, setCtr] = useState(3.2);
  const [views, setViews] = useState(480);
  const [avd, setAvd] = useState('01:45');
  const [retention30s, setRetention30s] = useState(38);
  const [trafficSource, setTrafficSource] = useState('Browse features');

  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<AnalyticsAudit | null>(null);

  const handleRunDiagnosis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analytics/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          impressions,
          ctr,
          views,
          averageViewDuration: avd,
          retentionAt30s: retention30s,
          trafficSource,
        }),
      });
      const data = await res.json();
      setDiagnosis(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-black text-white tracking-tight">
                YouTube Analytics Doctor
              </h3>
            </div>
            <p className="text-sm font-semibold text-amber-400 mt-1">
              Algorithmic Diagnosis: “Views کم کیوں ہیں؟” (Why are my views low?)
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunDiagnosis}
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-red-600/20"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Diagnosing Algorithm...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Diagnose Low Views</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Impressions (Thumbnail Shown)</span>
              <span className="text-white font-bold">{impressions.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={impressions}
              onChange={(e) => setImpressions(Number(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Click-Through Rate (CTR %)</span>
              <span className={`font-bold ${ctr < 4.0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {ctr.toFixed(1)}%
              </span>
            </div>
            <input
              type="range"
              min="1.0"
              max="15.0"
              step="0.1"
              value={ctr}
              onChange={(e) => setCtr(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <p className="text-[10px] text-slate-500">Benchmark: 5.0% - 8.5% is healthy</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Estimated Total Views</span>
              <span className="text-white font-bold">{views.toLocaleString()}</span>
            </div>
            <input
              type="number"
              value={views}
              onChange={(e) => setViews(Number(e.target.value))}
              className="w-full px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">Average View Duration (MM:SS)</span>
              <span className="text-white font-bold">{avd}</span>
            </div>
            <input
              type="text"
              value={avd}
              onChange={(e) => setAvd(e.target.value)}
              className="w-full px-2.5 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-white"
            />
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-300">30-Second Retention Rate</span>
              <span className={`font-bold ${retention30s < 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {retention30s}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="1"
              value={retention30s}
              onChange={(e) => setRetention30s(Number(e.target.value))}
              className="w-full accent-red-500"
            />
            <p className="text-[10px] text-slate-500">Benchmark: &gt;60% for viral lift</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Primary Traffic Source
            </label>
            <select
              value={trafficSource}
              onChange={(e) => setTrafficSource(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white"
            >
              <option value="Browse features">Browse features (Home Page Feed)</option>
              <option value="YouTube search">YouTube search (Keywords)</option>
              <option value="Suggested videos">Suggested videos (Watch Next)</option>
              <option value="Channel pages">Channel pages</option>
            </select>
          </div>
        </div>
      </div>

      {/* Diagnosis Report Output */}
      {diagnosis && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {/* Primary Root Cause Badge */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-red-400 text-xs font-extrabold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>Primary Algorithmic Bottleneck Identified</span>
            </div>
            <h4 className="text-lg font-black text-white leading-snug">
              {diagnosis.primaryDiagnosis}
            </h4>
          </div>

          {/* Bullet Breakdown: Why Views Are Low */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Detailed Root-Cause Analysis (Behind the Scenes of YouTube)
            </h4>
            <div className="space-y-2">
              {(diagnosis.whyViewsAreLow || []).map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-[11px] flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate 3-Step Fixes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              <span>Immediate 3-Step Action Plan (Revive This Video)</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(diagnosis.immediate3StepFix || []).map((fix, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15">
                    Action #{idx + 1}
                  </span>
                  <p className="text-xs text-slate-200 font-medium leading-relaxed">
                    {fix}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended A/B Experiment */}
          <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-xs space-y-1">
            <span className="font-bold text-amber-400 uppercase tracking-wider block">
              Suggested A/B Experiment to Run Today:
            </span>
            <p className="text-slate-300 leading-relaxed">
              {diagnosis.recommendedExperiment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
