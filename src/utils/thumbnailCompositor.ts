/**
 * Thumbnail Visual Compositor & High-Resolution Canvas Generator
 * Renders high-CTR, de-cluttered, mobile-optimized visual assets
 * while strictly preserving original character identity and core concept.
 */

export interface CompositorOptions {
  originalImageUrl: string;
  headlineText: string;
  badgeText?: string;
  colorScheme?: string; // 'amber-slate' | 'crimson-white' | 'emerald-cyan' | 'gold-obsidian'
  backgroundStyle?: string; // 'cinematic-dark' | 'vignette-spotlight' | 'studio-gradient' | 'clean-blur'
  textPosition?: 'top-left' | 'center' | 'bottom-left' | 'split-right';
  textSize?: 'small' | 'medium' | 'large' | 'massive';
  characterLocked?: boolean;
  clutterStripped?: boolean;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  targetWidth?: number; // e.g. 1920 (Full HD), 3840 (4K UHD)
}

export function drawThumbnailToCanvas(
  canvas: HTMLCanvasElement,
  options: CompositorOptions
): Promise<string> {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(options.originalImageUrl);
      return;
    }

    const is916 = options.aspectRatio === '9:16';
    const is11 = options.aspectRatio === '1:1';
    const width = options.targetWidth || (is916 ? 1080 : is11 ? 1200 : 1920);
    const height = is916 ? 1920 : is11 ? 1200 : 1080;

    canvas.width = width;
    canvas.height = height;

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      // 1. Draw base image with aspect-ratio cover
      const imgAspect = img.width / img.height;
      const targetAspect = width / height;
      let sX = 0, sY = 0, sW = img.width, sH = img.height;

      if (imgAspect > targetAspect) {
        sW = img.height * targetAspect;
        sX = (img.width - sW) / 2;
      } else {
        sH = img.width / targetAspect;
        sY = (img.height - sH) / 2;
      }

      ctx.save();
      // Apply clean contrast and saturation filter if clutter is stripped
      if (options.clutterStripped) {
        ctx.filter = 'contrast(1.18) saturate(1.22) brightness(1.04)';
      }
      ctx.drawImage(img, sX, sY, sW, sH, 0, 0, width, height);
      ctx.restore();

      // 2. Apply background tone / cinematic lighting overlay
      ctx.save();
      const style = options.backgroundStyle || 'cinematic-dark';

      if (style === 'cinematic-dark') {
        // High contrast dark vignette
        const vignette = ctx.createRadialGradient(
          width * 0.4,
          height * 0.45,
          width * 0.15,
          width * 0.5,
          height * 0.5,
          width * 0.85
        );
        vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
        vignette.addColorStop(0.65, 'rgba(15, 23, 42, 0.45)');
        vignette.addColorStop(1, 'rgba(2, 6, 23, 0.88)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);
      } else if (style === 'vignette-spotlight') {
        // Left-third spotlight for character
        const spotlight = ctx.createLinearGradient(0, 0, width, 0);
        spotlight.addColorStop(0, 'rgba(15, 23, 42, 0.85)');
        spotlight.addColorStop(0.45, 'rgba(15, 23, 42, 0.3)');
        spotlight.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = spotlight;
        ctx.fillRect(0, 0, width, height);
      } else if (style === 'studio-gradient') {
        // High-energy warm rim
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        grad.addColorStop(0, 'rgba(2, 6, 23, 0.85)');
        grad.addColorStop(0.5, 'rgba(2, 6, 23, 0.15)');
        grad.addColorStop(1, 'rgba(245, 158, 11, 0.15)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.restore();

      // 3. Render Bottom-Right Duration Safe-Zone Indicator (Clear zone for YouTube "10:45" badge)
      if (!is916) {
        ctx.save();
        const safeW = width * 0.22;
        const safeH = height * 0.18;
        const safeX = width - safeW;
        const safeY = height - safeH;

        // Subtle gradient ensuring no critical text gets clipped by duration badge
        const safeGrad = ctx.createLinearGradient(safeX, safeY, width, height);
        safeGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        safeGrad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
        ctx.fillStyle = safeGrad;
        ctx.fillRect(safeX, safeY, safeW, safeH);
        ctx.restore();
      }

      // 4. Determine Colors based on colorScheme
      let primaryColor = '#F59E0B'; // Amber
      let secondaryColor = '#0F172A'; // Slate 900
      let textColor = '#FFFFFF';
      let strokeColor = '#000000';

      const scheme = options.colorScheme || 'amber-slate';
      if (scheme === 'crimson-white') {
        primaryColor = '#EF4444';
        secondaryColor = '#FFFFFF';
        textColor = '#FFFFFF';
      } else if (scheme === 'emerald-cyan') {
        primaryColor = '#10B981';
        secondaryColor = '#06B6D4';
        textColor = '#FFFFFF';
      } else if (scheme === 'gold-obsidian') {
        primaryColor = '#EAB308';
        secondaryColor = '#000000';
        textColor = '#FFFFFF';
      }

      // 5. Position and Draw Typography
      const headline = (options.headlineText || "DON'T MISS THIS!").toUpperCase();
      const badge = (options.badgeText || '100% PROVEN').toUpperCase();
      const pos = options.textPosition || 'top-left';

      // Sizing
      const sizeMultiplier =
        options.textSize === 'massive'
          ? 1.35
          : options.textSize === 'small'
          ? 0.75
          : options.textSize === 'medium'
          ? 0.9
          : 1.1;

      const baseFontSize = (is916 ? 72 : 92) * sizeMultiplier * (width / 1920);
      const badgeFontSize = baseFontSize * 0.38;

      ctx.save();

      let textX = width * 0.08;
      let textY = height * 0.28;

      if (pos === 'center') {
        textX = width * 0.5;
        textY = height * 0.5;
        ctx.textAlign = 'center';
      } else if (pos === 'bottom-left') {
        textX = width * 0.08;
        textY = height * (is916 ? 0.75 : 0.72);
        ctx.textAlign = 'left';
      } else if (pos === 'split-right') {
        textX = width * 0.65;
        textY = height * 0.35;
        ctx.textAlign = 'left';
      } else {
        // top-left default
        textX = width * 0.08;
        textY = height * (is916 ? 0.18 : 0.26);
        ctx.textAlign = 'left';
      }

      // Draw Badge if present
      if (badge && options.clutterStripped) {
        ctx.font = `900 ${badgeFontSize}px system-ui, -apple-system, sans-serif`;
        const badgeMetrics = ctx.measureText(badge);
        const padX = badgeFontSize * 0.8;
        const padY = badgeFontSize * 0.45;
        const badgeW = badgeMetrics.width + padX * 2;
        const badgeH = badgeFontSize + padY * 2;
        const badgeY = textY - baseFontSize * 1.15;
        const badgeX = pos === 'center' ? textX - badgeW / 2 : textX;

        // Badge pill background
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY - badgeFontSize, badgeW, badgeH, badgeFontSize * 0.35);
        ctx.fill();

        // Badge shadow / border
        ctx.lineWidth = 3 * (width / 1920);
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Badge text
        ctx.fillStyle = '#000000';
        ctx.textBaseline = 'middle';
        const badgeTextX = pos === 'center' ? textX : textX + padX;
        ctx.fillText(badge, badgeTextX, badgeY - badgeFontSize + badgeH / 2);
      }

      // Draw Headline (with heavy drop shadow & stroke for 120px mobile readability)
      ctx.font = `950 ${baseFontSize}px system-ui, -apple-system, sans-serif`;
      ctx.textBaseline = 'alphabetic';

      // Split into 2 lines if longer than 16 chars
      const words = headline.split(' ');
      let lines: string[] = [];
      if (words.length > 2 && headline.length > 14) {
        const mid = Math.ceil(words.length / 2);
        lines = [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
      } else {
        lines = [headline];
      }

      lines.forEach((line, idx) => {
        const currentY = textY + idx * baseFontSize * 1.1;

        // Draw deep shadow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
        ctx.shadowBlur = 18 * (width / 1920);
        ctx.shadowOffsetX = 6 * (width / 1920);
        ctx.shadowOffsetY = 6 * (width / 1920);

        // Draw thick black outline
        ctx.lineWidth = 14 * (width / 1920);
        ctx.strokeStyle = '#000000';
        ctx.strokeText(line, textX, currentY);

        // Draw colored text
        ctx.fillStyle = idx === 0 && lines.length > 1 ? primaryColor : textColor;
        ctx.fillText(line, textX, currentY);
      });

      // 6. Character Lock Status Watermark in top-right
      if (options.characterLocked) {
        ctx.restore();
        ctx.save();
        const lockText = '🔒 CHARACTER LOCKED';
        const lockFontSize = 22 * (width / 1920);
        ctx.font = `700 ${lockFontSize}px system-ui, sans-serif`;
        const lockMetrics = ctx.measureText(lockText);
        const lockX = width - lockMetrics.width - 40 * (width / 1920);
        const lockY = 45 * (width / 1920);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.beginPath();
        ctx.roundRect(
          lockX - 12,
          lockY - lockFontSize + 2,
          lockMetrics.width + 24,
          lockFontSize + 14,
          8
        );
        ctx.fill();

        ctx.fillStyle = '#F59E0B';
        ctx.fillText(lockText, lockX, lockY + 4);
      }

      ctx.restore();

      try {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve(dataUrl);
      } catch (err) {
        console.warn('Canvas toDataURL security notice:', err);
        resolve(options.originalImageUrl);
      }
    };

    img.onerror = () => {
      resolve(options.originalImageUrl);
    };

    img.src = options.originalImageUrl;
  });
}
