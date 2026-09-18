import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Layers,
  Hash,
  Eye,
  Camera,
  Flame,
  Clock,
  HelpCircle,
  Tag
} from 'lucide-react';
import { ScriptSeoPackage } from '../types';

interface ScriptSeoTabProps {
  initialScript?: string;
  channelName?: string;
}

const SAMPLE_SCRIPTS = [
  {
    title: 'The Brave Little Rabbit & The Secret Garden',
    type: 'full-script' as const,
    content: `SCENE 1 - MORNING IN SUNNY VALLEY
(Birds chirping softly. CAMERA pans down from the lush green canopy to find BARNABY THE RABBIT, a cheerful bunny with oversized floppy ears and a tiny red backpack, hopping along a cobblestone path.)

BARNABY (VOICEOVER)
They say no rabbit has ever crossed the Great Bramble Wall. But today... I'm packing an extra carrot, because something is glowing on the other side!

(Barnaby reaches the towering wooden gate covered in glowing emerald vines. He reaches into his pocket and pulls out a brass key.)

BARNABY
(Whispering)
Wait, did you see that shadow behind the tree? Don't blink!

(A tiny golden butterfly flutters down and lands squarely on the keyhole. The gate clicks open with a magical chime.)

SCENE 2 - THE ENCHANTED CLEARING
(Barnaby steps through, his jaw dropping in shock. Floating crystal lanterns illuminate a hidden meadow filled with giant singing flowers and an ancient stone fountain.)

BARNABY
It's real. The legendary Secret Garden of Sunny Valley! We actually did it!
(He looks directly into camera with a wide happy grin.)
Now... how do we get back before dinner?`
  },
  {
    title: 'The Friendly Dragon Who Was Afraid of Heights',
    type: 'transcript' as const,
    content: `In the mountain village of Oakhaven, everyone expected dragons to soar above the highest storm clouds. But Pip was different. Pip was a baby emerald dragon who preferred baking blueberry pies in the village square. Every time he looked down from the cliff edge, his tiny wings would start to tremble. One afternoon, when young Mia's pet lamb wandered onto a steep rocky ledge, Pip realized that being brave doesn't mean you aren't scared—it means taking the leap even when your knees are shaking. With a deep breath of warm cinnamon smoke, Pip spread his emerald wings for the very first time.`
  }
];

export const ScriptSeoTab: React.FC<ScriptSeoTabProps> = ({ initialScript = '', channelName = 'Tooni TV' }) => {
  const [sourceType, setSourceType] = useState<ScriptSeoPackage['sourceType']>('full-script');
  const [scriptInput, setScriptInput] = useState<string>(initialScript || SAMPLE_SCRIPTS[0].content);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [seoPackage, setSeoPackage] = useState<ScriptSeoPackage | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleRunScriptSeo = async (overrideScript?: string) => {
    const textToAnalyze = overrideScript || scriptInput;
    if (!textToAnalyze.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/seo/script-to-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          script: textToAnalyze,
          sourceType,
          channelName
        })
      });

      if (!res.ok) throw new Error('Failed to process script');
      const data: ScriptSeoPackage = await res.json();
      setSeoPackage(data);
    } catch (error) {
      console.error('Error generating Script-First SEO:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const pipelineSteps = [
    { label: 'Script Input', done: true },
    { label: 'Topic & Entities', done: !!seoPackage },
    { label: 'Search Intent', done: !!seoPackage },
    { label: 'Content Gaps', done: !!seoPackage },
    { label: '5 Titles', done: !!seoPackage },
    { label: 'Description & Density', done: !!seoPackage },
    { label: '20 Tags & Distribution', done: !!seoPackage },
    { label: 'Hook & Retention', done: !!seoPackage },
    { label: 'Thumbnail Concept', done: !!seoPackage }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
                Script-First SEO Workflow
              </span>
              <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Content-Truth Guard
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              SCRIPT → CONTENT INTELLIGENCE → 100/100 SEO
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl mt-1">
              Never optimize with keywords alone. The AI deeply analyzes your script, transcript, or subtitles first to extract true entities, viewer intent, and search potential without deceptive clickbait.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleRunScriptSeo()}
              disabled={isLoading || !scriptInput.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Analyzing Script...' : 'Run Script SEO Pipeline'}
            </button>
          </div>
        </div>

        {/* Pipeline Steps Tracker */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex items-center justify-between overflow-x-auto pb-2 gap-2 scrollbar-none text-xs">
            {pipelineSteps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step.done
                      ? 'bg-emerald-500 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {step.done ? '✓' : idx + 1}
                </div>
                <span className={`font-medium ${step.done ? 'text-slate-200' : 'text-slate-500'}`}>
                  {step.label}
                </span>
                {idx < pipelineSteps.length - 1 && (
                  <span className="text-slate-600 mx-1">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Script Input & Presets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Script Editor */}
        <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Upload or Paste Content Source
              </h3>
            </div>

            {/* Source Type Selector */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              {(['full-script', 'transcript', 'subtitle', 'text-document'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSourceType(type)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    sourceType === type
                      ? 'bg-indigo-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type === 'full-script' ? 'Full Script' : type === 'transcript' ? 'Transcript' : type === 'subtitle' ? 'Subtitles' : 'Document'}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={scriptInput}
            onChange={(e) => setScriptInput(e.target.value)}
            rows={8}
            placeholder="Paste your YouTube video script, auto-generated transcript, subtitle file (.srt text), or storyboard outline here..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
          />

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <span>{scriptInput.length} characters</span>
              <span>•</span>
              <span>{scriptInput.split(/\s+/).filter(Boolean).length} words</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Load Demo:</span>
              {SAMPLE_SCRIPTS.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setScriptInput(s.content);
                    setSourceType(s.type);
                    handleRunScriptSeo(s.content);
                  }}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
                >
                  Demo {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Truth Constraints & Integrity Guard */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Content-First Integrity Rules
            </div>
            <h4 className="text-base font-bold text-white">Truth Grounding Engine</h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Every keyword, hook, and title generated must trace back to something that genuinely occurs in your uploaded script.
            </p>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-slate-300">
                  <strong>Zero Hallucinated Promises:</strong> Titles only promise conflicts and payoffs present in the narrative.
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-slate-300">
                  <strong>Zero Fabricated Volume:</strong> When third-party volume isn't queried, we explicitly state <em>"Search volume unavailable"</em> rather than inventing numbers.
                </span>
              </div>
              <div className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="text-emerald-400 font-bold">✓</span>
                <span className="text-slate-300">
                  <strong>Character Consistency:</strong> Preserves Tooni TV character lore and visual identity for thumbnails.
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => handleRunScriptSeo()}
            disabled={isLoading || !scriptInput.trim()}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Analyze & Generate Package
          </button>
        </div>
      </div>

      {/* Results Section */}
      {seoPackage && (
        <div className="space-y-8 animate-fadeIn">
          {/* Statistics & Mathematical Density Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Content-Extracted Intelligence
                </span>
                <h3 className="text-lg font-black text-white">
                  Topic: &quot;{seoPackage.topic}&quot;
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  {seoPackage.searchVolumeStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  USA Family Audience
                </span>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Primary Keyword</span>
                <span className="text-sm font-black text-white mt-1 block truncate" title={seoPackage.primaryKeyword}>
                  {seoPackage.primaryKeyword}
                </span>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-1.5">
                  <span>Occurrences: <strong className="text-emerald-400">{seoPackage.primaryKeywordOccurrences}</strong></span>
                  <span>Density: <strong className="text-indigo-400">{seoPackage.primaryKeywordDensity}%</strong></span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Secondary Entities</span>
                <span className="text-sm font-black text-white mt-1 block truncate">
                  {seoPackage.secondaryKeywords[0]?.keyword || 'Secondary Animation'}
                </span>
                <div className="flex items-center justify-between mt-2 text-xs text-slate-400 border-t border-slate-800/80 pt-1.5">
                  <span>Occurrences: <strong className="text-emerald-400">{seoPackage.secondaryKeywords[0]?.occurrences || 2}</strong></span>
                  <span>Density: <strong className="text-indigo-400">{seoPackage.secondaryKeywords[0]?.density || 0.6}%</strong></span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Primary Search Intent</span>
                <span className="text-xs font-bold text-amber-300 mt-1 block line-clamp-2">
                  {seoPackage.primarySearchIntent}
                </span>
                <span className="text-[10px] text-slate-500 block mt-2">Recommended & Homefeed Browse</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 block uppercase">Content Gap Detected</span>
                <span className="text-xs text-slate-300 mt-1 block line-clamp-2">
                  {seoPackage.contentGaps[0]}
                </span>
                <span className="text-[10px] text-rose-400 block mt-2 font-medium">3-Second Auditory Cue Needed</span>
              </div>
            </div>

            {/* Extracted Entities Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400">Extracted Key Entities:</span>
              {seoPackage.entities.map((ent, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/50 text-indigo-300 text-xs font-medium"
                >
                  {ent}
                </span>
              ))}
            </div>
          </div>

          {/* TOP 5 TITLES GENERATOR */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Grounded Packaging • YouTube 100-Char Limit
                </span>
                <h3 className="text-lg font-black text-white">
                  Top 5 Titles Generated for This Exact Script
                </h3>
              </div>
              <div className="text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                  Preferred: 90–98 characters • Max: 100
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {seoPackage.top5Titles.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="text-base font-bold text-white hover:text-indigo-300 transition-colors">
                          {t.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed pl-7">
                        <strong className="text-slate-300">Why it matches script:</strong> {t.whyMatchesContent}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-center">
                      <div className="text-right text-xs">
                        <div className="flex items-center justify-end gap-2 text-slate-300">
                          <span
                            className={`font-bold font-mono ${
                              t.characterCount > 100
                                ? 'text-red-400'
                                : t.characterCount >= 90 && t.characterCount <= 98
                                ? 'text-emerald-400'
                                : 'text-slate-200'
                            }`}
                          >
                            {t.characterCount}/100 chars
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            t.characterCount > 100
                              ? 'bg-red-500/20 text-red-300'
                              : t.characterCount >= 90 && t.characterCount <= 98
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {t.characterCount > 100
                              ? 'Over 100c'
                              : t.characterCount >= 90 && t.characterCount <= 98
                              ? 'Preferred 90–98c'
                              : `${t.wordCount} words`}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          KW at pos #{t.keywordPosition} ({t.keywordPercentage}%)
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopy(`title-${idx}`, t.title)}
                        className="p-2.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Copy title"
                      >
                        {copiedKey === `title-${idx}` ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Packaging Pill Notes */}
                  <div className="mt-3 pt-2.5 border-t border-slate-900 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-indigo-300 font-medium">
                      Intent: {t.searchIntent}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-400">
                      CTR Strategy: {t.ctrPackagingNotes}
                    </span>
                    {t.powerWords.length > 0 && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-medium">
                        Power Words: {t.powerWords.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description & Exact Mathematical Density Rules */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Algorithmic Copywriting
                </span>
                <h3 className="text-lg font-black text-white">
                  Optimized Human-First Description & Density Metrics
                </h3>
              </div>

              <button
                onClick={() => handleCopy('desc-full', seoPackage.optimizedDescription)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
              >
                {copiedKey === 'desc-full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Full Description
              </button>
            </div>

            {/* Dynamic Math Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Characters</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {seoPackage.descriptionStats.characterCount} / 5,000
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Words / Sentences</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {seoPackage.descriptionStats.wordCount} words / {seoPackage.descriptionStats.sentenceCount} sent.
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Primary KW Density</span>
                <span className={`text-sm font-bold mt-0.5 block ${
                  seoPackage.descriptionStats.primaryKeywordDensity > 2.5 ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {seoPackage.descriptionStats.primaryKeywordDensity}% ({seoPackage.descriptionStats.primaryKeywordOccurrences}x)
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Hashtags & CTAs</span>
                <span className="text-sm font-bold text-white mt-0.5 block">
                  {seoPackage.descriptionStats.hashtagCount} hashtags / {seoPackage.descriptionStats.ctaCount} CTAs
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Stuffing Risk</span>
                <span className={`text-sm font-bold mt-0.5 block ${
                  seoPackage.descriptionStats.keywordStuffingRisk ? 'text-rose-400' : 'text-emerald-400'
                }`}>
                  {seoPackage.descriptionStats.keywordStuffingRisk ? 'Warning: High Density' : 'Zero Spam / Safe'}
                </span>
              </div>
            </div>

            {/* Description Text Box */}
            <pre className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {seoPackage.optimizedDescription}
            </pre>
          </div>

          {/* EXACT 20 KEYWORDS & EXACT 20 TAGS WITH 6 CATEGORIES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 20 Grounded Keywords */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Keyword Strategy
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Exact 20 Search & Suggested Keywords
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy('kw-all', seoPackage.keywords20.join(', '))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === 'kw-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy All 20
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                {seoPackage.keywords20.map((kw, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                  >
                    <span className="text-slate-300 truncate font-medium">
                      <span className="text-slate-500 mr-2 font-mono">#{idx + 1}</span>
                      {kw}
                    </span>
                    <button
                      onClick={() => handleCopy(`kw-${idx}`, kw)}
                      className="text-slate-500 hover:text-white ml-2 cursor-pointer"
                    >
                      {copiedKey === `kw-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 20 Classified Tags with Mathematical Averages */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Tag Architecture
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Exact 20 YouTube Tags (6 Categories)
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy('tags-all', seoPackage.tags20.map((t) => t.tag).join(', '))}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {copiedKey === 'tags-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy for YouTube
                </button>
              </div>

              {/* Tag Statistics */}
              <div className="grid grid-cols-3 gap-2 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Total Characters</span>
                  <span className="font-bold text-white mt-0.5 block">{seoPackage.tagStats.totalCharacters} / 500</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Avg Chars/Tag</span>
                  <span className="font-bold text-indigo-300 mt-0.5 block">{seoPackage.tagStats.avgCharactersPerTag} chars</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Avg Words/Tag</span>
                  <span className="font-bold text-emerald-300 mt-0.5 block">{seoPackage.tagStats.avgWordsPerTag} words</span>
                </div>
              </div>

              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {seoPackage.tags20.map((tagItem, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Tag className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span className="text-slate-200 font-medium truncate">{tagItem.tag}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] flex-shrink-0">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                        {tagItem.classification}
                      </span>
                      <span className="text-slate-400">{tagItem.charCount}c</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hook & Retention Fixes + Thumbnail Concept */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Hook Improvement */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                First 15-Second Retention Surgery
              </div>
              <h3 className="text-base font-bold text-white">
                Script Hook Optimization
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-rose-400 block uppercase">Detected Script Problem:</span>
                  <p className="text-slate-300 mt-1">{seoPackage.hookImprovement.hookProblem}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-indigo-900/40">
                  <span className="text-[10px] font-bold text-indigo-400 block uppercase">0-5 Second Spoken Hook Fix:</span>
                  <p className="text-white font-semibold mt-1">{seoPackage.hookImprovement.first5SecHook}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-emerald-400 block uppercase">0-15 Second Visual Cue:</span>
                  <p className="text-slate-300 mt-1">{seoPackage.hookImprovement.first15SecRetention}</p>
                </div>
              </div>
            </div>

            {/* Thumbnail Concept Strictly Matching Script Characters */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                Character-Locked Thumbnail Visual
              </div>
              <h3 className="text-base font-bold text-white">
                Canonical Thumbnail Concept
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">Scene & Protagonist:</span>
                  <p className="text-slate-200 mt-1">{seoPackage.thumbnailConcept.scene}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-amber-500/30">
                  <span className="text-[10px] font-bold text-amber-400 block uppercase">Text Overlay (3 Words Max):</span>
                  <span className="text-lg font-black text-amber-300 mt-1 block font-mono">
                    {seoPackage.thumbnailConcept.overlayText}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Midjourney / Gemini Image Prompt:</span>
                    <button
                      onClick={() => handleCopy('thumb-prompt', seoPackage.thumbnailConcept.prompt)}
                      className="text-slate-400 hover:text-white text-[11px] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === 'thumb-prompt' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Prompt
                    </button>
                  </div>
                  <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                    {seoPackage.thumbnailConcept.prompt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
