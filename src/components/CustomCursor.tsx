"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useVelocity, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";

type CursorState = "default" | "button" | "text" | "system" | "hidden";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Mouse position values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the core dot (fast)
  const coreX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const coreY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  // Smooth springs for the atmospheric field (laggy/cinematic)
  const auraX = useSpring(mouseX, { stiffness: 150, damping: 30, mass: 0.8 });
  const auraY = useSpring(mouseY, { stiffness: 150, damping: 30, mass: 0.8 });

  // Springs for trail lines
  const trail1X = useSpring(mouseX, { stiffness: 400, damping: 35, mass: 0.4 });
  const trail1Y = useSpring(mouseY, { stiffness: 400, damping: 35, mass: 0.4 });
  
  const trail2X = useSpring(mouseX, { stiffness: 300, damping: 35, mass: 0.6 });
  const trail2Y = useSpring(mouseY, { stiffness: 300, damping: 35, mass: 0.6 });
  
  const trail3X = useSpring(mouseX, { stiffness: 200, damping: 35, mass: 0.8 });
  const trail3Y = useSpring(mouseY, { stiffness: 200, damping: 35, mass: 0.8 });

  // Dynamic atmospheric header lighting based on page
  const atmosphereColor = useMemo(() => {
    const path = pathname?.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    
    if (path === "/projects") return "rgba(212, 163, 115, 0.4)"; // Light Bronze
    if (path === "/research") return "rgba(132, 169, 140, 0.4)"; // Muted Teal
    if (path === "/blog") return "rgba(202, 210, 197, 0.4)"; // Ash Grey
    if (path === "/lab-notes") return "rgba(82, 121, 111, 0.6)"; // Deep Teal (unstable)
    if (path === "/contact") return "rgba(212, 163, 115, 0.5)"; // Warm Bronze
    return "rgba(82, 121, 111, 0.4)"; // Default Teal
  }, [pathname]);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setCursorState("hidden");
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const closestWithCursor = target.closest('[data-cursor]');
      const cursorType = closestWithCursor?.getAttribute('data-cursor');

      if (cursorType === 'system') {
        setCursorState('system');
        return;
      }
      if (cursorType === 'text') {
        setCursorState('text');
        return;
      }
      if (cursorType === 'button') {
        setCursorState('button');
        return;
      }

      if (target.closest('a, button, [role="button"]')) {
        setCursorState('button');
      } else if (target.closest('p, h1, h2, h3, h4, h5, h6, li, blockquote') && window.getSelection()?.toString().length === 0) {
        setCursorState('text');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (cursorState === "hidden") return null;

  // Variants for the Core Point
  const coreVariants = {
    default: { width: 8, height: 8, opacity: 1, scale: 1 },
    button: { width: 8, height: 8, opacity: 0, scale: 0 },
    text: { width: 3, height: 16, opacity: 0.8, scale: 1, borderRadius: "2px" },
    system: { width: 12, height: 12, opacity: 1, scale: 1.5, backgroundColor: "#FEFAE0" },
  };

  // Variants for the Atmospheric Field
  const auraVariants = {
    default: { width: 60, height: 60, opacity: 0.5, scale: 1, filter: "blur(20px)" },
    button: { width: 80, height: 80, opacity: 0.8, scale: 1.2, filter: "blur(15px)" },
    text: { width: 40, height: 40, opacity: 0.3, scale: 0.8, filter: "blur(25px)" },
    system: { width: 150, height: 150, opacity: 0.7, scale: 1.5, filter: "blur(40px)" },
  };

  return (
    <>
      {/* 1. Cinematic Atmospheric Field */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] mix-blend-screen"
        style={{
          x: auraX,
          y: auraY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: atmosphereColor,
          opacity: isVisible ? 1 : 0
        }}
        variants={auraVariants}
        animate={cursorState}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* 2. Trailing "Dropping Lines" Effect */}
      <motion.div
        className="fixed top-0 left-0 w-[2px] h-[12px] bg-white rounded-full pointer-events-none z-[9997] mix-blend-difference transition-opacity duration-300"
        style={{ x: trail1X, y: trail1Y, translateX: "-50%", translateY: "-50%", opacity: isVisible && cursorState === 'default' ? 0.6 : 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[2px] h-[8px] bg-white rounded-full pointer-events-none z-[9997] mix-blend-difference transition-opacity duration-300"
        style={{ x: trail2X, y: trail2Y, translateX: "-50%", translateY: "-50%", opacity: isVisible && cursorState === 'default' ? 0.4 : 0 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-[2px] h-[4px] bg-white rounded-full pointer-events-none z-[9997] mix-blend-difference transition-opacity duration-300"
        style={{ x: trail3X, y: trail3Y, translateX: "-50%", translateY: "-50%", opacity: isVisible && cursorState === 'default' ? 0.2 : 0 }}
      />

      {/* 3. Bright Orbital Circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        variants={{
          default: { width: 32, height: 32, scale: 1 },
          button: { width: 50, height: 50, scale: 1.2 },
          text: { width: 20, height: 20, scale: 0.8 },
          system: { width: 80, height: 80, scale: 1.5 },
        }}
        animate={cursorState}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div 
          className="w-full h-full rounded-full animate-[spin_4s_linear_infinite]"
          variants={{
            default: { border: "1px dashed rgba(255, 255, 255, 0.5)", borderTop: "2px solid rgba(255, 255, 255, 0.9)" },
            button: { border: "1px solid rgba(255, 255, 255, 0.8)", borderTop: "1px solid rgba(255, 255, 255, 0.8)" },
            text: { border: "1px dashed rgba(255, 255, 255, 0.2)", borderTop: "1px dashed rgba(255, 255, 255, 0.2)" },
            system: { border: "2px dotted rgba(255, 255, 255, 0.8)", borderTop: "2px solid rgba(255, 255, 255, 1)" },
          }}
          animate={cursorState}
          transition={{ duration: 0.6 }}
        />
      </motion.div>

      {/* 4. Precise Core Point */}
      <motion.div
        className="fixed top-0 left-0 bg-[#FEFAE0] rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: coreX,
          y: coreY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0
        }}
        variants={coreVariants}
        animate={cursorState}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}
