import React, { useState } from 'react';
import {
  Key,
  Search,
  Sparkles,
  Copy,
  Check,
  TrendingUp,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { VideoData } from '../types';

interface KeywordItem {
  keyword: string;
  demand: 'Very High' | 'High' | 'Medium';
  competition: 'Low' | 'Medium' | 'High';
  relevance: number; // 0-100
  trend: string;
  opportunityScore: number;
}

interface KeywordResearchTabProps {
  currentVideo: VideoData;
}

export const KeywordResearchTab: React.FC<KeywordResearchTabProps> = ({ currentVideo }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);

  const keywords: KeywordItem[] = [
    { keyword: 'youtube algorithm 2026', demand: 'Very High', competition: 'Medium', relevance: 98, trend: '+34%', opportunityScore: 94 },
    { keyword: 'how to get browse features youtube', demand: 'High', competition: 'Low', relevance: 95, trend: '+28%', opportunityScore: 92 },
    { keyword: 'tooni tv tutorial', demand: 'Medium', competition: 'Low', relevance: 99, trend: '+45%', opportunityScore: 91 },
    { keyword: 'youtube watch time 4000 hours trick', demand: 'Very High', competition: 'High', relevance: 90, trend: '+15%', opportunityScore: 84 },
    { keyword: 'youtube title character limit best practice', demand: 'Medium', competition: 'Low', relevance: 94, trend: '+19%', opportunityScore: 89 },
    { keyword: 'viral shorts loop retention technique', demand: 'High', competition: 'Medium', relevance: 88, trend: '+52%', opportunityScore: 87 },
    { keyword: 'youtube suggested videos algorithm trigger', demand: 'High', competition: 'Low', relevance: 96, trend: '+31%', opportunityScore: 95 },
    { keyword: 'youtube thumbnail ctr psychology 2026', demand: 'High', competition: 'Low', relevance: 93, trend: '+40%', opportunityScore: 93 },
  ];

  const filtered = keywords.filter((k) =>
    k.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKeyword(kw);
    setTimeout(() => setCopiedKeyword(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Key className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Audience Search Intent Explorer
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight mt-0.5">
              High-Opportunity Keyword Research
            </h3>
            <p className="text-xs text-slate-400">
              Discovers high-search demand keywords with low competitor saturation to dominate YouTube search.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter keywords..."
              className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Keywords Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800 tracking-wider">
              <tr>
                <th className="p-3.5">Keyword / Query</th>
                <th className="p-3.5">Search Demand</th>
                <th className="p-3.5">Competition</th>
                <th className="p-3.5">Relevance</th>
                <th className="p-3.5">2026 Trend</th>
                <th className="p-3.5">Opportunity Score</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-850/50 transition-colors">
                  <td className="p-3.5 font-sans font-bold text-white">
                    {item.keyword}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.demand === 'Very High' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {item.demand}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.competition === 'Low' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {item.competition}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-300">
                    {item.relevance}%
                  </td>
                  <td className="p-3.5 text-emerald-400 font-bold">
                    {item.trend}
                  </td>
                  <td className="p-3.5">
                    <span className="text-amber-300 font-black text-sm">{item.opportunityScore}/100</span>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleCopy(item.keyword)}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-sans font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKeyword === item.keyword ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedKeyword === item.keyword ? 'Copied' : 'Copy'}</span>
                    </button>
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
