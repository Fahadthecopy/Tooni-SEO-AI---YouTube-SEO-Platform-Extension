import React from 'react';
import { 
  Sparkles, 
  Menu,
  ShieldCheck,
  LayoutDashboard,
  Timer,
  Clock,
  Share2,
  DollarSign,
  Image as ImageIcon,
  Flame,
  Search,
  CheckSquare
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onToggleSidebar
}) => {
  const topNavShortcuts = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'simulator', label: 'Growth Simulator', icon: Timer, badge: 'LIVE' },
    { id: 'watchtime-calc', label: 'Watch Time', icon: Clock },
    { id: 'traffic-planner', label: 'Real Traffic', icon: Share2 },
    { id: 'ads-planner', label: 'Google Ads', icon: DollarSign },
    { id: 'thumbnail', label: 'Thumbnail Studio', icon: ImageIcon, badge: 'LOCK' },
    { id: 'optimizer', label: 'Before → After', icon: Flame },
    { id: 'checklist-tab', label: 'Checklist', icon: CheckSquare },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Sidebar Toggle + Brand Logo */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Toggle Navigation Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl tracking-tighter">T</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-lg tracking-tight">Tooni TV</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
                    Growth Platform
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium hidden sm:block">
                  Legitimate YouTube Analytics, Simulation & Optimization Suite
                </p>
              </div>
            </div>
          </div>

          {/* Right: Policy Compliance Pill & Saved Counter */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-full px-3.5 py-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">100% Policy Compliant • Zero Fake Views</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 rounded-full px-3.5 py-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Algorithmic Engine
              </span>
            </div>
          </div>
        </div>

        {/* Quick Horizontal Bar */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {topNavShortcuts.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/25 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[8px] px-1 py-0.2 rounded font-black uppercase tracking-wider ${
                    isActive ? 'bg-red-800 text-white' : 'bg-slate-700 text-amber-300'
                  }`}>
                    {item.badge}
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
