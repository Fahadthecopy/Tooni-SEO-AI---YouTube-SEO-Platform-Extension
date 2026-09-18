import { ThumbnailAudit } from '../src/types';

export function buildThumbnailAudit(title = "YouTube Video", conceptDescription = ""): ThumbnailAudit {
  const clean = title.replace(/[^\w\s-]/g, '').trim() || "YouTube Video";

  return {
    visualScore: 68,
    contrastScore: 64,
    textReadabilityScore: 71,
    mobileVisibilityScore: 60,
    mainSubject: "Subject matter is recognized but competes with multiple peripheral elements.",
    backgroundClutter: "Moderate to high clutter. Distracting background elements draw eyes away from the primary subject.",
    textAmount: "Original concept uses 4+ words in small or light-weight font, resulting in poor mobile readability.",
    focalPoint: "Diffused focal point. Eyes wander across the frame before settling on the main message.",
    emotionalTrigger: "Mild curiosity, but lacks strong visual friction or emotional tension.",
    composition: "Center-heavy or unbalanced weighting that leaves too much negative space in non-strategic zones.",
    contrast: "Luminosity contrast is approximately 4.2:1; needs to reach 8:1+ for high stop-scroll impact in dark-mode feeds.",
    mobileReadability: "Text shrinks to under 12px optical height on 6-inch smartphones, causing viewers to scroll past.",
    branding: "Channel branding is either absent or placed in the bottom-right corner where YouTube's duration pill covers it.",
    topicClarity: "Topic is discernible upon close inspection, but does not communicate immediate value in under 1 second.",
    actionableImprovements: [
      "Cut down overlay text to a punchy 3-word curiosity hook (e.g. 'DO THIS NOW')",
      "Increase contrast between foreground subject and background to at least 7:1",
      "Keep the bottom-right 20% clear to prevent YouTube timestamp overlap",
      "Use warm amber (#F59E0B) or pure white with dark backing for mobile legibility"
    ],
    unnecessaryElements: [
      "Extraneous background gradients or patterns that decrease subject separation",
      "More than 3 words of text overlay",
      "Small icons or logos smaller than 60px",
      "Elements placed in the bottom-right timestamp dead-zone"
    ],
    cleanRedesignPlan: {
      whatToKeep: [
        "The primary character / hero object",
        "The core emotional expression",
        "The primary thematic color tone"
      ],
      whatToRemove: [
        "Unnecessary background noise, complex gradients, and decorative shapes",
        "Paragraph or sentence-length text overlays",
        "Low-contrast gray or white subtitle lines",
        "Any visual details placed in the lower-right 20% of the canvas"
      ],
      whatToEnlarge: [
        "The primary subject / facial reaction (increase size by 35%)",
        "The 3-word bold text badge (increase font weight to Black / ExtraBold)",
        "The contrast ratio between subject silhouette and dark background"
      ],
      whatToSimplify: [
        "Simplify the background into a clean, deep obsidian navy vignette (#0A0F1D)",
        "Limit color palette to strictly 2 high-contrast accent colors (e.g. Electric Amber + Cyan)",
        "Isolate exactly 1 primary visual focal point"
      ],
      subjectPlacement: "Position the main subject in the right two-thirds of the canvas, gazing towards the text.",
      textPlacement: "Position the 3-word text badge in the top-left quadrant with a subtle drop shadow or solid badge box.",
      recommendedBadgeText: "STOP DOING THIS!",
      mobileAdvice: "Ensure all typography remains crisp and legible when scaled down to a 120x68 pixel mobile thumbnail preview."
    },
    generatedPrompts: [
      {
        style: "High-Contrast Creator Reaction",
        prompt: `YouTube thumbnail 16:9, hyper-expressive character reacting to ${clean}, bold electric amber and cyan lighting, deep dark cinematic background, ultra-clean composition, 1 focal point, 8k resolution, photorealistic, high stop-scroll CTR`,
        badgeText: "DO THIS INSTEAD!",
        dominantColor: "#F59E0B"
      },
      {
        style: "Minimalist 3D Graphic",
        prompt: `16:9 YouTube thumbnail, 3D stylized isometric visual representing ${clean}, clean vibrant lighting, obsidian navy backdrop, bold contrast, modern Pixar / Blender aesthetic, zero clutter, mobile-optimized hierarchy`,
        badgeText: "100/100 BLUEPRINT",
        dominantColor: "#38BDF8"
      },
      {
        style: "Dramatic Before / After Split",
        prompt: `16:9 split-screen YouTube thumbnail, left side shows red error warning with chaotic unoptimized setup, right side shows glowing gold success metric with 100/100 score, clean dividing laser line, dramatic contrast`,
        badgeText: "DON'T MISS THIS",
        dominantColor: "#EF4444"
      }
    ]
  };
}
