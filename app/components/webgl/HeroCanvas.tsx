'use client';

import { useEffect, useRef, useState } from 'react';
import { HeroSceneController } from '@/lib/webgl/hero/HeroSceneController';
import { AnnotationOverlay } from './AnnotationOverlay';
import type { ProjectedAnnotation } from './types';

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [annotations, setAnnotations] = useState<ProjectedAnnotation[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const controller = new HeroSceneController(containerRef.current, {
      onAnnotationUpdate: setAnnotations,
    });
    controller.init();

    return () => {
      controller.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-canvas">
      <AnnotationOverlay annotations={annotations} />
    </div>
  );
}
