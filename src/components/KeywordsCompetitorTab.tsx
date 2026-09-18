import React, { useState, useEffect } from 'react';
import { Key, Search, Sparkles, AlertCircle, Copy, Check, Users, ArrowUpRight, Target } from 'lucide-react';
import { KeywordItem, CompetitorVideo, ContentGapAnalysis } from '../types';

interface KeywordsCompetitorTabProps {
  currentTitle: string;
}

export const KeywordsCompetitorTab: React.FC<KeywordsCompetitorTabProps> = ({ currentTitle }) => {
  const [searchQuery, setSearchQuery] = useState(currentTitle || 'YouTube SEO AI');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [keywordsData, setKeywordsData] = useState<{
    primary: KeywordItem[];
    longTail: KeywordItem[];
    questions: KeywordItem[];
    semantic: KeywordItem[];
  } | null>(null);

  const [competitorData, setCompetitorData] = useState<{
    competitors: CompetitorVideo[];
    contentGap: ContentGapAnalysis;
  } | null>(null);

  const handleFetchData = async (query: string) => {
    setIsLoading(true);
    try {
      const [kwRes, compRes] = await Promise.all([
        fetch('/api/keywords/research', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: query }),
        }),
        fetch('/api/competitors/gap', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic: query }),
        }),
      ]);

      const kwJson = await kwRes.json();
      const compJson = await compRes.json();
      setKeywordsData(kwJson);
      setCompetitorData(compJson);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData(searchQuery);
  }, []);

  const copyKeyword = (kw: string) => {
    navigator.clipboard.writeText(kw);
    setCopiedKey(kw);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Algorithmic Intelligence
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Keyword Research & Competitor Gap Engine
            </h3>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim()) handleFetchData(searchQuery);
            }}
            className="flex gap-2 w-full sm:w-80"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter topic or niche..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md shadow-red-600/20"
            >
              {isLoading ? '...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      {/* Content Gap Analysis Highlight (Competitors Cover vs Your Video Missing) */}
      {competitorData && competitorData.contentGap && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* What Competitors Cover */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Users className="w-4 h-4 text-blue-400" />
              <h4 className="text-sm font-bold text-white">
                What Top Competitors Currently Cover
              </h4>
            </div>
            <ul className="space-y-2">
              {(competitorData.contentGap.competitorsCover || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-blue-400 font-bold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What Your Video is Missing (Critical Gaps) */}
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-5 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <h4 className="text-sm font-bold text-red-400">
                  Critical Content & Keyword Gaps (Fix These)
                </h4>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                HIGH PRIORITY
              </span>
            </div>
            <ul className="space-y-2">
              {(competitorData.contentGap.yourVideoMissing || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-red-400 font-bold mt-0.5">⚠</span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Golden Strategic Angle */}
      {competitorData && competitorData.contentGap && competitorData.contentGap.recommendedAngle && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>AI Recommended Outranking Angle</span>
          </div>
          <p className="text-sm text-slate-200 font-semibold leading-relaxed">
            {competitorData.contentGap.recommendedAngle}
          </p>
        </div>
      )}

      {/* Top Competing Videos */}
      {competitorData && competitorData.competitors && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Users className="w-4 h-4 text-orange-400" />
            <span>Top Performing Competitor Benchmark Videos</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(competitorData.competitors || []).map((c, i) => (
              <div key={i} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xs font-bold text-white line-clamp-2">{c.title}</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 whitespace-nowrap bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    {c.views}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{c.channel}</span>
                  <span>{c.daysAgo}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Strengths:</span>
                  {(c.strengths || []).map((s, idx) => (
                    <span key={idx} className="inline-block bg-slate-800/80 text-slate-300 text-[10px] px-2 py-0.5 rounded mr-1 mb-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tiered Keywords Table */}
      {keywordsData && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-emerald-400" />
              <span>Extracted Search Keywords Matrix</span>
            </h4>
            <span className="text-xs text-slate-400">Click any keyword to copy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Primary & Long-tail */}
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Primary High-Volume Keywords
                </h5>
                <div className="space-y-2">
                  {keywordsData.primary?.map((k, i) => (
                    <div
                      key={i}
                      onClick={() => copyKeyword(k.keyword)}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{k.keyword}</p>
                        <span className="text-[10px] text-slate-400">Intent: {k.intent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                          {k.searchVolume} Vol
                        </span>
                        {copiedKey === k.keyword ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Long-Tail & Authority Queries
                </h5>
                <div className="space-y-2">
                  {keywordsData.longTail?.map((k, i) => (
                    <div
                      key={i}
                      onClick={() => copyKeyword(k.keyword)}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{k.keyword}</p>
                        <span className="text-[10px] text-slate-400">Competition: {k.competition}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                          {k.competition} Comp
                        </span>
                        {copiedKey === k.keyword ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Questions & Semantic */}
            <div className="space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Question Keywords (High Intent)
                </h5>
                <div className="space-y-2">
                  {keywordsData.questions?.map((k, i) => (
                    <div
                      key={i}
                      onClick={() => copyKeyword(k.keyword)}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{k.keyword}</p>
                        <span className="text-[10px] text-slate-400">Relevance: {k.relevance}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                          Question
                        </span>
                        {copiedKey === k.keyword ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Semantic & LSI Clusters
                </h5>
                <div className="space-y-2">
                  {keywordsData.semantic?.map((k, i) => (
                    <div
                      key={i}
                      onClick={() => copyKeyword(k.keyword)}
                      className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{k.keyword}</p>
                        <span className="text-[10px] text-slate-400">Semantic Topic</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
                          Semantic
                        </span>
                        {copiedKey === k.keyword ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
