"use client";

import { useEffect, useRef, useState } from "react";
import { useLivingSystemStore } from "@/lib/store";
import { Volume2, VolumeX } from "lucide-react";

export default function SynestheticAudio() {
  const [enabled, setEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const scrollProgress = useLivingSystemStore((state) => state.scrollProgress);
  const lastScrollY = useRef(0);
  const velocityRef = useRef(0);

  // 1. Audio Setup
  useEffect(() => {
    if (!enabled) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Deep drone oscillator
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 45; // Sub-bass

      // Filter (this is what scroll velocity will open/close)
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 100; // Closed initially
      filter.Q.value = 2;

      // Master Gain
      const gain = ctx.createGain();
      gain.gain.value = 0.2; // Keep it subtle

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      filterRef.current = filter;
      gainRef.current = gain;
    } else {
      audioCtxRef.current.resume();
    }

    return () => {
      // Don't kill context on unmount to prevent popping, just suspend
    };
  }, [enabled]);

  // 2. Scroll Velocity Sync to Filter
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = Math.abs(currentScroll - lastScrollY.current);
      velocityRef.current = Math.min(delta, 100); // Cap velocity
      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Animation loop to decay velocity and update filter
  useEffect(() => {
    let frameId: number;
    const loop = () => {
      if (enabled && filterRef.current) {
        // Decay velocity
        velocityRef.current *= 0.95;

        // Map velocity (0-100) to Frequency (100 - 3000)
        const targetFreq = 100 + (velocityRef.current / 100) * 2900;
        
        // Smoothly lerp filter frequency
        const currentFreq = filterRef.current.frequency.value;
        filterRef.current.frequency.value = currentFreq + (targetFreq - currentFreq) * 0.1;

        // Modulate gain slightly based on velocity
        if (gainRef.current) {
          const targetGain = 0.1 + (velocityRef.current / 100) * 0.15;
          const currentGain = gainRef.current.gain.value;
          gainRef.current.gain.value = currentGain + (targetGain - currentGain) * 0.05;
        }
      }
      frameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(frameId);
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="fixed bottom-24 right-8 md:bottom-32 md:right-14 z-40 w-10 h-10 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition-colors group shadow-lg"
      aria-label="Toggle Synesthetic Audio"
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-[#00FFCC] group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
      )}
    </button>
  );
}
