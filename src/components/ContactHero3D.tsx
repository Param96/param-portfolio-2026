"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, Volume2, VolumeX, Mail } from "lucide-react";
import * as THREE from "three";

// ── LIVING TRANSMISSION FIELD ──
function TransmissionField({ isLateNight }: { isLateNight: boolean }) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock, pointer }) => {
    if (sphereRef.current) {
      // Subtle rotation
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      // Cursor interaction (emotional, not flashy)
      sphereRef.current.position.x = THREE.MathUtils.lerp(sphereRef.current.position.x, pointer.x * 0.5, 0.05);
      sphereRef.current.position.y = THREE.MathUtils.lerp(sphereRef.current.position.y, pointer.y * 0.5, 0.05);
    }
  });

  return (
    <group>
      {/* Central Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[1.5, 64, 64]} scale={isLateNight ? 1.2 : 1}>
          <MeshDistortMaterial 
            color={isLateNight ? "#E07A5F" : "#D4A373"} 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0.1} 
            metalness={0.8} 
            roughness={0.2} 
            distort={isLateNight ? 0.6 : 0.4} 
            speed={isLateNight ? 3 : 1.5} 
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Outer Orbital Ring (Signal Pathway) */}
      <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
        <mesh>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshBasicMaterial color={isLateNight ? "#81B29A" : "#84A98C"} transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* Atmospheric Particles */}
      <Sparkles 
        count={100} 
        scale={8} 
        size={isLateNight ? 3 : 2} 
        speed={0.4} 
        opacity={0.2} 
        color={isLateNight ? "#F2CC8F" : "#52796F"} 
      />

      <ambientLight intensity={isLateNight ? 0.2 : 0.8} />
      <directionalLight position={[5, 5, 5]} intensity={isLateNight ? 0.5 : 1.5} color="#D4A373" />
      <directionalLight position={[-5, -5, -5]} intensity={isLateNight ? 0.5 : 1} color="#84A98C" />
    </group>
  );
}

export default function ContactHero3D() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLateNight, setIsLateNight] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Easter Egg logic
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // We use a placeholder ambient drone sound (ensure valid URL or local file)
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_2c560232a5.mp3?filename=ambient-drone-1234.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleEasterEggEnter = () => {
    const timer = setTimeout(() => {
      setIsLateNight(true);
      if (audioRef.current) audioRef.current.volume = 0.4; // Intensify sound slightly
    }, 3000); // 3 seconds hold
    setHoverTimer(timer);
  };

  const handleEasterEggLeave = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
  };

  return (
    <div className={`relative w-full min-h-screen ${isLateNight ? "bg-[#1C1C1C]" : "bg-[#F6F1E3]"} transition-colors duration-1000 overflow-hidden flex flex-col md:flex-row items-center`}>
      
      {/* ── ATMOSPHERIC LIGHTING (HTML layer) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-1/4 right-1/4 w-[700px] h-[700px] rounded-full blur-[150px] transition-colors duration-1000 ${isLateNight ? 'bg-[#E07A5F]/20' : 'bg-[#E9EDC9]/40'}`} />
        <div className={`absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-1000 ${isLateNight ? 'bg-[#81B29A]/10' : 'bg-[#D4A373]/20'}`} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ── LEFT: EDITORIAL TYPOGRAPHY ── */}
      <div className="w-full md:w-1/2 relative z-20 px-6 md:pl-20 lg:pl-32 pt-32 md:pt-0 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={`text-[11px] font-bold uppercase tracking-[0.4em] mb-8 block transition-colors duration-1000 ${isLateNight ? 'text-[#81B29A]' : 'text-[#84A98C]'}`}>
            Open Transmission {isLateNight && ":: LATE NIGHT BUILD MODE"}
          </span>
          <h1 className={`text-6xl md:text-8xl lg:text-[7.5rem] font-light tracking-tighter leading-[0.9] mb-8 transition-colors duration-1000 ${isLateNight ? 'text-[#F4F1DE]' : 'text-[#2F3E46]'}`}>
            Let's Build <br />
            Something <br />
            <span className={`font-serif italic ${isLateNight ? 'text-[#E07A5F]' : 'text-[#D4A373]'}`}>Ambitious.</span>
          </h1>
          
          <div className="space-y-6 max-w-lg mb-12">
            <p className={`text-lg font-medium leading-relaxed transition-colors duration-1000 ${isLateNight ? 'text-[#F4F1DE]/70' : 'text-[#52796F]'}`}>
              Building intelligent systems, experimental AI workflows, startup infrastructure, and research-driven products with ambitious people.
            </p>
            <p className={`text-sm font-medium leading-relaxed transition-colors duration-1000 ${isLateNight ? 'text-[#F4F1DE]/50' : 'text-[#2F3E46]/60'}`}>
              Open to startups, AI collaborations, research systems, ambitious experiments, and weird ideas worth building.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <a href="mailto:paramppatel100@gmail.com" className="inline-flex items-center gap-4 group">
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${isLateNight ? 'text-[#F4F1DE] group-hover:text-[#E07A5F]' : 'text-[#2F3E46] group-hover:text-[#D4A373]'}`}>
                Start a Conversation
              </span>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isLateNight ? 'border-[#F4F1DE]/20 group-hover:border-[#E07A5F] group-hover:bg-[#E07A5F] text-[#F4F1DE]' : 'border-[#2F3E46]/20 group-hover:border-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-white text-[#2F3E46]'}`}>
                <Mail className="w-4 h-4" />
              </div>
            </a>
            
            <div className="inline-flex items-center gap-4 group cursor-pointer">
              <span className={`text-sm font-bold uppercase tracking-widest transition-colors ${isLateNight ? 'text-[#81B29A]/70 group-hover:text-[#81B29A]' : 'text-[#84A98C]/70 group-hover:text-[#84A98C]'}`}>
                Explore Systems
              </span>
              <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${isLateNight ? 'border-[#81B29A]/20 group-hover:border-[#81B29A] text-[#81B29A]' : 'border-[#84A98C]/20 group-hover:border-[#84A98C] text-[#84A98C]'}`}>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: LIVING TRANSMISSION FIELD (3D Canvas) ── */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative z-10 cursor-crosshair">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <TransmissionField isLateNight={isLateNight} />
        </Canvas>
        
        {/* Hidden Trigger Node for Easter Egg */}
        <div 
          className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full opacity-0"
          onMouseEnter={handleEasterEggEnter}
          onMouseLeave={handleEasterEggLeave}
          title="Hold to stabilize transmission..."
        />
      </div>

      {/* ── AUDIO TOGGLE ── */}
      <div className="absolute bottom-8 right-8 z-30">
        <button 
          onClick={toggleAudio}
          className={`w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-500 hover:scale-105 ${isLateNight ? 'bg-white/5 border-white/10 text-white/50 hover:text-white' : 'bg-[#2F3E46]/5 border-[#2F3E46]/10 text-[#2F3E46]/50 hover:text-[#2F3E46]'}`}
          aria-label="Toggle Ambient Sound"
        >
          {isAudioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
