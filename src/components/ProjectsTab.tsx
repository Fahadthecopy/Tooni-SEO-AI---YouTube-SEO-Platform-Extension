import React from 'react';
import { FolderArchive, Trash2, ArrowUpRight, Calendar, Download, Eye, Video } from 'lucide-react';
import { SavedProject, VideoData } from '../types';

interface ProjectsTabProps {
  projects: SavedProject[];
  onSelectProject: (video: VideoData) => void;
  onDeleteProject: (id: string) => void;
  onClearAll: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  onSelectProject,
  onDeleteProject,
  onClearAll,
}) => {
  const handleExportJSON = () => {
    const dataStr = JSON.stringify(projects, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tooni-seo-projects-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-red-500" />
              <h3 className="text-xl font-black text-white tracking-tight">
                Saved Projects & Optimization History
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Store and track multiple YouTube video optimizations across your channels.
            </p>
          </div>

          {projects.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportJSON}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={onClearAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 text-red-300 text-xs font-semibold rounded-xl transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
            <Video className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-sm font-bold text-slate-300">No Saved Projects Yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Run Step 10 "Improve My Video" on any video, then click "Save Optimization Report" to store it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all"
              >
                <div className="flex gap-3">
                  <img
                    src={p.videoData.thumbnailUrl}
                    alt={p.name}
                    className="w-24 h-16 object-cover rounded-xl border border-slate-800 flex-shrink-0"
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                      {p.videoData.channel}
                    </span>
                    <h5 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                      {p.name}
                    </h5>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(p.savedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {p.videoData.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">Score:</span>
                    <span className="text-xs font-mono font-bold text-red-400">{p.beforeScore}</span>
                    <span className="text-slate-500 text-xs">→</span>
                    <span className="text-xs font-mono font-black text-emerald-400">{p.afterScore}/100</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(p.videoData)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      <span>Load In Optimizer</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(p.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg hover:bg-slate-900"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
