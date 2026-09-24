import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TooniSidebar } from './components/TooniSidebar';
import { VideoInputBar } from './components/VideoInputBar';
import { MainGrowthDashboardTab } from './components/MainGrowthDashboardTab';
import { GrowthSimulatorTab } from './components/GrowthSimulatorTab';
import { WatchTimeCalculatorTab } from './components/WatchTimeCalculatorTab';
import { TrafficSourcePlannerTab } from './components/TrafficSourcePlannerTab';
import { AdsPlannerTab } from './components/AdsPlannerTab';
import { AnalyticsChartsTab } from './components/AnalyticsChartsTab';
import { ScenarioComparisonTab } from './components/ScenarioComparisonTab';
import { TitleOptimizerTab } from './components/TitleOptimizerTab';
import { DescriptionOptimizerTab } from './components/DescriptionOptimizerTab';
import { TagGeneratorTab } from './components/TagGeneratorTab';
import { KeywordResearchTab } from './components/KeywordResearchTab';
import { PromotionChecklistTab } from './components/PromotionChecklistTab';
import { GrowthHistoryTab } from './components/GrowthHistoryTab';
import { SimulatorSettingsTab } from './components/SimulatorSettingsTab';

// Existing Comprehensive SEO & Studio Components
import { BeforeAfterScoreView } from './components/BeforeAfterScoreView';
import { ChecklistTab } from './components/ChecklistTab';
import { KeywordsCompetitorTab } from './components/KeywordsCompetitorTab';
import { ThumbnailCTRTab } from './components/ThumbnailCTRTab';
import { AnalyticsDoctorTab } from './components/AnalyticsDoctorTab';
import { PlannerScriptTab } from './components/PlannerScriptTab';
import { USAVideoIdeasTab } from './components/USAVideoIdeasTab';
import { ChromeExtensionTab } from './components/ChromeExtensionTab';
import { ProjectsTab } from './components/ProjectsTab';
import { ScriptSeoTab } from './components/ScriptSeoTab';
import { AdvancedSeoAnalyzerTab } from './components/AdvancedSeoAnalyzerTab';
import { SocialSeoTab } from './components/SocialSeoTab';
import { BacklinkStrategyTab } from './components/BacklinkStrategyTab';

import { SAMPLE_VIDEOS } from './data/sampleVideos';
import { VideoData, OptimizationResult, SavedProject, SimulationAssumptions } from './types';
import { DEFAULT_ASSUMPTIONS, loadSimulatorSettings } from './utils/growthSimulatorEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentVideo, setCurrentVideo] = useState<VideoData>(SAMPLE_VIDEOS[0]);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [targetViews, setTargetViews] = useState<number>(100000);
  const [assumptions, setAssumptions] = useState<SimulationAssumptions>(() => {
    return loadSimulatorSettings().assumptions || DEFAULT_ASSUMPTIONS;
  });

  const [projects, setProjects] = useState<SavedProject[]>(() => {
    try {
      const saved = localStorage.getItem('tooni_seo_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tooni_seo_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  // Run Optimization Engine
  const runOptimization = async (video: VideoData = currentVideo) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/seo/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoData: video }),
      });
      if (!res.ok) throw new Error('Failed to generate improvement');
      const data = await res.json();
      setOptimization(data);
    } catch (err) {
      console.error('Error optimizing video:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    runOptimization(SAMPLE_VIDEOS[0]);
  }, []);

  const handleSelectVideo = (video: VideoData) => {
    setCurrentVideo(video);
    runOptimization(video);
  };

  const handleAnalyzeUrl = async (url: string) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const newVideo = await res.json();
      setCurrentVideo(newVideo);
      await runOptimization(newVideo);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomUpdate = (updated: Partial<VideoData>) => {
    const nextVideo = { ...currentVideo, ...updated };
    setCurrentVideo(nextVideo);
    runOptimization(nextVideo);
  };

  const handleApplyIdea = (ideaTitle: string) => {
    const nextVideo = { ...currentVideo, title: ideaTitle };
    setCurrentVideo(nextVideo);
    runOptimization(nextVideo);
    setActiveTab('dashboard');
  };

  const handleSaveProject = () => {
    const existingIndex = projects.findIndex((p) => p.videoData.id === currentVideo.id);
    const newProject: SavedProject = {
      id: 'proj-' + Date.now(),
      name: currentVideo.title,
      videoUrl: currentVideo.url,
      savedAt: new Date().toISOString(),
      beforeScore: optimization ? optimization.beforeScores.overall : 61,
      afterScore: optimization ? optimization.afterScores.overall : 99,
      videoData: currentVideo,
      optimization: optimization || undefined,
    };

    if (existingIndex >= 0) {
      const updated = [...projects];
      updated[existingIndex] = newProject;
      setProjects(updated);
    } else {
      setProjects([newProject, ...projects]);
    }
  };

  const isCurrentSaved = projects.some((p) => p.videoData.id === currentVideo.id);

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleClearAllProjects = () => {
    if (confirm('Are you sure you want to clear all saved projects?')) {
      setProjects([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-red-500 selection:text-white flex flex-col">
      {/* Top App Header with Navigation & Brand */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={projects.length}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* Video URL Input & Sample Picker with Analyze Video, Run Simulation, and Reset */}
      <VideoInputBar
        currentVideo={currentVideo}
        onSelectVideo={handleSelectVideo}
        onAnalyzeUrl={handleAnalyzeUrl}
        isLoading={isLoading}
        onCustomUpdate={handleCustomUpdate}
        onRunSimulation={() => setActiveTab('simulator')}
        onReset={() => handleSelectVideo(SAMPLE_VIDEOS[0])}
      />

      {/* Main Workspace with Sidebar & Main Content */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto">
        {/* Tooni TV Sidebar Navigation */}
        <TooniSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={projects.length}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Content Container */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
          {/* TAB: Main Dashboard */}
          {activeTab === 'dashboard' && (
            <MainGrowthDashboardTab
              currentVideo={currentVideo}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectTarget={(target) => setTargetViews(target)}
              assumptions={assumptions}
            />
          )}

          {/* TAB: Growth Simulator Live Timer */}
          {activeTab === 'simulator' && (
            <GrowthSimulatorTab
              currentVideo={currentVideo}
              targetViews={targetViews}
              assumptions={assumptions}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {/* TAB: Watch Time Calculator */}
          {activeTab === 'watchtime-calc' && (
            <WatchTimeCalculatorTab />
          )}

          {/* TAB: Real Traffic Source Planner */}
          {activeTab === 'traffic-planner' && (
            <TrafficSourcePlannerTab
              targetViews={targetViews}
              currentViews={currentVideo.views || 12500}
            />
          )}

          {/* TAB: Google & YouTube Ads Planner */}
          {activeTab === 'ads-planner' && (
            <AdsPlannerTab
              currentUrl={currentVideo.url}
              targetViews={targetViews}
            />
          )}

          {/* TAB: Analytics Charts */}
          {activeTab === 'charts' && (
            <AnalyticsChartsTab
              targetViews={targetViews}
              currentViews={currentVideo.views || 12500}
            />
          )}

          {/* TAB: 50K vs 100K Comparison Matrix */}
          {activeTab === 'comparison' && (
            <ScenarioComparisonTab
              currentVideo={currentVideo}
              customTarget={targetViews}
              assumptions={assumptions}
            />
          )}

          {/* TAB: SEO Analyzer */}
          {activeTab === 'seo-analyzer' && (
            <AdvancedSeoAnalyzerTab
              currentTitle={currentVideo.title}
              currentDescription={currentVideo.description}
              currentThumbnail={currentVideo.thumbnailUrl}
            />
          )}

          {/* TAB: Title Optimizer */}
          {activeTab === 'title-optimizer' && (
            <TitleOptimizerTab
              currentVideo={currentVideo}
              onApplyTitle={(t) => handleCustomUpdate({ title: t })}
            />
          )}

          {/* TAB: Description Optimizer */}
          {activeTab === 'desc-optimizer' && (
            <DescriptionOptimizerTab
              currentVideo={currentVideo}
              onApplyDescription={(d) => handleCustomUpdate({ description: d })}
            />
          )}

          {/* TAB: Tag Generator */}
          {activeTab === 'tag-generator' && (
            <TagGeneratorTab
              currentVideo={currentVideo}
              onApplyTags={(tags) => handleCustomUpdate({ tags })}
            />
          )}

          {/* TAB: Keyword Research */}
          {activeTab === 'keyword-research' && (
            <KeywordResearchTab currentVideo={currentVideo} />
          )}

          {/* TAB: Thumbnail & CTR Studio */}
          {activeTab === 'thumbnail' && (
            <ThumbnailCTRTab
              currentVideo={currentVideo}
              currentThumbnail={currentVideo.thumbnailUrl}
              videoTitle={currentVideo.title}
              onUpdateVideo={handleCustomUpdate}
            />
          )}

          {/* TAB: Promotion Checklist */}
          {activeTab === 'checklist-tab' && (
            <PromotionChecklistTab />
          )}

          {/* TAB: History */}
          {activeTab === 'history-tab' && (
            <GrowthHistoryTab />
          )}

          {/* TAB: Settings */}
          {activeTab === 'settings-tab' && (
            <SimulatorSettingsTab
              currentAssumptions={assumptions}
              onUpdateAssumptions={(newA) => setAssumptions(newA)}
            />
          )}

          {/* TAB: Step 10 Before/After Score View */}
          {activeTab === 'optimizer' && (
            <BeforeAfterScoreView
              video={currentVideo}
              optimization={optimization}
              onRunImprovement={() => runOptimization(currentVideo)}
              isLoading={isLoading}
              onSaveProject={handleSaveProject}
              isSaved={isCurrentSaved}
            />
          )}

          {/* TAB: Script-First SEO */}
          {activeTab === 'script-seo' && (
            <ScriptSeoTab onApplyToOptimizer={(res) => {
              const nextVideo = {
                ...currentVideo,
                title: res.package.primaryTitle,
                description: res.package.description,
                tags: res.package.tags
              };
              setCurrentVideo(nextVideo);
              runOptimization(nextVideo);
              setActiveTab('dashboard');
            }} />
          )}

          {/* TAB: USA Video Ideas */}
          {activeTab === 'ideas' && (
            <USAVideoIdeasTab
              initialTopic={currentVideo.title}
              onApplyIdeaToOptimizer={handleApplyIdea}
            />
          )}

          {/* TAB: 100/100 Checklist */}
          {activeTab === 'checklist' && (
            <ChecklistTab
              optimization={optimization}
              onRunImprovement={() => runOptimization(currentVideo)}
              isLoading={isLoading}
            />
          )}

          {/* TAB: Keywords & Gaps */}
          {activeTab === 'keywords' && (
            <KeywordsCompetitorTab currentTitle={currentVideo.title} />
          )}

          {/* TAB: Social SEO */}
          {activeTab === 'social-seo' && (
            <SocialSeoTab
              initialTitle={currentVideo.title}
              initialThumbnail={currentVideo.thumbnailUrl}
            />
          )}

          {/* TAB: Backlink Strategy */}
          {activeTab === 'backlinks' && (
            <BacklinkStrategyTab
              currentUrl={currentVideo.url}
              currentTitle={currentVideo.title}
            />
          )}

          {/* TAB: Analytics Doctor */}
          {activeTab === 'analytics' && <AnalyticsDoctorTab />}

          {/* TAB: Planner & Script */}
          {activeTab === 'planner' && <PlannerScriptTab />}

          {/* TAB: Chrome Extension */}
          {activeTab === 'extension' && (
            <ChromeExtensionTab currentVideo={currentVideo} />
          )}

          {/* TAB: Projects */}
          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onSelectProject={(v) => {
                setCurrentVideo(v);
                runOptimization(v);
                setActiveTab('dashboard');
              }}
              onDeleteProject={handleDeleteProject}
              onClearAll={handleClearAllProjects}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-400">Tooni TV YouTube Growth Simulator</span>
            <span>•</span>
            <span className="text-slate-400">100% Policy Compliant Simulation & Optimization Suite</span>
          </div>
          <p>
            Forecasts and projections are simulated estimates. Never generates fake views, likes, or bots.
          </p>
        </div>
      </footer>
    </div>
  );
}
