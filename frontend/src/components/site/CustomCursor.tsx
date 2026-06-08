"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for smooth trailing effect
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 250, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 250, mass: 0.5 });

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const isMobileDevice = window.matchMedia("(max-width: 768px)").matches || 
                            ("ontouchstart" in window) || 
                            (navigator.maxTouchPoints > 0);
      setIsMobile(isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Setup interactive listeners
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, select, input, textarea, [role="button"], .interactive-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovered(true));
        el.addEventListener("mouseleave", () => setIsHovered(false));
      });
    };

    // Initial attach
    addHoverListeners();

    // Re-attach listeners when DOM changes (e.g. navigation or updates)
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isMobile, isVisible, mouseX, mouseY]);

  // CSS injection to hide default cursor on desktop
  useEffect(() => {
    if (!isMobile) {
      document.documentElement.classList.add("custom-cursor-active");
    } else {
      document.documentElement.classList.remove("custom-cursor-active");
    }
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Small Center Dot (moves instantly) */}
      <motion.div
        className="fixed top-0 left-0 size-2 rounded-full bg-accent pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* 2. Large Trailing Ring (spring physics, expands on hover) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? "rgba(229, 184, 105, 0.08)" : "rgba(229, 184, 105, 0)",
          borderColor: isHovered ? "rgba(229, 184, 105, 1)" : "rgba(229, 184, 105, 0.5)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />
    </>
  );
}
