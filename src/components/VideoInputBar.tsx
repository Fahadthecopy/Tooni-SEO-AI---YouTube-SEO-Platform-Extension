import React, { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, Play, Check } from 'lucide-react';
import { VideoData } from '../types';
import { SAMPLE_VIDEOS } from '../data/sampleVideos';

interface VideoInputBarProps {
  currentVideo: VideoData;
  onSelectVideo: (video: VideoData) => void;
  onAnalyzeUrl: (url: string) => Promise<void>;
  isLoading: boolean;
  onCustomUpdate: (updated: Partial<VideoData>) => void;
}

export const VideoInputBar: React.FC<VideoInputBarProps> = ({
  currentVideo,
  onSelectVideo,
  onAnalyzeUrl,
  isLoading,
  onCustomUpdate,
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [customTitle, setCustomTitle] = useState(currentVideo.title);
  const [customDesc, setCustomDesc] = useState(currentVideo.description);
  const [customTags, setCustomTags] = useState(currentVideo.tags.join(', '));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    onAnalyzeUrl(inputUrl);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    onCustomUpdate({
      title: customTitle,
      description: customDesc,
      tags: customTags.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setShowEditModal(false);
  };

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Main URL input form */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="Paste any YouTube Video URL (e.g. https://www.youtube.com/watch?v=...)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Analyze Video</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setCustomTitle(currentVideo.title);
                setCustomDesc(currentVideo.description);
                setCustomTags(currentVideo.tags.join(', '));
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all"
              title="Edit Title, Description & Tags manually"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Metadata</span>
            </button>
          </div>
        </form>

        {/* Quick Sample Selector chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
          <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] whitespace-nowrap flex items-center gap-1">
            <Play className="w-3 h-3 text-red-500 fill-red-500" />
            Quick Test Samples:
          </span>
          {SAMPLE_VIDEOS.map((sample) => {
            const isSelected = sample.id === currentVideo.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => onSelectVideo(sample)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-red-500/15 border-red-500/50 text-red-300 font-semibold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-red-400" />}
                <span>{sample.channel}</span>
                <span className="text-slate-500 text-[10px]">
                  ({sample.views !== null ? `${sample.views.toLocaleString()} views` : 'Data unavailable'})
                </span>
              </button>
            );
          })}
        </div>

        {/* Video Identity Lock Status Pill */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/60 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Video Identity Lock: <strong className="text-white">{currentVideo.title}</strong></span>
            <span className="text-slate-600 font-mono text-[10px] bg-slate-950 px-1.5 py-0.2 rounded border border-slate-800">
              ID: {currentVideo.id}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-slate-500">
              Verified: <strong className="text-slate-300">{currentVideo.channel}</strong>
            </span>
            <span className="text-emerald-400 font-medium">
              Zero Fake Stats Enforced
            </span>
          </div>
        </div>
      </div>

      {/* Manual Metadata Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-red-500" />
                Customize Video Metadata
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Video Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={customTags}
                  onChange={(e) => setCustomTags(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-md shadow-red-600/20"
                >
                  Apply & Recalculate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
