import { USAKeywordPackage, KeywordItem } from '../src/types';

export function buildUSAKeywordPackage(topic: string, currentTitle = ""): USAKeywordPackage {
  const clean = topic.replace(/[^\w\s-]/g, '').trim() || "YouTube Video";

  const primary: KeywordItem[] = [
    {
      keyword: `${clean} tutorial 2025`,
      searchVolume: "Very High",
      competition: "Medium",
      relevance: 99,
      type: "primary",
      intent: "Tutorial"
    }
  ];

  const secondary: KeywordItem[] = [
    { keyword: `how to master ${clean}`, searchVolume: "High", competition: "Low", relevance: 96, type: "secondary", intent: "Informational" },
    { keyword: `best ${clean} guide`, searchVolume: "High", competition: "Medium", relevance: 94, type: "secondary", intent: "Tutorial" },
    { keyword: `${clean} step by step`, searchVolume: "Medium", competition: "Low", relevance: 93, type: "secondary", intent: "Tutorial" },
    { keyword: `${clean} for beginners`, searchVolume: "High", competition: "Low", relevance: 95, type: "secondary", intent: "Informational" }
  ];

  const longTail: KeywordItem[] = [
    { keyword: `how to do ${clean} without mistakes`, searchVolume: "Medium", competition: "Low", relevance: 91, type: "long-tail", intent: "Tutorial" },
    { keyword: `fastest way to learn ${clean} on youtube`, searchVolume: "Medium", competition: "Low", relevance: 90, type: "long-tail", intent: "Informational" },
    { keyword: `${clean} full course free 2025`, searchVolume: "Low", competition: "Low", relevance: 88, type: "long-tail", intent: "Tutorial" },
    { keyword: `what is the easiest way to optimize ${clean}`, searchVolume: "Medium", competition: "Low", relevance: 89, type: "long-tail", intent: "Informational" },
    { keyword: `top 5 secrets for ${clean}`, searchVolume: "Medium", competition: "Low", relevance: 87, type: "long-tail", intent: "Commercial" }
  ];

  const questions: KeywordItem[] = [
    { keyword: `why is my ${clean} not getting views?`, searchVolume: "High", competition: "Low", relevance: 97, type: "question", intent: "Informational" },
    { keyword: `how does ${clean} work on youtube?`, searchVolume: "High", competition: "Low", relevance: 95, type: "question", intent: "Informational" },
    { keyword: `is ${clean} worth it in 2025?`, searchVolume: "Medium", competition: "Low", relevance: 92, type: "question", intent: "Commercial" },
    { keyword: `how to make viral ${clean}?`, searchVolume: "High", competition: "Medium", relevance: 94, type: "question", intent: "Tutorial" }
  ];

  const related: KeywordItem[] = [
    { keyword: `${clean} algorithm strategy`, searchVolume: "High", competition: "Medium", relevance: 91, type: "related", intent: "Informational" },
    { keyword: `${clean} click through rate tips`, searchVolume: "Medium", competition: "Low", relevance: 89, type: "related", intent: "Tutorial" },
    { keyword: `${clean} audience retention guide`, searchVolume: "Medium", competition: "Low", relevance: 90, type: "related", intent: "Informational" }
  ];

  const topicItems: KeywordItem[] = [
    { keyword: `${clean} animation series`, searchVolume: "High", competition: "Medium", relevance: 93, type: "topic", intent: "Entertainment" },
    { keyword: `${clean} tooni tv episode`, searchVolume: "High", competition: "Low", relevance: 92, type: "topic", intent: "Entertainment" },
    { keyword: `${clean} funny moments for kids`, searchVolume: "Very High", competition: "Medium", relevance: 95, type: "topic", intent: "Entertainment" }
  ];

  const all20 = [
    ...primary.map(k => k.keyword),
    ...secondary.map(k => k.keyword),
    ...longTail.map(k => k.keyword),
    ...questions.map(k => k.keyword),
    ...related.map(k => k.keyword),
    ...topicItems.map(k => k.keyword)
  ].slice(0, 20);

  // Keyword gaps: words in top competitor searches but missing from current title
  const titleLower = currentTitle.toLowerCase();
  const candidateGaps = [
    `${clean} blueprint`,
    "step-by-step",
    "2025 guide",
    "stop doing this",
    "easy tutorial",
    "animation breakdown",
    "kids cartoon",
    "funny reaction"
  ];
  const keywordGaps = candidateGaps.filter(gap => !titleLower.includes(gap.toLowerCase())).slice(0, 5);

  return {
    primary,
    secondary,
    longTail,
    questions,
    related,
    topic: topicItems,
    all20,
    keywordGaps
  };
}
