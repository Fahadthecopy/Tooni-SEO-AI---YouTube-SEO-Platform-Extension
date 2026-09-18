import { CompetitorIntelligence, CompetitorVideo } from '../src/types';

export function buildCompetitorIntelligence(topic: string): CompetitorIntelligence {
  const clean = topic.replace(/[^\w\s-]/g, '').trim() || "YouTube Video";

  const competitors: CompetitorVideo[] = [
    {
      id: "comp-1",
      title: `I Optimized 50 Videos on ${clean} (Shocking 30-Day Results)`,
      channel: "TubeMaster Pro",
      views: "428K views",
      likes: "18.4K likes",
      comments: "1.2K comments",
      daysAgo: "14 days ago",
      duration: "12:15",
      thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80",
      strengths: ["High curiosity title", "Split-screen before/after thumbnail", "Fast retention hook in first 3 seconds"],
      thumbnailConcept: "Bright split-screen with red arrow pointing from 40% to 98% score"
    },
    {
      id: "comp-2",
      title: `${clean} Secrets Nobody Tells You in 2025`,
      channel: "Channel Architect",
      views: "215K views",
      likes: "9.6K likes",
      comments: "840 comments",
      daysAgo: "22 days ago",
      duration: "09:48",
      thumbnailUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      strengths: ["Exhaustive timestamp chapters", "Front-loaded primary keyword", "Authoritative tone"],
      thumbnailConcept: "Dark theme YouTube Studio analytics curve going exponential"
    },
    {
      id: "comp-3",
      title: `How to Master ${clean} (The Real Algorithm Strategy)`,
      channel: "Creator Hub USA",
      views: "182K views",
      likes: "8.1K likes",
      comments: "520 comments",
      daysAgo: "29 days ago",
      duration: "14:02",
      thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80",
      strengths: ["Clean 3-word thumbnail badge", "High contrast yellow-on-dark text", "Clear step-by-step walkthrough"],
      thumbnailConcept: "Close-up reaction face looking at screen with 'STOP THIS' text"
    },
    {
      id: "comp-4",
      title: `Stop Doing THIS in ${clean}! (Critical Mistake)`,
      channel: "Algorithm Hacker",
      views: "340K views",
      likes: "15.2K likes",
      comments: "980 comments",
      daysAgo: "18 days ago",
      duration: "08:30",
      thumbnailUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
      strengths: ["Loss aversion psychological hook", "Mobile-optimized text badge", "Engaged comment pin"],
      thumbnailConcept: "Large red 'X' over outdated method with warning icon"
    },
    {
      id: "comp-5",
      title: `${clean} Step-by-Step Blueprint for Beginners`,
      channel: "LearnFast Media",
      views: "95K views",
      likes: "4.8K likes",
      comments: "310 comments",
      daysAgo: "35 days ago",
      duration: "16:20",
      thumbnailUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop&q=80",
      strengths: ["Zero-fluff direct intro", "Downloadable template in description", "Pinned comment discussion"],
      thumbnailConcept: "Clean minimalist layout with checklist graphics"
    },
    {
      id: "comp-6",
      title: `The 3-Minute ${clean} Trick That Changed Everything`,
      channel: "QuickGrowth Lab",
      views: "154K views",
      likes: "7.2K likes",
      comments: "440 comments",
      daysAgo: "41 days ago",
      duration: "07:15",
      thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      strengths: ["Brevity promise", "High curiosity factor", "Fast visual editing pace"],
      thumbnailConcept: "Stopwatch visual showing 3 minutes with neon glow"
    },
    {
      id: "comp-7",
      title: `Why Your ${clean} Isn't Ranking (And How to Fix It)`,
      channel: "RankEngine Academy",
      views: "112K views",
      likes: "5.4K likes",
      comments: "360 comments",
      daysAgo: "48 days ago",
      duration: "11:50",
      thumbnailUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
      strengths: ["Problem-first framing", "Actionable audit checklist", "Clear voiceover and graphics"],
      thumbnailConcept: "Search bar ranking dropping from #1 to #10 with red alert"
    },
    {
      id: "comp-8",
      title: `We Tested Every ${clean} Method in 2025`,
      channel: "Growth Experiments",
      views: "278K views",
      likes: "12.3K likes",
      comments: "890 comments",
      daysAgo: "55 days ago",
      duration: "18:10",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      strengths: ["Empirical testing format", "High viewer trust", "Visual comparison charts"],
      thumbnailConcept: "Tier list graphic ranking different approaches"
    },
    {
      id: "comp-9",
      title: `${clean} Case Study: 0 to 100K Views in 30 Days`,
      channel: "Viral Playbook",
      views: "196K views",
      likes: "8.9K likes",
      comments: "610 comments",
      daysAgo: "62 days ago",
      duration: "13:40",
      thumbnailUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
      strengths: ["Concrete proof metric in title", "Story-driven pacing", "Relatable beginner perspective"],
      thumbnailConcept: "Analytics graph with green verified milestone badge"
    },
    {
      id: "comp-10",
      title: `The Ultimate ${clean} Masterclass (Full Course)`,
      channel: "Academy Online",
      views: "310K views",
      likes: "14.1K likes",
      comments: "1.1K comments",
      daysAgo: "70 days ago",
      duration: "28:30",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      strengths: ["Definitive resource perception", "Timestamps for every section", "Resource links"],
      thumbnailConcept: "Gold ribbon badge indicating Complete 2025 Masterclass"
    }
  ];

  return {
    competitors,
    averageViews: "231,000 views",
    averageLikes: "10,400 likes",
    averageComments: "730 comments",
    averageTitleLength: 52,
    commonKeywords: [
      clean.toLowerCase(),
      "2025",
      "secrets",
      "step-by-step",
      "results",
      "algorithm",
      "blueprint",
      "stop doing this",
      "tutorial"
    ],
    keywordGaps: [
      "step-by-step blueprint",
      "stop doing this",
      "30-day results",
      "algorithm strategy",
      "beginner masterclass"
    ],
    contentGaps: [
      "Competitors rarely include downloadable checklists or action templates",
      "Few videos address mobile-first workflow adaptations",
      "Most creators jump straight to intermediate tips without explaining the foundation",
      "Lack of real-time troubleshooting for when things go wrong"
    ],
    contentGap: {
      competitorsCover: [
        `Broad overview and basic definitions of ${clean}`,
        "Standard software demonstrations without real-world edge cases",
        "Generic advice without testing data or metrics"
      ],
      yourVideoMissing: [
        `Direct 5-second problem statement and hook for ${clean}`,
        "2025 algorithm-optimized keywords in description & timestamps",
        "Clear 3-step action roadmap avoiding the top 3 beginner traps"
      ],
      goldenOpportunities: [
        `Create a definitive 2025 beginner blueprint for ${clean}`,
        "Address mobile and beginner friction points competitors ignore",
        "Include actionable timestamps and downloadable resource templates"
      ],
      recommendedAngle: `The "Unspoken Blueprint for ${clean} in 2025" — Target beginner search intent with immediate proof and zero fluff.`
    },
    titlePatterns: [
      "Parenthetical payoff: [Bold Statement] (The 2025 Fix)",
      "Time-bound promise: [Result] in 30 Days",
      "Loss aversion: Stop Doing THIS in [Topic]"
    ],
    thumbnailPatterns: [
      "Split-screen Before vs After comparison",
      "Electric Amber typography (#F59E0B) on navy background",
      "3-word maximum mobile badge placed in top-left or center"
    ]
  };
}
