import React, { useState } from 'react';
import { Calendar, FileText, Sparkles, Copy, Check, Video, Lightbulb, PlaySquare } from 'lucide-react';

export const PlannerScriptTab: React.FC = () => {
  const [niche, setNiche] = useState('AI Agents & Creator Tech');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [plannerData, setPlannerData] = useState<{
    niche: string;
    weeklyPillars: string[];
    schedule: {
      day: number;
      format: string;
      title: string;
      hookIdea: string;
      searchIntent: string;
      expectedCTR: string;
    }[];
    viralScriptTemplate: {
      hook: string;
      intro: string;
      mainBody: string;
      cta: string;
      ending: string;
    };
  } | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ niche }),
      });
      const data = await res.json();
      setPlannerData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Creator Growth Architecture
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              30-Day Content Planner & Viral Script Engine
            </h3>
          </div>

          <form onSubmit={handleGenerate} className="flex gap-2 w-full sm:w-80">
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Your Channel Niche..."
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md shadow-red-600/20"
            >
              {isLoading ? '...' : 'Generate Plan'}
            </button>
          </form>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
          <span className="font-semibold text-slate-500 uppercase text-[10px]">Popular Niches:</span>
          {['AI Agents & Tech', 'Kids Cartoon Animation', 'Passive Income & Finance', 'Gaming Challenges'].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setNiche(preset);
              }}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-all text-xs"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Generated Content Schedule */}
      {plannerData && (
        <div className="space-y-6">
          {/* Weekly Pillars */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>3 Core Content Pillars for Maximum Retention in {plannerData.niche}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(plannerData.weeklyPillars || []).map((pillar, i) => (
                <div key={i} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-[10px]">
                    {i + 1}
                  </span>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Calendar List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-400" />
                <span>30-Day Strategic Publishing Schedule</span>
              </h4>
              <span className="text-xs text-slate-400">Long-form + Shorts Rhythm</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(plannerData.schedule || []).map((item, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-red-400">Day {item.day}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.format === 'Shorts' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {item.format}
                    </span>
                  </div>

                  <h5 className="text-sm font-bold text-white">{item.title}</h5>

                  <div className="text-xs text-slate-300 italic bg-slate-900/80 p-2 rounded border border-slate-800">
                    <span className="text-amber-400 font-semibold not-italic">Hook: </span>
                    "{item.hookIdea}"
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                    <span>Intent: {item.searchIntent}</span>
                    <span className="text-emerald-400 font-bold">Est. CTR: {item.expectedCTR}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Viral Script Framework */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>Viral Video Script Template</span>
                </h4>
                <p className="text-xs text-slate-400">Pre-structured for maximum 60%+ 30-second retention</p>
              </div>

              <button
                onClick={() => {
                  const scriptText = `VIRAL VIDEO SCRIPT BLUEPRINT:
HOOK: ${plannerData.viralScriptTemplate.hook}
INTRO: ${plannerData.viralScriptTemplate.intro}
MAIN BODY: ${plannerData.viralScriptTemplate.mainBody}
CTA: ${plannerData.viralScriptTemplate.cta}
ENDING: ${plannerData.viralScriptTemplate.ending}`;
                  copyText(scriptText, 'full-script');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
              >
                {copiedKey === 'full-script' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Script Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Full Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">1. Retention Hook (0-5s)</span>
                <p className="text-slate-200 leading-relaxed italic">{plannerData.viralScriptTemplate.hook}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">2. Fast Context Intro (5-20s)</span>
                <p className="text-slate-200 leading-relaxed italic">{plannerData.viralScriptTemplate.intro}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">3. Main Value Body</span>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line font-mono">{plannerData.viralScriptTemplate.mainBody}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">4. Algorithmic CTA</span>
                <p className="text-slate-200 leading-relaxed italic">{plannerData.viralScriptTemplate.cta}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold uppercase tracking-wider block">5. Watch Next Video Loop Ending</span>
                <p className="text-slate-200 leading-relaxed italic">{plannerData.viralScriptTemplate.ending}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
