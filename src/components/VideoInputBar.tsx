import React, { useState } from 'react';
import { Search, Sparkles, SlidersHorizontal, Play, Check, RotateCcw, Timer, AlertCircle } from 'lucide-react';
import { VideoData } from '../types';
import { SAMPLE_VIDEOS } from '../data/sampleVideos';

interface VideoInputBarProps {
  currentVideo: VideoData;
  onSelectVideo: (video: VideoData) => void;
  onAnalyzeUrl: (url: string) => Promise<void>;
  isLoading: boolean;
  onCustomUpdate: (updated: Partial<VideoData>) => void;
  onRunSimulation?: () => void;
  onReset?: () => void;
}

export const VideoInputBar: React.FC<VideoInputBarProps> = ({
  currentVideo,
  onSelectVideo,
  onAnalyzeUrl,
  isLoading,
  onCustomUpdate,
  onRunSimulation,
  onReset
}) => {
  const [inputUrl, setInputUrl] = useState('');
  const [urlError, setUrlError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [customTitle, setCustomTitle] = useState(currentVideo.title);
  const [customDesc, setCustomDesc] = useState(currentVideo.description);
  const [customTags, setCustomTags] = useState(currentVideo.tags.join(', '));

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    const isYouTube = /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)/i.test(url);
    if (!isYouTube) {
      setUrlError('Please enter a valid YouTube video or Short URL (e.g., https://youtube.com/watch?v=...)');
      return false;
    }
    setUrlError(null);
    return true;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUrl(inputUrl)) return;
    onAnalyzeUrl(inputUrl);
  };

  const handleResetClick = () => {
    setInputUrl('');
    setUrlError(null);
    if (onReset) onReset();
    else onSelectVideo(SAMPLE_VIDEOS[0]);
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
    <div className="bg-slate-900/90 border-b border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
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
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (urlError) setUrlError(null);
              }}
              placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Analyze Video Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/20 cursor-pointer"
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

            {/* Run Simulation Button */}
            {onRunSimulation && (
              <button
                type="button"
                onClick={onRunSimulation}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <Timer className="w-3.5 h-3.5" />
                <span>Run Simulation</span>
              </button>
            )}

            {/* Reset Button */}
            <button
              type="button"
              onClick={handleResetClick}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
              title="Reset URL and selection"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {/* Edit Metadata Modal Trigger */}
            <button
              type="button"
              onClick={() => {
                setCustomTitle(currentVideo.title);
                setCustomDesc(currentVideo.description);
                setCustomTags(currentVideo.tags.join(', '));
                setShowEditModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-all cursor-pointer"
              title="Edit Title, Description & Tags manually"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Edit</span>
            </button>
          </div>
        </form>

        {/* URL Error Message */}
        {urlError && (
          <div className="flex items-center gap-2 text-xs text-red-400 bg-red-950/30 border border-red-500/30 p-2.5 rounded-xl">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{urlError}</span>
          </div>
        )}

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
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 border cursor-pointer ${
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
      </div>

      {/* Manual Edit Metadata Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Edit Video Metadata Manually</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Title (≤ 100 characters):
                </label>
                <input
                  type="text"
                  maxLength={100}
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {customTitle.length}/100 characters
                </span>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Description:
                </label>
                <textarea
                  rows={4}
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tags (comma separated):
                </label>
                <input
                  type="text"
                  value={customTags}
                  onChange={(e) => setCustomTags(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Save & Re-evaluate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
