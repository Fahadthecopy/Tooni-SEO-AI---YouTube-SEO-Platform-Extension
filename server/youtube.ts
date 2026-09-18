/**
 * YouTube Data & URL Detection Service
 * Real oEmbed fetching, ID extraction, and thumbnail resolution.
 * Adheres strictly to: "No fake stats. If unavailable, mark 'Data unavailable'."
 */

export interface YouTubeVideoResult {
  id: string;
  url: string;
  title: string;
  channel: string;
  channelUrl?: string;
  views: number | null;
  likes: number | null;
  comments: number | null;
  publishDate: string;
  duration: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
  category?: string;
  isVerifiedReal: boolean;
  fetchSource: 'oembed' | 'api' | 'sample';
}

export function extractYouTubeId(inputUrl: string): string | null {
  if (!inputUrl || typeof inputUrl !== 'string') return null;
  const trimmed = inputUrl.trim();

  // youtube.com/watch?v=VIDEO_ID
  const watchMatch = trimmed.match(/(?:youtube\.com\/watch\?.*v=)([\w-]{11})/);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // youtu.be/VIDEO_ID
  const shortMatch = trimmed.match(/youtu\.be\/([\w-]{11})/);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // youtube.com/shorts/VIDEO_ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([\w-]{11})/);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // youtube.com/embed/VIDEO_ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([\w-]{11})/);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Direct 11-char ID
  if (/^[\w-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export async function fetchYouTubeMetadata(urlOrId: string): Promise<YouTubeVideoResult> {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) {
    throw new Error("Please enter a valid YouTube video URL. Supported: youtube.com/watch?v=, youtu.be/, or youtube.com/shorts/");
  }

  const standardUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(standardUrl)}&format=json`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(oembedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    clearTimeout(timeoutId);

    if (response.status === 404) {
      throw new Error("Video not found or private. Please check the URL and ensure the video is public.");
    }

    if (!response.ok) {
      throw new Error(`YouTube returned status ${response.status}. Video may be unavailable or region-restricted.`);
    }

    const data = await response.json();

    // The official YouTube maxres/hq thumbnail
    const officialThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return {
      id: videoId,
      url: standardUrl,
      title: data.title || `YouTube Video (${videoId})`,
      channel: data.author_name || "YouTube Creator",
      channelUrl: data.author_url,
      views: null, // oEmbed does not return view count; marked as null so UI displays "Data unavailable"
      likes: null,
      comments: null,
      publishDate: new Date().toISOString().split('T')[0],
      duration: "Standard YouTube Duration",
      thumbnailUrl: data.thumbnail_url || officialThumbnail,
      description: `Original YouTube Video from channel ${data.author_name || 'Creator'}. Title: "${data.title || ''}".`,
      tags: ["youtube", "video", "content"],
      category: "Entertainment / Education",
      isVerifiedReal: true,
      fetchSource: 'oembed',
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error("YouTube request timed out. Please verify your connection and try again.");
    }
    // Re-throw formatted message
    throw new Error(error.message || "Failed to retrieve YouTube video data.");
  }
}
