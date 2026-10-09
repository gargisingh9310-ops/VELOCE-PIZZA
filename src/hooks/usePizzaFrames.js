import { useState, useEffect } from 'react';
import {
  TOTAL_HERO_FRAMES,
  TOTAL_FIRSTHOMEVIEW_FRAMES,
  getPizzaFrameFilename,
  getFirstHomeViewFrameFilename,
} from '../utils/frameLoader';

/**
 * Preload and cache 240 Hero pizza frames (/pizza-frames/ezgif-frame-001.jpg ... 240)
 */
export function usePizzaFrames(config = {}) {
  const frameCount = config.frameCount || TOTAL_HERO_FRAMES;
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const images = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const src = getPizzaFrameFilename(i);

      img.onload = () => {
        if (!isMounted) return;
        images[i] = img;
        loadedCount++;
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(progress);

        // Make frame 0 available immediately so first frame is visible right away
        if (i === 0) {
          setFrames((prev) => {
            if (prev.length === 0) {
              return [img];
            }
            return prev;
          });
        }

        if (loadedCount === frameCount) {
          setFrames(images);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        images[i] = null;
        loadedCount++;
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(progress);

        if (loadedCount === frameCount) {
          setFrames(images);
          setIsLoaded(true);
        }
      };

      img.src = src;
    }

    return () => {
      isMounted = false;
    };
  }, [frameCount]);

  return {
    frames,
    loadProgress,
    isLoaded,
    frameCount,
  };
}

/**
 * Preload and cache 240 FirstHomeView frames (/firsthomeview/ezgif-frame-001.jpg ... 240)
 */
export function useFirstHomeViewFrames(config = {}) {
  const frameCount = config.frameCount || TOTAL_FIRSTHOMEVIEW_FRAMES;
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const images = new Array(frameCount);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const src = getFirstHomeViewFrameFilename(i);

      img.onload = () => {
        if (!isMounted) return;
        images[i] = img;
        loadedCount++;
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(progress);

        if (i === 0) {
          setFrames((prev) => {
            if (prev.length === 0) {
              return [img];
            }
            return prev;
          });
        }

        if (loadedCount === frameCount) {
          setFrames(images);
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        images[i] = null;
        loadedCount++;
        const progress = Math.round((loadedCount / frameCount) * 100);
        setLoadProgress(progress);

        if (loadedCount === frameCount) {
          setFrames(images);
          setIsLoaded(true);
        }
      };

      img.src = src;
    }

    return () => {
      isMounted = false;
    };
  }, [frameCount]);

  return {
    frames,
    loadProgress,
    isLoaded,
    frameCount,
  };
}
