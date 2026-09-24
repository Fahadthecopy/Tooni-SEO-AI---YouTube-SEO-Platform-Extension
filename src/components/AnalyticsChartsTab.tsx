import React, { useState } from 'react';
import {
  BarChart2,
  TrendingUp,
  Eye,
  Users,
  ThumbsUp,
  Clock,
  Sparkles,
  AlertTriangle,
  Calendar,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { generateTimelineForecast } from '../utils/growthSimulatorEngine';

interface AnalyticsChartsTabProps {
  targetViews?: number;
  currentViews?: number;
}

export const AnalyticsChartsTab: React.FC<AnalyticsChartsTabProps> = ({
  targetViews = 100000,
  currentViews = 12500
}) => {
  const [timeframe, setTimeframe] = useState<'1H' | '6H' | '12H' | '24H' | '7D' | '30D'>('24H');
  const [activeChartMetric, setActiveChartMetric] = useState<'views' | 'subs' | 'engagement' | 'watchtime'>('views');

  const chartData = generateTimelineForecast(targetViews, currentViews, timeframe);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Performance Curve Projections
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              Analytics Growth & Velocity Charts
            </h3>
            <p className="text-xs text-slate-400">
              Interactive time-series simulation across various observation windows.
            </p>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            {(['1H', '6H', '12H', '24H', '7D', '30D'] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  timeframe === tf
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span className="font-semibold">Chart Classification: <strong>Forecast / Simulation Model</strong></span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Mathematical projection to {targetViews.toLocaleString()} views
          </span>
        </div>
      </div>

      {/* Metric Switcher Tabs */}
      <div className="flex flex-wrap gap-2.5">
        <button
          onClick={() => setActiveChartMetric('views')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeChartMetric === 'views'
              ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Views Trajectory</span>
        </button>

        <button
          onClick={() => setActiveChartMetric('subs')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeChartMetric === 'subs'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Subscriber Growth</span>
        </button>

        <button
          onClick={() => setActiveChartMetric('engagement')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeChartMetric === 'engagement'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/25'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Likes & Comments</span>
        </button>

        <button
          onClick={() => setActiveChartMetric('watchtime')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeChartMetric === 'watchtime'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/25'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Watch Time (Hours)</span>
        </button>
      </div>

      {/* Recharts Canvas */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center text-xs text-slate-400">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            {activeChartMetric === 'views' && 'Simulated Cumulative Views Curve'}
            {activeChartMetric === 'subs' && 'Projected Subscriber Conversion Over Time'}
            {activeChartMetric === 'engagement' && 'Estimated Likes & Discussion Volume'}
            {activeChartMetric === 'watchtime' && 'Cumulative Watch Time Compounding'}
          </span>
          <span className="font-mono text-emerald-400">Granularity: {timeframe} interval</span>
        </div>

        <div className="w-full h-80 sm:h-96">
          <ResponsiveContainer width="100%" height="100%">
            {activeChartMetric === 'views' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" textAnchor="end" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="views" name="Projected Views" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#viewGrad)" />
              </AreaChart>
            ) : activeChartMetric === 'subs' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="subGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="subscribers" name="Subscribers Gained" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#subGrad)" />
              </AreaChart>
            ) : activeChartMetric === 'engagement' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Legend />
                <Bar dataKey="likes" name="Likes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="comments" name="Comments" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="watchGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="watchHours" name="Watch Time (Hours)" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#watchGrad)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
