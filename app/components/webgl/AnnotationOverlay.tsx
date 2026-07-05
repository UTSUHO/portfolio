import type { ProjectedAnnotation } from './types';

interface Props {
  annotations: ProjectedAnnotation[];
}

export function AnnotationOverlay({ annotations }: Props) {
  return (
    <div className="hero-annotations">
      {annotations
        .filter((item) => item.visible)
        .map((item) => (
          <div
            key={item.id}
            className={`hero-annotation hero-annotation--${item.side} ${
              item.active ? 'is-active' : ''
            }`}
            style={{
              transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
              opacity: item.opacity ?? 0.72,
            }}
          >
            <span className="hero-annotation__code">{item.label}</span>
            {item.sublabel && (
              <span className="hero-annotation__sub">{item.sublabel}</span>
            )}
          </div>
        ))}
    </div>
  );
}
