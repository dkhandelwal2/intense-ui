"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Pre-computed fixed stars array (integers only) to eliminate any SSR hydration discrepancy
const FIXED_STARS = [
  { id: 1, x: 5, y: 8, s: 1.5, o: 0.8, d: 2.5, dl: 0.2 },
  { id: 2, x: 12, y: 22, s: 2.2, o: 0.9, d: 3.1, dl: 0.7 },
  { id: 3, x: 18, y: 14, s: 1.2, o: 0.6, d: 2.2, dl: 1.1 },
  { id: 4, x: 24, y: 35, s: 2.0, o: 0.85, d: 3.5, dl: 0.4 },
  { id: 5, x: 31, y: 12, s: 1.6, o: 0.75, d: 2.8, dl: 1.5 },
  { id: 6, x: 38, y: 28, s: 2.5, o: 1.0, d: 3.2, dl: 0.1 },
  { id: 7, x: 44, y: 18, s: 1.4, o: 0.65, d: 2.6, dl: 0.9 },
  { id: 8, x: 52, y: 38, s: 1.8, o: 0.8, d: 3.4, dl: 1.3 },
  { id: 9, x: 59, y: 10, s: 2.4, o: 0.95, d: 2.9, dl: 0.5 },
  { id: 10, x: 67, y: 25, s: 1.5, o: 0.7, d: 3.3, dl: 1.7 },
  { id: 11, x: 73, y: 15, s: 2.0, o: 0.9, d: 2.4, dl: 0.3 },
  { id: 12, x: 81, y: 32, s: 1.2, o: 0.6, d: 3.6, dl: 1.2 },
  { id: 13, x: 88, y: 12, s: 2.2, o: 0.85, d: 2.7, dl: 0.8 },
  { id: 14, x: 94, y: 26, s: 1.6, o: 0.75, d: 3.0, dl: 1.4 },
  { id: 15, x: 8, y: 48, s: 1.8, o: 0.8, d: 3.1, dl: 0.6 },
  { id: 16, x: 15, y: 62, s: 1.4, o: 0.65, d: 2.5, dl: 1.0 },
  { id: 17, x: 22, y: 52, s: 2.2, o: 0.9, d: 3.4, dl: 0.2 },
  { id: 18, x: 29, y: 68, s: 1.5, o: 0.7, d: 2.8, dl: 1.6 },
  { id: 19, x: 36, y: 55, s: 2.4, o: 0.95, d: 3.3, dl: 0.4 },
  { id: 20, x: 42, y: 45, s: 1.2, o: 0.6, d: 2.6, dl: 1.2 },
  { id: 21, x: 49, y: 64, s: 1.8, o: 0.85, d: 3.0, dl: 0.7 },
  { id: 22, x: 56, y: 50, s: 2.0, o: 0.8, d: 2.7, dl: 1.5 },
  { id: 23, x: 63, y: 60, s: 1.6, o: 0.75, d: 3.5, dl: 0.3 },
  { id: 24, x: 71, y: 48, s: 2.2, o: 0.9, d: 2.9, dl: 1.1 },
  { id: 25, x: 78, y: 58, s: 1.4, o: 0.65, d: 3.2, dl: 0.8 },
  { id: 26, x: 85, y: 46, s: 2.5, o: 1.0, d: 2.4, dl: 0.1 },
  { id: 27, x: 92, y: 54, s: 1.5, o: 0.7, d: 3.6, dl: 1.3 },
  { id: 28, x: 97, y: 42, s: 1.8, o: 0.8, d: 2.8, dl: 0.5 },
  { id: 29, x: 4, y: 32, s: 1.2, o: 0.6, d: 3.0, dl: 1.8 },
  { id: 30, x: 19, y: 40, s: 2.0, o: 0.85, d: 2.5, dl: 0.9 },
  { id: 31, x: 33, y: 42, s: 1.6, o: 0.7, d: 3.2, dl: 1.4 },
  { id: 32, x: 47, y: 22, s: 2.2, o: 0.9, d: 2.8, dl: 0.6 },
  { id: 33, x: 61, y: 36, s: 1.4, o: 0.65, d: 3.4, dl: 1.0 },
  { id: 34, x: 76, y: 20, s: 2.4, o: 0.95, d: 2.6, dl: 0.2 },
  { id: 35, x: 89, y: 38, s: 1.5, o: 0.75, d: 3.1, dl: 1.5 },
  { id: 36, x: 10, y: 72, s: 1.8, o: 0.8, d: 2.9, dl: 0.7 },
  { id: 37, x: 26, y: 76, s: 1.2, o: 0.6, d: 3.5, dl: 1.3 },
  { id: 38, x: 40, y: 70, s: 2.0, o: 0.85, d: 2.7, dl: 0.4 },
  { id: 39, x: 54, y: 74, s: 1.6, o: 0.7, d: 3.3, dl: 1.6 },
  { id: 40, x: 68, y: 72, s: 2.2, o: 0.9, d: 2.4, dl: 0.8 },
  { id: 41, x: 82, y: 70, s: 1.4, o: 0.65, d: 3.0, dl: 1.1 },
  { id: 42, x: 95, y: 68, s: 2.0, o: 0.85, d: 3.2, dl: 0.5 },
  { id: 43, x: 14, y: 6, s: 1.6, o: 0.75, d: 2.8, dl: 1.2 },
  { id: 44, x: 28, y: 4, s: 2.4, o: 1.0, d: 3.4, dl: 0.3 },
  { id: 45, x: 46, y: 8, s: 1.2, o: 0.6, d: 2.5, dl: 1.7 },
  { id: 46, x: 64, y: 5, s: 2.0, o: 0.85, d: 3.1, dl: 0.9 },
  { id: 47, x: 80, y: 7, s: 1.5, o: 0.7, d: 2.7, dl: 1.4 },
  { id: 48, x: 91, y: 4, s: 2.2, o: 0.9, d: 3.5, dl: 0.1 },
];

export function SpaceCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none select-none -z-10 bg-[#000000]">
      {/* ── 1. Deep Cosmic Space Background ── */}
      <div className="absolute inset-0 bg-[#000002]" />

      {/* ── 2. Twinkling Shining White Stars (Mounted to prevent SSR mismatch) ── */}
      {mounted &&
        FIXED_STARS.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
              boxShadow:
                star.s > 2
                  ? "0 0 6px 1px rgba(255,255,255,0.9)"
                  : "0 0 3px rgba(255,255,255,0.6)",
            }}
            initial={{ opacity: star.o * 0.4 }}
            animate={{
              opacity: [star.o * 0.3, star.o, star.o * 0.3],
              scale: [0.85, 1.2, 0.85],
            }}
            transition={{
              duration: star.d,
              repeat: Infinity,
              delay: star.dl,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* ── 3. Realistic Shooting Stars (Meteors) Streaking Across Deep Space ── */}
      {mounted && (
        <>
          {/* Meteor 1 (High-velocity streak across upper-right cosmos) */}
          <motion.div
            className="absolute pointer-events-none select-none z-10"
            style={{
              top: "16%",
              right: "24%",
              rotate: "-35deg",
            }}
            initial={{ x: 140, y: -80, opacity: 0 }}
            animate={{
              x: [140, -420],
              y: [-80, 260],
              opacity: [0, 1, 0.8, 0],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              repeatDelay: 6.5,
              ease: "easeOut",
            }}
          >
            <div className="relative flex items-center">
              {/* Tapered Needle Ion Trail */}
              <div className="w-40 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-white" />
              {/* Incandescent Meteor Nucleus */}
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_2px_#ffffff,0_0_12px_3px_rgba(255,0,132,0.5)] -ml-1" />
            </div>
          </motion.div>

          {/* Meteor 2 (Distant swift streak across upper-left cosmos) */}
          <motion.div
            className="absolute pointer-events-none select-none z-10"
            style={{
              top: "28%",
              left: "26%",
              rotate: "-42deg",
            }}
            initial={{ x: 100, y: -60, opacity: 0 }}
            animate={{
              x: [100, -360],
              y: [-60, 240],
              opacity: [0, 1, 0.7, 0],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              delay: 3.5,
              repeatDelay: 8.5,
              ease: "easeOut",
            }}
          >
            <div className="relative flex items-center">
              <div className="w-32 sm:w-44 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-white" />
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_2px_#ffffff,0_0_10px_3px_rgba(56,189,248,0.5)] -ml-1" />
            </div>
          </motion.div>

          {/* Meteor 3 (Subtle faint high-altitude micro-meteor) */}
          <motion.div
            className="absolute pointer-events-none select-none z-10"
            style={{
              top: "10%",
              left: "50%",
              rotate: "-32deg",
            }}
            initial={{ x: 80, y: -40, opacity: 0 }}
            animate={{
              x: [80, -280],
              y: [-40, 180],
              opacity: [0, 0.8, 0.5, 0],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: 7,
              repeatDelay: 11,
              ease: "easeOut",
            }}
          >
            <div className="relative flex items-center">
              <div className="w-24 sm:w-36 h-[0.75px] bg-gradient-to-r from-transparent via-white/30 to-white" />
              <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_4px_1px_#ffffff]" />
            </div>
          </motion.div>
        </>
      )}

      {/* ── 4. Realistic Semi-Earth Horizon at the Bottom (Matching Reference Image) ── */}
      <div className="absolute bottom-0 inset-x-0 h-[22vh] min-h-[160px] max-h-[300px] pointer-events-none select-none overflow-hidden">
        {/* Atmospheric Rayleigh Scattering Aura (Soft cyan/blue glow bleeding upward into space) */}
        <div
          className="absolute -top-12 inset-x-0 h-32 blur-2xl opacity-75"
          style={{
            background:
              "radial-gradient(ellipse 65% 100% at 50% 100%, rgba(56, 189, 248, 0.6) 0%, rgba(14, 165, 233, 0.35) 40%, rgba(2, 132, 199, 0.15) 70%, transparent 100%)",
          }}
        />

        {/* Razor-sharp Atmospheric Limb Arc with SVG */}
        <svg
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            {/* Deep Ocean Planetary Fill Gradient */}
            <linearGradient id="earthBodyGradient" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#4A8BC2" />
              <stop offset="12%" stopColor="#2563EB" />
              <stop offset="28%" stopColor="#1D4ED8" />
              <stop offset="55%" stopColor="#0F2856" />
              <stop offset="85%" stopColor="#08142C" />
              <stop offset="100%" stopColor="#030814" />
            </linearGradient>

            {/* Glowing Atmospheric Edge Gradient */}
            <linearGradient id="limbGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56, 189, 248, 0.2)" />
              <stop offset="20%" stopColor="rgba(125, 211, 252, 0.85)" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="80%" stopColor="rgba(125, 211, 252, 0.85)" />
              <stop offset="100%" stopColor="rgba(56, 189, 248, 0.2)" />
            </linearGradient>

            {/* Cloud Noise / Swirl Mask */}
            <radialGradient id="cloudHaze1" cx="35%" cy="30%" r="45%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="cloudHaze2" cx="70%" cy="40%" r="40%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="60%" stopColor="rgba(255, 255, 255, 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Curved Planet Body (Gentle planetary curve matching ISS / satellite photos) */}
          <path
            d="M -50,45 Q 720,-20 1490,45 L 1490,260 L -50,260 Z"
            fill="url(#earthBodyGradient)"
          />

          {/* Wispy Cloud Layers over Planet Body */}
          <path
            d="M -50,45 Q 720,-20 1490,45 L 1490,260 L -50,260 Z"
            fill="url(#cloudHaze1)"
            opacity="0.7"
          />
          <path
            d="M -50,45 Q 720,-20 1490,45 L 1490,260 L -50,260 Z"
            fill="url(#cloudHaze2)"
            opacity="0.6"
          />

          {/* Glowing Atmospheric Limb Stroke */}
          <path
            d="M -50,45 Q 720,-20 1490,45"
            fill="none"
            stroke="url(#limbGlowGradient)"
            strokeWidth="3"
            filter="drop-shadow(0 0 12px rgba(56, 189, 248, 0.95)) drop-shadow(0 0 25px rgba(14, 165, 233, 0.8))"
          />
        </svg>
      </div>
    </div>
  );
}
