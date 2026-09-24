export type ContentType = 'Long Video' | 'Short' | 'Image Post' | 'Video Post' | 'Social Post';

export interface ContentQualityReview {
  status: 'Approved' | 'Needs Improvement' | 'Rejected / Not Recommended';
  overallQualityScore: number;
  whyNeedsImprovement: string;
  whatIsWrong: string[];
  whatShouldChange: string[];
  improvedVersionSummary: string;
  disclaimer: string;
}

export interface LongFormAnalysis {
  mainTopic: string;
  sections: {
    timestamp: string;
    title: string;
    keyMoments: string;
    retentionTip: string;
  }[];
  searchIntent: string;
  contentGaps: string[];
  hookAnalysis: {
    first15sEvaluation: string;
    recommendations: string;
  };
  viewerJourney: string;
  thumbnailOpportunity: string;
  seoOpportunities: string[];
}

export interface ShortsAnalysis {
  hook0to1s: string;
  visualComposition: string;
  coverPreviewUrl?: string;
  recommendedCoverText: string;
  loopFactorAdvice: string;
  fastTitle: string;
  soundAudioAdvice: string;
  hashtags: string[];
}

export interface ImagePostAnalysis {
  detectedSubjectOrService: string;
  purposeOfPost: string;
  visualMessage: string;
  identifiedProblems: string[];
  whatShouldBeImproved: string[];
  improvedPostCreative: {
    headline: string;
    bodyCopy: string;
    callToAction: string;
    hashtags: string[];
    visualLayoutAdvice: string;
  };
}

export interface VideoData {
  id: string;
  url: string;
  title: string;
  channel: string;
  channelId?: string;
  channelUrl?: string;
  views: number | null; // null represents "Data unavailable"
  likes: number | null;
  comments: number | null;
  publishDate: string;
  duration: string;
  thumbnailUrl: string;
  originalThumbnailUrl?: string;
  approvedThumbnailUrl?: string;
  thumbnailStatus?: 'Approved' | 'Needs Review' | 'Original Kept' | 'Regenerated';
  description: string;
  tags: string[];
  category?: string;
  isVerifiedReal?: boolean;
  fetchSource?: 'oembed' | 'api' | 'sample';
  contentType?: ContentType;
  embedUrl?: string;
  contentReview?: ContentQualityReview;
  longFormAnalysis?: LongFormAnalysis;
  shortsAnalysis?: ShortsAnalysis;
  imagePostAnalysis?: ImagePostAnalysis;
}

export interface TargetViews {
  perMinute: string;
  perHour: string;
  perDay: string;
  perWeek: string;
  perMonth: string;
  perYear: string;
}

export interface BrandingSettings {
  brandName: string;
  targetCountry: string;
  targetLanguage: string;
  audience: string;
  contentStyle: string;
  logoUrl: string | null;
  logoPosition: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  logoSize: 'small' | 'medium' | 'large';
  watermark: boolean;
  opacity: number;
}

export interface ScoreCategory {
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  feedback: string;
}

export interface SEOScoreReport {
  overallScore: number;
  titleScore: ScoreCategory;
  keywordScore: ScoreCategory;
  descriptionScore: ScoreCategory;
  tagsScore: ScoreCategory;
  thumbnailScore: ScoreCategory;
  hookScore: ScoreCategory;
  ctrPackagingScore: ScoreCategory;
  searchIntentScore: ScoreCategory;
  contentMatchScore: ScoreCategory;
  metadataScore: ScoreCategory;
  summary: string;
}

export interface BeforeAfterMetric {
  metric: string;
  before: number;
  after: number;
  change: number;
  critique: string;
  fix: string;
}

export interface OptimizationChecklistItem {
  id: string;
  category: 'Title' | 'Description' | 'Keywords & Tags' | 'CTR & Thumbnail' | 'Hook & Retention';
  label: string;
  beforeStatus: 'passed' | 'warning' | 'failed';
  afterStatus: 'passed';
  explanation: string;
  weight: number;
}

export interface TitleOption {
  type: string;
  title: string;
  charCount: number;
  score: number;
  predictedCTR: string;
  reasoning: string;
}

export interface OptimizationResult {
  beforeScores: {
    overall: number;
    title: number;
    description: number;
    keywords: number;
    tags: number;
    thumbnail: number;
    hook: number;
    ctr: number;
    searchIntent: number;
    contentMatch: number;
    metadata: number;
  };
  afterScores: {
    overall: number;
    title: number;
    description: number;
    keywords: number;
    tags: number;
    thumbnail: number;
    hook: number;
    ctr: number;
    searchIntent: number;
    contentMatch: number;
    metadata: number;
  };
  metrics: BeforeAfterMetric[];
  checklist: OptimizationChecklistItem[];
  primaryTitle: string;
  optimizedTitles: TitleOption[];
  optimizedDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  optimizedKeywords: string[]; // exactly 20
  optimizedTags: string[]; // exactly 20
  suggestedHashtags: string[]; // exactly 5
  suggestedChapters: { timestamp: string; title: string }[];
  hookRewrites: {
    currentHook: string;
    hookProblem: string;
    hookOpportunity: string;
    first5Sec: string;
    first15Sec: string;
    visualActionCue: string;
  };
  ctrPackaging: {
    thumbnailConcept: string;
    thumbnailOverlayText: string;
    colorContrastAdvice: string;
    curiosityGap: string;
    mobileFrictionRule: string;
  };
  contentGap: {
    missingSubtopics: string[];
    unansweredQuestions: string[];
    goldenOpportunities: string[];
    recommendedAngle: string;
  };
  suggestedCategory?: string;
  suggestedPlaylist?: string;
  endScreenStrategy?: string;
  cardsStrategy?: string;
}

export interface KeywordItem {
  keyword: string;
  searchVolume: 'High' | 'Very High' | 'Medium' | 'Low';
  competition: 'Low' | 'Medium' | 'High';
  relevance: number; // 0-100
  type: 'primary' | 'secondary' | 'long-tail' | 'question' | 'semantic' | 'topic' | 'related';
  intent: 'Informational' | 'Commercial' | 'Tutorial' | 'Entertainment';
}

export interface ContentGapAnalysis {
  competitorsCover: string[];
  yourVideoMissing: string[];
  goldenOpportunities: string[];
  recommendedAngle: string;
}

export interface USAKeywordPackage {
  primary: KeywordItem[];
  secondary: KeywordItem[];
  longTail: KeywordItem[];
  questions: KeywordItem[];
  related: KeywordItem[];
  topic: KeywordItem[];
  all20: string[];
  keywordGaps: string[];
}

export interface CompetitorVideo {
  id: string;
  title: string;
  channel: string;
  views: string;
  likes?: string;
  comments?: string;
  daysAgo: string;
  duration?: string;
  thumbnailUrl: string;
  strengths: string[];
  thumbnailConcept: string;
}

export interface CompetitorIntelligence {
  competitors: CompetitorVideo[];
  averageViews: string;
  averageLikes: string;
  averageComments: string;
  averageTitleLength: number;
  commonKeywords: string[];
  keywordGaps: string[];
  contentGaps: string[];
  contentGap?: ContentGapAnalysis;
  titlePatterns: string[];
  thumbnailPatterns: string[];
}

export interface ThumbnailAudit {
  visualScore: number;
  contrastScore: number;
  textReadabilityScore: number;
  mobileVisibilityScore: number;
  actionableImprovements?: string[];
  mainSubject: string;
  backgroundClutter: string;
  textAmount: string;
  focalPoint: string;
  emotionalTrigger: string;
  composition: string;
  contrast: string;
  mobileReadability: string;
  branding: string;
  topicClarity: string;
  unnecessaryElements: string[];
  cleanRedesignPlan: {
    whatToKeep: string[];
    whatToRemove: string[];
    whatToEnlarge: string[];
    whatToSimplify: string[];
    subjectPlacement: string;
    textPlacement: string;
    recommendedBadgeText: string;
    mobileAdvice: string;
  };
  generatedPrompts: {
    style: string;
    prompt: string;
    badgeText: string;
    dominantColor: string;
  }[];
}

export interface AnalyticsAudit {
  impressions: number;
  ctr: number;
  views: number;
  averageViewDuration: string;
  retentionAt30s: number;
  trafficSource: string;
  primaryDiagnosis: string;
  whyViewsAreLow: string[];
  immediate3StepFix: string[];
  recommendedExperiment: string;
}

export interface USAIdeaItem {
  id: string;
  title: string;
  topic: string;
  primaryKeyword: string;
  viewerIntent: string;
  whyRelevant: string;
  suggestedHook: string;
  suggestedThumbnailConcept: string;
  format: 'long-form' | 'shorts' | 'follow-up';
}

export interface USAContentStrategy {
  nextVideoRecommendation: string;
  followUpVideos: string[];
  shortsFromLongForm: string[];
  seriesConcepts: string[];
  topicClusters: string[];
  seasonalOpportunities: string[];
  audienceInterestThemes: string[];
}

export interface SavedProject {
  id: string;
  name: string;
  videoUrl: string;
  savedAt: string;
  beforeScore: number;
  afterScore: number;
  videoData: VideoData;
  optimization?: OptimizationResult;
  targetViews?: TargetViews;
}

// ==========================================
// ADVANCED SEO EXPANSION MODULE INTERFACES
// ==========================================

export interface TitleAnalysisDetails {
  characterCount: number;
  wordCount: number;
  keywordCount: number;
  primaryKeyword: string;
  secondaryKeyword: string;
  keywordPlacement: 'Front-loaded (0-30 chars)' | 'Middle' | 'End' | 'Not Found';
  keywordPercentage: number;
  powerWordCount: number;
  emotionalWordCount: number;
  powerWordsFound: string[];
  emotionalWordsFound: string[];
  searchIntentMatch: 'Strong Informational' | 'Commercial Discovery' | 'Entertainment / Viral' | 'How-To / Educational';
  usaRelevance: string;
  readability: 'Grade 5 (High Clickability)' | 'Grade 8 (Standard)' | 'Complex';
  clickAppeal: 'Very High (Curiosity + Benefit)' | 'Moderate' | 'Low / Generic';
  topicMatch: string;
  titleScore: number; // 0-100 (Internal evaluation metric, not a guaranteed YouTube ranking factor)
  scoreDisclaimer: string;
  characterStatus?: 'Preferred Range (90–98 chars)' | 'Acceptable (<90 chars)' | 'Exceeds YouTube 100-Char Limit (Critical)';
  isOverLimit?: boolean;
  charLimitAdvice?: string;
}

export interface TopTitleOption {
  id: string;
  title: string;
  characterCount: number;
  wordCount: number;
  primaryKeyword: string;
  keywordPosition: number;
  keywordPercentage: number;
  searchIntent: string;
  ctrPackagingNotes: string;
  whyMatchesContent: string;
  powerWords: string[];
  characterStatus?: 'Preferred (90–98 chars)' | 'Safe (<90 chars)' | 'Over 100 chars';
}

export interface WordUsageAnalysis {
  relevantPopularWords: { word: string; frequency: number; role: string; evidenceSource: string }[];
  genericWords: { word: string; frequency: number; advice: string }[];
  lowRelevanceWords: { word: string; frequency: number; warning: string }[];
}

export interface DescriptionStatistics {
  characterCount: number;
  wordCount: number;
  sentenceCount: number;
  primaryKeywordOccurrences: number;
  primaryKeywordDensity: number; // calculated percentage e.g. 1.95
  secondaryKeywordOccurrences: number;
  secondaryKeywordDensity: number;
  totalKeywordOccurrences: number;
  hashtagCount: number;
  ctaCount: number;
  brandMentionCount: number;
  readability: string;
  searchIntentMatch: string;
  keywordStuffingRisk: boolean;
  keywordStuffingAdvice?: string;
  densityDisclaimer: string;
}

export interface TagAnalysisItem {
  tag: string;
  charCount: number;
  wordCount: number;
  relevance: number; // 0-100
  classification: 'Primary Topic' | 'Secondary Topic' | 'Long-Tail' | 'Related Search' | 'Brand' | 'Audience';
  duplicateStatus: 'Unique' | 'Duplicate / Redundant';
  keywordRelationship: string;
}

export interface TagStatistics {
  totalTags: number; // exactly 20
  totalCharacters: number;
  avgCharactersPerTag: number;
  avgWordsPerTag: number;
  distribution: {
    primaryTopic: string[];
    secondaryTopic: string[];
    longTail: string[];
    relatedSearch: string[];
    brand: string[];
    audience: string[];
  };
}

export interface MetadataAnalysis {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  openGraph: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    siteName?: string;
  };
  socialMetadata: {
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
  structuredMetadata: {
    schemaType: 'VideoObject' | 'Article' | 'CreativeWork';
    isComplete: boolean;
    missingRequiredFields: string[];
    jsonLdSnippet: string;
  };
  missingMetadata: string[];
  duplicateMetadata: string[];
  optimizationOpportunities: string[];
}

export interface ScriptSeoPackage {
  id: string;
  sourceType: 'full-script' | 'transcript' | 'subtitle' | 'text-document';
  rawScriptSnippet: string;
  topic: string;
  entities: string[];
  primarySearchIntent: string;
  secondarySearchIntent: string;
  contentGaps: string[];
  goldenAngle: string;
  primaryKeyword: string;
  primaryKeywordOccurrences: number;
  primaryKeywordDensity: number;
  secondaryKeywords: { keyword: string; occurrences: number; density: number }[];
  searchVolumeStatus: string; // "Search volume unavailable"
  top5Titles: TopTitleOption[];
  optimizedDescription: string;
  descriptionStats: DescriptionStatistics;
  keywords20: string[];
  tags20: TagAnalysisItem[];
  tagStats: TagStatistics;
  hashtags5: string[];
  hookImprovement: {
    hookProblem: string;
    first5SecHook: string;
    first15SecRetention: string;
    retentionCue: string;
  };
  thumbnailConcept: {
    scene: string;
    mainCharacter: string;
    overlayText: string;
    lighting: string;
    prompt: string;
  };
  disclaimer: string;
}

export interface ExistingSeoImport {
  title?: string;
  description?: string;
  tags?: string;
  keywords?: string;
  thumbnailUrl?: string;
  selectedComponent: 'all' | 'title' | 'description' | 'tags' | 'keywords' | 'thumbnail';
}

export interface ThumbnailStudioData {
  thumbnailUrl: string;
  originalThumbnailUrl: string;
  improvedThumbnailUrl: string;
  thumbnailStatus: 'Approved' | 'Needs Review' | 'Original Kept' | 'Regenerated';
  mainCharacter: string;
  faceExpression: string;
  eyesDescription: string;
  characterClothing: string;
  characterColors: string;
  characterProportions: string;
  importantObjects: string[];
  background: string;
  textInImage: string;
  logo: string;
  composition: string;
  subjectPositioning: string;
  visualHierarchy: string;
  clutterLevel: 'Low / Clean' | 'Moderate' | 'Heavy Clutter';
  clutterDetails: {
    unnecessaryElements: string[];
    duplicateObjects: string[];
    backgroundNoise: string[];
    textReadabilityIssues: string[];
  };
  contrast: string;
  brightness: string;
  mobileReadability: string;
  focalPoint: string;
  emotionalImpact: string;
  brandVisibility: string;
  characterLocked: boolean;
  characterLockDetails: {
    face: string;
    eyes: string;
    colors: string;
    bodyProportions: string;
    clothing: string;
    identity: string;
    characterStyle: string;
  };
  resetThumbnailPlan: {
    whatToKeep: string[];
    whatToRemove: string[];
    clutterReductionNotice: string;
    mobileReadabilityFix: string;
  };
  regeneratePrompt: string;
  generatedVariants?: {
    id: string;
    label: string;
    prompt: string;
    textBadge: string;
    colorScheme: string;
    previewUrl?: string;
  }[];
  contentReview: ContentQualityReview;
  editorSettings?: {
    headlineText: string;
    badgeText: string;
    colorScheme: string;
    backgroundStyle: string;
    characterLocked: boolean;
    clutterStripped: boolean;
    textPosition: 'top-left' | 'center' | 'bottom-left' | 'split-right';
    textSize: 'small' | 'medium' | 'large' | 'massive';
  };
  resolutionSupport: {
    current: string;
    supports4K: boolean;
    supports8KTechnical: boolean;
    qualityDisclaimer: string;
  };
}

export interface BacklinkCampaign {
  id: string;
  targetDomain: string;
  targetUrl: string;
  topic: string;
  disclaimer: string; // "Planned Link Targets — Not guaranteed placements or guaranteed indexed backlinks"
  plan: {
    youtube1: { forumEmbeds: number; web20Contextual: number; videoSyndication: number; total: number };
    youtube2: { forumEmbeds: number; web20Contextual: number; videoSyndication: number; total: number };
    combined: { forumEmbeds: number; web20Contextual: number; videoSyndication: number; total: number };
  };
  anchorDistribution: {
    branded: { percentage: number; count: number; examples: string[] };
    partialMatch: { percentage: number; count: number; examples: string[] };
    urlAnchor: { percentage: number; count: number; examples: string[] };
    generic: { percentage: number; count: number; examples: string[] };
  };
  typeAnalysis: {
    forumEmbeds: {
      nicheRelevance: string;
      editorialContext: string;
      spamRisk: 'Low' | 'Medium';
      recommendation: string;
    };
    web20: {
      topicRelevance: string;
      contentQuality: string;
      duplicateRisk: 'Low' | 'Medium';
      recommendation: string;
    };
    syndication: {
      legitimatePlatforms: string[];
      canonicalAttribution: string;
      recommendation: string;
    };
  };
  opportunities: {
    id: string;
    platform: string;
    domain: string;
    category: 'Forum Embed' | 'Web 2.0 Contextual' | 'Video Syndication' | 'Authority Blog / Mention';
    relevance: 'Very High' | 'High' | 'Medium';
    authorityMetric: string; // "Estimated / Unavailable"
    spamMetric: string; // "Low Spam Risk (Verified)" or "Not Available"
    anchorRecommendation: string;
    destinationPage: string;
    linkType: 'Contextual In-Content' | 'Platform Embed' | 'Video Source Credit';
    riskNotes: string;
    status: 'Planned Target' | 'In Outreach' | 'Published / Verified';
  }[];
}

export interface MultiPlatformSocialSeo {
  id: string;
  input: {
    type: 'youtube' | 'tiktok' | 'facebook' | 'image' | 'script';
    source: string;
    previewUrl?: string;
    postTitle?: string;
  };
  analysis: {
    topic: string;
    entities: string[];
    audience: string;
    searchIntent: string;
    visualSummary?: string;
    contentTone: string;
  };
  youtube: {
    title: string;
    description: string;
    tags: string[];
    hashtags: string[];
    hook: string;
    thumbnailAdvice: string;
    cta: string;
  };
  tiktok: {
    caption: string;
    hook: string;
    keywords: string[];
    hashtags: string[];
    searchIntentTerms: string[];
    coverText: string;
    cta: string;
    usaAudienceAdvice: string;
    distributionDisclaimer: string;
  };
  facebook: {
    postTitle?: string;
    postCopy: string;
    openingHook: string;
    keywords: string[];
    hashtags: string[];
    cta: string;
    imageVideoContext: string;
    audienceRelevance: string;
  };
  imagePostSeo?: {
    detectedObjects: string[];
    detectedCharacters: string[];
    textInImage: string;
    sceneAndTopic: string;
    visualMessage: string;
    brandElements: string;
    postTitle: string;
    caption: string;
    keywords: string[];
    hashtags: string[];
    cta: string;
    platformSpecificAdvice: string;
  };
}

// ==========================================
// TOONI TV GROWTH SIMULATOR & PLANNER TYPES
// ==========================================

export type TargetPreset = '50k' | '100k' | 'custom';

export interface SimulationAssumptions {
  likeRateMin: number; // e.g. 3 (%)
  likeRateMax: number; // e.g. 8 (%)
  subConversionMin: number; // e.g. 0.5 (%)
  subConversionMax: number; // e.g. 3.0 (%)
  commentRateMin: number; // e.g. 0.1 (%)
  commentRateMax: number; // e.g. 1.0 (%)
  avgViewDurationPercent: number; // e.g. 42 (%)
  ctrAverage: number; // e.g. 5.5 (%)
}

export interface EstimatedMetrics {
  views: number;
  likes: { min: number; max: number; average: number };
  subscribers: { min: number; max: number; average: number };
  comments: { min: number; max: number; average: number };
  watchTimeMinutes: number;
  watchTimeHours: number;
  ctr: number; // e.g. 5.8 (%)
  audienceRetention: number; // e.g. 44 (%)
  engagementRate: number; // e.g. 4.8 (%)
  seoScore: number;
  thumbnailScore: number;
  titleScore: number;
}

export type TrafficCategory = 'ORGANIC' | 'PAID' | 'EXTERNAL';

export interface TrafficSourceItem {
  id: string;
  name: string;
  category: TrafficCategory;
  description: string;
  estimatedTrafficShare: number; // Percentage, e.g. 35 (%)
  estimatedViews: number;
  estimatedCost: number; // $
  ctr: number; // e.g. 6.2 (%)
  conversionRate: number; // e.g. 2.1 (%)
  subscribersGained: number;
  watchTimeHours: number;
  status: 'High Potential' | 'Moderate' | 'Testing Required' | 'Recommended Priority';
}

export interface AdsCampaignConfig {
  budget: number;
  country: string;
  audienceAgeRange: string;
  interest: string;
  videoUrl: string;
  campaignDurationDays: number;
  targetViews: number;
}

export interface AdsCampaignEstimate {
  estimatedReach: number;
  estimatedImpressions: number;
  estimatedViews: number;
  costPerView: number; // $ e.g. 0.015
  estimatedSubscribers: number;
  estimatedWatchTimeHours: number;
  disclaimer: string;
}

export interface WatchTimeCalculation {
  videoType: 'Long Video' | 'Short';
  videoLengthSeconds: number;
  totalViews: number;
  averageViewDurationSeconds: number;
  averagePercentageViewed: number;
  totalMinutesWatched: number;
  totalHoursWatched: number;
  estimatedRetention: number;
  formulaDescription: string;
  benchmarkFeedback: string;
}

export interface SimulationProgressState {
  isRunning: boolean;
  isPaused: boolean;
  isComplete: boolean;
  durationMinutes: number; // 5, 10, 20, 30
  elapsedSeconds: number;
  totalDurationSeconds: number;
  currentViews: number;
  currentLikes: number;
  currentSubscribers: number;
  currentComments: number;
  currentWatchTimeHours: number;
  statusMessage: string;
  speedMultiplier: number; // 1, 5, 20, 60
}

export interface GrowthHistoryRecord {
  id: string;
  videoUrl: string;
  videoTitle: string;
  channelName: string;
  date: string;
  currentViews: number;
  targetViews: number;
  remainingViews: number;
  seoScore: number;
  thumbnailScore: number;
  targetPreset: TargetPreset;
  forecastLikes: number;
  forecastSubscribers: number;
  forecastComments: number;
  forecastWatchHours: number;
  keyTrafficSource: string;
}

export interface AppSimulatorSettings {
  assumptions: SimulationAssumptions;
  defaultTimerMinutes: number;
  animationSpeed: 'normal' | 'fast' | 'instant';
  currency: string;
  theme: 'dark' | 'midnight';
}

