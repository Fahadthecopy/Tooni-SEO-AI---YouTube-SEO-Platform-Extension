import {
  SimulationAssumptions,
  EstimatedMetrics,
  TrafficSourceItem,
  AdsCampaignConfig,
  AdsCampaignEstimate,
  WatchTimeCalculation,
  GrowthHistoryRecord,
  AppSimulatorSettings,
  VideoData
} from '../types';

export const DEFAULT_ASSUMPTIONS: SimulationAssumptions = {
  likeRateMin: 3.0,
  likeRateMax: 8.0,
  subConversionMin: 0.5,
  subConversionMax: 3.0,
  commentRateMin: 0.1,
  commentRateMax: 1.0,
  avgViewDurationPercent: 42.0,
  ctrAverage: 5.5,
};

export const DEFAULT_SETTINGS: AppSimulatorSettings = {
  assumptions: DEFAULT_ASSUMPTIONS,
  defaultTimerMinutes: 10,
  animationSpeed: 'normal',
  currency: 'USD ($)',
  theme: 'dark'
};

/**
 * Calculates projected performance metrics based on user assumptions and target view goal.
 * Strictly labeled as SIMULATION / ESTIMATE.
 */
export function calculateEstimatedMetrics(
  targetViews: number,
  videoLengthSeconds: number = 480, // default 8 mins
  assumptions: SimulationAssumptions = DEFAULT_ASSUMPTIONS,
  _currentVideo?: VideoData
): EstimatedMetrics {
  const safeViews = Math.max(1, targetViews);
  const safeDuration = Math.max(15, videoLengthSeconds);

  // Likes calculation
  const likeMin = Math.round(safeViews * (assumptions.likeRateMin / 100));
  const likeMax = Math.round(safeViews * (assumptions.likeRateMax / 100));
  const likeAvg = Math.round((likeMin + likeMax) / 2);

  // Subscribers calculation
  const subMin = Math.round(safeViews * (assumptions.subConversionMin / 100));
  const subMax = Math.round(safeViews * (assumptions.subConversionMax / 100));
  const subAvg = Math.round((subMin + subMax) / 2);

  // Comments calculation
  const comMin = Math.round(safeViews * (assumptions.commentRateMin / 100));
  const comMax = Math.round(safeViews * (assumptions.commentRateMax / 100));
  const comAvg = Math.round((comMin + comMax) / 2);

  // Watch Time calculation: Total Views * Average View Duration
  const avgDurationSeconds = safeDuration * (assumptions.avgViewDurationPercent / 100);
  const totalWatchTimeSeconds = safeViews * avgDurationSeconds;
  const watchTimeMinutes = Math.round(totalWatchTimeSeconds / 60);
  const watchTimeHours = Number((watchTimeMinutes / 60).toFixed(1));

  // Engagement Rate = (Likes + Comments + Subs) / Views * 100
  const totalEngagements = likeAvg + comAvg + subAvg;
  const engagementRate = Number(((totalEngagements / safeViews) * 100).toFixed(2));

  return {
    views: safeViews,
    likes: { min: likeMin, max: likeMax, average: likeAvg },
    subscribers: { min: subMin, max: subMax, average: subAvg },
    comments: { min: comMin, max: comMax, average: comAvg },
    watchTimeMinutes,
    watchTimeHours,
    ctr: assumptions.ctrAverage,
    audienceRetention: assumptions.avgViewDurationPercent,
    engagementRate,
    seoScore: 92,
    thumbnailScore: 94,
    titleScore: 95
  };
}

/**
 * Plans legitimate traffic sources across Organic, Paid, and External categories.
 */
export function generateTrafficSourcePlan(
  targetViews: number,
  currentViews: number = 0,
  videoType: 'Long Video' | 'Short' = 'Long Video'
): TrafficSourceItem[] {
  const remaining = Math.max(1000, targetViews - currentViews);

  if (videoType === 'Short') {
    return [
      {
        id: 'shorts-feed',
        name: 'YouTube Shorts Feed',
        category: 'ORGANIC',
        description: 'Primary discovery algorithmic shelf driven by swipe retention and 0-1s hook power.',
        estimatedTrafficShare: 65,
        estimatedViews: Math.round(remaining * 0.65),
        estimatedCost: 0,
        ctr: 12.5, // Swipe rate
        conversionRate: 1.8,
        subscribersGained: Math.round(remaining * 0.65 * 0.018),
        watchTimeHours: Number(((remaining * 0.65 * 38) / 3600).toFixed(1)),
        status: 'Recommended Priority'
      },
      {
        id: 'yt-search',
        name: 'YouTube Search Intent',
        category: 'ORGANIC',
        description: 'Evergreen search traffic matching high-demand keyword tags and title intent.',
        estimatedTrafficShare: 15,
        estimatedViews: Math.round(remaining * 0.15),
        estimatedCost: 0,
        ctr: 7.2,
        conversionRate: 2.4,
        subscribersGained: Math.round(remaining * 0.15 * 0.024),
        watchTimeHours: Number(((remaining * 0.15 * 45) / 3600).toFixed(1)),
        status: 'High Potential'
      },
      {
        id: 'tiktok-reels',
        name: 'Cross-Platform Reels & TikTok',
        category: 'EXTERNAL',
        description: 'Vertical short teaser clips driving profile channel discovery clicks.',
        estimatedTrafficShare: 12,
        estimatedViews: Math.round(remaining * 0.12),
        estimatedCost: 0,
        ctr: 4.8,
        conversionRate: 1.5,
        subscribersGained: Math.round(remaining * 0.12 * 0.015),
        watchTimeHours: Number(((remaining * 0.12 * 35) / 3600).toFixed(1)),
        status: 'Moderate'
      },
      {
        id: 'yt-sound-pages',
        name: 'Sound & Audio Library Pages',
        category: 'ORGANIC',
        description: 'Traffic from users browsing viral background audio or music tracks.',
        estimatedTrafficShare: 8,
        estimatedViews: Math.round(remaining * 0.08),
        estimatedCost: 0,
        ctr: 5.1,
        conversionRate: 1.0,
        subscribersGained: Math.round(remaining * 0.08 * 0.01),
        watchTimeHours: Number(((remaining * 0.08 * 30) / 3600).toFixed(1)),
        status: 'Testing Required'
      }
    ];
  }

  // Long-Form Video Source Distribution
  return [
    {
      id: 'yt-browse',
      name: 'YouTube Browse Features (Homepage & Subscriptions)',
      category: 'ORGANIC',
      description: 'The highest-scale organic traffic source triggered by strong CTR (>6%) and high first-hour retention.',
      estimatedTrafficShare: 35,
      estimatedViews: Math.round(remaining * 0.35),
      estimatedCost: 0,
      ctr: 6.8,
      conversionRate: 1.9,
      subscribersGained: Math.round(remaining * 0.35 * 0.019),
      watchTimeHours: Number(((remaining * 0.35 * 240) / 3600).toFixed(1)),
      status: 'Recommended Priority'
    },
    {
      id: 'yt-suggested',
      name: 'Suggested Videos & Up Next',
      category: 'ORGANIC',
      description: 'Recommended alongside top competitor videos with shared tags and matching viewer sessions.',
      estimatedTrafficShare: 25,
      estimatedViews: Math.round(remaining * 0.25),
      estimatedCost: 0,
      ctr: 5.4,
      conversionRate: 1.7,
      subscribersGained: Math.round(remaining * 0.25 * 0.017),
      watchTimeHours: Number(((remaining * 0.25 * 220) / 3600).toFixed(1)),
      status: 'High Potential'
    },
    {
      id: 'yt-search',
      name: 'YouTube Search (Long-Tail Evergreen)',
      category: 'ORGANIC',
      description: 'High-intent viewers searching exact how-to or tutorial keywords with 90-100 SEO score.',
      estimatedTrafficShare: 20,
      estimatedViews: Math.round(remaining * 0.20),
      estimatedCost: 0,
      ctr: 8.5,
      conversionRate: 2.8,
      subscribersGained: Math.round(remaining * 0.20 * 0.028),
      watchTimeHours: Number(((remaining * 0.20 * 300) / 3600).toFixed(1)),
      status: 'Recommended Priority'
    },
    {
      id: 'google-ads',
      name: 'Google & YouTube In-Feed Discovery Ads',
      category: 'PAID',
      description: 'Targeted in-feed video ads targeted at high-affinity audiences. Real human viewers only.',
      estimatedTrafficShare: 10,
      estimatedViews: Math.round(remaining * 0.10),
      estimatedCost: Math.round(remaining * 0.10 * 0.02), // ~$0.02 CPV
      ctr: 4.2,
      conversionRate: 1.2,
      subscribersGained: Math.round(remaining * 0.10 * 0.012),
      watchTimeHours: Number(((remaining * 0.10 * 180) / 3600).toFixed(1)),
      status: 'Testing Required'
    },
    {
      id: 'external-social',
      name: 'External Socials (Reddit, X, Discord, Facebook)',
      category: 'EXTERNAL',
      description: 'Curated niche communities, subreddits, and relevant Facebook discussion groups.',
      estimatedTrafficShare: 6,
      estimatedViews: Math.round(remaining * 0.06),
      estimatedCost: 0,
      ctr: 3.9,
      conversionRate: 2.2,
      subscribersGained: Math.round(remaining * 0.06 * 0.022),
      watchTimeHours: Number(((remaining * 0.06 * 210) / 3600).toFixed(1)),
      status: 'Moderate'
    },
    {
      id: 'direct-email',
      name: 'Direct, Email Newsletter & Website Embeds',
      category: 'EXTERNAL',
      description: 'Owned audience newsletter dispatch and blog article backlink embedding.',
      estimatedTrafficShare: 4,
      estimatedViews: Math.round(remaining * 0.04),
      estimatedCost: 0,
      ctr: 9.1,
      conversionRate: 4.5,
      subscribersGained: Math.round(remaining * 0.04 * 0.045),
      watchTimeHours: Number(((remaining * 0.04 * 320) / 3600).toFixed(1)),
      status: 'High Potential'
    }
  ];
}

/**
 * Calculates realistic advertising campaign estimates for legitimate Google/YouTube Ads.
 */
export function calculateAdsCampaign(config: AdsCampaignConfig): AdsCampaignEstimate {
  const budget = Math.max(5, config.budget);
  
  // Cost Per View (CPV) benchmark based on country targeting
  let cpv = 0.025; // default tier 1-2 mix
  if (config.country.toLowerCase().includes('united states') || config.country.toLowerCase().includes('usa') || config.country === 'US') {
    cpv = 0.035;
  } else if (config.country.toLowerCase().includes('tier 3') || config.country.toLowerCase().includes('india') || config.country.toLowerCase().includes('global')) {
    cpv = 0.012;
  }

  const estimatedViews = Math.round(budget / cpv);
  const impressionToViewRate = 0.28; // ~28% view rate for Discovery In-Feed ads
  const estimatedImpressions = Math.round(estimatedViews / impressionToViewRate);
  const estimatedReach = Math.round(estimatedImpressions * 0.72);

  // Conversion to subscribers (~1.2% - 2.5% of ad views convert to subs)
  const estimatedSubscribers = Math.round(estimatedViews * 0.018);

  // Estimated Watch Time: average 2.5 minutes per viewer on long-form ad view
  const estimatedWatchTimeMinutes = estimatedViews * 2.5;
  const estimatedWatchTimeHours = Number((estimatedWatchTimeMinutes / 60).toFixed(1));

  return {
    estimatedReach,
    estimatedImpressions,
    estimatedViews,
    costPerView: cpv,
    estimatedSubscribers,
    estimatedWatchTimeHours,
    disclaimer: 'ESTIMATE — ACTUAL RESULTS VARY. Performance is subject to ad auction dynamics, video creative quality, audience bid competition, and viewer preference.'
  };
}

/**
 * Watch Time Calculator logic
 */
export function calculateWatchTimeDetails(
  videoType: 'Long Video' | 'Short',
  videoLengthSeconds: number,
  totalViews: number,
  avdSecondsInput?: number,
  apvPercentInput?: number
): WatchTimeCalculation {
  const safeLength = Math.max(5, videoLengthSeconds);
  const safeViews = Math.max(0, totalViews);

  let avdSeconds = 0;
  let apvPercent = 0;

  if (typeof avdSecondsInput === 'number' && avdSecondsInput > 0) {
    avdSeconds = Math.min(safeLength, avdSecondsInput);
    apvPercent = Number(((avdSeconds / safeLength) * 100).toFixed(1));
  } else if (typeof apvPercentInput === 'number' && apvPercentInput > 0) {
    apvPercent = Math.min(100, apvPercentInput);
    avdSeconds = Math.round((safeLength * apvPercent) / 100);
  } else {
    // Default benchmark
    apvPercent = videoType === 'Short' ? 82 : 45;
    avdSeconds = Math.round((safeLength * apvPercent) / 100);
  }

  const totalMinutes = Math.round((safeViews * avdSeconds) / 60);
  const totalHours = Number((totalMinutes / 60).toFixed(1));

  let benchmark = '';
  if (videoType === 'Short') {
    benchmark = apvPercent >= 85
      ? 'Outstanding Short retention (>85%). High likelihood of persistent Shorts Feed looping.'
      : apvPercent >= 70
      ? 'Good Short retention (70-85%). Improve first 1s hook to break 85%.'
      : 'Below optimal for Shorts (<70%). Short may suffer swipe-aways within 0.4 seconds.';
  } else {
    benchmark = apvPercent >= 50
      ? 'Superior Long-Form retention (>50%). Strong candidate for Browse Homepage recommendations.'
      : apvPercent >= 40
      ? 'Solid algorithmic retention (40-50%). Meets YouTube evergreen recommendation threshold.'
      : 'Moderate retention (<40%). Consider trimming intro and pacing transitions faster.';
  }

  return {
    videoType,
    videoLengthSeconds: safeLength,
    totalViews: safeViews,
    averageViewDurationSeconds: avdSeconds,
    averagePercentageViewed: apvPercent,
    totalMinutesWatched: totalMinutes,
    totalHoursWatched: totalHours,
    estimatedRetention: apvPercent,
    formulaDescription: `Total Watch Time = Views (${safeViews.toLocaleString()}) × Average View Duration (${Math.floor(avdSeconds / 60)}m ${avdSeconds % 60}s) = ${totalHours.toLocaleString()} Hours`,
    benchmarkFeedback: benchmark
  };
}

/**
 * Generate simulated timeline points for Recharts charts
 */
export function generateTimelineForecast(
  targetViews: number,
  currentViews: number = 0,
  timeframe: '1H' | '6H' | '12H' | '24H' | '7D' | '30D' = '24H'
) {
  const stepsMap: Record<string, { count: number; labelPrefix: string }> = {
    '1H': { count: 6, labelPrefix: 'Min' },
    '6H': { count: 6, labelPrefix: 'Hr' },
    '12H': { count: 12, labelPrefix: 'Hr' },
    '24H': { count: 8, labelPrefix: 'Hr' },
    '7D': { count: 7, labelPrefix: 'Day' },
    '30D': { count: 10, labelPrefix: 'Day' },
  };

  const config = stepsMap[timeframe] || stepsMap['24H'];
  const data = [];
  const deltaViews = Math.max(100, targetViews - currentViews);

  for (let i = 0; i <= config.count; i++) {
    const progressFactor = i === 0 ? 0 : Math.pow(i / config.count, 1.25);
    const simulatedViews = Math.round(currentViews + deltaViews * progressFactor);
    const simulatedLikes = Math.round(simulatedViews * 0.055);
    const simulatedSubs = Math.round(simulatedViews * 0.016);
    const simulatedComments = Math.round(simulatedViews * 0.004);
    const simulatedWatchHours = Number(((simulatedViews * 190) / 3600).toFixed(1));

    let label = '';
    if (timeframe === '1H') label = `${i * 10}m`;
    else if (timeframe === '6H') label = `${i}h`;
    else if (timeframe === '12H') label = `${i}h`;
    else if (timeframe === '24H') label = `${i * 3}h`;
    else if (timeframe === '7D') label = `Day ${i === 0 ? 1 : i}`;
    else label = `Day ${i * 3}`;

    data.push({
      time: label,
      views: simulatedViews,
      likes: simulatedLikes,
      subscribers: simulatedSubs,
      comments: simulatedComments,
      watchHours: simulatedWatchHours,
    });
  }

  return data;
}

// LocalStorage Persistence Helpers
const HISTORY_KEY = 'tooni_tv_growth_history';
const SETTINGS_KEY = 'tooni_tv_simulator_settings';

export function loadHistoryRecords(): GrowthHistoryRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading history:', e);
    return [];
  }
}

export function saveHistoryRecord(record: GrowthHistoryRecord): GrowthHistoryRecord[] {
  try {
    const existing = loadHistoryRecords();
    const updated = [record, ...existing.filter((item) => item.id !== record.id)].slice(0, 50);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving history record:', e);
    return [];
  }
}

export function deleteHistoryRecord(id: string): GrowthHistoryRecord[] {
  try {
    const existing = loadHistoryRecords();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (e) {
    console.error('Error deleting history record:', e);
    return [];
  }
}

export function clearAllHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Error clearing history:', e);
  }
}

export function loadSimulatorSettings(): AppSimulatorSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSimulatorSettings(settings: AppSimulatorSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings:', e);
  }
}
