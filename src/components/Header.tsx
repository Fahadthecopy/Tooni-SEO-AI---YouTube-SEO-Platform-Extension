import React from 'react';
import { 
  Sparkles, 
  Chrome, 
  BarChart3, 
  CheckCircle2, 
  Key, 
  Image as ImageIcon, 
  Calendar, 
  FolderArchive,
  Flame,
  Compass,
  FileText,
  Share2,
  Link2,
  FileCode
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, savedCount }) => {
  const navItems = [
    { id: 'optimizer', label: 'Step 10: Before → After', icon: Flame, badge: 'CORE' },
    { id: 'script-seo', label: 'Script-First SEO', icon: FileText, badge: 'PIPELINE' },
    { id: 'advanced-seo', label: 'Advanced On-Page & Meta', icon: FileCode, badge: 'AUDIT' },
    { id: 'thumbnail', label: 'Thumbnail & CTR Studio', icon: ImageIcon, badge: 'LOCK' },
    { id: 'social-seo', label: 'Social & TikTok SEO', icon: Share2, badge: 'NEW' },
    { id: 'backlinks', label: 'Backlink Strategy', icon: Link2, badge: '400' },
    { id: 'ideas', label: 'USA Video Ideas', icon: Compass },
    { id: 'checklist', label: '100/100 Checklist', icon: CheckCircle2 },
    { id: 'keywords', label: 'Keywords & Gaps', icon: Key },
    { id: 'analytics', label: 'Analytics Doctor', icon: BarChart3, badge: 'AI' },
    { id: 'planner', label: 'Planner & Script', icon: Calendar },
    { id: 'extension', label: 'Chrome Extension', icon: Chrome, badge: 'V2.4' },
    { id: 'projects', label: 'Projects', icon: FolderArchive, count: savedCount },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('optimizer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <span className="text-white font-black text-xl tracking-tighter">T</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-lg tracking-tight">Tooni SEO AI</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  YouTube Suite
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Algorithmic 100/100 YouTube Optimization Engine</p>
            </div>
          </div>

          {/* AI Status Pill */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-full px-3.5 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Gemini 3.8 Flash AI Engine
            </span>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider ${
                    isActive ? 'bg-red-800 text-white' : 'bg-slate-700 text-amber-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700 text-white font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
