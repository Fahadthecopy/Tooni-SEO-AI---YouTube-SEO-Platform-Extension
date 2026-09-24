import React from 'react';
import {
  GitCompare,
  TrendingUp,
  Eye,
  ThumbsUp,
  Users,
  MessageSquare,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { VideoData, SimulationAssumptions } from '../types';
import { calculateEstimatedMetrics, DEFAULT_ASSUMPTIONS } from '../utils/growthSimulatorEngine';

interface ScenarioComparisonTabProps {
  currentVideo: VideoData;
  customTarget?: number;
  assumptions?: SimulationAssumptions;
}

export const ScenarioComparisonTab: React.FC<ScenarioComparisonTabProps> = ({
  currentVideo,
  customTarget = 250000,
  assumptions = DEFAULT_ASSUMPTIONS
}) => {
  const currentViews = currentVideo.views || 12500;
  const currentLikes = currentVideo.likes || 680;
  const currentSubs = 1850;
  const currentComments = currentVideo.comments || 42;
  const currentHours = Number(((currentViews * 180) / 3600).toFixed(1));

  // 50K scenario
  const est50K = calculateEstimatedMetrics(50000, 480, assumptions, currentVideo);
  // 100K scenario
  const est100K = calculateEstimatedMetrics(100000, 480, assumptions, currentVideo);
  // Custom scenario
  const estCustom = calculateEstimatedMetrics(customTarget, 480, assumptions, currentVideo);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <GitCompare className="w-5 h-5 text-red-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-red-400">
            Algorithmic Milestone Comparative Modeling
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Current Performance vs 50K vs 100K vs Custom Forecast
        </h3>
        <p className="text-xs text-slate-400 max-w-3xl">
          Evaluate expected algorithmic milestone outcomes across four scenario matrices. Helps identify optimal promotion budget allocation and audience retention targets.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
              <tr>
                <th className="p-4">Key Metric</th>
                <th className="p-4 bg-slate-900/50">Current Baseline</th>
                <th className="p-4 text-red-400 bg-red-950/20">Option 1: 50K Forecast</th>
                <th className="p-4 text-amber-400 bg-amber-950/20">Option 2: 100K Forecast</th>
                <th className="p-4 text-indigo-400 bg-indigo-950/20">Custom: {customTarget.toLocaleString()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {/* Total Views */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>Total Views</span>
                </td>
                <td className="p-4 font-mono font-bold text-slate-300">
                  {currentViews.toLocaleString()}
                </td>
                <td className="p-4 font-mono font-bold text-white bg-red-950/10">
                  50,000
                </td>
                <td className="p-4 font-mono font-black text-amber-300 bg-amber-950/10">
                  100,000
                </td>
                <td className="p-4 font-mono font-black text-indigo-300 bg-indigo-950/10">
                  {customTarget.toLocaleString()}
                </td>
              </tr>

              {/* Estimated Likes */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-amber-400" />
                  <span>Estimated Likes</span>
                </td>
                <td className="p-4 font-mono text-slate-300">
                  {currentLikes.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-slate-200 bg-red-950/10">
                  {est50K.likes.average.toLocaleString()} <span className="text-[10px] text-slate-400">({est50K.likes.min}–{est50K.likes.max})</span>
                </td>
                <td className="p-4 font-mono text-amber-300 font-bold bg-amber-950/10">
                  {est100K.likes.average.toLocaleString()} <span className="text-[10px] text-amber-400/80">({est100K.likes.min}–{est100K.likes.max})</span>
                </td>
                <td className="p-4 font-mono text-indigo-300 font-bold bg-indigo-950/10">
                  {estCustom.likes.average.toLocaleString()} <span className="text-[10px] text-indigo-400/80">({estCustom.likes.min}–{estCustom.likes.max})</span>
                </td>
              </tr>

              {/* Estimated Subscribers */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Projected Subscribers</span>
                </td>
                <td className="p-4 font-mono text-slate-300">
                  +{currentSubs.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-emerald-400 font-bold bg-red-950/10">
                  +{est50K.subscribers.average.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-emerald-300 font-black bg-amber-950/10">
                  +{est100K.subscribers.average.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-emerald-300 font-black bg-indigo-950/10">
                  +{estCustom.subscribers.average.toLocaleString()}
                </td>
              </tr>

              {/* Estimated Comments */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-400" />
                  <span>Estimated Comments</span>
                </td>
                <td className="p-4 font-mono text-slate-300">
                  {currentComments.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-slate-200 bg-red-950/10">
                  {est50K.comments.average.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-indigo-300 font-bold bg-amber-950/10">
                  {est100K.comments.average.toLocaleString()}
                </td>
                <td className="p-4 font-mono text-indigo-300 font-bold bg-indigo-950/10">
                  {estCustom.comments.average.toLocaleString()}
                </td>
              </tr>

              {/* Watch Time Hours */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Watch Time (Hours)</span>
                </td>
                <td className="p-4 font-mono text-slate-300">
                  {currentHours}h
                </td>
                <td className="p-4 font-mono text-cyan-300 font-bold bg-red-950/10">
                  {est50K.watchTimeHours.toLocaleString()}h
                </td>
                <td className="p-4 font-mono text-cyan-200 font-black bg-amber-950/10">
                  {est100K.watchTimeHours.toLocaleString()}h
                </td>
                <td className="p-4 font-mono text-cyan-200 font-black bg-indigo-950/10">
                  {estCustom.watchTimeHours.toLocaleString()}h
                </td>
              </tr>

              {/* Monetization Progress */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white">
                  YPP 4,000h Monetization Progress
                </td>
                <td className="p-4 font-mono text-slate-400">
                  {Math.min(100, Math.round((currentHours / 4000) * 100))}%
                </td>
                <td className="p-4 font-mono text-emerald-400 font-bold bg-red-950/10">
                  {Math.min(100, Math.round((est50K.watchTimeHours / 4000) * 100))}%
                </td>
                <td className="p-4 font-mono text-emerald-300 font-black bg-amber-950/10">
                  {Math.min(100, Math.round((est100K.watchTimeHours / 4000) * 100))}% (Unlocked!)
                </td>
                <td className="p-4 font-mono text-emerald-300 font-black bg-indigo-950/10">
                  {Math.min(100, Math.round((estCustom.watchTimeHours / 4000) * 100))}% (Unlocked!)
                </td>
              </tr>

              {/* Algorithmic Shelf */}
              <tr className="hover:bg-slate-850/50">
                <td className="p-4 font-bold text-white">
                  Primary Traffic Trigger
                </td>
                <td className="p-4 text-slate-400">
                  Initial Search / Sub Feed
                </td>
                <td className="p-4 text-emerald-400 bg-red-950/10 font-medium">
                  Search & Related Videos
                </td>
                <td className="p-4 text-amber-300 bg-amber-950/10 font-bold">
                  Browse Features Homepage
                </td>
                <td className="p-4 text-indigo-300 bg-indigo-950/10 font-bold">
                  Global Suggested Cascades
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
