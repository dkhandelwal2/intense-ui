import { ConfettiOptions, ConfettiOrigin } from "./types";

export type FireFunction = (options?: ConfettiOptions) => void;

export function fireBasic(fire: FireFunction, origin?: ConfettiOrigin) {
  fire({
    particleCount: 80,
    spread: 200,
    startVelocity: 38,
    decay: 0.9,
    gravity: 0.65,
    ticks: 250,
    origin: origin || { x: 0.5, y: 0.7 },
  });
}

export function fireRandomDirection(fire: FireFunction, origin?: ConfettiOrigin) {
  fire({
    particleCount: 90,
    angle: Math.random() * 360,
    spread: 200,
    startVelocity: 30,
    decay: 0.9,
    gravity: 0.55,
    ticks: 250,
    origin: origin || { x: 0.5, y: 0.5 },
  });
}

export function fireFireworks(fire: FireFunction, durationMs = 5000) {
  const animationEnd = Date.now() + durationMs;
  const defaults: ConfettiOptions = {
    startVelocity: 28,
    spread: 200,
    ticks: 100,
    decay: 0.9,
    gravity: 0.55,
    zIndex: 9999,
  };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = Math.floor(40 * (timeLeft / durationMs));
    fire({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.15, 0.45), y: randomInRange(0.15, 0.4) },
    });
    fire({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.55, 0.85), y: randomInRange(0.15, 0.4) },
    });
  }, 320);

  return () => clearInterval(interval);
}

export function fireSideCannons(fire: FireFunction, durationMs = 3500) {
  const end = Date.now() + durationMs;
  const colors = [
    "#a786ff",
    "#fd8bbc",
    "#ffe4e4",
    "#9e7aff",
    "#38bdf8",
    "#34d399",
    "#f59e0b",
  ];

  let animationFrameId: number;
  const frame = () => {
    fire({
      particleCount: 3,
      angle: 60,
      spread: 32,
      startVelocity: 42,
      decay: 0.9,
      gravity: 0.6,
      ticks: 250,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    fire({
      particleCount: 3,
      angle: 120,
      spread: 32,
      startVelocity: 42,
      decay: 0.9,
      gravity: 0.6,
      ticks: 250,
      origin: { x: 1, y: 0.7 },
      colors,
    });

    if (Date.now() < end) {
      animationFrameId = requestAnimationFrame(frame);
    }
  };

  animationFrameId = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(animationFrameId);
}

export function fireStars(fire: FireFunction, origin?: ConfettiOrigin) {
  fire({
    shapes: ["star"],
    colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA3A", "#8AC926", "#38BDF8"],
    particleCount: 60,
    spread: 200,
    startVelocity: 28,
    decay: 0.9,
    gravity: 0.45,
    ticks: 240,
    origin: origin || { x: 0.5, y: 0.5 },
    scalar: 1.2,
  });
}

export function fireCustomShapes(fire: FireFunction, origin?: ConfettiOrigin) {
  fire({
    shapes: ["circle", "star", "heart", "square"],
    colors: ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#06b6d4"],
    particleCount: 75,
    spread: 55,
    startVelocity: 38,
    decay: 0.9,
    gravity: 0.6,
    ticks: 250,
    origin: origin || { x: 0.5, y: 0.7 },
    scalar: 1.1,
  });
}

export function fireEmoji(
  fire: FireFunction,
  emojis: string[] = ["🎉", "🦄", "🚀", "⭐", "💖", "🍕", "🏆", "✨"],
  origin?: ConfettiOrigin
) {
  fire({
    shapes: emojis,
    particleCount: 45,
    spread: 200,
    ticks: 250,
    gravity: 0.45,
    decay: 0.9,
    startVelocity: 30,
    scalar: 1.8,
    origin: origin || { x: 0.5, y: 0.5 },
  });
}
