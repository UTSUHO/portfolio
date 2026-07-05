"use client";

import { HeroCanvas } from "./webgl/HeroCanvas";

export default function HeroVisual() {
  return (
    <div className="w-full h-full flex-1 relative border-b overflow-hidden">
      <HeroCanvas />
    </div>
  );
}
