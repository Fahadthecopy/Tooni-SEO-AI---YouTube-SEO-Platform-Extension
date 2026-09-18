import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  BarChart2,
  Copy,
  Check,
  AlertCircle,
  FileCode,
  Tag,
  BookOpen,
  Layers,
  Upload,
  ShieldCheck,
  RefreshCw,
  Hash,
  Compass
} from 'lucide-react';
import {
  TitleAnalysisDetails,
  TopTitleOption,
  WordUsageAnalysis,
  DescriptionStatistics,
  TagAnalysisItem,
  TagStatistics,
  MetadataAnalysis,
  ExistingSeoImport
} from '../types';

interface AdvancedSeoAnalyzerTabProps {
  currentTitle?: string;
  currentDescription?: string;
  currentThumbnail?: string;
}

export const AdvancedSeoAnalyzerTab: React.FC<AdvancedSeoAnalyzerTabProps> = ({
  currentTitle = 'English Cartoon Animation - The Secret Garden',
  currentDescription = 'Welcome to Tooni TV! Watch this amazing English cartoon animation.',
  currentThumbnail = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'title' | 'description' | 'tags' | 'words' | 'metadata' | 'import'>('title');

  // Title Analyzer State
  const [titleInput, setTitleInput] = useState<string>(currentTitle);
  const [primaryKw, setPrimaryKw] = useState<string>('English Cartoon');
  const [secondaryKw, setSecondaryKw] = useState<string>('Funny Animals');
  const [titleAnalysis, setTitleAnalysis] = useState<TitleAnalysisDetails | null>(null);
  const [top5Titles, setTop5Titles] = useState<TopTitleOption[]>([]);
  const [isAnalyzingTitle, setIsAnalyzingTitle] = useState<boolean>(false);

  // Description Studio State
  const [descInput, setDescInput] = useState<string>(currentDescription);
  const [descStats, setDescStats] = useState<DescriptionStatistics | null>(null);
  const [isAnalyzingDesc, setIsAnalyzingDesc] = useState<boolean>(false);

  // Tags Studio State
  const [tagItems, setTagItems] = useState<TagAnalysisItem[]>([]);
  const [tagStats, setTagStats] = useState<TagStatistics | null>(null);
  const [isGeneratingTags, setIsGeneratingTags] = useState<boolean>(false);

  // Words Analysis State
  const [wordUsage, setWordUsage] = useState<WordUsageAnalysis | null>(null);

  // Metadata State
  const [metadata, setMetadata] = useState<MetadataAnalysis | null>(null);

  // Existing SEO Import State
  const [importData, setImportData] = useState<ExistingSeoImport>({
    title: currentTitle,
    description: currentDescription,
    tags: 'cartoon, animation, english, tooni tv, funny',
    keywords: 'english cartoon, animated stories',
    thumbnailUrl: currentThumbnail,
    selectedComponent: 'all'
  });
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Run Title Analysis
  const runTitleAnalysis = async () => {
    setIsAnalyzingTitle(true);
    try {
      const [resAnalysis, resTop5] = await Promise.all([
        fetch('/api/seo/title-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titleInput,
            primaryKeyword: primaryKw,
            secondaryKeyword: secondaryKw
          })
        }),
        fetch('/api/seo/generate-top5-titles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            topic: titleInput,
            primaryKeyword: primaryKw,
            secondaryKeywords: [secondaryKw]
          })
        })
      ]);

      const dataAnalysis = await resAnalysis.json();
      const dataTop5 = await resTop5.json();
      setTitleAnalysis(dataAnalysis);
      setTop5Titles(dataTop5 || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingTitle(false);
    }
  };

  // Run Description Analysis / Generation
  const runDescriptionGenerate = async () => {
    setIsAnalyzingDesc(true);
    try {
      const res = await fetch('/api/seo/description-generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: titleInput,
          primaryKeyword: primaryKw,
          secondaryKeywords: [secondaryKw],
          channelName: 'Tooni TV'
        })
      });
      const data = await res.json();
      if (data && data.description) {
        setDescInput(data.description);
        setDescStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingDesc(false);
    }
  };

  // Run Description live recalculation
  const runDescriptionStats = async (text: string) => {
    try {
      const res = await fetch('/api/seo/description-stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          primaryKeyword: primaryKw,
          secondaryKeywords: [secondaryKw]
        })
      });
      const data = await res.json();
      setDescStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Run Tags Analysis
  const runTagsGenerate = async () => {
    setIsGeneratingTags(true);
    try {
      const res = await fetch('/api/seo/tags-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          primaryKeyword: primaryKw,
          secondaryKeywords: [secondaryKw]
        })
      });
      const data = await res.json();
      if (data) {
        setTagItems(data.tags || []);
        setTagStats(data.stats || null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingTags(false);
    }
  };

  // Run Words Analysis
  const runWordsAnalyze = async () => {
    try {
      const res = await fetch('/api/seo/words-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `${titleInput} ${descInput}`,
          primaryKeyword: primaryKw
        })
      });
      const data = await res.json();
      setWordUsage(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Run Metadata Audit
  const runMetadataAudit = async () => {
    try {
      const res = await fetch('/api/seo/metadata-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: titleInput,
          description: descInput,
          tags: tagItems.map((t) => t.tag),
          thumbnailUrl: currentThumbnail
        })
      });
      const data = await res.json();
      setMetadata(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial load
  useEffect(() => {
    runTitleAnalysis();
    runTagsGenerate();
    runDescriptionGenerate();
    runWordsAnalyze();
    runMetadataAudit();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
                Advanced On-Page Suite
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Mathematical Counts &bull; Grounded Analysis &bull; Density Rules
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              ADVANCED SEO & METADATA AUDITOR
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Deep diagnostic analysis of titles, descriptions, keyword density, 20 tags distribution, word usage, and OpenGraph/JSON-LD metadata.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                runTitleAnalysis();
                runTagsGenerate();
                runDescriptionStats(descInput);
                runWordsAnalyze();
                runMetadataAudit();
              }}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Re-Audit All Modules
            </button>
          </div>
        </div>

        {/* Sub-Navigation Bar */}
        <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'title', label: 'Title Analyzer & Top 5', icon: Search },
            { id: 'description', label: 'Description & Density', icon: BookOpen },
            { id: 'tags', label: '20 Tags Architecture', icon: Tag },
            { id: 'words', label: 'Word Usage & Entities', icon: BarChart2 },
            { id: 'metadata', label: 'Metadata & JSON-LD', icon: FileCode },
            { id: 'import', label: 'Import Existing SEO', icon: Upload }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-700 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Keywords Control Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 text-xs">
        <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Primary Keyword Entity
            </label>
            <input
              type="text"
              value={primaryKw}
              onChange={(e) => setPrimaryKw(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Secondary Keyword Entity
            </label>
            <input
              type="text"
              value={secondaryKw}
              onChange={(e) => setSecondaryKw(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-indigo-500 font-medium"
            />
          </div>
        </div>

        <button
          onClick={() => {
            runTitleAnalysis();
            runTagsGenerate();
          }}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 self-end md:self-auto cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Update Entities
        </button>
      </div>

      {/* SUB-TAB 1: TITLE ANALYZER & TOP 5 GENERATOR */}
      {activeSubTab === 'title' && (
        <div className="space-y-6">
          {/* Title Diagnostic Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Mathematical Analysis
                </span>
                <h3 className="text-base font-bold text-white">
                  Title Skimming & Packaging Diagnostics
                </h3>
              </div>

              {titleAnalysis && (
                <div className="text-right">
                  <div className="text-2xl font-black text-amber-400">{titleAnalysis.titleScore}/100</div>
                  <span className="text-[10px] text-slate-500 block">Editorial Title Score</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder="Enter YouTube title to analyze..."
                  className={`flex-1 bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white font-medium focus:outline-none transition-colors ${
                    titleInput.length > 100
                      ? 'border-red-500/80 focus:border-red-400'
                      : titleInput.length >= 90 && titleInput.length <= 98
                      ? 'border-emerald-500/80 focus:border-emerald-400'
                      : 'border-slate-800 focus:border-indigo-500'
                  }`}
                />
                <button
                  onClick={runTitleAnalysis}
                  disabled={isAnalyzingTitle}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  Analyze
                </button>
              </div>

              {/* Live Character Limit Counter & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono font-bold ${
                      titleInput.length > 100
                        ? 'text-red-400'
                        : titleInput.length >= 90 && titleInput.length <= 98
                        ? 'text-emerald-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {titleInput.length}/100 characters
                  </span>
                  <span className="text-[11px] text-slate-500">
                    (YouTube Limit: 100 characters, not words • Preferred: 90–98 chars)
                  </span>
                </div>

                {titleInput.length > 100 ? (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[11px] font-bold border border-red-500/30">
                    ⚠️ Critical: Over 100-char limit (+{titleInput.length - 100} chars)
                  </span>
                ) : titleInput.length >= 90 && titleInput.length <= 98 ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                    ⭐ Optimal Preferred Range (90–98 chars)
                  </span>
                ) : titleInput.length > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-700">
                    Under 100 chars (Preferred: 90–98 chars when natural)
                  </span>
                ) : null}
              </div>
            </div>

            {/* Diagnostic Metrics */}
            {titleAnalysis && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className={`bg-slate-950 p-3 rounded-xl border ${
                    titleAnalysis.isOverLimit
                      ? 'border-red-500/50 bg-red-950/20'
                      : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98
                      ? 'border-emerald-500/50 bg-emerald-950/20'
                      : 'border-slate-800'
                  }`}>
                    <span className="text-slate-400 text-[10px] block uppercase">Character Limit</span>
                    <span className={`text-sm font-bold mt-0.5 block ${
                      titleAnalysis.isOverLimit
                        ? 'text-red-400'
                        : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98
                        ? 'text-emerald-400'
                        : 'text-white'
                    }`}>
                      {titleAnalysis.characterCount}/100 chars
                    </span>
                    <span className={`text-[10px] block mt-1 font-semibold ${
                      titleAnalysis.isOverLimit
                        ? 'text-red-400'
                        : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98
                        ? 'text-emerald-300'
                        : 'text-slate-400'
                    }`}>
                      {titleAnalysis.isOverLimit
                        ? 'Exceeds 100 Limit!'
                        : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98
                        ? 'Preferred (90–98 chars)'
                        : `${titleAnalysis.wordCount} words (Max 100c)`}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase">Placement</span>
                    <span className="text-sm font-bold text-indigo-300 mt-0.5 block truncate">
                      {titleAnalysis.keywordPlacement}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Keyword is {titleAnalysis.keywordPercentage}% of title
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase">Power & Emotional</span>
                    <span className="text-sm font-bold text-amber-300 mt-0.5 block">
                      {titleAnalysis.powerWordCount} Power / {titleAnalysis.emotionalWordCount} Emotion
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {titleAnalysis.clickAppeal}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[10px] block uppercase">Intent & Readability</span>
                    <span className="text-xs font-bold text-white mt-0.5 block truncate">
                      {titleAnalysis.searchIntentMatch}
                    </span>
                    <span className="text-[10px] text-emerald-400 block mt-1">
                      {titleAnalysis.readability}
                    </span>
                  </div>
                </div>

                {/* Specific Advice for 100-Char Limit */}
                {titleAnalysis.charLimitAdvice && (
                  <div className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                    titleAnalysis.isOverLimit
                      ? 'bg-red-950/30 border-red-500/50 text-red-300'
                      : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}>
                    <span className="text-sm mt-0.5">
                      {titleAnalysis.isOverLimit ? '🛑' : titleAnalysis.characterCount >= 90 && titleAnalysis.characterCount <= 98 ? '✅' : 'ℹ️'}
                    </span>
                    <span>
                      <strong>YouTube Character Guide:</strong> {titleAnalysis.charLimitAdvice}
                    </span>
                  </div>
                )}

                {/* Score Disclaimer Banner */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-300">Methodology Note:</strong> {titleAnalysis.scoreDisclaimer}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Top 5 Generated Titles */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Grounded Alternatives • Max 100 Characters
                </span>
                <h3 className="text-base font-bold text-white">
                  Top 5 Optimized Titles for This Content
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  Preferred: 90–98 characters
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {top5Titles.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 text-xs font-bold flex items-center justify-center">
                          #{idx + 1}
                        </span>
                        <h4 className="text-sm font-bold text-white hover:text-indigo-300 transition-colors">
                          {t.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 pl-7">
                        <strong className="text-slate-300">Strategy:</strong> {t.ctrPackagingNotes}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right text-xs">
                        <div className="flex items-center justify-end gap-1.5">
                          <span
                            className={`font-mono font-bold block ${
                              t.characterCount > 100
                                ? 'text-red-400'
                                : t.characterCount >= 90 && t.characterCount <= 98
                                ? 'text-emerald-400'
                                : 'text-slate-300'
                            }`}
                          >
                            {t.characterCount}/100 chars
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            t.characterCount > 100
                              ? 'bg-red-500/20 text-red-400'
                              : t.characterCount >= 90 && t.characterCount <= 98
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'text-slate-500'
                          }`}
                        >
                          {t.characterCount > 100
                            ? 'Over 100c!'
                            : t.characterCount >= 90 && t.characterCount <= 98
                            ? 'Preferred (90–98c)'
                            : `${t.wordCount} words`}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(`top5-${idx}`, t.title)}
                        className="p-2.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Copy title"
                      >
                        {copiedKey === `top5-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: DESCRIPTION STUDIO & DENSITY RULES */}
      {activeSubTab === 'description' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Keyword Placement & Density
                </span>
                <h3 className="text-base font-bold text-white">
                  Description Studio & Algorithmic Math
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runDescriptionGenerate}
                  disabled={isAnalyzingDesc}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Generate New Description
                </button>
                <button
                  onClick={() => handleCopy('desc-adv', descInput)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === 'desc-adv' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Description
                </button>
              </div>
            </div>

            {/* Live Statistics Math Bar */}
            {descStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Character / Word Count</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">
                    {descStats.characterCount} chars / {descStats.wordCount} words
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {descStats.sentenceCount} full sentences
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Primary KW Occurrences</span>
                  <span className="text-sm font-bold text-indigo-300 mt-0.5 block">
                    {descStats.primaryKeywordOccurrences}x ({descStats.primaryKeywordDensity}%)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Ideal: 1.0% - 2.5%
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Secondary Entities</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5 block">
                    {descStats.secondaryKeywordOccurrences}x ({descStats.secondaryKeywordDensity}%)
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {descStats.totalKeywordOccurrences} total keyword hits
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Repetitive Stuffing Risk</span>
                  <span className={`text-sm font-bold mt-0.5 block ${descStats.keywordStuffingRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {descStats.keywordStuffingRisk ? 'High Risk (>2.5%)' : 'Natural & Safe'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    {descStats.hashtagCount} hashtags &bull; {descStats.ctaCount} CTAs
                  </span>
                </div>
              </div>
            )}

            {/* Keyword Stuffing Alert Box */}
            {descStats?.keywordStuffingRisk && descStats.keywordStuffingAdvice && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 flex items-start gap-3 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <span>{descStats.keywordStuffingAdvice}</span>
              </div>
            )}

            {/* Editable Description Text Area */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 font-medium">
                Live Description (Edits automatically update math):
              </label>
              <textarea
                value={descInput}
                onChange={(e) => {
                  setDescInput(e.target.value);
                  runDescriptionStats(e.target.value);
                }}
                rows={12}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500 resize-y"
              />
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 20 TAGS ARCHITECTURE */}
      {activeSubTab === 'tags' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Semantic Clustering
                </span>
                <h3 className="text-base font-bold text-white">
                  Exact 20 Tags Distributed into 6 Categories
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={runTagsGenerate}
                  disabled={isGeneratingTags}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingTags ? 'animate-spin' : ''}`} />
                  Regenerate 20 Tags
                </button>
                <button
                  onClick={() => handleCopy('tags-studio-all', tagItems.map((t) => t.tag).join(', '))}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === 'tags-studio-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy 20 Tags for YouTube
                </button>
              </div>
            </div>

            {/* Tag Statistics Math */}
            {tagStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Total Tags Count</span>
                  <span className="text-sm font-bold text-emerald-400 mt-0.5 block">
                    {tagStats.totalTags} / 20 (Guaranteed)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Total Character Length</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">
                    {tagStats.totalCharacters} / 500 characters
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Avg Chars / Tag</span>
                  <span className="text-sm font-bold text-indigo-300 mt-0.5 block">
                    {tagStats.avgCharactersPerTag} chars
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block uppercase">Avg Words / Tag</span>
                  <span className="text-sm font-bold text-amber-300 mt-0.5 block">
                    {tagStats.avgWordsPerTag} words
                  </span>
                </div>
              </div>
            )}

            {/* Tag Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Tag Keyword</th>
                    <th className="p-3">Category Classification</th>
                    <th className="p-3 text-center">Chars / Words</th>
                    <th className="p-3">Semantic Relationship</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 bg-slate-900/60">
                  {tagItems.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 text-slate-500 font-mono">{idx + 1}</td>
                      <td className="p-3 font-semibold text-white">{item.tag}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.classification === 'Primary Topic' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          item.classification === 'Secondary Topic' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          item.classification === 'Long-Tail' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                          item.classification === 'Brand' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                          'bg-slate-800 text-slate-300'
                        }`}>
                          {item.classification}
                        </span>
                      </td>
                      <td className="p-3 text-center text-slate-400 font-mono">
                        {item.charCount}c &bull; {item.wordCount}w
                      </td>
                      <td className="p-3 text-slate-400">{item.keywordRelationship}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleCopy(`tag-${idx}`, item.tag)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          {copiedKey === `tag-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: WORD USAGE & ENTITIES */}
      {activeSubTab === 'words' && wordUsage && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Heavy-Usage Vocabulary
              </span>
              <h3 className="text-base font-bold text-white">
                Word Frequency & Dilution Diagnostics
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Distinguishes between high-intent semantic keywords and generic filler words that dilute search authority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Relevant Popular Words */}
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  Relevant High-Intent Words
                </div>
                <div className="space-y-2 text-xs">
                  {wordUsage.relevantPopularWords.map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span>{w.word}</span>
                        <span className="text-emerald-400">{w.frequency}x</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{w.role}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Generic Words */}
              <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                  <AlertCircle className="w-4 h-4" />
                  Generic Filler Words
                </div>
                <div className="space-y-2 text-xs">
                  {wordUsage.genericWords.map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between font-bold text-slate-300">
                        <span>{w.word}</span>
                        <span className="text-amber-400">{w.frequency}x</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{w.advice}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Low-Relevance Words */}
              <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase">
                  <AlertCircle className="w-4 h-4" />
                  Low-Relevance / Misaligned
                </div>
                <div className="space-y-2 text-xs">
                  {wordUsage.lowRelevanceWords.map((w, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="flex items-center justify-between font-bold text-rose-300">
                        <span>{w.word}</span>
                        <span className="text-rose-400">{w.frequency}x</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{w.warning}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: METADATA & OPENGRAPH */}
      {activeSubTab === 'metadata' && metadata && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                SERP & Social Preview
              </span>
              <h3 className="text-base font-bold text-white">
                OpenGraph, Twitter Cards, & JSON-LD VideoObject
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* OpenGraph Card Preview */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase">OpenGraph / Social Preview</span>
                <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                  <img
                    src={metadata.openGraph.image || currentThumbnail}
                    alt="OpenGraph Thumbnail"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3.5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">TOONITV.COM &bull; VIDEO</span>
                    <h4 className="text-sm font-bold text-white truncate">{metadata.openGraph.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{metadata.openGraph.description}</p>
                  </div>
                </div>
              </div>

              {/* JSON-LD Schema Snippet */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">Schema.org (VideoObject JSON-LD)</span>
                  <button
                    onClick={() => handleCopy('json-ld', metadata.structuredMetadata.jsonLdSnippet)}
                    className="text-xs text-indigo-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    {copiedKey === 'json-ld' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Schema
                  </button>
                </div>
                <pre className="w-full bg-slate-900 p-3 rounded-lg text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-56">
                  {metadata.structuredMetadata.jsonLdSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 6: IMPORT EXISTING SEO */}
      {activeSubTab === 'import' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Existing Asset Optimizer
            </span>
            <h3 className="text-base font-bold text-white">
              Import & Selectively Improve Existing Metadata
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Upload or paste your existing YouTube video metadata. Choose to optimize the whole package or selectively upgrade only the Title, Description, Tags, or Thumbnail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase">Current Video Title</label>
              <input
                type="text"
                value={importData.title}
                onChange={(e) => setImportData({ ...importData, title: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-400 font-bold uppercase">Current Thumbnail Image URL</label>
              <input
                type="text"
                value={importData.thumbnailUrl}
                onChange={(e) => setImportData({ ...importData, thumbnailUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="md:col-span-2 space-y-1">
              <label className="text-slate-400 font-bold uppercase">Current Video Description</label>
              <textarea
                value={importData.description}
                onChange={(e) => setImportData({ ...importData, description: e.target.value })}
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Optimization Target:</span>
              {(['all', 'title', 'description', 'tags', 'thumbnail'] as const).map((comp) => (
                <button
                  key={comp}
                  onClick={() => setImportData({ ...importData, selectedComponent: comp })}
                  className={`px-3 py-1 rounded-md capitalize font-medium cursor-pointer ${
                    importData.selectedComponent === comp
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {comp}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setTitleInput(importData.title || titleInput);
                setDescInput(importData.description || descInput);
                runTitleAnalysis();
                runDescriptionStats(importData.description || descInput);
                setImportStatus(`Successfully imported! Upgraded ${importData.selectedComponent.toUpperCase()} focus.`);
                setTimeout(() => setImportStatus(null), 3000);
              }}
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow flex items-center gap-2 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Apply & Optimize Selected Target
            </button>
          </div>

          {importStatus && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/50 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{importStatus}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
