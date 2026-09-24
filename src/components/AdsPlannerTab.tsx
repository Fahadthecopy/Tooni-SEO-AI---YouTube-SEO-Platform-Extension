import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  Globe,
  Users,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { AdsCampaignConfig } from '../types';
import { calculateAdsCampaign } from '../utils/growthSimulatorEngine';

interface AdsPlannerTabProps {
  currentUrl?: string;
  targetViews?: number;
}

export const AdsPlannerTab: React.FC<AdsPlannerTabProps> = ({
  currentUrl = 'https://youtube.com/watch?v=sample',
  targetViews = 50000
}) => {
  const [config, setConfig] = useState<AdsCampaignConfig>({
    budget: 250,
    country: 'United States & Tier 1 (CA, UK, AU)',
    audienceAgeRange: '18-34 (Core High-Engagement)',
    interest: 'Animation, Entertainment & Creative',
    videoUrl: currentUrl,
    campaignDurationDays: 14,
    targetViews: 10000
  });

  const estimate = calculateAdsCampaign(config);

  const dailyBudget = Math.round(config.budget / Math.max(1, config.campaignDurationDays));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-amber-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Official Advertising Campaign Simulator
          </span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Google & YouTube Ads Campaign Planner
        </h3>
        <p className="text-xs text-slate-400 max-w-2xl">
          Plan targeted In-Feed Discovery and Search Ads campaigns to reach genuine human viewers. Models cost-per-view (CPV), audience reach, and subscriber acquisition.
        </p>
      </div>

      {/* Mandatory Compliance Notice */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-xl p-4 text-xs text-amber-200 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-extrabold uppercase tracking-wider text-amber-300 block">
            ESTIMATE — ACTUAL RESULTS VARY
          </span>
          <p className="text-slate-300 leading-relaxed">
            Advertising delivery relies on real-time ad auction bidding, thumbnail creative stop-power, and viewer retention. We do not guarantee a fixed number of views or engagement. All metrics are estimated projections.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Campaign Input Form */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center gap-2">
            <Target className="w-4 h-4 text-red-500" />
            <span>Campaign Parameters</span>
          </h4>

          {/* Budget */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-semibold">Total Campaign Budget ($ USD):</label>
              <span className="text-emerald-400 font-mono font-bold">${config.budget} (${dailyBudget}/day)</span>
            </div>
            <input
              type="number"
              min="20"
              step="50"
              value={config.budget}
              onChange={(e) => setConfig({ ...config, budget: Math.max(10, parseInt(e.target.value || '0', 10)) })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono text-sm focus:ring-2 focus:ring-amber-500"
            />
            <div className="flex gap-2 pt-1">
              {[50, 150, 250, 500, 1000].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setConfig({ ...config, budget: b })}
                  className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                    config.budget === b
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  ${b}
                </button>
              ))}
            </div>
          </div>

          {/* Country Targeting */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Target Geographic Tier:</label>
            <select
              value={config.country}
              onChange={(e) => setConfig({ ...config, country: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-amber-500"
            >
              <option value="United States & Tier 1 (CA, UK, AU)">United States & Tier 1 (US, CA, UK, AU) — High CPM / ~$0.035 CPV</option>
              <option value="Global Mix (North America, Europe, Asia)">Global Mix (North America, Europe, Asia) — ~$0.025 CPV</option>
              <option value="Emerging Growth Markets (IN, BR, PH)">Emerging Growth Markets (IN, BR, PH) — High Volume / ~$0.012 CPV</option>
            </select>
          </div>

          {/* Target Audience Age Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Target Audience Demographics:</label>
            <select
              value={config.audienceAgeRange}
              onChange={(e) => setConfig({ ...config, audienceAgeRange: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-amber-500"
            >
              <option value="18-34 (Core High-Engagement)">18–34 (Highest YouTube Engagement & Comment Frequency)</option>
              <option value="13-24 (Gen-Z & Gaming / Shorts Affinity)">13–24 (High Velocity & Shorts Affinity)</option>
              <option value="25-44 (High Purchase Intent)">25–44 (High CPM & Ad Revenue Value)</option>
              <option value="All Ages (Broad Reach)">All Ages (Maximum Impression Scale)</option>
            </select>
          </div>

          {/* Interest & Affinity Niche */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">Audience Affinity & Keyword Interest:</label>
            <input
              type="text"
              value={config.interest}
              onChange={(e) => setConfig({ ...config, interest: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:ring-2 focus:ring-amber-500"
              placeholder="e.g. Cartoon Animation, Tech Reviews, Gaming"
            />
          </div>

          {/* Campaign Duration */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-300 font-semibold">Campaign Duration (Days):</label>
              <span className="text-slate-400 font-mono">{config.campaignDurationDays} days</span>
            </div>
            <input
              type="range"
              min="3"
              max="60"
              value={config.campaignDurationDays}
              onChange={(e) => setConfig({ ...config, campaignDurationDays: parseInt(e.target.value, 10) })}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Output Projections */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Forecasted Campaign Output</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                In-Feed Format
              </span>
            </h4>

            {/* Projection Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Estimated Views
                </span>
                <div className="text-3xl font-black text-amber-300 font-mono">
                  {estimate.estimatedViews.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400">At ~${estimate.costPerView.toFixed(3)} CPV</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Estimated Impressions
                </span>
                <div className="text-3xl font-black text-white font-mono">
                  {estimate.estimatedImpressions.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400">Reach: ~{estimate.estimatedReach.toLocaleString()} unique users</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Projected Subscribers
                </span>
                <div className="text-3xl font-black text-emerald-300 font-mono">
                  +{estimate.estimatedSubscribers.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400">Based on ~1.8% conversion benchmark</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Watch Time Gained
                </span>
                <div className="text-3xl font-black text-cyan-300 font-mono">
                  {estimate.estimatedWatchTimeHours.toLocaleString()}h
                </div>
                <p className="text-[10px] text-slate-400">~2.5 mins average duration per view</p>
              </div>
            </div>

            {/* Campaign Optimization Checklist */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="font-bold text-slate-200 block text-xs">
                Tooni TV Campaign Recommendations:
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Choose <strong>YouTube In-Feed Video Ads</strong> rather than skippable in-stream for maximum retention.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Set maximum CPV bid limit to prevent budget spikes during high-competition auctions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Ensure your thumbnail has character identity locked before activating ads.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
