"use client";

import React from "react";
import { motion } from "framer-motion";

export function Illustration404({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-full max-w-[520px] aspect-[5/3.4] mx-auto select-none pointer-events-none ${className}`}>
      {/* Ambient background neon aura synced to --theme-primary */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-30 dark:opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--theme-primary) 0%, rgba(255, 0, 132, 0.15) 45%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 500 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="themeLinear404" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0.05" />
          </linearGradient>

          <linearGradient id="cubeRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0.15" />
          </linearGradient>

          <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.5" />
            <stop offset="70%" stopColor="var(--theme-primary)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter404" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Digital Perspective Grid Lines ── */}
        <g opacity="0.25" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="0.8" strokeDasharray="3 4">
          <line x1="60" y1="280" x2="440" y2="280" />
          <line x1="90" y1="250" x2="410" y2="250" />
          <line x1="130" y1="225" x2="370" y2="225" />
          <line x1="170" y1="205" x2="330" y2="205" />
          <line x1="250" y1="190" x2="60" y2="280" />
          <line x1="250" y1="190" x2="160" y2="280" />
          <line x1="250" y1="190" x2="340" y2="280" />
          <line x1="250" y1="190" x2="440" y2="280" />
        </g>

        {/* ── 2. Atmospheric Radar Ping Wave ── */}
        <motion.ellipse
          cx="250"
          cy="200"
          rx="120"
          ry="45"
          fill="url(#radarPulse)"
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: [0.6, 1.4, 1.8], opacity: [0.7, 0.25, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
        />

        {/* ── 3. Giant Holographic 404 Backdrop ── */}
        <g className="font-mono font-extrabold select-none">
          <text
            x="250"
            y="135"
            textAnchor="middle"
            className="fill-none stroke-zinc-300/40 dark:stroke-zinc-700/35"
            strokeWidth="3"
            strokeDasharray="6 6"
            style={{ fontSize: "112px", letterSpacing: "14px" }}
          >
            404
          </text>
          <text
            x="250"
            y="135"
            textAnchor="middle"
            style={{
              fontSize: "112px",
              letterSpacing: "14px",
              fill: "url(#themeLinear404)",
              opacity: 0.14,
            }}
          >
            404
          </text>
        </g>

        {/* ── 4. Twinkling Floating Particles / Stars ── */}
        {[
          { cx: 90, cy: 75, r: 2.2, dur: 2.2, delay: 0 },
          { cx: 140, cy: 110, r: 1.5, dur: 3.1, delay: 0.7 },
          { cx: 370, cy: 70, r: 2.5, dur: 2.6, delay: 0.3 },
          { cx: 420, cy: 125, r: 1.8, dur: 3.4, delay: 1.2 },
          { cx: 330, cy: 45, r: 2.0, dur: 2.8, delay: 0.5 },
          { cx: 180, cy: 50, r: 1.4, dur: 3.0, delay: 1.0 },
          { cx: 250, cy: 35, r: 2.2, dur: 2.5, delay: 1.5 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.cx}
            cy={pt.cy}
            r={pt.r}
            fill="var(--theme-primary)"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: pt.dur, repeat: Infinity, delay: pt.delay, ease: "easeInOut" }}
          />
        ))}

        {/* ── 5. Main Floating Quantum Node / Void Cube ── */}
        <motion.g
          animate={{ y: [-8, 7, -8] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Orbital Laser Rings (Tilted) */}
          <motion.ellipse
            cx="250"
            cy="185"
            rx="115"
            ry="40"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="1.5"
            strokeDasharray="12 8 4 8"
            className="opacity-70 dark:opacity-85"
            style={{ transformOrigin: "250px 185px", rotate: -18 }}
            animate={{ rotate: [-18, 342] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.ellipse
            cx="250"
            cy="185"
            rx="95"
            ry="32"
            fill="none"
            stroke="#8A2BE2"
            strokeWidth="1.2"
            strokeDasharray="8 6"
            className="opacity-60 dark:opacity-75"
            style={{ transformOrigin: "250px 185px", rotate: 24 }}
            animate={{ rotate: [24, -336] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          />

          {/* Central Cube Shadow */}
          <ellipse cx="250" cy="245" rx="42" ry="14" fill="rgba(0,0,0,0.18)" filter="blur(4px)" className="dark:fill-black/50" />

          {/* Isometric Cube Faces */}
          {/* Left Face */}
          <polygon
            points="250,185 205,160 205,215 250,240"
            fill="url(#cubeLeft)"
            stroke="var(--theme-primary)"
            strokeWidth="1.5"
            strokeOpacity="0.75"
            className="backdrop-blur-sm"
          />
          {/* Right Face */}
          <polygon
            points="250,185 295,160 295,215 250,240"
            fill="url(#cubeRight)"
            stroke="var(--theme-primary)"
            strokeWidth="1.5"
            strokeOpacity="0.85"
            className="backdrop-blur-sm"
          />
          {/* Top Face */}
          <polygon
            points="250,135 295,160 250,185 205,160"
            fill="url(#cubeTop)"
            stroke="var(--theme-primary)"
            strokeWidth="1.8"
            strokeOpacity="0.95"
            className="backdrop-blur-sm"
          />

          {/* Internal Glowing Quantum Core */}
          <circle cx="250" cy="185" r="9" fill="var(--theme-primary)" filter="url(#glowFilter404)" />
          <circle cx="250" cy="185" r="4.5" fill="#FFFFFF" />

          {/* Floating Disconnected Circuit Fragments */}
          <motion.g
            animate={{ x: [-3, 4, -3], y: [-4, 3, -4], rotate: [-4, 6, -4] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon
              points="175,130 190,120 185,140"
              fill="var(--theme-primary)"
              fillOpacity="0.3"
              stroke="var(--theme-primary)"
              strokeWidth="1"
            />
          </motion.g>

          <motion.g
            animate={{ x: [4, -5, 4], y: [3, -5, 3], rotate: [5, -7, 5] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <polygon
              points="315,135 330,125 328,145"
              fill="var(--theme-primary)"
              fillOpacity="0.35"
              stroke="var(--theme-primary)"
              strokeWidth="1"
            />
          </motion.g>

          <motion.g
            animate={{ y: [-5, 6, -5] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          >
            <rect
              x="242"
              y="105"
              width="16"
              height="16"
              rx="4"
              fill="none"
              stroke="var(--theme-primary)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
              transform="rotate(45 250 113)"
              opacity="0.8"
            />
          </motion.g>

          {/* Data Tag Pill Floating on Top */}
          <g transform="translate(205, 80)">
            <rect
              x="0"
              y="0"
              width="90"
              height="20"
              rx="10"
              className="fill-white/80 dark:fill-[#121216]/90 stroke-black/10 dark:stroke-white/15"
              strokeWidth="1"
            />
            <circle cx="12" cy="10" r="3.5" fill="var(--theme-primary)" className="animate-pulse" />
            <text
              x="22"
              y="13.5"
              className="fill-zinc-700 dark:fill-zinc-300 font-mono font-semibold"
              style={{ fontSize: "9px", letterSpacing: "0.5px" }}
            >
              NOT_FOUND
            </text>
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
