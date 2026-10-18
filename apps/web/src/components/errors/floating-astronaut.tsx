"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function FloatingAstronaut({ className = "" }: { className?: string }) {
  // Interactive mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for natural fluid zero-g reaction
  const smoothX = useSpring(mouseX, { stiffness: 45, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 45, damping: 25 });

  const parallaxX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
  const parallaxY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);
  const parallaxRotate = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xPercent = e.clientX / innerWidth - 0.5;
      const yPercent = e.clientY / innerHeight - 0.5;
      mouseX.set(xPercent);
      mouseY.set(yPercent);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* ── Ambient Soft Glow Behind Spaceman ── */}
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-35 pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, var(--theme-primary) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)",
        }}
      />

      {/* ── Parallax Container ── */}
      <motion.div
        style={{ x: parallaxX, y: parallaxY, rotate: parallaxRotate }}
        className="relative"
      >
        {/* ── Wandering Zero-G Floating Motion ── */}
        <motion.div
          animate={{
            x: [-24, 30, -18, 26, -24],
            y: [-28, 22, -26, 28, -28],
            rotate: [-7, 8, -4, 9, -7],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          drag
          dragElastic={0.25}
          dragConstraints={{ left: -120, right: 120, top: -120, bottom: 120 }}
          whileDrag={{ scale: 1.05, cursor: "grabbing" }}
          className="relative cursor-grab active:cursor-grabbing"
          title="Drag the space master around!"
        >
          {/* Micro Thruster Jetpack Particles */}
          <motion.div
            className="absolute top-1/3 left-6 w-3 h-3 rounded-full blur-xs pointer-events-none"
            style={{ backgroundColor: "var(--theme-primary)" }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.8, 0.2],
              x: [-5, -28],
              y: [5, 18],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 2.5,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute top-1/3 right-10 w-2.5 h-2.5 rounded-full blur-xs pointer-events-none"
            style={{ backgroundColor: "#38BDF8" }}
            animate={{
              opacity: [0, 0.7, 0],
              scale: [0.5, 1.5, 0.2],
              x: [5, 24],
              y: [5, 18],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              repeatDelay: 3.2,
              ease: "easeOut",
            }}
          />

          {/* Astronaut 3D Render (Generic Spacemaster with 100% Alpha Transparency) */}
          <div className="relative w-[280px] h-[340px] sm:w-[340px] sm:h-[420px] md:w-[400px] md:h-[500px]">
            <Image
              src="/astronaut.png"
              alt="Floating Space Master"
              fill
              priority
              sizes="(max-width: 768px) 340px, 420px"
              className="object-contain pointer-events-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Interactive Tooltip Hint on Hover */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-zinc-400 opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg">
            <span>zero-g • grab to float</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
