"use client";

import { useEffect, useRef } from "react";
import { useLivingSystemStore } from "@/lib/store";

export default function CinematicAudio() {
  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Nodes
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const droneGainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  useEffect(() => {
    // If cinematic is skipped or already seen, do not play audio
    if (cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0)) return;

    if (cinematicPhase === 1 && !audioCtxRef.current) {
      // Phase 1: Initialize Audio Context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.5;
      masterGain.connect(ctx.destination);

      // Deep Drone (The Void)
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.value = 45; // Sub bass
      
      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.01; // Starts imperceptible
      
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 100;
      
      droneOsc.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(masterGain);
      
      droneOsc.start();

      droneOscRef.current = droneOsc;
      droneGainRef.current = droneGain;
      filterRef.current = filter;
    }

    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    // Orchestrate based on phases
    if (cinematicPhase === 2 && droneGainRef.current && filterRef.current) {
      // First World: Drone gets warmer, add a water drop ping
      droneGainRef.current.gain.linearRampToValueAtTime(0.3, now + 8);
      filterRef.current.frequency.linearRampToValueAtTime(300, now + 8);
      
      const ping = ctx.createOscillator();
      ping.type = "sine";
      ping.frequency.setValueAtTime(800, now + 2);
      ping.frequency.exponentialRampToValueAtTime(300, now + 3);
      
      const pingGain = ctx.createGain();
      pingGain.gain.setValueAtTime(0, now + 2);
      pingGain.gain.linearRampToValueAtTime(0.5, now + 2.1);
      pingGain.gain.exponentialRampToValueAtTime(0.01, now + 5);
      
      ping.connect(pingGain);
      pingGain.connect(ctx.destination);
      ping.start(now + 2);
      ping.stop(now + 6);
    } 
    else if (cinematicPhase === 3 && filterRef.current) {
      // The Seed: Tension rises
      filterRef.current.frequency.linearRampToValueAtTime(600, now + 8);
    }
    else if (cinematicPhase === 4 && droneGainRef.current) {
      // Evolution: Harmonic chords begin
      const chordTone = ctx.createOscillator();
      chordTone.type = "triangle";
      chordTone.frequency.setValueAtTime(110, now); // A2
      
      const chordGain = ctx.createGain();
      chordGain.gain.setValueAtTime(0, now);
      chordGain.gain.linearRampToValueAtTime(0.2, now + 5);
      
      chordTone.connect(chordGain);
      chordGain.connect(ctx.destination);
      chordTone.start(now);
      chordTone.stop(now + 20);
    }
    else if (cinematicPhase === 6 && droneGainRef.current) {
      // Intelligence: Swelling drone
      droneGainRef.current.gain.linearRampToValueAtTime(0.6, now + 2);
    }
    else if (cinematicPhase === 7) {
      // Reveal: Fade out
      if (droneGainRef.current) {
        droneGainRef.current.gain.linearRampToValueAtTime(0, now + 3);
      }
      setTimeout(() => {
        if (droneOscRef.current) droneOscRef.current.stop();
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
      }, 4000);
    }
  }, [cinematicPhase, hasSeenCinematic]);

  return null;
}
