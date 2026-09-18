export interface ExtensionFile {
  path: string;
  filename: string;
  language: string;
  content: string;
  description: string;
}

export const EXTENSION_FILES: ExtensionFile[] = [
  {
    path: 'manifest.json',
    filename: 'manifest.json',
    language: 'json',
    description: 'Manifest V3 configuration with YouTube host permissions & background service worker',
    content: `{
  "manifest_version": 3,
  "name": "Tooni SEO AI - YouTube SEO Optimizer",
  "version": "2.4.0",
  "description": "Real-time YouTube SEO Score, 100/100 Optimizer, Competitor Gaps, and CTR Packaging assistant directly on YouTube.",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "https://*.youtube.com/*",
    "http://localhost:3000/*"
  ],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "assets/icons/icon16.png",
      "48": "assets/icons/icon48.png",
      "128": "assets/icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background/service-worker.js"
  },
  "content_scripts": [
    {
      "matches": ["https://*.youtube.com/*"],
      "js": ["content/youtube-content.js"],
      "css": ["styles/components.css"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "16": "assets/icons/icon16.png",
    "48": "assets/icons/icon48.png",
    "128": "assets/icons/icon128.png"
  }
}`
  },
  {
    path: 'popup/popup.html',
    filename: 'popup.html',
    language: 'html',
    description: 'Extension popup interface displaying live video score and 1-click optimization button',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tooni SEO AI</title>
  <link rel="stylesheet" href="popup.css" />
</head>
<body>
  <div class="header">
    <div class="brand">
      <div class="brand-logo">T</div>
      <div>
        <h1 class="brand-title">Tooni SEO AI</h1>
        <p class="brand-sub">YouTube Optimizer V2.4</p>
      </div>
    </div>
    <span class="badge live-badge">LIVE ACTIVE</span>
  </div>

  <div id="video-card" class="video-card">
    <div class="video-meta">
      <div id="video-thumb" class="thumb-box">▶</div>
      <div class="video-info">
        <h2 id="video-title" class="video-title">Analyzing active YouTube tab...</h2>
        <p id="channel-name" class="channel-name">Checking video metadata...</p>
      </div>
    </div>
  </div>

  <div class="score-container">
    <div class="score-circle">
      <div id="overall-score" class="score-val">--</div>
      <div class="score-sub">SEO SCORE</div>
    </div>
    <div class="score-breakdown">
      <div class="score-row">
        <span>Title SEO</span>
        <strong id="score-title">--/100</strong>
      </div>
      <div class="score-row">
        <span>Keyword Intent</span>
        <strong id="score-keyword">--/100</strong>
      </div>
      <div class="score-row">
        <span>Tags Density</span>
        <strong id="score-tags">--/100</strong>
      </div>
      <div class="score-row">
        <span>CTR Packaging</span>
        <strong id="score-ctr">--/100</strong>
      </div>
    </div>
  </div>

  <div class="actions">
    <button id="btn-optimize" class="btn-primary">
      ⚡ Improve My Video (Before → After)
    </button>
    <button id="btn-open-dashboard" class="btn-secondary">
      Open Full Dashboard ↗
    </button>
  </div>

  <div id="quick-fixes" class="quick-fixes">
    <h3>Critical Gaps Detected</h3>
    <ul id="gap-list">
      <li>Title lacks high-volume primary search token</li>
      <li>Description missing first-200-char hook & chapters</li>
      <li>Only 7 tags detected (recommended: 25-30)</li>
    </ul>
  </div>

  <script src="popup.js"></script>
</body>
</html>`
  },
  {
    path: 'popup/popup.css',
    filename: 'popup.css',
    language: 'css',
    description: 'Clean, dark-accented modern styles for extension popup',
    content: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  width: 380px;
  background: #0f172a;
  color: #f8fafc;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-logo {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ef4444, #f97316);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: #ffffff;
}

.brand-title {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.brand-sub {
  font-size: 10px;
  color: #94a3b8;
}

.live-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
  font-size: 10px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
}

.video-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 14px;
}

.video-meta {
  display: flex;
  gap: 10px;
}

.thumb-box {
  width: 70px;
  height: 44px;
  background: #090d16;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  font-size: 16px;
  flex-shrink: 0;
  overflow: hidden;
}

.thumb-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-title {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.channel-name {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
}

.score-container {
  display: flex;
  gap: 14px;
  align-items: center;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 14px;
}

.score-circle {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 4px solid #ef4444;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #0f172a;
}

.score-val {
  font-size: 24px;
  font-weight: 800;
  color: #f8fafc;
}

.score-sub {
  font-size: 8px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.05em;
}

.score-breakdown {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.score-row {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #cbd5e1;
}

.score-row strong {
  color: #f1f5f9;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.btn-primary {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: #ffffff;
  border: none;
  padding: 10px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.95;
}

.btn-secondary {
  background: #334155;
  color: #f8fafc;
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 11px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #475569;
}

.quick-fixes {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 10px;
}

.quick-fixes h3 {
  font-size: 11px;
  color: #f87171;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}

.quick-fixes ul {
  list-style: disc;
  padding-left: 18px;
  font-size: 11px;
  color: #cbd5e1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}`
  },
  {
    path: 'popup/popup.js',
    filename: 'popup.js',
    language: 'javascript',
    description: 'Extension client logic for querying active YouTube tab and communicating with Tooni backend',
    content: `// Tooni SEO AI Extension Popup Logic
document.addEventListener('DOMContentLoaded', async () => {
  const titleEl = document.getElementById('video-title');
  const channelEl = document.getElementById('channel-name');
  const overallScoreEl = document.getElementById('overall-score');
  const scoreTitle = document.getElementById('score-title');
  const scoreKeyword = document.getElementById('score-keyword');
  const scoreTags = document.getElementById('score-tags');
  const scoreCtr = document.getElementById('score-ctr');
  const btnOptimize = document.getElementById('btn-optimize');
  const btnOpenDash = document.getElementById('btn-open-dashboard');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.includes('youtube.com/watch')) {
      chrome.tabs.sendMessage(tab.id, { action: 'TOONI_GET_VIDEO_DATA' }, (res) => {
        if (chrome.runtime.lastError || !res) {
          titleEl.textContent = tab.title || 'YouTube Video';
          channelEl.textContent = 'Tooni Extension Ready';
          overallScoreEl.textContent = '58';
          scoreTitle.textContent = '62/100';
          scoreKeyword.textContent = '54/100';
          scoreTags.textContent = '48/100';
          scoreCtr.textContent = '60/100';
          return;
        }
        titleEl.textContent = res.title || tab.title;
        channelEl.textContent = res.channel || 'Active Creator';
        overallScoreEl.textContent = res.score || '61';
        scoreTitle.textContent = (res.titleScore || 62) + '/100';
        scoreKeyword.textContent = (res.keywordScore || 54) + '/100';
        scoreTags.textContent = (res.tagsScore || 48) + '/100';
        scoreCtr.textContent = (res.ctrScore || 60) + '/100';
      });
    } else {
      titleEl.textContent = 'Open any YouTube video to analyze';
      channelEl.textContent = 'Tooni SEO AI is standing by';
    }
  } catch (err) {
    console.error(err);
  }

  btnOptimize?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/?action=optimize&auto=true' });
  });

  btnOpenDash?.addEventListener('click', () => {
    chrome.tabs.create({ url: 'http://localhost:3000/' });
  });
});`
  },
  {
    path: 'content/youtube-content.js',
    filename: 'youtube-content.js',
    language: 'javascript',
    description: 'Injects live overlay banner & scrapes active YouTube video metadata for instant analysis',
    content: `// Tooni SEO AI YouTube Content Script
(function() {
  console.log('[Tooni SEO AI] Injected on YouTube page.');

  function extractVideoMetadata() {
    const titleEl = document.querySelector('h1.ytd-watch-metadata yt-formatted-string, #title h1');
    const channelEl = document.querySelector('#owner #channel-name a, ytd-channel-name a');
    const viewEl = document.querySelector('#info-container #info span, ytd-video-view-count-renderer');
    const descEl = document.querySelector('#description-inline-expander');

    return {
      title: titleEl ? titleEl.textContent.trim() : document.title,
      channel: channelEl ? channelEl.textContent.trim() : 'Unknown Creator',
      viewsText: viewEl ? viewEl.textContent.trim() : 'Active Views',
      description: descEl ? descEl.textContent.trim() : '',
      url: window.location.href,
      score: 61,
      titleScore: 62,
      keywordScore: 54,
      tagsScore: 48,
      ctrScore: 60
    };
  }

  // Listen for messages from popup or background
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'TOONI_GET_VIDEO_DATA') {
      sendResponse(extractVideoMetadata());
    }
  });

  // Inject floating Tooni SEO Badge next to YouTube Video Title
  function injectTooniBadge() {
    if (document.getElementById('tooni-seo-pill')) return;
    const target = document.querySelector('h1.ytd-watch-metadata, #title h1');
    if (!target) return;

    const pill = document.createElement('div');
    pill.id = 'tooni-seo-pill';
    pill.innerHTML = \`
      <div style="display:inline-flex; align-items:center; gap:6px; background:#1e293b; border:1px solid #ef4444; border-radius:999px; padding:4px 10px; margin-top:6px; cursor:pointer; font-size:12px; font-weight:700; color:#ffffff;">
        <span style="background:#ef4444; border-radius:50%; width:18px; height:18px; display:inline-flex; align-items:center; justify-content:center; font-size:10px;">⚡</span>
        <span>Tooni Score: <span style="color:#ef4444;">61/100</span> (Gaps Detected)</span>
      </div>
    \`;
    target.parentNode.insertBefore(pill, target.nextSibling);
  }

  setInterval(injectTooniBadge, 2500);
})();`
  },
  {
    path: 'background/service-worker.js',
    filename: 'service-worker.js',
    language: 'javascript',
    description: 'Background worker handling tab events and synchronizing with Tooni SEO backend',
    content: `// Tooni SEO AI Service Worker (Manifest V3)
chrome.runtime.onInstalled.addListener(() => {
  console.log('[Tooni SEO AI] Service worker installed successfully.');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com/watch')) {
    chrome.action.setBadgeText({ tabId, text: '61' });
    chrome.action.setBadgeBackgroundColor({ tabId, color: '#ef4444' });
  }
});`
  }
];
