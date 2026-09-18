import React, { useState, useEffect, useRef } from 'react';
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
  Sliders,
  Download,
  Play,
  Film,
  Smartphone,
  Layers,
  FileText,
  ThumbsUp,
  RefreshCw,
  Edit3,
  Shield,
  Info,
  Maximize2
} from 'lucide-react';
import { ThumbnailAudit, ThumbnailStudioData, VideoData, ContentType } from '../types';
import { drawThumbnailToCanvas, CompositorOptions } from '../utils/thumbnailCompositor';

interface ThumbnailCTRTabProps {
  currentVideo?: VideoData;
  currentThumbnail?: string;
  videoTitle?: string;
  onUpdateVideo?: (updated: Partial<VideoData>) => void;
  onApproveThumbnail?: (url: string) => void;
}

export const ThumbnailCTRTab: React.FC<ThumbnailCTRTabProps> = ({
  currentVideo,
  currentThumbnail,
  videoTitle,
  onUpdateVideo,
  onApproveThumbnail,
}) => {
  const effectiveTitle = currentVideo?.title || videoTitle || 'English Cartoon Animation';
  const effectiveThumbnail =
    currentVideo?.originalThumbnailUrl ||
    currentVideo?.thumbnailUrl ||
    currentThumbnail ||
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80';

  const [activeWorkflowTab, setActiveWorkflowTab] = useState<'thumbnail' | 'longform' | 'shorts' | 'imagepost'>(
    currentVideo?.contentType === 'Short'
      ? 'shorts'
      : currentVideo?.contentType === 'Image Post'
      ? 'imagepost'
      : 'thumbnail'
  );

  const [thumbUrl, setThumbUrl] = useState(effectiveThumbnail);
  const [improvedThumbUrl, setImprovedThumbUrl] = useState<string>('');
  const [thumbnailStatus, setThumbnailStatus] = useState<'Approved' | 'Needs Review' | 'Original Kept' | 'Regenerated'>(
    currentVideo?.thumbnailStatus || 'Needs Review'
  );
  const [isApproved, setIsApproved] = useState(currentVideo?.thumbnailStatus === 'Approved');

  const [audit, setAudit] = useState<ThumbnailAudit | null>(null);
  const [studioData, setStudioData] = useState<ThumbnailStudioData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<number | string | null>(null);

  // Editor State
  const [headlineText, setHeadlineText] = useState("DON'T MISS THIS!");
  const [badgeText, setBadgeText] = useState('100% PROVEN');
  const [textPosition, setTextPosition] = useState<'top-left' | 'center' | 'bottom-left' | 'split-right'>('top-left');
  const [textSize, setTextSize] = useState<'small' | 'medium' | 'large' | 'massive'>('large');
  const [colorScheme, setColorScheme] = useState('amber-slate');
  const [backgroundStyle, setBackgroundStyle] = useState('cinematic-dark');
  const [characterLocked, setCharacterLocked] = useState(true);
  const [clutterStripped, setClutterStripped] = useState(true);

  // Canvas Ref for High-Res Generation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Post / Image content analyzer state
  const [postImageInput, setPostImageInput] = useState<string>('');
  const [postTopicInput, setPostTopicInput] = useState<string>('');
  const [analyzedPost, setAnalyzedPost] = useState<any>(null);
  const [isAnalyzingPost, setIsAnalyzingPost] = useState(false);

  // Sync state when video changes
  useEffect(() => {
    setThumbUrl(effectiveThumbnail);
    if (currentVideo?.contentType === 'Short') {
      setActiveWorkflowTab('shorts');
    } else if (currentVideo?.contentType === 'Image Post') {
      setActiveWorkflowTab('imagepost');
    }
    runThumbnailAudit(effectiveThumbnail);
  }, [currentVideo?.id, effectiveThumbnail]);

  // Generate improved thumbnail on canvas
  const renderImprovedCanvas = async (baseImg: string) => {
    if (!canvasRef.current) return;
    try {
      const options: CompositorOptions = {
        originalImageUrl: baseImg,
        headlineText,
        badgeText,
        colorScheme,
        backgroundStyle,
        textPosition,
        textSize,
        characterLocked,
        clutterStripped,
        aspectRatio: activeWorkflowTab === 'shorts' ? '9:16' : '16:9',
        targetWidth: 1920
      };
      const renderedDataUrl = await drawThumbnailToCanvas(canvasRef.current, options);
      setImprovedThumbUrl(renderedDataUrl);
    } catch (err) {
      console.error('Error rendering improved canvas:', err);
    }
  };

  const runThumbnailAudit = async (imgUrl: string) => {
    setIsLoading(true);
    try {
      const [resAudit, resStudio] = await Promise.all([
        fetch('/api/thumbnail/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: effectiveTitle, imageConcept: imgUrl }),
        }),
        fetch('/api/thumbnail/studio-reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            thumbnailUrl: imgUrl,
            videoTitle: effectiveTitle,
            characterLocked,
            editorSettings: {
              headlineText,
              badgeText,
              colorScheme,
              backgroundStyle,
              characterLocked,
              clutterStripped,
              textPosition,
              textSize
            }
          })
        })
      ]);

      const dataAudit = await resAudit.json();
      const dataStudio = await resStudio.json();
      setAudit(dataAudit);
      setStudioData(dataStudio);

      if (dataStudio.textInImage) {
        setHeadlineText(dataStudio.textInImage);
      }

      // Render improved version
      await renderImprovedCanvas(imgUrl);
    } catch (err) {
      console.error('Audit failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-render canvas whenever editor settings change
  useEffect(() => {
    renderImprovedCanvas(thumbUrl);
  }, [headlineText, badgeText, textPosition, textSize, colorScheme, backgroundStyle, characterLocked, clutterStripped, activeWorkflowTab]);

  // Action: Approve Thumbnail
  const handleApproveThumbnail = async () => {
    const selectedUrl = improvedThumbUrl || thumbUrl;
    setIsApproved(true);
    setThumbnailStatus('Approved');

    try {
      await fetch('/api/thumbnail/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thumbnailUrl: thumbUrl,
          approvedThumbnailUrl: selectedUrl,
          videoId: currentVideo?.id,
          videoTitle: effectiveTitle
        })
      });
    } catch (err) {
      console.error('Approve notice:', err);
    }

    if (onApproveThumbnail) {
      onApproveThumbnail(selectedUrl);
    }
    if (onUpdateVideo) {
      onUpdateVideo({
        approvedThumbnailUrl: selectedUrl,
        thumbnailStatus: 'Approved',
        thumbnailUrl: selectedUrl
      });
    }
  };

  // Action: Regenerate
  const handleRegenerate = async () => {
    setIsGenerating(true);
    // Cycle headlines while preserving character lock
    const headlines = ["DON'T BLINK!", "HE FOUND IT?!", "THE 100% FIX", "LAST CHANCE!", "THEY LIED?!"];
    const randomHeadline = headlines[Math.floor(Math.random() * headlines.length)];
    setHeadlineText(randomHeadline);

    const schemes = ['amber-slate', 'crimson-white', 'emerald-cyan', 'gold-obsidian'];
    const nextScheme = schemes[(schemes.indexOf(colorScheme) + 1) % schemes.length];
    setColorScheme(nextScheme);

    setThumbnailStatus('Regenerated');
    setIsApproved(false);

    setTimeout(async () => {
      await renderImprovedCanvas(thumbUrl);
      setIsGenerating(false);
    }, 450);
  };

  // Action: Keep Original
  const handleKeepOriginal = () => {
    setThumbnailStatus('Original Kept');
    setIsApproved(false);
    if (onUpdateVideo) {
      onUpdateVideo({
        thumbnailStatus: 'Original Kept',
        thumbnailUrl: effectiveThumbnail,
        approvedThumbnailUrl: effectiveThumbnail
      });
    }
  };

  // Action: Download High-Res 4K PNG
  const handleDownload4K = async () => {
    const offscreenCanvas = document.createElement('canvas');
    const is916 = activeWorkflowTab === 'shorts';
    offscreenCanvas.width = is916 ? 2160 : 3840;
    offscreenCanvas.height = is916 ? 3840 : 2160;

    await drawThumbnailToCanvas(offscreenCanvas, {
      originalImageUrl: thumbUrl,
      headlineText,
      badgeText,
      colorScheme,
      backgroundStyle,
      textPosition,
      textSize,
      characterLocked,
      clutterStripped,
      aspectRatio: is916 ? '9:16' : '16:9',
      targetWidth: is916 ? 2160 : 3840
    });

    const link = document.createElement('a');
    link.download = `TooniSEO_4K_${effectiveTitle.replace(/[^a-z0-9]/gi, '_')}.png`;
    link.href = offscreenCanvas.toDataURL('image/png');
    link.click();
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setThumbUrl(result);
        runThumbnailAudit(result);
        if (onUpdateVideo) {
          onUpdateVideo({ thumbnailUrl: result, originalThumbnailUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Image Post Analyzer Handler
  const handleAnalyzePostContent = async () => {
    setIsAnalyzingPost(true);
    try {
      const res = await fetch('/api/content/analyze-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postImage: postImageInput || thumbUrl,
          serviceTopic: postTopicInput || effectiveTitle,
          platform: 'universal'
        })
      });
      const data = await res.json();
      setAnalyzedPost(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzingPost(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Hidden offscreen working canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header & Workflow Progress Navigator */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Thumbnail & Content Optimization Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {currentVideo?.contentType || 'Long Video'} Mode
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">
              Thumbnail & Visual Creative Studio
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              URL &rarr; Detect Video &rarr; Extract Thumbnail &rarr; Analyze &rarr; Improve &rarr; Generate 4K &rarr; Approve
            </p>
          </div>

          {/* Workflow Mode Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveWorkflowTab('thumbnail')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeWorkflowTab === 'thumbnail'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Thumbnail Studio</span>
            </button>

            <button
              onClick={() => setActiveWorkflowTab('longform')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeWorkflowTab === 'longform'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Long-Form Breakdown</span>
            </button>

            <button
              onClick={() => setActiveWorkflowTab('shorts')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeWorkflowTab === 'shorts'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Shorts 9:16 Workflow</span>
            </button>

            <button
              onClick={() => setActiveWorkflowTab('imagepost')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                activeWorkflowTab === 'imagepost'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Post / Image Content</span>
            </button>
          </div>
        </div>

        {/* Workflow Breadcrumb Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px] font-semibold pt-1">
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
            <span>Detect Video</span>
          </div>
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
            <span>Extract Thumb</span>
          </div>
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
            <span>Visual Audit</span>
          </div>
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">4</span>
            <span>Lock Character</span>
          </div>
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">5</span>
            <span>Strip Clutter</span>
          </div>
          <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-slate-300 flex items-center gap-1.5">
            <span className="w-4 h-4 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold">6</span>
            <span>Generate 4K</span>
          </div>
          <div className={`p-2 rounded-lg border flex items-center gap-1.5 ${
            isApproved
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300 font-bold'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
              isApproved ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'
            }`}>✓</span>
            <span>{isApproved ? 'Approved!' : 'Approve'}</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: THUMBNAIL STUDIO & APPROVAL SYSTEM               */}
      {/* ======================================================== */}
      {activeWorkflowTab === 'thumbnail' && (
        <div className="space-y-6">
          {/* Step 1 & 2: Detected Video + Original Thumbnail Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Embedded Actual YouTube Video */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-red-500 fill-red-500" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Actual YouTube Video Detected
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  ID: {currentVideo?.id || 'Active URL'}
                </span>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-inner">
                {currentVideo?.id ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${currentVideo.id}`}
                    title={effectiveTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                    <Play className="w-8 h-8 mb-2 opacity-50" />
                    <span>Paste YouTube URL above to stream exact video</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span className="truncate max-w-[70%] font-semibold text-slate-200">
                  {effectiveTitle}
                </span>
                <span className="text-slate-400">
                  Channel: <strong className="text-white">{currentVideo?.channel || 'Verified Creator'}</strong>
                </span>
              </div>
            </div>

            {/* Content Quality Review Diagnostic Box */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    Content Quality Review
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    isApproved
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {isApproved ? 'AI Review: Approved' : 'AI Review: Needs Improvement'}
                  </span>
                </div>

                <div className="mt-3 space-y-3 text-xs">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold block text-[11px] mb-1">
                      Why it needs improvement:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {studioData?.contentReview.whyNeedsImprovement ||
                        'The original thumbnail contains visual background clutter, low text contrast on mobile browse feeds, and an unprotected bottom-right safe-zone conflicting with the YouTube timestamp badge.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="bg-slate-950 p-3 rounded-xl border border-rose-900/40">
                      <span className="text-rose-400 font-bold uppercase text-[10px] block mb-1">
                        What is wrong:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {(studioData?.contentReview.whatIsWrong || [
                          'Visual clutter in background',
                          'Small unreadable text',
                          'Bottom-right timestamp collision'
                        ]).map((err, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">✕</span>
                            <span>{err}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/40">
                      <span className="text-emerald-400 font-bold uppercase text-[10px] block mb-1">
                        What should change:
                      </span>
                      <ul className="space-y-1 text-slate-300 text-[11px]">
                        {(studioData?.contentReview.whatShouldChange || [
                          'Strip 65% secondary clutter',
                          'Deploy 3-word bold mobile badge',
                          'Enforce character identity lock'
                        ]).map((change, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-500 italic">
                {studioData?.contentReview.disclaimer ||
                  'AI Review: Needs Improvement — internal diagnostic advisory based on empirical YouTube browse feed eye-tracking metrics.'}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SIDE-BY-SIDE: ORIGINAL THUMBNAIL vs AI IMPROVED THUMBNAIL */}
          {/* ======================================================== */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  Side-by-Side Visual Comparison
                </span>
                <h3 className="text-lg font-black text-white">
                  Original Thumbnail vs. AI Improved Thumbnail
                </h3>
              </div>

              {/* Status Indicator Badge */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Status:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                  thumbnailStatus === 'Approved'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : thumbnailStatus === 'Original Kept'
                    ? 'bg-slate-800 text-slate-300 border-slate-700'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {thumbnailStatus === 'Approved' ? '✓ Status: Approved' : `Status: ${thumbnailStatus}`}
                </span>
              </div>
            </div>

            {/* Side-by-side Visual Viewport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. ORIGINAL THUMBNAIL */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    Original Thumbnail (Extracted)
                  </span>
                  <span className="text-[10px] text-rose-400 font-medium">Visual Clutter Detected</span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border-2 border-slate-700/80 shadow-2xl group">
                  <img
                    src={thumbUrl}
                    alt="Original Thumbnail"
                    className="w-full h-full object-cover"
                  />

                  {/* YouTube Duration Pill Overlay */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/90 text-white text-[11px] font-mono px-2 py-0.5 rounded font-bold border border-white/10 shadow-lg z-10">
                    12:45
                  </div>

                  {/* Red Timestamp Collision Zone */}
                  <div className="absolute bottom-1 right-1 w-24 h-10 border-2 border-red-500/80 bg-red-500/20 rounded pointer-events-none flex items-center justify-center text-[9px] text-red-300 font-bold uppercase tracking-wider">
                    Danger Zone
                  </div>

                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">
                    Extracted from YouTube
                  </div>
                </div>

                <p className="text-[11px] text-slate-400">
                  Original image contains low mobile contrast, secondary background clutter, and unprotected bottom-right corner.
                </p>
              </div>

              {/* 2. AI IMPROVED THUMBNAIL */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    AI Improved Thumbnail (Clean Professional)
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    4K UHD Ready
                  </span>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border-2 border-emerald-500/60 shadow-2xl shadow-emerald-500/10 group">
                  <img
                    src={improvedThumbUrl || thumbUrl}
                    alt="AI Improved Thumbnail"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Simulated YouTube Duration Badge (Completely clear!) */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/90 text-white text-[11px] font-mono px-2 py-0.5 rounded font-bold border border-white/10 shadow-lg z-10">
                    12:45
                  </div>

                  {/* Clean Safe Zone Indicator */}
                  <div className="absolute bottom-1 right-1 w-24 h-10 border border-emerald-400/40 bg-emerald-500/10 rounded pointer-events-none flex items-center justify-center text-[9px] text-emerald-300 font-bold uppercase tracking-wider">
                    Safe Zone Clear
                  </div>

                  <div className="absolute top-2 left-2 bg-emerald-950/90 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>De-Cluttered & Character-Locked</span>
                  </div>
                </div>

                <p className="text-[11px] text-emerald-400/90 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Preserves original character identity and core concept while stripping 65% optical noise.
                </p>
              </div>
            </div>

            {/* Primary Action Buttons: APPROVE / REGENERATE / EDIT / KEEP ORIGINAL */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* 1. APPROVE THUMBNAIL */}
                <button
                  onClick={handleApproveThumbnail}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wide transition-all shadow-lg cursor-pointer ${
                    isApproved
                      ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{isApproved ? '✓ THUMBNAIL APPROVED' : '✓ APPROVE THUMBNAIL'}</span>
                </button>

                {/* 2. REGENERATE */}
                <button
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>↻ REGENERATE</span>
                </button>

                {/* 3. EDIT */}
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    showEditor
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  }`}
                >
                  <Edit3 className="w-4 h-4 text-indigo-400" />
                  <span>✎ {showEditor ? 'HIDE EDITOR' : 'EDIT THUMBNAIL'}</span>
                </button>

                {/* 4. KEEP ORIGINAL */}
                <button
                  onClick={handleKeepOriginal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-slate-700 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>↩ KEEP ORIGINAL</span>
                </button>
              </div>

              {/* High-Resolution 4K Download Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload4K}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-white text-xs font-bold rounded-xl border border-slate-700 shadow-md transition-all cursor-pointer"
                  title="Export native 4K UHD canvas render (3840x2160)"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Download 4K Thumbnail</span>
                </button>

                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all">
                  <Upload className="w-3.5 h-3.5 text-red-400" />
                  <span className="hidden sm:inline">Upload New</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </label>
              </div>
            </div>

            {/* Approval Notice Banner */}
            {isApproved && (
              <div className="bg-emerald-950/60 border border-emerald-500/50 rounded-xl p-3.5 flex items-center justify-between text-xs text-emerald-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>
                    <strong>Thumbnail Approved:</strong> This version is saved as the official selected thumbnail for the final upload package.
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Status: Ready for Upload</span>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* UNLOCKED LIVE VISUAL EDITOR (Text, Size, Colors, Layout) */}
          {/* ======================================================== */}
          {showEditor && (
            <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-indigo-400" />
                  <span>Unlocked Thumbnail Studio Controls</span>
                </h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCharacterLocked(!characterLocked)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                      characterLocked
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {characterLocked ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Unlock className="w-3.5 h-3.5 text-slate-500" />}
                    <span>Character Lock: {characterLocked ? 'STRICT ON' : 'OFF'}</span>
                  </button>

                  <button
                    onClick={() => setClutterStripped(!clutterStripped)}
                    className={`text-xs font-bold px-3 py-1 rounded-lg border flex items-center gap-1.5 transition-all ${
                      clutterStripped
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Strip Clutter: {clutterStripped ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* Headline Text Input */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Headline Text (Max 3-4 Words):</label>
                  <input
                    type="text"
                    value={headlineText}
                    onChange={(e) => setHeadlineText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. DON'T MISS THIS!"
                  />
                </div>

                {/* Badge Text Input */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Badge Sub-Callout:</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 100% PROVEN"
                  />
                </div>

                {/* Text Position */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Text Placement:</label>
                  <select
                    value={textPosition}
                    onChange={(e) => setTextPosition(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="top-left">Top-Left (Standard Focus)</option>
                    <option value="center">Center Punch</option>
                    <option value="bottom-left">Bottom-Left Anchor</option>
                    <option value="split-right">Split Right (Character Left)</option>
                  </select>
                </div>

                {/* Text Size */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Typography Scale:</label>
                  <select
                    value={textSize}
                    onChange={(e) => setTextSize(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="small">Small (Subtle)</option>
                    <option value="medium">Medium (Standard)</option>
                    <option value="large">Large (High Impact)</option>
                    <option value="massive">Massive (Hero Stop-Power)</option>
                  </select>
                </div>

                {/* Color Scheme */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Color Palette:</label>
                  <select
                    value={colorScheme}
                    onChange={(e) => setColorScheme(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="amber-slate">Amber (#F59E0B) & Midnight Slate</option>
                    <option value="crimson-white">Crimson (#EF4444) & Pure White</option>
                    <option value="emerald-cyan">Emerald (#10B981) & Sky Cyan</option>
                    <option value="gold-obsidian">Gold (#EAB308) & Deep Obsidian</option>
                  </select>
                </div>

                {/* Background Tone */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold block">Background Tone & Lighting:</label>
                  <select
                    value={backgroundStyle}
                    onChange={(e) => setBackgroundStyle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="cinematic-dark">Cinematic Darkroom Vignette</option>
                    <option value="vignette-spotlight">Subject Spotlight Rim</option>
                    <option value="studio-gradient">Warm Studio Gradient</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 16-POINT COMPLETE THUMBNAIL VISUAL ANALYSIS GRID         */}
          {/* ======================================================== */}
          {studioData && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>16-Point Thumbnail & Creative Visual Audit</span>
                </h4>
                <span className="text-xs text-slate-400 font-mono">
                  Preserving Concept &bull; Mobile-Optimized
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {/* 1. Main Character */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">
                    1. Main Character / Person
                  </span>
                  <p className="text-slate-200 font-semibold">{studioData.mainCharacter}</p>
                  <p className="text-[11px] text-slate-400">{studioData.characterProportions}</p>
                </div>

                {/* 2. Face & Facial Expression */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">
                    2. Face & Expression
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.faceExpression}</p>
                  <p className="text-[11px] text-slate-400">{studioData.eyesDescription}</p>
                </div>

                {/* 3. Important Objects */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">
                    3. Important Objects
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.importantObjects.join(', ')}</p>
                </div>

                {/* 4. Background */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">
                    4. Background
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.background}</p>
                </div>

                {/* 5. Text */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">
                    5. Text in Image
                  </span>
                  <p className="text-slate-200 font-bold text-amber-300">{studioData.textInImage}</p>
                  <p className="text-[11px] text-slate-400">Max 3-word rule for 120px mobile clarity</p>
                </div>

                {/* 6. Logo */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">
                    6. Logo & Watermark
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.logo}</p>
                </div>

                {/* 7. Composition */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">
                    7. Composition
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.composition}</p>
                </div>

                {/* 8. Subject Positioning */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">
                    8. Subject Positioning
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.subjectPositioning}</p>
                </div>

                {/* 9. Visual Hierarchy */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                    9. Visual Hierarchy
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.visualHierarchy}</p>
                </div>

                {/* 10. Clutter Analysis */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                    10. Clutter Analysis
                  </span>
                  <p className="text-amber-300 font-bold">{studioData.clutterLevel}</p>
                  <p className="text-[11px] text-slate-400">
                    {studioData.clutterDetails.unnecessaryElements.length} redundant props identified
                  </p>
                </div>

                {/* 11. Contrast */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                    11. Contrast Ratio
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.contrast}</p>
                </div>

                {/* 12. Brightness */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                    12. Brightness
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.brightness}</p>
                </div>

                {/* 13. Mobile Readability */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px] block">
                    13. Mobile Readability
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.mobileReadability}</p>
                </div>

                {/* 14. Focal Point */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px] block">
                    14. Focal Point
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.focalPoint}</p>
                </div>

                {/* 15. Emotional Impact */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px] block">
                    15. Emotional Impact
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.emotionalImpact}</p>
                </div>

                {/* 16. Brand Visibility */}
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-cyan-400 font-bold uppercase text-[10px] block">
                    16. Brand Visibility
                  </span>
                  <p className="text-slate-200 font-medium">{studioData.brandVisibility}</p>
                </div>
              </div>
            </div>
          )}

          {/* Character Lock Canonical Profile */}
          {studioData?.characterLockDetails && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">
                    Character Lock Preservation Matrix (Identity Integrity)
                  </h4>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                  Zero Morphing Guaranteed
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-slate-400 block text-[10px] uppercase">Preserved Face & Eyes:</strong>
                  <span className="text-slate-200">{studioData.characterLockDetails.face}</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-slate-400 block text-[10px] uppercase">Preserved Clothing & Colors:</strong>
                  <span className="text-slate-200">{studioData.characterLockDetails.clothing} ({studioData.characterLockDetails.colors})</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-slate-400 block text-[10px] uppercase">Body Proportions & Identity:</strong>
                  <span className="text-slate-200">{studioData.characterLockDetails.bodyProportions} &bull; {studioData.characterLockDetails.identity}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: LONG-FORM CONTENT BREAKDOWN (Point-by-Point)     */}
      {/* ======================================================== */}
      {activeWorkflowTab === 'longform' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                Comprehensive Long-Form Video Architecture
              </span>
              <h3 className="text-xl font-black text-white">
                Point-by-Point Content & Retention Breakdown
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Long-Form Target: 10-15 Min
            </span>
          </div>

          {/* Content Breakdown Sections */}
          {currentVideo?.longFormAnalysis ? (
            <div className="space-y-5">
              {/* Sections Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Timestamped Video Sections & Key Moments:
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {currentVideo.longFormAnalysis.sections.map((sec, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                          {sec.timestamp}
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold">Section {idx + 1}</span>
                      </div>
                      <h5 className="font-bold text-white text-sm">{sec.title}</h5>
                      <p className="text-slate-300 leading-relaxed"><strong className="text-slate-400">Key Moments:</strong> {sec.keyMoments}</p>
                      <p className="text-emerald-400 text-[11px]"><strong className="text-emerald-300">Retention Tip:</strong> {sec.retentionTip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategic Insights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-3 border-t border-slate-800">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-amber-400 font-bold uppercase text-[10px] block">0-15s Hook Analysis:</span>
                  <p className="text-slate-200">{currentVideo.longFormAnalysis.hookAnalysis.first15sEvaluation}</p>
                  <p className="text-emerald-300 font-semibold text-[11px]">Fix: {currentVideo.longFormAnalysis.hookAnalysis.recommendations}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">Search Intent:</span>
                  <p className="text-slate-200">{currentVideo.longFormAnalysis.searchIntent}</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-rose-400 font-bold uppercase text-[10px] block">Content Gaps to Fill:</span>
                  <ul className="space-y-1 text-slate-300">
                    {currentVideo.longFormAnalysis.contentGaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-1 text-[11px]">
                        <span className="text-rose-400 font-bold">&bull;</span>
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              Long-form point-by-point data active for current video.
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: SHORTS WORKFLOW (9:16 Vertical Cover & Hook)     */}
      {/* ======================================================== */}
      {activeWorkflowTab === 'shorts' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                YouTube Shorts & 9:16 Vertical Packaging
              </span>
              <h3 className="text-xl font-black text-white">
                Shorts Viral Optimization Workflow
              </h3>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20">
              9:16 Aspect Ratio
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 9:16 Vertical Cover Simulation */}
            <div className="lg:col-span-4 flex flex-col items-center space-y-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                9:16 Vertical Cover Preview
              </span>
              <div className="w-56 h-96 rounded-2xl overflow-hidden bg-black border-2 border-amber-500/50 relative shadow-2xl">
                <img
                  src={improvedThumbUrl || thumbUrl}
                  alt="Shorts 9:16 Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-3 bg-red-600 text-white font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">
                  #SHORTS
                </div>
                <div className="absolute bottom-6 inset-x-3 bg-black/80 backdrop-blur-md p-2 rounded-xl text-center border border-white/10">
                  <span className="text-amber-300 font-extrabold text-xs block">
                    {headlineText || 'WAIT FOR IT... 😱'}
                  </span>
                  <span className="text-[9px] text-slate-300">0.3s Scroll Stop Overlay</span>
                </div>
              </div>
            </div>

            {/* Shorts Strategy Parameters */}
            <div className="lg:col-span-8 space-y-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <span className="text-amber-400 font-bold uppercase text-[10px] block">
                  0-1s Hook Analysis (Kills 0.4s Swipe Reflex):
                </span>
                <p className="text-slate-200 leading-relaxed font-semibold">
                  {currentVideo?.shortsAnalysis?.hook0to1s ||
                    'Instant movement in Frame 1 with bold high-contrast text ("STOP DOING THIS!") positioned above the comment drawer.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-indigo-400 font-bold uppercase text-[10px] block">Loop Factor Pacing:</span>
                  <p className="text-slate-200 leading-relaxed">
                    {currentVideo?.shortsAnalysis?.loopFactorAdvice ||
                      'End the sentence on a comma that flows seamlessly into the first spoken word, pushing watch retention past 110%.'}
                  </p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">Audio & Background Ducking:</span>
                  <p className="text-slate-200 leading-relaxed">
                    {currentVideo?.shortsAnalysis?.soundAudioAdvice ||
                      'Duck upbeat rhythmic track to -18dB behind voice. Zero dead air or pauses longer than 0.2s.'}
                  </p>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">Trending Viral Shorts Hashtags:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(currentVideo?.shortsAnalysis?.hashtags || ['#Shorts', '#YouTubeShorts', '#ViralShorts', '#Trending']).map((h, i) => (
                    <span key={i} className="bg-slate-900 px-2.5 py-1 rounded-md text-amber-300 font-mono text-[11px] border border-slate-800">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 4: POST / IMAGE CONTENT (Preserves exact service)   */}
      {/* ======================================================== */}
      {activeWorkflowTab === 'imagepost' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                Image Post & Promotional Creative Optimization
              </span>
              <h3 className="text-xl font-black text-white">
                Same-Service Visual Post Enhancement
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Understands what is shown, detects exact product/service, fixes problems, and creates a better version for the SAME service.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
              Preserves Exact Service
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              value={postTopicInput}
              onChange={(e) => setPostTopicInput(e.target.value)}
              placeholder="e.g. Solar Panel Installation / English Animation / Dental Clinic"
              className="sm:col-span-2 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white"
            />
            <button
              onClick={handleAnalyzePostContent}
              disabled={isAnalyzingPost}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAnalyzingPost ? 'Analyzing...' : 'Analyze & Improve Post'}</span>
            </button>
          </div>

          {analyzedPost && (
            <div className="space-y-4 text-xs pt-2">
              <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-1.5">
                <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                  Detected Service / Product:
                </span>
                <p className="text-white font-bold text-sm">{analyzedPost.detectedSubjectOrService}</p>
                <p className="text-slate-300">{analyzedPost.purposeOfPost}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/40 space-y-2">
                  <span className="text-rose-400 font-bold uppercase text-[10px] block">Identified Problems:</span>
                  <ul className="space-y-1 text-slate-300">
                    {analyzedPost.identifiedProblems.map((prob: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">✕</span>
                        <span>{prob}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/40 space-y-2">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">What Should Be Improved:</span>
                  <ul className="space-y-1 text-slate-300">
                    {analyzedPost.whatShouldBeImproved.map((imp: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Improved Creative for the SAME service */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <span className="text-amber-400 font-bold uppercase text-[10px] block">
                  Improved Post Creative (Built for the SAME Service):
                </span>
                <p className="font-bold text-white text-sm">{analyzedPost.improvedPostCreative.headline}</p>
                <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                  {analyzedPost.improvedPostCreative.bodyCopy}
                </pre>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {analyzedPost.improvedPostCreative.hashtags.map((tag: string, i: number) => (
                    <span key={i} className="bg-slate-900 px-2.5 py-0.5 rounded text-amber-300 font-mono text-[11px] border border-slate-800">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Technical Quality & Resolution Transparency Disclaimer */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between text-[11px] text-slate-500">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>
            <strong>High-Resolution Engine:</strong> Renders 4K-UHD (3840x2160) canvas output for maximum edge sharpness on 4K displays. Visual guidelines applied without false claims of guaranteed CTR or view counts.
          </span>
        </div>
        <span className="font-mono text-slate-400">4K Ready</span>
      </div>
    </div>
  );
};
