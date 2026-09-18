import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { VideoInputBar } from './components/VideoInputBar';
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
import { VideoData, OptimizationResult, SavedProject } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('optimizer');
  const [currentVideo, setCurrentVideo] = useState<VideoData>(SAMPLE_VIDEOS[0]);
  const [optimization, setOptimization] = useState<OptimizationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  // Run the Step 10 Practical Optimization Engine
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

  // Initial load: generate baseline for first sample video
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
    setActiveTab('optimizer');
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
      {/* Top App Header with Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={projects.length}
      />

      {/* Video URL Input & Sample Picker */}
      <VideoInputBar
        currentVideo={currentVideo}
        onSelectVideo={handleSelectVideo}
        onAnalyzeUrl={handleAnalyzeUrl}
        isLoading={isLoading}
        onCustomUpdate={handleCustomUpdate}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

        {activeTab === 'ideas' && (
          <USAVideoIdeasTab
            initialTopic={currentVideo.title}
            onApplyIdeaToOptimizer={handleApplyIdea}
          />
        )}

        {activeTab === 'checklist' && (
          <ChecklistTab
            optimization={optimization}
            onRunImprovement={() => runOptimization(currentVideo)}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'keywords' && (
          <KeywordsCompetitorTab currentTitle={currentVideo.title} />
        )}

        {activeTab === 'thumbnail' && (
          <ThumbnailCTRTab
            currentVideo={currentVideo}
            currentThumbnail={currentVideo.thumbnailUrl}
            videoTitle={currentVideo.title}
            onUpdateVideo={handleCustomUpdate}
          />
        )}

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
            setActiveTab('optimizer');
          }} />
        )}

        {activeTab === 'advanced-seo' && (
          <AdvancedSeoAnalyzerTab
            currentTitle={currentVideo.title}
            currentDescription={currentVideo.description}
            currentThumbnail={currentVideo.thumbnailUrl}
          />
        )}

        {activeTab === 'social-seo' && (
          <SocialSeoTab
            initialTitle={currentVideo.title}
            initialThumbnail={currentVideo.thumbnailUrl}
          />
        )}

        {activeTab === 'backlinks' && (
          <BacklinkStrategyTab
            currentUrl={currentVideo.url}
            currentTitle={currentVideo.title}
          />
        )}

        {activeTab === 'analytics' && <AnalyticsDoctorTab />}

        {activeTab === 'planner' && <PlannerScriptTab />}

        {activeTab === 'extension' && (
          <ChromeExtensionTab currentVideo={currentVideo} />
        )}

        {activeTab === 'projects' && (
          <ProjectsTab
            projects={projects}
            onSelectProject={(v) => {
              setCurrentVideo(v);
              runOptimization(v);
              setActiveTab('optimizer');
            }}
            onDeleteProject={handleDeleteProject}
            onClearAll={handleClearAllProjects}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/60 border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-slate-400">Tooni SEO AI Engine</span>
            <span>•</span>
            <span>Gemini 3.8 Flash Powered</span>
          </div>
          <p>
            100/100 Measurable Algorithmic Optimization Suite for YouTube Creators
          </p>
        </div>
      </footer>
    </div>
  );
}
