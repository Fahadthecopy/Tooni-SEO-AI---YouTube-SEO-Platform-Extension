import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Copy,
  Check,
  Eye,
  Lock,
  Unlock,
  RotateCcw,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { ThumbnailAudit, ThumbnailStudioData } from '../types';

interface ThumbnailCTRTabProps {
  currentThumbnail: string;
  videoTitle: string;
}

export const ThumbnailCTRTab: React.FC<ThumbnailCTRTabProps> = ({ currentThumbnail, videoTitle }) => {
  const [thumbUrl, setThumbUrl] = useState(currentThumbnail);
  const [audit, setAudit] = useState<ThumbnailAudit | null>(null);
  const [studioData, setStudioData] = useState<ThumbnailStudioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [characterLocked, setCharacterLocked] = useState(true);
  const [copiedPrompt, setCopiedPrompt] = useState<number | string | null>(null);

  const runThumbnailAudit = async (imgUrl: string) => {
    setIsLoading(true);
    try {
      const [resAudit, resStudio] = await Promise.all([
        fetch('/api/thumbnail/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: videoTitle, imageConcept: imgUrl }),
        }),
        fetch('/api/thumbnail/studio-reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ thumbnailUrl: imgUrl, videoTitle, characterLocked })
        })
      ]);

      const dataAudit = await resAudit.json();
      const dataStudio = await resStudio.json();
      setAudit(dataAudit);
      setStudioData(dataStudio);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetThumbnail = async () => {
    setIsResetting(true);
    try {
      const res = await fetch('/api/thumbnail/studio-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thumbnailUrl: thumbUrl, videoTitle, characterLocked })
      });
      const data = await res.json();
      setStudioData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  useEffect(() => {
    runThumbnailAudit(currentThumbnail);
  }, [currentThumbnail]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbUrl(result);
        runThumbnailAudit(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Visual Packaging Intelligence
            </span>
            <h3 className="text-xl font-black text-white tracking-tight">
              Thumbnail & CTR Packaging Studio
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Audits mobile readability, contrast ratios, and viewer eye-path before you publish.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCharacterLocked(!characterLocked)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                characterLocked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {characterLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-500" />}
              <span>Character Lock: {characterLocked ? 'STRICT ON' : 'OFF'}</span>
            </button>

            <button
              onClick={handleResetThumbnail}
              disabled={isResetting}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isResetting ? 'animate-spin' : ''}`} />
              <span>Reset Thumbnail & De-Clutter</span>
            </button>

            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all">
              <Upload className="w-4 h-4 text-red-400" />
              <span>Upload New Thumbnail</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Main Grid: Preview & Live Visual Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Thumbnail Preview with YouTube UI Overlays */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Mobile Feed Simulation (16:9)
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Timestamp Safe Zone Check</span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl group">
              <img
                src={thumbUrl}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />

              {/* YouTube Duration Pill Simulation (Collision check!) */}
              <div className="absolute bottom-2.5 right-2.5 bg-black/90 text-white text-[11px] font-mono px-2 py-0.5 rounded font-bold border border-white/10 shadow-lg z-10">
                12:45
              </div>

              {/* Timestamp Danger Zone Indicator */}
              <div className="absolute bottom-1 right-1 w-24 h-10 border-2 border-red-500/80 bg-red-500/10 rounded pointer-events-none flex items-center justify-center text-[9px] text-red-300 font-bold uppercase tracking-wider opacity-80 group-hover:opacity-100">
                NO TEXT ZONE
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              The bottom-right red area is covered by YouTube's duration timestamp pill on mobile.
            </p>
          </div>
        </div>

        {/* Right: AI Score Breakdown */}
        {audit && (
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>AI Visual Audit Scores</span>
              </h4>
              <span className="text-xs font-black text-emerald-400">
                {audit.visualScore}/100 Overall Visual
              </span>
            </div>

            {/* Score Bars */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Color Contrast & Stop-Power</span>
                  <span className="text-white font-bold">{audit.contrastScore}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500"
                    style={{ width: `${audit.contrastScore}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Text Readability on 6-inch Phones</span>
                  <span className="text-white font-bold">{audit.textReadabilityScore}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400"
                    style={{ width: `${audit.textReadabilityScore}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Mobile Visibility & Thumbnail Sharpness</span>
                  <span className="text-white font-bold">{audit.mobileVisibilityScore}/100</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400"
                    style={{ width: `${audit.mobileVisibilityScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Qualitative Notes */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Viewer Focal Point:</span>
                <p className="text-slate-200 font-medium">{audit.focalPoint}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-semibold block">Emotional Trigger:</span>
                <p className="text-slate-200 font-medium">{audit.emotionalTrigger}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actionable Improvements & AI Prompts */}
      {audit && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Actionable Do's & Don'ts */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recommended CTR Improvements</span>
            </h4>
            <ul className="space-y-2.5">
              {(audit.actionableImprovements || audit.unnecessaryElements || []).map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-amber-400 font-bold mt-0.5">⚡</span>
                  <span className="leading-relaxed">{imp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Image Prompts for Thumbnail Generators (Midjourney, Gemini, DALL-E) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI Thumbnail Generation Prompts (1-Click Copy)</span>
            </h4>

            <div className="space-y-3">
              {(audit.generatedPrompts || []).map((p, i) => (
                <div
                  key={i}
                  className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                      {p.style}
                    </span>
                    <span className="text-[10px] bg-red-500/20 text-red-400 font-bold px-2 py-0.5 rounded">
                      Overlay Text: "{p.badgeText}"
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-mono leading-relaxed bg-slate-900/80 p-2 rounded border border-slate-800">
                    {p.prompt}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(p.prompt);
                      setCopiedPrompt(i);
                      setTimeout(() => setCopiedPrompt(null), 1800);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700"
                  >
                    {copiedPrompt === i ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Prompt Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy AI Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Studio De-Clutter & Character Lock Profile Card */}
      {studioData && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider">
                  Character Lock & De-Clutter Engine
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  {studioData.clutterReductionScore}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-1">
                Thumbnail Reset Plan (Locked Subject &bull; Clean Background)
              </h4>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(studioData.recommendedPrompt);
                setCopiedPrompt('studio-prompt');
                setTimeout(() => setCopiedPrompt(null), 1800);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {copiedPrompt === 'studio-prompt' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Clean Prompt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
            {/* Elements Removed */}
            <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-2">
              <span className="text-rose-400 font-bold uppercase text-[10px] block">
                Visual Clutter Removed (65% Optical Noise Stripped)
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {studioData.elementsRemoved.map((el, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elements Preserved */}
            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-2">
              <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                Locked Subject Anchor
              </span>
              <ul className="space-y-1.5 text-slate-300">
                {studioData.elementsPreserved.map((el, i) => (
                  <li key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{el}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Character Lock Profile */}
            <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-amber-400 font-bold uppercase text-[10px]">
                  Character Consistency Lock
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold">
                  {studioData.characterLockDetails.status}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 space-y-1">
                <div><strong className="text-slate-400">Features:</strong> {studioData.characterLockDetails.preservedFeatures.join(', ')}</div>
                <div><strong className="text-slate-400">Style:</strong> {studioData.characterLockDetails.styleIntegrity}</div>
                <div><strong className="text-slate-400">Avoidance:</strong> {studioData.characterLockDetails.antiMorphingAdvice}</div>
              </div>
            </div>
          </div>

          {/* Recommended De-Cluttered Prompt */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">
              Optimized Character-Locked Generation Prompt (Midjourney / Stable Diffusion / Gemini)
            </span>
            <p className="text-xs text-amber-200 font-mono bg-slate-900 p-3 rounded-lg border border-slate-800 leading-relaxed">
              {studioData.recommendedPrompt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
