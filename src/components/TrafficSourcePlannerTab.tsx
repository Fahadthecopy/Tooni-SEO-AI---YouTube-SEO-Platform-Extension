import React, { useState } from 'react';
import {
  Share2,
  TrendingUp,
  Search,
  DollarSign,
  Globe,
  Filter,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { TrafficCategory, TrafficSourceItem } from '../types';
import { generateTrafficSourcePlan } from '../utils/growthSimulatorEngine';

interface TrafficSourcePlannerTabProps {
  targetViews?: number;
  currentViews?: number;
}

export const TrafficSourcePlannerTab: React.FC<TrafficSourcePlannerTabProps> = ({
  targetViews = 100000,
  currentViews = 12500
}) => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | TrafficCategory>('ALL');
  const [videoFormat, setVideoFormat] = useState<'Long Video' | 'Short'>('Long Video');

  const sources = generateTrafficSourcePlan(targetViews, currentViews, videoFormat);

  const filteredSources = activeCategory === 'ALL'
    ? sources
    : sources.filter((s) => s.category === activeCategory);

  // Totals
  const totalViews = filteredSources.reduce((acc, s) => acc + s.estimatedViews, 0);
  const totalCost = filteredSources.reduce((acc, s) => acc + s.estimatedCost, 0);
  const totalSubs = filteredSources.reduce((acc, s) => acc + s.subscribersGained, 0);
  const totalHours = Number(filteredSources.reduce((acc, s) => acc + s.watchTimeHours, 0).toFixed(1));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Audience Acquisition Blueprint
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Real Traffic Source Planner
            </h3>
            <p className="text-xs text-slate-400">
              Legitimate multi-channel distribution plan across YouTube algorithms, search intent, external communities, and paid discovery.
            </p>
          </div>

          {/* Video Format selector */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setVideoFormat('Long Video')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                videoFormat === 'Long Video'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Long Video (16:9)
            </button>
            <button
              onClick={() => setVideoFormat('Short')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                videoFormat === 'Short'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              YouTube Short (9:16)
            </button>
          </div>
        </div>

        {/* Aggregates Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Planned Traffic</span>
            <span className="text-lg font-black text-white font-mono">{totalViews.toLocaleString()} views</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Cost</span>
            <span className="text-lg font-black text-emerald-400 font-mono">${totalCost.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Projected Subs</span>
            <span className="text-lg font-black text-amber-300 font-mono">+{totalSubs.toLocaleString()}</span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Watch Time</span>
            <span className="text-lg font-black text-cyan-300 font-mono">{totalHours.toLocaleString()} hrs</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeCategory === 'ALL' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Sources ({sources.length})
          </button>
          <button
            onClick={() => setActiveCategory('ORGANIC')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeCategory === 'ORGANIC' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Organic ({sources.filter((s) => s.category === 'ORGANIC').length})
          </button>
          <button
            onClick={() => setActiveCategory('PAID')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeCategory === 'PAID' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Paid Ads ({sources.filter((s) => s.category === 'PAID').length})
          </button>
          <button
            onClick={() => setActiveCategory('EXTERNAL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeCategory === 'EXTERNAL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            External ({sources.filter((s) => s.category === 'EXTERNAL').length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Legitimate traffic acquisition only</span>
        </div>
      </div>

      {/* Traffic Sources Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
              <tr>
                <th className="p-4">Traffic Source</th>
                <th className="p-4">Category</th>
                <th className="p-4">Share (%)</th>
                <th className="p-4">Est. Views</th>
                <th className="p-4">Cost ($)</th>
                <th className="p-4">CTR</th>
                <th className="p-4">Conversion</th>
                <th className="p-4">Est. Subs</th>
                <th className="p-4">Watch Time</th>
                <th className="p-4">Priority Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredSources.map((source) => (
                <tr key={source.id} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white text-xs">{source.name}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{source.description}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      source.category === 'ORGANIC'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : source.category === 'PAID'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}>
                      {source.category}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-300">
                    {source.estimatedTrafficShare}%
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    {source.estimatedViews.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono font-semibold text-slate-300">
                    {source.estimatedCost > 0 ? `$${source.estimatedCost}` : 'Free ($0)'}
                  </td>
                  <td className="p-4 font-mono text-amber-300 font-bold">
                    {source.ctr}%
                  </td>
                  <td className="p-4 font-mono text-emerald-400 font-semibold">
                    {source.conversionRate}%
                  </td>
                  <td className="p-4 font-mono text-white font-bold">
                    +{source.subscribersGained.toLocaleString()}
                  </td>
                  <td className="p-4 font-mono text-cyan-300 font-semibold">
                    {source.watchTimeHours}h
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      source.status === 'Recommended Priority'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50'
                        : source.status === 'High Potential'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {source.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
