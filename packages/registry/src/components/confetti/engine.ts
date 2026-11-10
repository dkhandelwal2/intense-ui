import { ConfettiOptions, ConfettiShape } from "./types";
import { drawShape } from "./shapes";

export const DEFAULT_CONFETTI_COLORS = [
  "#26ccff",
  "#a25afd",
  "#ff5e7e",
  "#88ff5a",
  "#fcff42",
  "#ffa62d",
  "#ff36ff",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  wobble: number;
  wobbleSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  color: string;
  shape: ConfettiShape;
  tick: number;
  totalTicks: number;
  size: number;
}

export class ConfettiEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  private getCssDimensions() {
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const width = this.canvas.clientWidth || (typeof window !== "undefined" ? window.innerWidth : 800);
    const height = this.canvas.clientHeight || (typeof window !== "undefined" ? window.innerHeight : 600);
    return { width, height, dpr };
  }

  public fire(options: ConfettiOptions = {}) {
    const {
      particleCount = 60,
      angle = 90,
      spread = 50,
      startVelocity = 35,
      decay = 0.9,
      gravity = 0.7,
      drift = 0,
      ticks = 250,
      origin = { x: 0.5, y: 0.5 },
      colors = DEFAULT_CONFETTI_COLORS,
      shapes = ["square", "circle"],
      scalar = 1,
    } = options;

    const { width, height } = this.getCssDimensions();
    const ox = (origin.x ?? 0.5) * width;
    const oy = (origin.y ?? 0.5) * height;

    const radAngle = (angle * Math.PI) / 180;
    const radSpread = (spread * Math.PI) / 180;

    for (let i = 0; i < particleCount; i++) {
      const pAngle = radAngle + (Math.random() - 0.5) * radSpread;
      const velocity = startVelocity * (0.65 + Math.random() * 0.45);
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      this.particles.push({
        x: ox,
        y: oy,
        vx: Math.cos(pAngle) * velocity + drift,
        vy: -Math.sin(pAngle) * velocity,
        wobble: Math.random() * 10,
        wobbleSpeed: 0.05 + Math.random() * 0.1,
        tiltAngle: Math.random() * Math.PI * 2,
        tiltSpeed: 0.05 + Math.random() * 0.05,
        color,
        shape,
        tick: 0,
        totalTicks: ticks,
        size: (9 + Math.random() * 6) * scalar,
      });
    }

    if (!this.animationId) {
      this.loop(decay, gravity);
    }
  }

  public reset() {
    this.particles = [];
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private loop(decay: number, gravity: number) {
    if (!this.ctx) return;

    const { height, dpr } = this.getCssDimensions();

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= decay;
      p.vy *= decay;
      p.vy += gravity * 0.22;
      p.x += p.vx;
      p.y += p.vy;

      p.wobble += p.wobbleSpeed;
      p.tiltAngle += p.tiltSpeed;
      p.tick++;

      if (p.tick >= p.totalTicks || p.y > height + 80) {
        this.particles.splice(i, 1);
        continue;
      }

      const alpha = Math.max(0, 1 - p.tick / p.totalTicks);
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.tiltAngle);
      this.ctx.scale(Math.cos(p.wobble), 1);
      this.ctx.globalAlpha = alpha;
      drawShape(this.ctx, p.shape, p.size, p.color);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.loop(decay, gravity));
    } else {
      this.animationId = null;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
