import React from 'react';
import {
  LayoutDashboard,
  Timer,
  Search,
  Type,
  FileText,
  Key,
  Tag,
  Image as ImageIcon,
  Share2,
  DollarSign,
  Clock,
  BarChart2,
  GitCompare,
  CheckSquare,
  History,
  Settings,
  ShieldCheck,
  Film,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface TooniSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export const TooniSidebar: React.FC<TooniSidebarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  isOpen,
  onToggle
}) => {
  const primaryNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'REAL' },
    { id: 'simulator', label: 'Growth Simulator', icon: Timer, badge: 'LIVE' },
    { id: 'watchtime-calc', label: 'Watch Time Calculator', icon: Clock },
    { id: 'comparison', label: '50K / 100K Scenarios', icon: GitCompare },
    { id: 'traffic-planner', label: 'Real Traffic Planner', icon: Share2 },
    { id: 'ads-planner', label: 'Google / YouTube Ads', icon: DollarSign },
    { id: 'charts', label: 'Analytics Charts', icon: BarChart2 },
  ];

  const optimizationNav = [
    { id: 'seo-analyzer', label: 'SEO Analyzer', icon: Search, badge: '90+' },
    { id: 'title-optimizer', label: 'Title Optimizer', icon: Type, badge: 'CTR' },
    { id: 'desc-optimizer', label: 'Description Optimizer', icon: FileText },
    { id: 'keyword-research', label: 'Keyword Research', icon: Key },
    { id: 'tag-generator', label: 'Tag Generator', icon: Tag },
    { id: 'thumbnail', label: 'Thumbnail Studio', icon: ImageIcon, badge: '4K' },
    { id: 'checklist-tab', label: 'Promotion Checklist', icon: CheckSquare },
  ];

  const platformNav = [
    { id: 'optimizer', label: 'Before → After Audit', icon: Sparkles },
    { id: 'script-seo', label: 'Script-First SEO', icon: Film },
    { id: 'history-tab', label: 'History & Projects', icon: History, count: savedCount },
    { id: 'settings-tab', label: 'Simulator Settings', icon: Settings },
  ];

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4rem)] flex-shrink-0 bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between ${
        isOpen ? 'w-64' : 'w-0 lg:w-20 overflow-hidden lg:overflow-visible'
      }`}
    >
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-none">
        {/* Mobile Header in Drawer */}
        <div className="flex lg:hidden items-center justify-between pb-3 border-b border-slate-800 px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-black text-white">
              T
            </div>
            <span className="font-extrabold text-white text-base">Tooni TV</span>
          </div>
          <button
            onClick={onToggle}
            className="p-1 rounded text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Section 1: Growth & Simulation */}
        <div>
          <span className={`text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 block mb-2 ${!isOpen && 'lg:hidden'}`}>
            Growth & Simulation
          </span>
          <div className="space-y-1">
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/25 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-amber-400'}`} />
                    <span className={`${!isOpen && 'lg:hidden'} truncate`}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-red-800 text-white' : 'bg-slate-800 text-amber-400 border border-amber-400/20'
                    } ${!isOpen && 'lg:hidden'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: YouTube SEO & Packaging */}
        <div>
          <span className={`text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 block mb-2 ${!isOpen && 'lg:hidden'}`}>
            SEO & Packaging
          </span>
          <div className="space-y-1">
            {optimizationNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/25 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                    <span className={`${!isOpen && 'lg:hidden'} truncate`}>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isActive ? 'bg-red-800 text-white' : 'bg-slate-800 text-emerald-400 border border-emerald-400/20'
                    } ${!isOpen && 'lg:hidden'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: History & Tools */}
        <div>
          <span className={`text-[10px] font-black uppercase tracking-wider text-slate-400 px-2.5 block mb-2 ${!isOpen && 'lg:hidden'}`}>
            Tools & History
          </span>
          <div className="space-y-1">
            {platformNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) onToggle();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/25 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-400'}`} />
                    <span className={`${!isOpen && 'lg:hidden'} truncate`}>{item.label}</span>
                  </div>
                  {typeof item.count === 'number' && item.count > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-white border border-slate-700 ${!isOpen && 'lg:hidden'}`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Compliance Shield Footer Badge */}
      <div className={`p-3 border-t border-slate-800 bg-slate-950/80 ${!isOpen && 'lg:hidden'}`}>
        <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-tight">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-200 block text-[11px]">Strict Compliance</span>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Simulated & estimated data only. No fake engagement or bots.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
