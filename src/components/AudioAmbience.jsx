import React, { useEffect, useRef } from 'react';

/**
 * Ambient Audio Synthesizer using Web Audio API
 * Generates a warm wood-oven fireplace ember crackle and subtle low-frequency resonance
 */
export default function AudioAmbience({ isMuted }) {
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (!isMuted && !isPlayingRef.current) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // 1. Warm Pink/Brown Noise Generator for gentle fireplace oven ambiance
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Warm Lowpass Filter (320 Hz)
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        whiteNoise.start();

        // 2. Periodic crackle impulses simulating wood embers popping
        const crackleInterval = setInterval(() => {
          if (ctx.state === 'running' && !isMuted) {
            const osc = ctx.createOscillator();
            const crackGain = ctx.createGain();
            osc.frequency.setValueAtTime(800 + Math.random() * 1200, ctx.currentTime);
            crackGain.gain.setValueAtTime(0.015 + Math.random() * 0.02, ctx.currentTime);
            crackGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
            osc.connect(crackGain);
            crackGain.connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
          }
        }, 350 + Math.random() * 500);

        isPlayingRef.current = true;

        return () => {
          clearInterval(crackleInterval);
          ctx.close();
          isPlayingRef.current = false;
        };
      } catch (err) {
        console.warn('Web Audio ambience failed:', err);
      }
    } else if (isMuted && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    } else if (!isMuted && audioCtxRef.current) {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    }
  }, [isMuted]);

  return null;
}
