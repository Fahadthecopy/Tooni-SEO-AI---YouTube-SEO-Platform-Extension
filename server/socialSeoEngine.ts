import { MultiPlatformSocialSeo } from '../src/types';

/**
 * Universal AI Content Analyzer & Multi-Platform Social Media SEO Engine
 * Evaluates core content truth and custom-routes to YouTube, TikTok, Facebook, and Image Posts
 */
export function analyzeUniversalSocialSeo(
  input: MultiPlatformSocialSeo['input']
): MultiPlatformSocialSeo {
  const sourceType = input.type;
  const rawSource = (input.source || '').trim();

  // Deduce topic & entities
  let topic = 'Heartwarming English Cartoon Adventure';
  let detectedCharacters = ['Friendly Cartoon Protagonist', 'Little Animal Companion'];
  let detectedObjects = ['Vibrant Forest Background', 'Glowing Treasure Chest', 'Tooni TV Logo'];
  let visualMessage = 'A charming journey emphasizing friendship, courage, and imaginative wonder.';

  if (rawSource.toLowerCase().includes('rabbit') || rawSource.toLowerCase().includes('bunny')) {
    topic = 'The Clever Little Rabbit and the Secret Garden';
    detectedCharacters = ['Clever Little Rabbit', 'Wise Old Owl'];
    detectedObjects = ['Carrot Patch', 'Golden Key', 'Wooden Garden Gate'];
  } else if (rawSource.toLowerCase().includes('dragon')) {
    topic = 'The Friendly Dragon Who Loved Flying';
    detectedCharacters = ['Baby Emerald Dragon', 'Curious Village Kid'];
    detectedObjects = ['Fluffy Clouds', 'Mountain Peak', 'Sparkling Stars'];
  } else if (rawSource.toLowerCase().includes('race') || rawSource.toLowerCase().includes('car')) {
    topic = 'Animal Grand Prix Cartoon Championship';
    detectedCharacters = ['Speedy Cheetah Racer', 'Bear Mechanic'];
    detectedObjects = ['Checkered Flag', 'Turbo Go-Kart', 'Racing Track'];
  } else if (input.postTitle) {
    topic = input.postTitle;
  }

  const entities = [
    topic,
    'Family Safe Entertainment',
    'Tooni TV Original Animation',
    'USA Kids & Animation Enthusiasts',
    'High-Retention Visual Storytelling'
  ];

  // 1. YouTube Packaging
  const youtube = {
    title: `${topic} (Official 4K Cartoon Episode)`,
    description: `Welcome to Tooni TV! In today's brand new animated episode, join our beloved characters in "${topic}". Crafted with love for American families and young imagination explorers.\n\n✨ Watch how teamwork overcomes the greatest hurdles!\n\n🔔 Subscribe to Tooni TV for weekly animated adventures: https://youtube.com/@TooniTV\n\n#CartoonAdventures #TooniTV #EnglishCartoons #FamilyAnimation #KidsStories`,
    tags: [
      topic,
      'english cartoon',
      'tooni tv animation',
      'funny animal cartoon',
      'cartoons for american kids',
      'bedtime animated stories',
      '4k cartoon episode',
      'safe family entertainment'
    ],
    hashtags: ['#TooniTV', '#CartoonAdventures', '#FamilyAnimation', '#KidsCartoons', '#4KAnimation'],
    hook: `Stop the initial scroll by cutting to the character's reaction face in frame 1, asking: "Where did that map come from?"`,
    thumbnailAdvice: 'High contrast warm yellow/teal palette with wide-eyed expressive character looking at camera.',
    cta: 'Subscribe to Tooni TV for new weekly cartoon premieres!'
  };

  // 2. TikTok Packaging (Native TikTok pacing & voice)
  const tiktok = {
    caption: `POV: You thought it was an ordinary day until this happened 😭✨ What would you do? Tell me in the comments! 👇`,
    hook: `"Stop scrolling if you love wholesome cartoons... wait till the end!" (Instant visual movement in seconds 0-1)`,
    keywords: [
      'cartoon animation',
      'wholesome moments',
      'tooni tv',
      'funny animated clip',
      'kids cartoon aesthetic'
    ],
    hashtags: ['#cartoontiktok', '#animation', '#wholesome', '#tooni', '#fyp', '#viralcartoon', '#parentsoftiktok'],
    searchIntentTerms: ['funny cartoon moments 2025', 'best animated short clips', 'cute animal animation'],
    coverText: `WAIT FOR IT... 😱`,
    cta: 'Follow @TooniTV for daily animated smiles & part 2!',
    usaAudienceAdvice: 'TikTok US algorithm prioritizes immediate text overlays and relatable captions over corporate promos.',
    distributionDisclaimer: 'Controllable factors (hooks, trending tags, watch-time pacing) are optimized. Actual video reach and impressions depend on TikTok algorithmic curation and real audience retention.'
  };

  // 3. Facebook Packaging (Conversational community & family voice)
  const facebook = {
    postTitle: `A Heartwarming Adventure for Family Movie Night! 🍿✨`,
    postCopy: `Parents & cartoon lovers: If you're looking for a delightful, wholesome animated story that teaches teamwork and brings genuine laughter, this new episode of "${topic}" is pure joy!\n\nTag a friend who loves feel-good animations and let us know your favorite character moment in the comments below! 👇❤️\n\n📺 Watch the full 4K episode now on Tooni TV!`,
    openingHook: `Looking for something safe, funny, and beautifully animated to watch with the family today?`,
    keywords: ['family cartoons', 'animated stories for kids', 'wholesome family videos', 'tooni tv'],
    hashtags: ['#FamilyMovieNight', '#CartoonFun', '#TooniTV', '#WholesomeAnimation', '#KidsEntertainment'],
    cta: 'Like our Facebook page and share this story with someone who needs a smile today!',
    imageVideoContext: 'Optimized for square 1:1 or 4:5 native video uploads with bold captions for silent feed skimming.',
    audienceRelevance: 'Targets American parents, educators, and family animation groups on Facebook.'
  };

  // 4. Image Post SEO (Visual entity extraction)
  const imagePostSeo = {
    detectedObjects,
    detectedCharacters,
    textInImage: 'NEW EPISODE: ' + topic.toUpperCase(),
    sceneAndTopic: `A vibrant scene illustrating ${topic} with rich saturation and cheerful atmosphere.`,
    visualMessage,
    brandElements: 'Tooni TV corner watermark & signature character art style',
    postTitle: `Sneak Peek: ${topic} Behind the Scenes!`,
    caption: `Here is an exclusive still from our upcoming episode "${topic}"! 🎨 Can you spot the hidden clue in the background? Drop your guesses in the comments! 🔍✨`,
    keywords: ['cartoon sneak peek', 'animation art', 'character design', 'tooni tv art', 'story illustration'],
    hashtags: ['#AnimationArt', '#CharacterDesign', '#TooniTV', '#CartoonPreview', '#DigitalArt'],
    cta: 'Save this post and turn on notifications for the premiere tomorrow!',
    platformSpecificAdvice: 'Post as high-resolution carousel or standalone 4:5 image with engaging question sticker on stories.'
  };

  return {
    id: `social-${Date.now()}`,
    input,
    analysis: {
      topic,
      entities,
      audience: 'United States (American English native tone, family/animation interest)',
      searchIntent: 'Entertainment, Emotional Delight, and Safe Family Discovery',
      visualSummary: visualMessage,
      contentTone: 'Warm, Inspiring, High-Energy, and Child-Safe'
    },
    youtube,
    tiktok,
    facebook,
    imagePostSeo
  };
}
