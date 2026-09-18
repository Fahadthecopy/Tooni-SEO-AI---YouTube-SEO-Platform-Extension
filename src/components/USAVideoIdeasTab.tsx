import React, { useState } from 'react';
import { 
  Sparkles, 
  Video, 
  Smartphone, 
  Repeat, 
  Copy, 
  Check, 
  Compass, 
  Calendar, 
  Search, 
  Target, 
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Flame,
  Layers
} from 'lucide-react';
import { USAIdeaItem, USAContentStrategy } from '../types';

interface USAVideoIdeasTabProps {
  initialTopic?: string;
  onApplyIdeaToOptimizer?: (ideaTitle: string) => void;
}

export const USAVideoIdeasTab: React.FC<USAVideoIdeasTabProps> = ({
  initialTopic = 'Kids Animation Cartoons',
  onApplyIdeaToOptimizer,
}) => {
  const [topic, setTopic] = useState(initialTopic);
  const [category, setCategory] = useState('Animation & Kids');
  const [activeFormat, setActiveFormat] = useState<'all' | 'long-form' | 'shorts' | 'follow-up'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [ideas, setIdeas] = useState<USAIdeaItem[]>([]);
  const [strategy, setStrategy] = useState<USAContentStrategy | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/ideas/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, category }),
      });
      if (!res.ok) throw new Error('Failed to generate ideas');
      const data = await res.json();
      setIdeas(data.ideas || []);
      setStrategy(data.strategy || null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredIdeas = activeFormat === 'all' 
    ? ideas 
    : ideas.filter((item) => item.format === activeFormat);

  const longFormCount = ideas.filter((i) => i.format === 'long-form').length;
  const shortsCount = ideas.filter((i) => i.format === 'shorts').length;
  const followUpCount = ideas.filter((i) => i.format === 'follow-up').length;

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Workflow B</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                USA TARGETED
              </span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mt-1">
              USA Video Ideas & Strategic Content Roadmap
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              30 high-intent video concepts (10 Long-form, 10 Shorts, 10 Series Follow-ups) engineered for high CPM & USA retention.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Audience Focus: <strong className="text-white">United States (English)</strong></span>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-500" />
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Kids Animation, AI Coding, Tech Reviews, Gaming..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
            >
              <option value="Animation & Kids">Animation & Kids Entertainment</option>
              <option value="Education & Tech">Technology, AI & Software</option>
              <option value="Gaming & Esports">Gaming & Interactive Media</option>
              <option value="Entertainment & Comedy">Entertainment & Pop Culture</option>
              <option value="How-To & Style">Tutorials, How-To & Lifestyle</option>
              <option value="Finance & Business">Finance, Career & Business</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-full py-2.5 px-4 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate 30</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Topic Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs scrollbar-none pt-1">
          <span className="text-slate-500 text-[11px] font-semibold whitespace-nowrap">Suggested Topics:</span>
          {[
            'Kids Bedtime Stories & Cartoons',
            'How to Build AI Agents',
            'Epic Minecraft Challenges',
            'Personal Finance for Beginners',
            'Learn Spanish in 30 Days'
          ].map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setTopic(sample);
                handleGenerate();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] whitespace-nowrap border border-slate-700/60 transition-all"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>

      {/* Format Filter Tabs */}
      {ideas.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveFormat('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'all'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 30 Concepts</span>
            </button>

            <button
              onClick={() => setActiveFormat('long-form')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'long-form'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-amber-400" />
              <span>10 Long-Form ({longFormCount})</span>
            </button>

            <button
              onClick={() => setActiveFormat('shorts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'shorts'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-purple-400" />
              <span>10 Shorts ({shortsCount})</span>
            </button>

            <button
              onClick={() => setActiveFormat('follow-up')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'follow-up'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Repeat className="w-3.5 h-3.5 text-emerald-400" />
              <span>10 Follow-ups ({followUpCount})</span>
            </button>
          </div>

          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredIdeas.length} concepts
          </span>
        </div>
      )}

      {/* Ideas Grid */}
      {ideas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredIdeas.map((idea) => {
            const isShorts = idea.format === 'shorts';
            const isFollowUp = idea.format === 'follow-up';

            return (
              <div
                key={idea.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${
                      isShorts
                        ? 'bg-purple-500/15 text-purple-400 border-purple-500/30'
                        : isFollowUp
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border-red-500/30'
                    }`}>
                      {idea.format.toUpperCase()}
                    </span>

                    <span className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 px-2 py-0.5 rounded">
                      Intent: {idea.viewerIntent}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white leading-snug">
                    {idea.title}
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Target className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span>Primary Keyword: <strong className="text-slate-200">{idea.primaryKeyword}</strong></span>
                    </div>

                    <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Hook Script (First 5s):
                      </span>
                      <p className="text-xs text-slate-300 italic">
                        "{idea.suggestedHook}"
                      </p>
                    </div>

                    <div className="p-2.5 bg-slate-950/70 border border-slate-800/80 rounded-xl space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Thumbnail Visual Concept:
                      </span>
                      <p className="text-xs text-amber-200/90 font-medium">
                        {idea.suggestedThumbnailConcept}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 leading-relaxed">
                      <span className="text-emerald-400 font-semibold">USA Audience Fit: </span>
                      {idea.whyRelevant}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => copyText(`${idea.title}\n\nPrimary Keyword: ${idea.primaryKeyword}\nHook: ${idea.suggestedHook}\nThumbnail: ${idea.suggestedThumbnailConcept}`, idea.id)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700 transition-all"
                  >
                    {copiedId === idea.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Concept</span>
                      </>
                    )}
                  </button>

                  {onApplyIdeaToOptimizer && (
                    <button
                      onClick={() => onApplyIdeaToOptimizer(idea.title)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-md shadow-red-600/20 transition-all"
                    >
                      <span>Optimize This Video</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Strategic Roadmap Card */}
      {strategy && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Algorithmic Roadmap
            </span>
            <h3 className="text-lg font-black text-white tracking-tight">
              USA Content Distribution & Channel Authority Strategy
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                Immediate Next Video Priority
              </span>
              <p className="text-sm font-bold text-white">
                {strategy.nextVideoRecommendation}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                Shorts Synergy (Convert Long-Form into Shorts)
              </span>
              <ul className="space-y-1">
                {(strategy.shortsFromLongForm || []).map((s, idx) => (
                  <li key={idx} className="text-slate-300 flex items-center gap-1.5">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                Multi-Part Series Concepts (Watch-Time Snowball)
              </span>
              <ul className="space-y-1">
                {(strategy.seriesConcepts || []).map((s, idx) => (
                  <li key={idx} className="text-slate-300 flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2">
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] block">
                Seasonal / Trending Opportunities
              </span>
              <ul className="space-y-1">
                {(strategy.seasonalOpportunities || []).map((s, idx) => (
                  <li key={idx} className="text-slate-300 flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Initial Empty State */}
      {ideas.length === 0 && !isLoading && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h4 className="text-base font-bold text-white">Generate 30 USA Video Concepts</h4>
            <p className="text-xs text-slate-400">
              Enter any niche or topic above to produce 10 Long-form video scripts, 10 high-velocity Shorts, 10 Series Follow-ups, and a complete channel strategy.
            </p>
          </div>
          <button
            onClick={() => handleGenerate()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Kids & Creator Ideas</span>
          </button>
        </div>
      )}
    </div>
  );
};
