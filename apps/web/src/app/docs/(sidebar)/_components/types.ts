import React from "react";

export interface DocPillar {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  gradient: string;
  highlights: string[];
}

export interface DocFaqItem {
  question: string;
  answer: string;
  category: string;
}
