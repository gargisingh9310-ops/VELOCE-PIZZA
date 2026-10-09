/**
 * High-performance frame preloader and Canvas drawing helper for VELOCE
 * Hero sequence: 240 frames at /pizza-frames/ezgif-frame-001.jpg ... ezgif-frame-240.jpg
 * FirstHomeView sequence: 240 frames at /firsthomeview/ezgif-frame-001.jpg ... ezgif-frame-240.jpg
 */

export const TOTAL_HERO_FRAMES = 240;
export const TOTAL_FIRSTHOMEVIEW_FRAMES = 240;
export const TOTAL_FRAMES = 240;

/**
 * Returns public URL for hero pizza frames (/pizza-frames/ezgif-frame-001.jpg ... 240)
 */
export function getPizzaFrameFilename(index) {
  const frameNumber = Math.max(1, Math.min(TOTAL_HERO_FRAMES, index + 1));
  const padded = String(frameNumber).padStart(3, '0');
  return `/pizza-frames/ezgif-frame-${padded}.jpg`;
}

/**
 * Returns public URL for firsthomeview frames (/firsthomeview/ezgif-frame-001.jpg ... 240)
 */
export function getFirstHomeViewFrameFilename(index) {
  const frameNumber = Math.max(1, Math.min(TOTAL_FIRSTHOMEVIEW_FRAMES, index + 1));
  const padded = String(frameNumber).padStart(3, '0');
  return `/firsthomeview/ezgif-frame-${padded}.jpg`;
}

/**
 * Backward compatibility alias for hero frame filename
 */
export function getFrameFilename(index) {
  return getPizzaFrameFilename(index);
}

/**
 * Draws the specified image onto the Canvas with aspect ratio preservation and crisp DPR scaling.
 * Supports cover and contain modes, handling mobile, tablet, desktop, ultrawide and zoom levels (67%, 80%, 100%).
 */
export function drawFrameToCanvas(canvas, ctx, img, mode = 'cover') {
  if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const width = rect.width || canvas.clientWidth || window.innerWidth || 800;
  const height = rect.height || canvas.clientHeight || window.innerHeight || 600;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const displayWidth = Math.round(width * dpr);
  const displayHeight = Math.round(height * dpr);

  // Sync internal resolution with screen DPR
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  ctx.save();
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  // Clear canvas completely
  ctx.clearRect(0, 0, width, height);

  const imgW = img.naturalWidth || 1920;
  const imgH = img.naturalHeight || 1080;
  const imgRatio = imgW / imgH;
  const canvasRatio = width / height;

  let drawW, drawH, drawX, drawY;

  if (mode === 'contain') {
    if (canvasRatio > imgRatio) {
      drawH = height;
      drawW = height * imgRatio;
    } else {
      drawW = width;
      drawH = width / imgRatio;
    }
  } else {
    // cover mode
    if (width < 768 && mode === 'hero-mobile') {
      // Mobile portrait adjustment for optimal pizza framing
      drawW = width * 1.35;
      drawH = drawW / imgRatio;
    } else {
      const scale = Math.max(width / imgW, height / imgH);
      drawW = imgW * scale;
      drawH = imgH * scale;
    }
  }

  drawX = (width - drawW) / 2;
  drawY = (height - drawH) / 2;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  ctx.restore();
}
