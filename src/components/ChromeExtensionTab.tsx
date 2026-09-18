import React, { useState } from 'react';
import { Chrome, Play, Sparkles, Copy, Check, Download, Layers, ShieldCheck, ExternalLink, Code } from 'lucide-react';
import { EXTENSION_FILES } from '../data/extensionFiles';
import { VideoData } from '../types';

interface ChromeExtensionTabProps {
  currentVideo: VideoData;
}

export const ChromeExtensionTab: React.FC<ChromeExtensionTabProps> = ({ currentVideo }) => {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copiedFile, setCopiedFile] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(61);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true);

  const activeFile = EXTENSION_FILES[activeFileIndex];

  const copyCurrentFile = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  const handleSimulateOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setSimulatedScore(99);
      setIsOptimizing(false);
    }, 900);
  };

  const handleDownloadAll = () => {
    // Generate JSON bundle containing all files for user
    const bundleData = JSON.stringify(EXTENSION_FILES, null, 2);
    const blob = new Blob([bundleData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tooni-seo-ai-extension-bundle.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Chrome className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-black text-white tracking-tight">
                Tooni SEO AI Chrome Extension Hub (Manifest V3)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Test the real extension popup simulator on YouTube and export production files for Chrome Web Store / Unpacked loading.
            </p>
          </div>

          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Download All Extension Files</span>
          </button>
        </div>

        {/* Step-by-step Chrome Loading Instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-red-400 font-bold block">Step 1: Open Chrome Extensions</span>
            <p className="text-slate-300 font-mono text-[11px]">chrome://extensions</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold block">Step 2: Enable Developer Mode</span>
            <p className="text-slate-400 text-[11px]">Toggle switch in top-right corner</p>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold block">Step 3: Click "Load Unpacked"</span>
            <p className="text-slate-400 text-[11px]">Select downloaded `extension/` folder</p>
          </div>
        </div>
      </div>

      {/* Live Interactive Simulator on YouTube */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Play className="w-4 h-4 text-red-500 fill-red-500" />
            <span>Interactive YouTube Page & Extension Popup Simulator</span>
          </h4>
          <span className="text-xs text-slate-400">Click toolbar extension icon to toggle popup</span>
        </div>

        {/* Simulated Browser Window */}
        <div className="bg-slate-950 rounded-2xl border border-slate-700/80 overflow-hidden shadow-2xl">
          {/* Chrome Browser Header Bar */}
          <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <div className="ml-3 px-3 py-1 bg-slate-950 rounded-md text-[11px] text-slate-400 font-mono border border-slate-800 flex items-center gap-2 max-w-sm sm:max-w-md truncate">
                <span className="text-emerald-400 text-[10px]">🔒 https://</span>
                <span>www.youtube.com/watch?v=kXo9Q8zK_Tooni</span>
              </div>
            </div>

            {/* Extension Action Button in Toolbar */}
            <div className="relative">
              <button
                onClick={() => setPopupOpen(!popupOpen)}
                className="relative p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white flex items-center gap-1.5 text-xs font-bold"
                title="Click to toggle Tooni SEO AI Extension Popup"
              >
                <div className="w-5 h-5 rounded bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-black text-[10px]">
                  T
                </div>
                <span className="text-[10px] font-mono px-1 rounded bg-red-500 text-white font-bold">
                  {simulatedScore}
                </span>
              </button>

              {/* Floating Extension Popup Modal */}
              {popupOpen && (
                <div className="absolute top-10 right-0 z-30 w-80 sm:w-96 bg-slate-900 border-2 border-red-500/50 rounded-2xl p-4 shadow-2xl text-slate-100 space-y-4 animate-in fade-in zoom-in duration-150">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-black text-xs text-white">
                        T
                      </div>
                      <div>
                        <h5 className="text-xs font-black text-white">Tooni SEO AI</h5>
                        <p className="text-[9px] text-slate-400">YouTube Optimizer V2.4</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      LIVE ON TAB
                    </span>
                  </div>

                  {/* Active Video Info */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex gap-2.5 items-center">
                    <img
                      src={currentVideo.thumbnailUrl}
                      alt="Thumb"
                      className="w-16 h-10 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">{currentVideo.title}</p>
                      <p className="text-[10px] text-slate-400">{currentVideo.channel}</p>
                    </div>
                  </div>

                  {/* Circular Score Breakdown */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-red-500 flex flex-col items-center justify-center bg-slate-900 flex-shrink-0">
                      <span className={`text-xl font-black ${simulatedScore > 80 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {simulatedScore}
                      </span>
                      <span className="text-[7px] text-slate-400 font-bold">SCORE</span>
                    </div>

                    <div className="flex-1 space-y-1 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Title SEO:</span>
                        <strong className="text-slate-200">{simulatedScore > 80 ? '100/100' : '62/100'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Keyword Intent:</span>
                        <strong className="text-slate-200">{simulatedScore > 80 ? '98/100' : '54/100'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tags Density:</span>
                        <strong className="text-slate-200">{simulatedScore > 80 ? '100/100' : '48/100'}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">CTR Packaging:</span>
                        <strong className="text-slate-200">{simulatedScore > 80 ? '98/100' : '60/100'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={handleSimulateOptimization}
                      disabled={isOptimizing}
                      className="w-full py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      {isOptimizing ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Optimizing...</span>
                        </>
                      ) : simulatedScore > 80 ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Optimized to 99/100! (Apply In Studio)</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>⚡ Improve My Video (Before → After)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* YouTube Video Page Simulation Body */}
          <div className="p-6 space-y-4">
            <div className="aspect-video max-h-72 w-full bg-slate-900 rounded-xl overflow-hidden relative flex items-center justify-center border border-slate-800">
              <img
                src={currentVideo.thumbnailUrl}
                alt="Video"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            </div>

            {/* Injected Tooni SEO Floating Pill (Demonstrating youtube-content.js) */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{currentVideo.title}</h3>

              {/* Injected Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-red-500/50 rounded-full text-xs font-bold text-white shadow-md">
                <span className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[10px]">⚡</span>
                <span>Tooni Extension Score: <span className="text-red-400">{simulatedScore}/100</span> (Gaps Detected)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Explorer for Extension Files */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white">Extension Source Code Files</h4>
          </div>

          <button
            onClick={copyCurrentFile}
            className="self-start sm:self-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
          >
            {copiedFile ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy {activeFile.filename}</span>
              </>
            )}
          </button>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {EXTENSION_FILES.map((file, i) => (
            <button
              key={file.path}
              onClick={() => setActiveFileIndex(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap border transition-all ${
                activeFileIndex === i
                  ? 'bg-red-600/20 border-red-500/50 text-red-300 font-bold'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {file.filename}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 font-medium">
          {activeFile.description}
        </p>

        {/* Code Content */}
        <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 max-h-96 overflow-y-auto leading-relaxed whitespace-pre">
          {activeFile.content}
        </div>
      </div>
    </div>
  );
};
