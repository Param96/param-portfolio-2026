"use client";

import { useEffect, useRef, useCallback } from "react";
// Tone is imported dynamically to prevent SSR issues
import { useLivingSystemStore } from "@/lib/store";

export default function GenesisAudio() {
  const { cinematicPhase, cinematicActive } = useLivingSystemStore();
  const initializedRef = useRef(false);

  // Store tone instruments
  const synths = useRef<any>({});

  const initAudio = useCallback(async () => {
    if (initializedRef.current || !cinematicActive) return;
    
    try {
      const Tone = await import("tone");
      await Tone.start();
      
      // Master volume
      Tone.getDestination().volume.value = -10;

      // 1. Sub drone (Drop scene)
      const drone = new Tone.FMSynth({
        harmonicity: 0.5,
        modulationIndex: 1.2,
        oscillator: { type: "sine" },
        modulation: { type: "triangle" },
        envelope: { attack: 2, decay: 1, sustain: 1, release: 5 }
      }).toDestination();
      drone.volume.value = -30;

      // 2. Granular-like texture for growth (Grass/Moss)
      const granular = new Tone.NoiseSynth({
        noise: { type: "brown" },
        envelope: { attack: 4, decay: 0.1, sustain: 1, release: 4 }
      });
      const autoFilter = new Tone.AutoFilter("4n", 200, 2).start();
      granular.connect(autoFilter);
      autoFilter.toDestination();
      granular.volume.value = -25;

      // 3. Forest ambient pad
      const pad = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "triangle" },
        envelope: { attack: 4, decay: 1, sustain: 0.8, release: 8 }
      }).toDestination();
      pad.volume.value = -20;

      // 4. Intelligence pulse (Roots)
      const pulse = new Tone.MetalSynth({
        envelope: { attack: 0.01, decay: 0.1, release: 2 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5
      }).toDestination();
      pulse.volume.value = -15;
      
      // 5. Humanity Monoliths (Glassy)
      const glass = new Tone.PolySynth(Tone.FMSynth, {
        harmonicity: 3,
        modulationIndex: 10,
        oscillator: { type: "sine" },
        envelope: { attack: 1, decay: 2, sustain: 0.2, release: 3 }
      }).toDestination();
      glass.volume.value = -18;

      synths.current = { drone, granular, pad, pulse, glass };
      initializedRef.current = true;
    } catch (e) {
      console.warn("Tone.js initialization failed", e);
    }
  }, [cinematicActive]);

  // Init on gesture
  useEffect(() => {
    if (!cinematicActive) return;
    
    const handleGesture = () => {
      initAudio();
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
    
    window.addEventListener("pointerdown", handleGesture, { once: true });
    window.addEventListener("keydown", handleGesture, { once: true });
    
    return () => {
      window.removeEventListener("pointerdown", handleGesture);
      window.removeEventListener("keydown", handleGesture);
    };
  }, [cinematicActive, initAudio]);

  // Handle phase transitions
  useEffect(() => {
    if (!initializedRef.current) return;
    
    const { drone, granular, pad, pulse, glass } = synths.current;
    
    switch (cinematicPhase) {
      case 1: // Drop (0-8s)
        drone.triggerAttack("C1");
        break;
      
      case 2: // Growth (8-22s)
        drone.volume.rampTo(-20, 4);
        granular.triggerAttack();
        break;

      case 3: // Forest (22-38s)
        pad.triggerAttack(["C3", "G3", "D4", "E4"]);
        granular.volume.rampTo(-30, 5);
        break;
        
      case 4: // Intelligence (38-52s)
        pad.releaseAll();
        granular.triggerRelease();
        drone.volume.rampTo(-40, 2);
        
        // Schedule pulses
        (async () => {
          const Tone = await import("tone");
          const pulseLoop = new Tone.Loop(time => {
            pulse.triggerAttackRelease("32n", time);
          }, "2n").start(0);
          Tone.Transport.start();
          synths.current.pulseLoop = pulseLoop;
        })();
        break;
        
      case 5: // Humanity (52-62s)
        if (synths.current.pulseLoop) {
          import("tone").then(Tone => {
            synths.current.pulseLoop.stop();
            Tone.Transport.stop();
          });
        }
        glass.triggerAttack(["A4", "E5", "C6"]);
        drone.volume.rampTo(-25, 4);
        break;
        
      case 6: // Evolution (62-73s)
        pad.triggerAttack(["A2", "E3", "C4", "G4"]);
        glass.releaseAll();
        drone.volume.rampTo(-15, 5);
        break;

      case 7: // Website (73-80s)
      case 8: // Complete
        drone.triggerRelease();
        pad.releaseAll();
        glass.releaseAll();
        granular.triggerRelease();
        break;
    }
  }, [cinematicPhase]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (synths.current.pulseLoop) {
        synths.current.pulseLoop.dispose();
      }
      Object.values(synths.current).forEach((synth: any) => {
        if (synth.dispose) synth.dispose();
      });
      import("tone").then(Tone => {
        Tone.Transport.stop();
      });
    };
  }, []);

  return null;
}
