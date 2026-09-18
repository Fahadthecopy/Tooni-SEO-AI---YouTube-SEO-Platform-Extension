import React, { useState } from 'react';
import {
  Share2,
  Sparkles,
  Copy,
  Check,
  Smartphone,
  Layers,
  Camera,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  ThumbsUp,
  MessageSquare,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MultiPlatformSocialSeo } from '../types';

interface SocialSeoTabProps {
  initialTitle?: string;
  initialThumbnail?: string;
}

export const SocialSeoTab: React.FC<SocialSeoTabProps> = ({
  initialTitle = 'The Brave Little Rabbit and the Secret Garden',
  initialThumbnail = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&q=80'
}) => {
  const [platformInputType, setPlatformInputType] = useState<MultiPlatformSocialSeo['input']['type']>('youtube');
  const [sourceUrl, setSourceUrl] = useState<string>('https://www.youtube.com/watch?v=sample-tooni-episode');
  const [postTitle, setPostTitle] = useState<string>(initialTitle);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>(initialThumbnail);
  const [activePlatformTab, setActivePlatformTab] = useState<'tiktok' | 'facebook' | 'image' | 'youtube'>('tiktok');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [socialData, setSocialData] = useState<MultiPlatformSocialSeo | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const runUniversalSocialAnalyze = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/social/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: {
            type: platformInputType,
            source: sourceUrl,
            previewUrl: thumbnailUrl,
            postTitle: postTitle
          }
        })
      });
      const data: MultiPlatformSocialSeo = await res.json();
      setSocialData(data);
    } catch (error) {
      console.error('Error analyzing social SEO:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  React.useEffect(() => {
    runUniversalSocialAnalyze();
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 border border-purple-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
                Multi-Platform Social Suite
              </span>
              <span className="text-xs text-slate-400 font-medium">
                TikTok SEO &bull; Facebook Community &bull; Image Post SEO
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              UNIVERSAL SOCIAL MEDIA SEO & PACKAGING
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              Never copy-paste raw YouTube descriptions into TikTok or Facebook. The Central AI Analyzer extracts core content truth and adapts tone, hooks, captions, and search intent for each platform algorithm.
            </p>
          </div>

          <button
            onClick={runUniversalSocialAnalyze}
            disabled={isLoading}
            className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? 'Analyzing Social Signals...' : 'Generate Multi-Platform SEO'}
          </button>
        </div>
      </div>

      {/* Universal Content Input Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Universal Content Ingestion
          </span>
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['youtube', 'tiktok', 'facebook', 'image', 'script'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setPlatformInputType(type)}
                className={`px-3 py-1 rounded-md font-medium capitalize transition-all cursor-pointer ${
                  platformInputType === type
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Content Title / Topic
            </label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-medium focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
              Content URL or Image Source
            </label>
            <input
              type="text"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white font-medium focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Main Social Multi-Platform Display */}
      {socialData && (
        <div className="space-y-6">
          {/* Central AI Extraction Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <span className="font-bold text-white uppercase text-xs">
                AI Content Understanding: <span className="text-purple-400">{socialData.analysis.topic}</span>
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                Target: {socialData.analysis.audience}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Search Intent</span>
                <span className="text-amber-300 font-bold mt-0.5 block">{socialData.analysis.searchIntent}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Tone & Voice</span>
                <span className="text-emerald-300 font-bold mt-0.5 block">{socialData.analysis.contentTone}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Grounded Entities</span>
                <span className="text-indigo-300 font-bold mt-0.5 block truncate">{socialData.analysis.entities.slice(0, 3).join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Platform Tab Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs">
            {[
              { id: 'tiktok', label: 'TikTok SEO & Live Mockup' },
              { id: 'facebook', label: 'Facebook Feed & Copy' },
              { id: 'image', label: 'Image Post SEO & Visual Entity' },
              { id: 'youtube', label: 'YouTube Coordinated Package' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePlatformTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  activePlatformTab === tab.id
                    ? 'bg-purple-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 1. TIKTOK SEO & LIVE PHONE PREVIEW */}
          {activePlatformTab === 'tiktok' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Phone Mockup (5 cols) */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[320px] h-[600px] bg-black rounded-[40px] border-4 border-slate-800 p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                  {/* Background Video Mock */}
                  <img
                    src={thumbnailUrl}
                    alt="TikTok Video Preview"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

                  {/* Top Phone Bar */}
                  <div className="relative z-10 flex items-center justify-between text-white text-xs px-2 pt-2">
                    <span className="font-semibold text-slate-300">LIVE</span>
                    <div className="flex items-center gap-3 font-bold">
                      <span className="text-slate-400">Following</span>
                      <span className="border-b-2 border-white pb-0.5">For You</span>
                    </div>
                    <span className="text-slate-300 font-semibold">🔍</span>
                  </div>

                  {/* Center Cover Text Overlay */}
                  <div className="relative z-10 my-auto text-center px-4">
                    <span className="inline-block bg-yellow-400 text-black font-black text-sm px-3 py-1.5 rounded-lg shadow-2xl uppercase tracking-wider transform -rotate-2">
                      {socialData.tiktok.coverText}
                    </span>
                  </div>

                  {/* Bottom Elements: Profile, Caption, Hashtags */}
                  <div className="relative z-10 flex items-end justify-between text-white p-2">
                    <div className="space-y-1.5 max-w-[210px] text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs">@tooni_tv</span>
                        <span className="px-1.5 py-0.2 rounded bg-red-600 text-[9px] font-bold">Follow</span>
                      </div>
                      <p className="text-[11px] leading-snug line-clamp-3 text-slate-100">
                        {socialData.tiktok.caption}
                      </p>
                      <div className="flex flex-wrap gap-1 text-[10px] text-amber-300 font-bold">
                        {socialData.tiktok.hashtags.slice(0, 4).join(' ')}
                      </div>
                      <div className="text-[10px] text-slate-300 flex items-center gap-1 pt-1">
                        <span>🎵</span>
                        <span className="truncate">Tooni TV Original Animation Audio</span>
                      </div>
                    </div>

                    {/* Right Side Social Action Icons */}
                    <div className="flex flex-col items-center gap-3 text-center text-[10px]">
                      <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white fill-white" />
                      </div>
                      <span>48.2K</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span>1.8K</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                        <Bookmark className="w-4 h-4 text-white" />
                      </div>
                      <span>12.4K</span>
                      <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                      <span>Share</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TikTok Strategy & Packaging (7 cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                      TikTok Algorithmic Signals
                    </span>
                    <h3 className="text-base font-bold text-white">
                      TikTok Caption, Hooks, & Search Intent
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopy('tt-caption', `${socialData.tiktok.caption}\n\n${socialData.tiktok.hashtags.join(' ')}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'tt-caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy TikTok Copy
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">0-1s Visual Hook Advice</span>
                    <p className="text-white font-medium mt-1">{socialData.tiktok.hook}</p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Search-Intent Keywords (TikTok Search Bar)</span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {socialData.tiktok.searchIntentTerms.map((term, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300 font-mono text-[11px]">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Cover Text (Pique Curiosity on Profile Grid)</span>
                    <span className="text-base font-black text-amber-300 mt-1 block font-mono">
                      {socialData.tiktok.coverText}
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">USA Audience Advice</span>
                    <p className="text-slate-300 mt-1">{socialData.tiktok.usaAudienceAdvice}</p>
                  </div>

                  {/* Transparent Disclaimer Banner */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-slate-400 text-[11px]">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{socialData.tiktok.distributionDisclaimer}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. FACEBOOK COMMUNITY FEED PREVIEW */}
          {activePlatformTab === 'facebook' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Facebook Post Card Preview (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3 text-xs">
                <span className="text-[10px] text-blue-400 uppercase font-bold">Facebook Feed Preview</span>
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-3">
                  {/* Page Info */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center font-black text-white text-sm">
                      T
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm">Tooni TV</span>
                        <span className="text-blue-400 font-bold text-xs">✓</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Sponsored / Recommended &bull; 🌐 Public</span>
                    </div>
                  </div>

                  {/* Body Text */}
                  <div className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap">
                    {socialData.facebook.postCopy}
                  </div>

                  {/* Embedded Media */}
                  <div className="rounded-xl overflow-hidden border border-slate-800 relative">
                    <img src={thumbnailUrl} alt="Facebook Media" className="w-full h-56 object-cover" />
                    <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase">YOUTUBE.COM</span>
                        <h5 className="font-bold text-white text-xs truncate">{socialData.facebook.postTitle || postTitle}</h5>
                      </div>
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-white font-bold text-xs">Watch Now</button>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-around border-t border-slate-800 pt-2 text-slate-400 text-xs font-semibold">
                    <div className="flex items-center gap-1.5 hover:text-white cursor-pointer"><ThumbsUp className="w-4 h-4" /> Like</div>
                    <div className="flex items-center gap-1.5 hover:text-white cursor-pointer"><MessageSquare className="w-4 h-4" /> Comment</div>
                    <div className="flex items-center gap-1.5 hover:text-white cursor-pointer"><Share2 className="w-4 h-4" /> Share</div>
                  </div>
                </div>
              </div>

              {/* Facebook Strategy (6 cols) */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">Facebook Community Packaging</h3>
                  <button
                    onClick={() => handleCopy('fb-copy', socialData.facebook.postCopy)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedKey === 'fb-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    Copy Facebook Text
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Conversational Hook</span>
                    <p className="text-white font-medium mt-1">{socialData.facebook.openingHook}</p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Target Community</span>
                    <p className="text-slate-300 mt-1">{socialData.facebook.audienceRelevance}</p>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Hashtags & Keywords</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {socialData.facebook.hashtags.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/40 text-[11px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. IMAGE POST SEO */}
          {activePlatformTab === 'image' && socialData.imagePostSeo && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Visual Entity Recognition
                  </span>
                  <h3 className="text-base font-bold text-white">
                    Image Post SEO & Social Carousel Copy
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy('img-caption', `${socialData.imagePostSeo?.caption}\n\n${socialData.imagePostSeo?.hashtags.join(' ')}`)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === 'img-caption' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy Image Caption
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Detected Characters & Objects</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {socialData.imagePostSeo.detectedCharacters.concat(socialData.imagePostSeo.detectedObjects).map((item, idx) => (
                        <span key={idx} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Visual Message & Scene</span>
                    <p className="text-slate-200 mt-1">{socialData.imagePostSeo.sceneAndTopic}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Ready-to-Post Caption</span>
                    <p className="text-white mt-1 leading-relaxed">{socialData.imagePostSeo.caption}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3 text-[11px] text-amber-300">
                      {socialData.imagePostSeo.hashtags.join(' ')}
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Platform Specific Tip</span>
                    <p className="text-slate-300 mt-1">{socialData.imagePostSeo.platformSpecificAdvice}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 4. YOUTUBE COORDINATED PACKAGE */}
          {activePlatformTab === 'youtube' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
              <h3 className="text-base font-bold text-white">Coordinated YouTube Reference</h3>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase text-[10px] block">YouTube Title</span>
                <span className="text-sm font-bold text-white block">{socialData.youtube.title}</span>
                <span className="text-slate-400 font-bold uppercase text-[10px] block mt-3">YouTube Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {socialData.youtube.tags.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
