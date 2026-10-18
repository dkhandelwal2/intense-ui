"use client";

import React from "react";
import { motion } from "framer-motion";

export function Illustration500({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-full max-w-[520px] aspect-[5/3.4] mx-auto select-none pointer-events-none ${className}`}>
      {/* Intense Thermal Reactor Glow synced to --theme-primary */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-35 dark:opacity-45 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #EF4444 0%, var(--theme-primary) 35%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 500 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="reactorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--theme-primary)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.75" />
          </linearGradient>

          <radialGradient id="coreHeat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="var(--theme-primary)" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#EF4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
          </radialGradient>

          <filter id="glowFilter500" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Radiating Circuit Grid & Laser Traces ── */}
        <g opacity="0.3" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="1">
          <path d="M70,180 L180,180 L205,155" strokeDasharray="4 4" />
          <path d="M430,180 L320,180 L295,205" strokeDasharray="4 4" />
          <path d="M120,80 L190,130 L220,130" strokeDasharray="4 4" />
          <path d="M380,80 L310,130 L280,130" strokeDasharray="4 4" />
          <path d="M150,270 L210,230 L230,230" strokeDasharray="4 4" />
          <path d="M350,270 L290,230 L270,230" strokeDasharray="4 4" />
        </g>

        {/* ── 2. Giant Holographic 500 Backdrop with Glitch Lines ── */}
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
            500
          </text>
          <text
            x="250"
            y="135"
            textAnchor="middle"
            style={{
              fontSize: "112px",
              letterSpacing: "14px",
              fill: "url(#reactorGradient)",
              opacity: 0.14,
            }}
          >
            500
          </text>
        </g>

        {/* ── 3. Animated Energy Sparks & Surge Beacons ── */}
        {[
          { cx: 110, cy: 110, r: 2.2, dur: 1.8, delay: 0.1 },
          { cx: 390, cy: 110, r: 2.0, dur: 2.1, delay: 0.4 },
          { cx: 130, cy: 240, r: 1.8, dur: 1.5, delay: 0.7 },
          { cx: 370, cy: 240, r: 2.4, dur: 1.9, delay: 0.2 },
          { cx: 250, cy: 50, r: 2.5, dur: 2.3, delay: 0.9 },
        ].map((pt, i) => (
          <motion.circle
            key={i}
            cx={pt.cx}
            cy={pt.cy}
            r={pt.r}
            fill="#EF4444"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.5, 0.8] }}
            transition={{ duration: pt.dur, repeat: Infinity, delay: pt.delay }}
          />
        ))}

        {/* ── 4. Main Quantum Reactor Core ── */}
        <g transform="translate(0, 5)">
          {/* Outer Pulsing Shockwave Ring */}
          <motion.circle
            cx="250"
            cy="180"
            r="82"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.6, 0.15, 0.6] }}
            style={{ transformOrigin: "250px 180px" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Segmented Counter-Rotating Containment Ring 1 */}
          <motion.circle
            cx="250"
            cy="180"
            r="68"
            fill="none"
            stroke="#EF4444"
            strokeWidth="2.5"
            strokeDasharray="24 16 8 16"
            style={{ transformOrigin: "250px 180px" }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner Counter-Rotating Ring 2 */}
          <motion.circle
            cx="250"
            cy="180"
            r="54"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="2"
            strokeDasharray="18 10 6 10"
            style={{ transformOrigin: "250px 180px" }}
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          {/* Hexagonal Containment Chamber */}
          <motion.polygon
            points="250,135 288,157 288,203 250,225 212,203 212,157"
            className="fill-white/80 dark:fill-[#121216]/90 stroke-black/15 dark:stroke-white/20"
            strokeWidth="2"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Energy Sphere */}
          <circle cx="250" cy="180" r="32" fill="url(#coreHeat)" filter="url(#glowFilter500)" />
          <circle cx="250" cy="180" r="14" fill="#FFFFFF" />

          {/* Electric Lightning Arcs */}
          <motion.path
            d="M236,180 L248,168 L246,182 L262,176 L250,194 L252,182 Z"
            fill="var(--theme-primary)"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: [0.8, 0.2, 1, 0.4, 0.9] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "steps(4)" }}
          />

          {/* Warning Diagnostic Hazard Triangle Floating Over Core */}
          <motion.g
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          >
            <polygon
              points="250,102 264,124 236,124"
              fill="#EF4444"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              className="drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
            />
            <text x="250" y="121" textAnchor="middle" fill="#FFFFFF" fontWeight="bold" fontSize="12" fontFamily="sans-serif">
              !
            </text>
          </motion.g>

          {/* Live Status Pill */}
          <g transform="translate(195, 235)">
            <rect
              x="0"
              y="0"
              width="110"
              height="22"
              rx="11"
              className="fill-white/80 dark:fill-[#121216]/90 stroke-black/10 dark:stroke-white/15"
              strokeWidth="1"
            />
            <circle cx="14" cy="11" r="4" fill="#EF4444" className="animate-ping" />
            <circle cx="14" cy="11" r="3.5" fill="#EF4444" />
            <text
              x="26"
              y="14.5"
              className="fill-zinc-700 dark:fill-zinc-300 font-mono font-semibold"
              style={{ fontSize: "9px", letterSpacing: "0.5px" }}
            >
              CIRCUIT_FLUX
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
