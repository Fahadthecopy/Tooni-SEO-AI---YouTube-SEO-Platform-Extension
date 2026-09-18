import React, { useState } from 'react';
import {
  Link2,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Layers,
  Copy,
  Check,
  Filter,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Share2
} from 'lucide-react';
import { BacklinkCampaign } from '../types';

interface BacklinkStrategyTabProps {
  currentUrl?: string;
  currentTitle?: string;
}

export const BacklinkStrategyTab: React.FC<BacklinkStrategyTabProps> = ({
  currentUrl = 'https://www.youtube.com/watch?v=sample-tooni-video',
  currentTitle = 'English Cartoon Animation - The Secret Garden'
}) => {
  const [targetUrl, setTargetUrl] = useState<string>(currentUrl);
  const [topic, setTopic] = useState<string>(currentTitle);
  const [brandName, setBrandName] = useState<string>('Tooni TV');
  const [campaign, setCampaign] = useState<BacklinkCampaign | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPlanView, setSelectedPlanView] = useState<'combined' | 'youtube1' | 'youtube2'>('combined');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runGenerateStrategy = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/backlinks/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUrl,
          topic,
          brandName
        })
      });
      const data: BacklinkCampaign = await res.json();
      setCampaign(data);
    } catch (err) {
      console.error('Failed to generate backlink campaign:', err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    runGenerateStrategy();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold uppercase tracking-wider">
                Distribution Architecture
              </span>
              <span className="text-xs text-slate-400 font-medium">
                400 Planned Link Targets &bull; Zero Fabricated Metrics
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              BACKLINK & CONTEXTUAL CITATION STRATEGY
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Organizes safe, contextual video citations across relevant animation forums, Web 2.0 lore articles, and verified video syndication platforms.
            </p>
          </div>

          <button
            onClick={runGenerateStrategy}
            disabled={isLoading}
            className="px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Link2 className="w-4 h-4" />
            {isLoading ? 'Generating Plan...' : 'Generate 400-Target Campaign'}
          </button>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-5 pt-4 border-t border-teal-900/60 flex items-start gap-2.5 text-xs text-teal-200">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Data Integrity Guarantee:</strong> We classify links by relevance and editorial context. We never claim links are &quot;100% safe&quot; or guaranteed to be indexed by search engines. Third-party DA/DR metrics are not fabricated and are displayed as &quot;Estimated / Unavailable&quot;.
          </span>
        </div>
      </div>

      {/* Target Config Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 text-xs">
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Target YouTube URL</label>
            <input
              type="text"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Content Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Channel / Brand Anchor</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white font-medium focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {campaign && (
        <div className="space-y-6">
          {/* 1. Target Volume Plan Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Target Allocation
                </span>
                <h3 className="text-base font-bold text-white">
                  Planned Link Target Structure (Max 400 Total Targets)
                </h3>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setSelectedPlanView('combined')}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    selectedPlanView === 'combined' ? 'bg-teal-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Combined (400)
                </button>
                <button
                  onClick={() => setSelectedPlanView('youtube1')}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    selectedPlanView === 'youtube1' ? 'bg-teal-600 text-white' : 'text-slate-400'
                  }`}
                >
                  YouTube 1 (200)
                </button>
                <button
                  onClick={() => setSelectedPlanView('youtube2')}
                  className={`px-3 py-1 rounded-md font-medium cursor-pointer ${
                    selectedPlanView === 'youtube2' ? 'bg-teal-600 text-white' : 'text-slate-400'
                  }`}
                >
                  YouTube 2 (200)
                </button>
              </div>
            </div>

            {/* Target Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Forum Embeds & Citations</span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {campaign.plan[selectedPlanView].forumEmbeds} Targets
                </span>
                <span className="text-[11px] text-teal-400 block mt-1">Animation & Parent discussions</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Web 2.0 Contextual Articles</span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {campaign.plan[selectedPlanView].web20Contextual} Targets
                </span>
                <span className="text-[11px] text-teal-400 block mt-1">Medium, Substack, Blogger</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Video Syndication</span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {campaign.plan[selectedPlanView].videoSyndication} Targets
                </span>
                <span className="text-[11px] text-teal-400 block mt-1">Verified partner video directories</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-teal-500/30">
                <span className="text-teal-400 text-[10px] uppercase font-bold block">Total Planned Targets</span>
                <span className="text-2xl font-black text-teal-300 mt-1 block">
                  {campaign.plan[selectedPlanView].total} Targets
                </span>
                <span className="text-[11px] text-slate-400 block mt-1">Status: Planned Link Targets</span>
              </div>
            </div>
          </div>

          {/* 2. Anchor Text Distribution & Safety (40% / 30% / 20% / 10%) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Penalty Prevention
                </span>
                <h3 className="text-base font-bold text-white">
                  Natural Anchor Text Ratio (Anti-Over-Optimization)
                </h3>
              </div>
              <span className="text-xs text-slate-400">Mathematical percentage distribution</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {/* Branded 40% */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-400">Branded (40%)</span>
                  <span className="font-mono text-slate-300 font-bold">{campaign.anchorDistribution.branded.count} targets</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-2/5" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                  {campaign.anchorDistribution.branded.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="truncate bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-300">
                      &quot;{ex}&quot;
                    </div>
                  ))}
                </div>
              </div>

              {/* Partial Match 30% */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-400">Partial Match (30%)</span>
                  <span className="font-mono text-slate-300 font-bold">{campaign.anchorDistribution.partialMatch.count} targets</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[30%]" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                  {campaign.anchorDistribution.partialMatch.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="truncate bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-300">
                      &quot;{ex}&quot;
                    </div>
                  ))}
                </div>
              </div>

              {/* URL Anchors 20% */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-400">Raw URL (20%)</span>
                  <span className="font-mono text-slate-300 font-bold">{campaign.anchorDistribution.urlAnchor.count} targets</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full w-[20%]" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                  {campaign.anchorDistribution.urlAnchor.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="truncate bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-300">
                      {ex}
                    </div>
                  ))}
                </div>
              </div>

              {/* Generic 10% */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-300">Generic (10%)</span>
                  <span className="font-mono text-slate-300 font-bold">{campaign.anchorDistribution.generic.count} targets</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-slate-500 h-full w-[10%]" />
                </div>
                <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                  {campaign.anchorDistribution.generic.examples.slice(0, 2).map((ex, i) => (
                    <div key={i} className="truncate bg-slate-900 px-2 py-0.5 rounded font-mono text-slate-300">
                      &quot;{ex}&quot;
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Planned Link Opportunities Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Target Inventory
                </span>
                <h3 className="text-base font-bold text-white">
                  Planned Link Targets & Classification Directory
                </h3>
              </div>
              <span className="text-xs text-slate-400">Categorized by editorial safety</span>
            </div>

            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Platform / Domain</th>
                    <th className="p-3">Link Category</th>
                    <th className="p-3">Relevance</th>
                    <th className="p-3">Authority Metric</th>
                    <th className="p-3">Recommended Anchor</th>
                    <th className="p-3">Risk Assessment</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {campaign.opportunities.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-semibold text-white">
                        <div>{item.platform}</div>
                        <span className="text-[10px] text-slate-500 font-mono">{item.domain}</span>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="text-emerald-400 font-bold">{item.relevance}</span>
                      </td>
                      <td className="p-3 text-slate-400">
                        <span className="text-[11px] font-mono text-slate-400">
                          {item.authorityMetric}
                        </span>
                      </td>
                      <td className="p-3 text-indigo-300 font-medium font-mono text-[11px]">
                        &quot;{item.anchorRecommendation}&quot;
                      </td>
                      <td className="p-3 text-slate-400 text-[11px] max-w-xs">
                        {item.riskNotes}
                      </td>
                      <td className="p-3 text-right">
                        <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
