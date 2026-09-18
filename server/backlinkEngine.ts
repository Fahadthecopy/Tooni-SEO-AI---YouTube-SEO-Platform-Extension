import { BacklinkCampaign } from '../src/types';

/**
 * Backlink Strategy & Planning Engine
 * Strictly enforces transparent labeling: Planned targets rather than guaranteed ranking signals.
 */
export function generateBacklinkCampaign(
  targetUrl: string,
  topic = 'English Cartoon Animation',
  brandName = 'Tooni TV'
): BacklinkCampaign {
  const cleanUrl = targetUrl || 'https://www.youtube.com/watch?v=sample-video';
  const cleanTopic = topic || 'English Cartoon Adventures';

  const plan = {
    youtube1: {
      forumEmbeds: 75,
      web20Contextual: 75,
      videoSyndication: 50,
      total: 200
    },
    youtube2: {
      forumEmbeds: 75,
      web20Contextual: 75,
      videoSyndication: 50,
      total: 200
    },
    combined: {
      forumEmbeds: 150,
      web20Contextual: 150,
      videoSyndication: 100,
      total: 400
    }
  };

  const anchorDistribution = {
    branded: {
      percentage: 40,
      count: 160,
      examples: [`${brandName}`, `${brandName} Animation`, `${brandName} Official Channel`, `Tooni Cartoon Studio`]
    },
    partialMatch: {
      percentage: 30,
      count: 120,
      examples: [`watch this ${cleanTopic}`, `funny animated cartoon on ${brandName}`, `new episode of ${cleanTopic}`]
    },
    urlAnchor: {
      percentage: 20,
      count: 80,
      examples: [cleanUrl, cleanUrl.replace('https://www.', '').split('?')[0]]
    },
    generic: {
      percentage: 10,
      count: 40,
      examples: ['watch video', 'source link', 'click here for full episode', 'official premiere']
    }
  };

  const typeAnalysis = {
    forumEmbeds: {
      nicheRelevance: 'Target animation enthusiast threads, family entertainment boards, and digital art forums.',
      editorialContext: 'Embed video only inside active discussion replies offering helpful context, not standalone empty threads.',
      spamRisk: 'Low' as const,
      recommendation: 'Strictly limit to 2-3 genuine contextual contributions per community account per week. Never use automated blast scripts.'
    },
    web20: {
      topicRelevance: 'High — Craft original 500-word supplementary companion articles detailing character lore and moral themes.',
      contentQuality: 'Ensure editorial depth with unique screenshots and natural embedding. Avoid duplicated automated spin text.',
      duplicateRisk: 'Low' as const,
      recommendation: 'Use Medium, Substack, Blogger, and WordPress.com for long-form canonical companion guides.'
    },
    syndication: {
      legitimatePlatforms: ['Vimeo Portfolio', 'Dailymotion Partner Showcase', 'Internet Archive Creative Works', 'Pinterest Video Pins'],
      canonicalAttribution: 'Always link back to the primary YouTube canonical watch URL in video descriptions and credit notes.',
      recommendation: 'Syndicate exclusively to platforms that support proper source attribution and embed permissions.'
    }
  };

  const opportunities: BacklinkCampaign['opportunities'] = [
    {
      id: 'bl-1',
      platform: 'Reddit (r/Animation & r/FamilyEntertainment)',
      domain: 'reddit.com',
      category: 'Forum Embed',
      relevance: 'Very High',
      authorityMetric: 'Not Available (Third-party metric withheld to avoid inaccuracy)',
      spamMetric: 'Low Spam Risk (Editorial Community Moderation)',
      anchorRecommendation: `r/Animation discussion on ${cleanTopic}`,
      destinationPage: cleanUrl,
      linkType: 'Platform Embed',
      riskNotes: 'Do not spam self-promotional links; participate in weekly creator critique threads.',
      status: 'Planned Target'
    },
    {
      id: 'bl-2',
      platform: 'Medium Animation Stories Publication',
      domain: 'medium.com',
      category: 'Web 2.0 Contextual',
      relevance: 'High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (Clean Editorial Domain)',
      anchorRecommendation: `${brandName} Animation Showcase`,
      destinationPage: cleanUrl,
      linkType: 'Contextual In-Content',
      riskNotes: 'Publish 600-word character design breakdown with native YouTube iframe embed.',
      status: 'Planned Target'
    },
    {
      id: 'bl-3',
      platform: 'Pinterest Family Cartoon Boards',
      domain: 'pinterest.com',
      category: 'Video Syndication',
      relevance: 'Very High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (Verified Social Platform)',
      anchorRecommendation: `Watch Full Episode: ${cleanTopic}`,
      destinationPage: cleanUrl,
      linkType: 'Video Source Credit',
      riskNotes: 'Pin vertical teaser clip linking directly to primary video URL.',
      status: 'Planned Target'
    },
    {
      id: 'bl-4',
      platform: 'Blogger / Blogspot Animation Hub',
      domain: 'blogspot.com',
      category: 'Web 2.0 Contextual',
      relevance: 'High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (Self-Managed Editorial)',
      anchorRecommendation: `official ${brandName} video`,
      destinationPage: cleanUrl,
      linkType: 'Contextual In-Content',
      riskNotes: 'Include episode synopsis and behind-the-scenes character sketches.',
      status: 'Planned Target'
    },
    {
      id: 'bl-5',
      platform: 'Newgrounds Animation Portal',
      domain: 'newgrounds.com',
      category: 'Video Syndication',
      relevance: 'High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (Artist Community)',
      anchorRecommendation: `${brandName}`,
      destinationPage: cleanUrl,
      linkType: 'Video Source Credit',
      riskNotes: 'Respect community guidelines regarding original animation author verification.',
      status: 'Planned Target'
    },
    {
      id: 'bl-6',
      platform: 'Quora (Questions on "Best English Cartoons for Kids")',
      domain: 'quora.com',
      category: 'Forum Embed',
      relevance: 'High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (High Moderation)',
      anchorRecommendation: `episode on ${cleanTopic}`,
      destinationPage: cleanUrl,
      linkType: 'Contextual In-Content',
      riskNotes: 'Provide a genuine 200-word answer reviewing cartoon recommendations with video as example.',
      status: 'Planned Target'
    },
    {
      id: 'bl-7',
      platform: 'Substack Newsletter for Family Storytelling',
      domain: 'substack.com',
      category: 'Web 2.0 Contextual',
      relevance: 'High',
      authorityMetric: 'Estimated / Unavailable',
      spamMetric: 'Low Spam Risk (Subscriber Editorial)',
      anchorRecommendation: `Tooni TV animation series`,
      destinationPage: cleanUrl,
      linkType: 'Contextual In-Content',
      riskNotes: 'Sent as weekly recap issue with playable video embed.',
      status: 'Planned Target'
    }
  ];

  return {
    id: `campaign-${Date.now()}`,
    targetDomain: 'youtube.com',
    targetUrl: cleanUrl,
    topic: cleanTopic,
    disclaimer: 'Planned Link Targets — Not guaranteed placements or guaranteed indexed backlinks. Focus on high-relevance contextual citations over automated link volume.',
    plan,
    anchorDistribution,
    typeAnalysis,
    opportunities
  };
}
