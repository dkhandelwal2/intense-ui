"use client";

import React from "react";
import { motion } from "framer-motion";

export function Illustration503({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center w-full max-w-[520px] aspect-[5/3.4] mx-auto select-none pointer-events-none ${className}`}>
      {/* Ambient Calibration Aura synced to --theme-primary */}
      <div 
        className="absolute inset-0 rounded-full blur-3xl opacity-30 dark:opacity-40 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, #3B82F6 0%, var(--theme-primary) 40%, transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 500 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_15px_45px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <linearGradient id="scanBeam" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-primary)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
          </linearGradient>

          <linearGradient id="themeLinear503" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--theme-primary)" stopOpacity="0.8" />
          </linearGradient>

          <filter id="glowFilter503" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── 1. Holographic Blueprint Coordinate Grid ── */}
        <g opacity="0.3" className="stroke-zinc-400 dark:stroke-zinc-600" strokeWidth="0.8">
          <ellipse cx="250" cy="255" rx="135" ry="36" strokeDasharray="3 4" />
          <line x1="115" y1="255" x2="385" y2="255" strokeDasharray="4 4" />
          <line x1="250" y1="219" x2="250" y2="291" strokeDasharray="4 4" />
          {/* Target Alignment Crosshairs */}
          <circle cx="250" cy="255" r="14" stroke="var(--theme-primary)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="250" cy="255" r="2.5" fill="var(--theme-primary)" />
        </g>

        {/* ── 2. Holographic Scan Beam ── */}
        <motion.polygon
          points="250,170 150,265 350,265"
          fill="url(#scanBeam)"
          animate={{ opacity: [0.35, 0.7, 0.35], scaleX: [0.95, 1.05, 0.95] }}
          style={{ transformOrigin: "250px 170px" }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* ── 3. Giant Holographic 503 Backdrop ── */}
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
            503
          </text>
          <text
            x="250"
            y="135"
            textAnchor="middle"
            style={{
              fontSize: "112px",
              letterSpacing: "14px",
              fill: "url(#themeLinear503)",
              opacity: 0.14,
            }}
          >
            503
          </text>
        </g>

        {/* ── 4. Main Floating Maintenance Drone / Satellite ── */}
        <motion.g
          animate={{ y: [-7, 6, -7] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Rotating Calibration Gyro Rings */}
          <motion.ellipse
            cx="250"
            cy="165"
            rx="64"
            ry="24"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="1.6"
            strokeDasharray="14 8 4 8"
            style={{ transformOrigin: "250px 165px", rotate: -15 }}
            animate={{ rotate: [-15, 345] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.ellipse
            cx="250"
            cy="165"
            rx="48"
            ry="18"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.2"
            strokeDasharray="6 6"
            style={{ transformOrigin: "250px 165px", rotate: 20 }}
            animate={{ rotate: [20, -340] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />

          {/* Left Solar Wing Array */}
          <g transform="translate(145, 148)">
            <rect
              x="0"
              y="0"
              width="60"
              height="32"
              rx="4"
              className="fill-white/85 dark:fill-[#141419]/90 stroke-black/15 dark:stroke-white/20"
              strokeWidth="1.5"
            />
            {/* Wing Cells */}
            <line x1="20" y1="0" x2="20" y2="32" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
            <line x1="40" y1="0" x2="40" y2="32" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="16" x2="60" y2="16" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Right Solar Wing Array */}
          <g transform="translate(295, 148)">
            <rect
              x="0"
              y="0"
              width="60"
              height="32"
              rx="4"
              className="fill-white/85 dark:fill-[#141419]/90 stroke-black/15 dark:stroke-white/20"
              strokeWidth="1.5"
            />
            {/* Wing Cells */}
            <line x1="20" y1="0" x2="20" y2="32" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
            <line x1="40" y1="0" x2="40" y2="32" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="16" x2="60" y2="16" stroke="var(--theme-primary)" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Connector Rods */}
          <line x1="205" y1="164" x2="225" y2="164" stroke="var(--theme-primary)" strokeWidth="3" strokeLinecap="round" />
          <line x1="275" y1="164" x2="295" y2="164" stroke="var(--theme-primary)" strokeWidth="3" strokeLinecap="round" />

          {/* Central Satellite Body (Capsule) */}
          <rect
            x="224"
            y="140"
            width="52"
            height="50"
            rx="16"
            className="fill-white dark:fill-[#181820] stroke-black/20 dark:stroke-white/25"
            strokeWidth="1.8"
          />

          {/* Center Sensor Lens (Glowing Eye) */}
          <circle cx="250" cy="165" r="14" fill="#3B82F6" opacity="0.2" />
          <circle cx="250" cy="165" r="9" fill="var(--theme-primary)" filter="url(#glowFilter503)" />
          <circle cx="250" cy="165" r="4" fill="#FFFFFF" />

          {/* Antenna with Blinking Signal */}
          <line x1="250" y1="140" x2="250" y2="118" stroke="var(--theme-primary)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="250" cy="115" r="3.5" fill="var(--theme-primary)" />
          <motion.circle
            cx="250"
            cy="115"
            r="8"
            fill="none"
            stroke="var(--theme-primary)"
            strokeWidth="1"
            animate={{ scale: [1, 2], opacity: [0.9, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />

          {/* Status Badge Pill */}
          <g transform="translate(195, 205)">
            <rect
              x="0"
              y="0"
              width="110"
              height="22"
              rx="11"
              className="fill-white/80 dark:fill-[#121216]/90 stroke-black/10 dark:stroke-white/15"
              strokeWidth="1"
            />
            <circle cx="14" cy="11" r="3.5" fill="#3B82F6" className="animate-pulse" />
            <text
              x="26"
              y="14.5"
              className="fill-zinc-700 dark:fill-zinc-300 font-mono font-semibold"
              style={{ fontSize: "9px", letterSpacing: "0.5px" }}
            >
              CALIBRATING
            </text>
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
