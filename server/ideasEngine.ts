import { USAIdeaItem, USAContentStrategy } from '../src/types';

export function generateUSAIdeas(topic: string, category = "Animation / Cartoons"): {
  longForm: USAIdeaItem[];
  shorts: USAIdeaItem[];
  followUp: USAIdeaItem[];
  strategy: USAContentStrategy;
} {
  const clean = topic.replace(/[^\w\s-]/g, '').trim() || "Kids Animation";

  // 10 Long-form video ideas
  const longForm: USAIdeaItem[] = [
    {
      id: "lf-1",
      title: `The Ultimate ${clean} Guide for Beginners (2025 Edition)`,
      topic: clean,
      primaryKeyword: `${clean} for beginners`,
      viewerIntent: "High Intent Education / Search Evergreen",
      whyRelevant: "Captures steady, year-round search volume in the USA from parents, educators, or creators looking for definitive starting advice.",
      suggestedHook: `If I had to start in ${clean} today with zero experience, this is the exact 4-step framework I would follow.`,
      suggestedThumbnailConcept: "Close-up reaction holding a step-by-step checklist with gold ribbon badge.",
      format: "long-form"
    },
    {
      id: "lf-2",
      title: `5 Major Mistakes Everyone Makes in ${clean} (And How to Fix Them)`,
      topic: clean,
      primaryKeyword: `${clean} mistakes`,
      viewerIntent: "Problem Solver / Curiosity",
      whyRelevant: "Taps into loss-aversion; viewers in the USA actively search to avoid wasting time or effort on common traps.",
      suggestedHook: "90% of beginners make this exact error in the first 2 minutes, and it ruins their entire result.",
      suggestedThumbnailConcept: "Bold red cross over a messy setup next to a glowing green checkmark on the clean setup.",
      format: "long-form"
    },
    {
      id: "lf-3",
      title: `I Tested the Top 3 ${clean} Methods So You Don't Have To`,
      topic: clean,
      primaryKeyword: `best ${clean} review`,
      viewerIntent: "Commercial / Comparison",
      whyRelevant: "High search intent before buying or investing time; American consumers love direct comparative benchmarks.",
      suggestedHook: "Two of these popular methods were a complete waste of time. Only one actually delivered what it promised.",
      suggestedThumbnailConcept: "Tier list graphic ranking 3 approaches with blurred #1 reveal.",
      format: "long-form"
    },
    {
      id: "lf-4",
      title: `How to Master ${clean} in Under 10 Minutes (Step-by-Step)`,
      topic: clean,
      primaryKeyword: `fast ${clean} tutorial`,
      viewerIntent: "Time-Sensitive Tutorial",
      whyRelevant: "Appeals to high-demand mobile viewers who want fast, zero-fluff explanations with instant takeaway value.",
      suggestedHook: "In the next 9 minutes, you will learn the exact blueprint that normally takes weeks to figure out.",
      suggestedThumbnailConcept: "Stopwatch set to 10:00 with electric neon accents.",
      format: "long-form"
    },
    {
      id: "lf-5",
      title: `The Secret Behind Viral ${clean} Episodes (Full Breakdown)`,
      topic: clean,
      primaryKeyword: `viral ${clean} strategy`,
      viewerIntent: "Curiosity / Insider Knowledge",
      whyRelevant: "High click appeal for entertainment and creator audiences interested in audience psychology.",
      suggestedHook: "There is one specific pattern in every viral episode that almost nobody notices until it is pointed out.",
      suggestedThumbnailConcept: "Analytics graph surging upward with magnifying glass over the spike.",
      format: "long-form"
    },
    {
      id: "lf-6",
      title: `Top 10 ${clean} Hacks You Wish You Knew Sooner`,
      topic: clean,
      primaryKeyword: `${clean} tips and tricks`,
      viewerIntent: "Listicle / Value Density",
      whyRelevant: "Listicle formats have proven browse CTR on YouTube USA, driving high initial session duration.",
      suggestedHook: "Number 7 on this list will completely change how you approach your daily routine.",
      suggestedThumbnailConcept: "Bulb icon illuminating a dramatic character face with 'HACK #7' badge.",
      format: "long-form"
    },
    {
      id: "lf-7",
      title: `Day in the Life: Creating an Entire ${clean} from Scratch`,
      topic: clean,
      primaryKeyword: `making ${clean} behind the scenes`,
      viewerIntent: "Story / Entertainment / Empathy",
      whyRelevant: "Builds deep subscriber affinity and personal brand loyalty for Tooni TV and creator channels.",
      suggestedHook: "It is 6 AM, and I have exactly 12 hours to finish this entire episode before the deadline.",
      suggestedThumbnailConcept: "Split frame showing morning coffee on left and rendered screen on right.",
      format: "long-form"
    },
    {
      id: "lf-8",
      title: `${clean} Without Expensive Equipment: The Budget Blueprint`,
      topic: clean,
      primaryKeyword: `free ${clean} tools`,
      viewerIntent: "Accessible Education / Resource Search",
      whyRelevant: "Huge search query volume across USA students, budget-conscious creators, and hobbyists.",
      suggestedHook: "You do not need thousands of dollars in gear to make this look broadcast-level.",
      suggestedThumbnailConcept: "$0 price tag next to professional character illustration.",
      format: "long-form"
    },
    {
      id: "lf-9",
      title: `Why Traditional ${clean} Is Changing in 2025/2026`,
      topic: clean,
      primaryKeyword: `future of ${clean}`,
      viewerIntent: "Industry Trends / Thought Leadership",
      whyRelevant: "Positions your channel as the go-to authority that anticipates algorithm and audience shifts.",
      suggestedHook: "Recent platform updates have changed the rules. If you do this the old way, your reach will suffer.",
      suggestedThumbnailConcept: "Futuristic timeline graphic pointing toward 2026.",
      format: "long-form"
    },
    {
      id: "lf-10",
      title: `Complete ${clean} Masterclass (Zero to Expert)`,
      topic: clean,
      primaryKeyword: `${clean} masterclass`,
      viewerIntent: "Definitive Authority / Long Watch-Time",
      whyRelevant: "High average view duration asset that signals authority to YouTube's recommendation system.",
      suggestedHook: "This is everything I have learned over the last 3 years condensed into one definitive guide.",
      suggestedThumbnailConcept: "Gold stamp seal with 'FULL MASTERCLASS' header.",
      format: "long-form"
    }
  ];

  // 10 Shorts Ideas
  const shorts: USAIdeaItem[] = [
    {
      id: "sh-1",
      title: `Never Make THIS Mistake in ${clean}!`,
      topic: clean,
      primaryKeyword: `${clean} shorts tip`,
      viewerIntent: "Fast Stop-Scroll Friction",
      whyRelevant: "Instant retention grab on the Shorts feed.",
      suggestedHook: "Stop doing this right now if you want better results!",
      suggestedThumbnailConcept: "Expressive shock reaction with red emergency buzzer icon.",
      format: "shorts"
    },
    {
      id: "sh-2",
      title: `The 3-Second ${clean} Hack You Need`,
      topic: clean,
      primaryKeyword: `3 second ${clean} hack`,
      viewerIntent: "Quick Curiosity Payoff",
      whyRelevant: "Super short, loops cleanly for over 100% average percentage viewed.",
      suggestedHook: "Here is a 3-second tweak that changes everything.",
      suggestedThumbnailConcept: "Fast zoom cut on a toggle switch.",
      format: "shorts"
    },
    {
      id: "sh-3",
      title: `Did You Know THIS About ${clean}?`,
      topic: clean,
      primaryKeyword: `${clean} fun fact`,
      viewerIntent: "Trivia & Delight",
      whyRelevant: "Viral casual discovery format suitable for kids, parents, and general fans.",
      suggestedHook: "99% of people miss this hidden detail!",
      suggestedThumbnailConcept: "Glowing question mark over a character's secret prop.",
      format: "shorts"
    },
    {
      id: "sh-4",
      title: `Beginner vs Pro ${clean} in 15 Seconds`,
      topic: clean,
      primaryKeyword: `beginner vs pro ${clean}`,
      viewerIntent: "Instant Visual Comparison",
      whyRelevant: "Extremely popular contrast dynamic that keeps eyes glued to the screen.",
      suggestedHook: "Beginner level versus Pro level... see the difference?",
      suggestedThumbnailConcept: "Vertical split showing amateur sketch vs polished render.",
      format: "shorts"
    },
    {
      id: "sh-5",
      title: `The Secret Animation Trick Nobody Shows You`,
      topic: clean,
      primaryKeyword: `animation secret trick`,
      viewerIntent: "Behind The Scenes Curiosity",
      whyRelevant: "Satisfying animation process videos have immense cross-audience appeal.",
      suggestedHook: "Animators do not want you to know how easy this actually is.",
      suggestedThumbnailConcept: "Stylus pen hitting a glowing tablet screen.",
      format: "shorts"
    },
    {
      id: "sh-6",
      title: `How Long Does It REALLY Take to Make ${clean}?`,
      topic: clean,
      primaryKeyword: `how long to make ${clean}`,
      viewerIntent: "Time Expectation Reality Check",
      whyRelevant: "High engagement in the comments section with viewers sharing their own estimates.",
      suggestedHook: "You think this takes 5 minutes? Watch what happens across 20 hours.",
      suggestedThumbnailConcept: "Timelapse counter speeding from 0h to 24h.",
      format: "shorts"
    },
    {
      id: "sh-7",
      title: `3 Free Tools for ${clean} (Save This)`,
      topic: clean,
      primaryKeyword: `free tools for ${clean}`,
      viewerIntent: "High Save & Share Utility",
      whyRelevant: "Generates high algorithmic bookmarks and shares on YouTube Shorts.",
      suggestedHook: "Bookmark this video because these 3 free tools are game-changers.",
      suggestedThumbnailConcept: "Tool logos floating around a glowing laptop screen.",
      format: "shorts"
    },
    {
      id: "sh-8",
      title: `When Your ${clean} Project Goes Wrong`,
      topic: clean,
      primaryKeyword: `funny ${clean} blooper`,
      viewerIntent: "Humor & Relatability",
      whyRelevant: "Lighthearted comedy hooks viewers instantly and reduces bounce rate.",
      suggestedHook: "Everything was going great until minute 3...",
      suggestedThumbnailConcept: "Hilarious character glitch / blooper expression.",
      format: "shorts"
    },
    {
      id: "sh-9",
      title: `Try This 10-Second Test on Your ${clean}`,
      topic: clean,
      primaryKeyword: `${clean} test`,
      viewerIntent: "Interactive Viewer Action",
      whyRelevant: "Prompts viewers to pause or try the action on their own devices.",
      suggestedHook: "Pause the video and check if your setup has this one feature.",
      suggestedThumbnailConcept: "Interactive checklist with tapping finger icon.",
      format: "shorts"
    },
    {
      id: "sh-10",
      title: `What Happens If You Push ${clean} to the Limit?`,
      topic: clean,
      primaryKeyword: `extreme ${clean} test`,
      viewerIntent: "Extreme Challenge / Curiosity",
      whyRelevant: "High curiosity payoff that drives immediate completion rate.",
      suggestedHook: "We pushed this system until it broke, and the result was insane.",
      suggestedThumbnailConcept: "Overheating smoke visual with warning sign.",
      format: "shorts"
    }
  ];

  // 10 Follow-up ideas
  const followUp: USAIdeaItem[] = [
    {
      id: "fu-1",
      title: `${clean} Part 2: Advanced Techniques You Can Use Today`,
      topic: clean,
      primaryKeyword: `advanced ${clean}`,
      viewerIntent: "Continuity / Progression",
      whyRelevant: "Provides natural end-screen click-through from the first video.",
      suggestedHook: "Now that you have the foundation down, let us unlock the pro-tier methods.",
      suggestedThumbnailConcept: "Level 2 unlock graphic with glowing key.",
      format: "follow-up"
    },
    {
      id: "fu-2",
      title: `I Answered Your Top 10 Questions About ${clean}`,
      topic: clean,
      primaryKeyword: `${clean} Q&A`,
      viewerIntent: "Community Engagement & Clarification",
      whyRelevant: "Directly rewards engaged comment contributors and solves specific roadblocks.",
      suggestedHook: "You asked hundreds of questions on the last video. Here are the top 10 answers.",
      suggestedThumbnailConcept: "Speech bubble with real viewer comment screenshots.",
      format: "follow-up"
    },
    {
      id: "fu-3",
      title: `What Happened 30 Days After Implementing ${clean}?`,
      topic: clean,
      primaryKeyword: `${clean} 30 day results`,
      viewerIntent: "Proof & Outcome Validation",
      whyRelevant: "Follow-up case studies generate immense trust and long-term watch time.",
      suggestedHook: "30 days ago we made one major change. Here are the actual numbers.",
      suggestedThumbnailConcept: "30-day calendar progression leading to verified checkmark.",
      format: "follow-up"
    },
    {
      id: "fu-4",
      title: `Reviewing Subscriber ${clean} Projects (Honest Feedback)`,
      topic: clean,
      primaryKeyword: `reviewing subscriber ${clean}`,
      viewerIntent: "Community / Critique",
      whyRelevant: "Drives massive submission engagement in Discord and community posts.",
      suggestedHook: "You sent in your work, and today I am giving my honest feedback.",
      suggestedThumbnailConcept: "Grading stamp with 'A+' and 'B' marks on project stills.",
      format: "follow-up"
    },
    {
      id: "fu-5",
      title: `The Complete ${clean} Resource Library (Free Download)`,
      topic: clean,
      primaryKeyword: `free ${clean} resources`,
      viewerIntent: "Resource Acquisition",
      whyRelevant: "High share and save value, ideal companion to pin across your channel.",
      suggestedHook: "I spent the weekend organizing every single asset into one free folder.",
      suggestedThumbnailConcept: "Folder icon overflowing with colorful templates and icons.",
      format: "follow-up"
    },
    {
      id: "fu-6",
      title: `5 Things I Learned After 100 Episodes of ${clean}`,
      topic: clean,
      primaryKeyword: `lessons from ${clean}`,
      viewerIntent: "Reflection / Wisdom",
      whyRelevant: "Deepens authority and celebrates channel milestones with the community.",
      suggestedHook: "If I could send a message back to myself before episode 1, here is what I would say.",
      suggestedThumbnailConcept: "Milestone '100' balloon with warm celebratory backdrop.",
      format: "follow-up"
    },
    {
      id: "fu-7",
      title: `Can You Create ${clean} Using ONLY A Smartphone?`,
      topic: clean,
      primaryKeyword: `${clean} on phone`,
      viewerIntent: "Extreme Accessibility Challenge",
      whyRelevant: "Proves that expensive equipment is not required, opening the top of your funnel.",
      suggestedHook: "No computer, no fancy mic—just a regular smartphone. Let us see if it works.",
      suggestedThumbnailConcept: "Holding up an iPhone displaying a finished high-res scene.",
      format: "follow-up"
    },
    {
      id: "fu-8",
      title: `${clean} Speedrun: Start to Finish in 60 Minutes`,
      topic: clean,
      primaryKeyword: `${clean} speedrun`,
      viewerIntent: "Adrenaline & Entertainment",
      whyRelevant: "Fast-paced editing keeps retention exceptionally high throughout the video.",
      suggestedHook: "The timer is set to 60 minutes. If I do not finish, this video deletes itself.",
      suggestedThumbnailConcept: "Sweating character looking at digital clock reading 59:59.",
      format: "follow-up"
    },
    {
      id: "fu-9",
      title: `Fixing The Worst ${clean} Pitfalls with Easy Solutions`,
      topic: clean,
      primaryKeyword: `fix ${clean} problems`,
      viewerIntent: "Troubleshooting",
      whyRelevant: "Captures long-tail search queries when creators hit specific technical hurdles.",
      suggestedHook: "If your render is lagging or your colors look washed out, do this right now.",
      suggestedThumbnailConcept: "Wrench tightening a broken cog on screen.",
      format: "follow-up"
    },
    {
      id: "fu-10",
      title: `The Next Evolution of ${clean}: What is Coming Next?`,
      topic: clean,
      primaryKeyword: `future of ${clean}`,
      viewerIntent: "Future Vision / Roadmapping",
      whyRelevant: "Keeps viewers subscribed and anticipating the next season of content.",
      suggestedHook: "Here is a sneak peek at the new style we have been secretly testing.",
      suggestedThumbnailConcept: "Silhouette with glowing eyes and 'REVEAL' banner.",
      format: "follow-up"
    }
  ];

  // USA Content Strategy
  const strategy: USAContentStrategy = {
    nextVideoRecommendation: `Create "${longForm[0].title}" as your core evergreen search anchor to build sustainable traffic for the next 12 months.`,
    followUpVideos: [
      `Publish "${followUp[0].title}" within 14 days and link it in the end screen and pinned comment of video #1.`,
      `Release "${followUp[2].title}" after 30 days to provide social proof and update the original audience.`
    ],
    shortsFromLongForm: [
      `Clip the 5-second hook and the core "mistake" moment into "${shorts[0].title}".`,
      `Create a standalone 15-second visual contrast comparing beginner vs pro output using "${shorts[3].title}".`
    ],
    seriesConcepts: [
      `"The ${clean} Blueprint Series" (5-part episodic playlist with consistent thumbnail framing)`,
      `"Tooni TV Animated Shorts Hour" (Bite-sized daily animated stories for family audiences)`
    ],
    topicClusters: [
      "Beginner Fundamentals & Free Tools",
      "Character Design & Storytelling Nuance",
      "Algorithm CTR & Packaging Masterclasses"
    ],
    seasonalOpportunities: [
      "Back-to-School Learning & Morning Routine Themes (August - September)",
      "Holiday Family Specials & Winter Animations (November - December)",
      "New Year 2026 Skill Building Challenges (January)"
    ],
    audienceInterestThemes: [
      "Family-safe comedy and wholesome entertainment",
      "Clear, easy-to-follow instructions with no filler",
      "Visually engaging characters with memorable personalities"
    ]
  };

  return {
    longForm,
    shorts,
    followUp,
    strategy
  };
}
