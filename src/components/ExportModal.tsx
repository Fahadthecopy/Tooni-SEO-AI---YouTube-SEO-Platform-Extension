import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Code, 
  FileDown, 
  Sparkles,
  Settings,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { VideoData, OptimizationResult, BrandingSettings, TargetViews } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: VideoData;
  optimization: OptimizationResult | null;
  branding: BrandingSettings;
  targetViews: TargetViews;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  video,
  optimization,
  branding,
  targetViews,
}) => {
  const [activeFormat, setActiveFormat] = useState<'markdown' | 'text' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportData, setExportData] = useState<{
    markdown: string;
    text: string;
    json: string;
    downloadFileName: string;
  } | null>(null);

  React.useEffect(() => {
    if (isOpen && !exportData) {
      handleFetchExport();
    }
  }, [isOpen]);

  const handleFetchExport = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoData: video,
          optimization: optimization || {},
          branding,
          targetViews,
        }),
      });
      if (!res.ok) throw new Error('Export generation failed');
      const data = await res.json();
      setExportData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  const getActiveContent = () => {
    if (!exportData) return 'Generating export package...';
    if (activeFormat === 'markdown') return exportData.markdown;
    if (activeFormat === 'text') return exportData.text;
    return exportData.json;
  };

  const handleCopy = () => {
    const content = getActiveContent();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!exportData) return;
    const content = getActiveContent();
    const ext = activeFormat === 'markdown' ? 'md' : activeFormat === 'text' ? 'txt' : 'json';
    const mime = activeFormat === 'json' ? 'application/json' : 'text/plain';

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${exportData.downloadFileName || 'tooni-seo-package'}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Export Final Optimization Package</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  100/100 READY
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Tooni TV YouTube Studio format • Fact vs Analysis separated • Multi-format export
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector & Actions Bar */}
        <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveFormat('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'markdown'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>

            <button
              onClick={() => setActiveFormat('text')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'text'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Plain Text (.txt)</span>
            </button>

            <button
              onClick={() => setActiveFormat('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeFormat === 'json'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Structured JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              disabled={isExporting}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy to Clipboard</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-4 py-1.5 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Preview Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-950/80 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
          {isExporting ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-slate-400 font-sans">Compiling 100/100 export package...</span>
            </div>
          ) : (
            getActiveContent()
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Video Identity Locked to ID: {video.id}</span>
          </div>
          <span>Brand: {branding.brandName} • USA English</span>
        </div>
      </div>
    </div>
  );
};
