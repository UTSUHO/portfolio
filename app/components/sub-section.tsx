import { ReactNode } from "react";

const semanticColors: Record<string, string> = {
  bg: "var(--color-bg)",
  "bg-primary": "var(--color-bg-primary)",
  "bg-invert": "var(--color-bg-invert)",
  "bg-accent": "var(--color-bg-accent)",
  text: "var(--color-text)",
  "text-invert": "var(--color-text-invert)",
  "text-secondary": "var(--color-text-secondary)",
  border: "var(--color-border)",
  subtle: "var(--color-subtle)",
};

function resolveColor(value: string): string {
  if (value.startsWith("#")) return value;
  return semanticColors[value] || value;
}

interface SubSectionProps {
  title?: string;
  count?: string;
  children: ReactNode;
  className?: string;
  backgroundColor?: "bg" | "bg-primary" | "bg-invert" | "bg-accent" | string;
  textColor?: "text" | "text-invert" | "text-secondary" | string;
  borderColor?: "border" | "subtle" | string;
}

export default function SubSection({
  title,
  count,
  children,
  className = "",
  backgroundColor,
  textColor = "text",
  borderColor = "border",
}: SubSectionProps) {
  return (
    <div
      className={`flex flex-col min-h-0 ${className}`}
      style={{
        backgroundColor: backgroundColor
          ? resolveColor(backgroundColor)
          : undefined,
      }}
    >
      {(title || count) && (
        <div
          className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b"
          style={{ borderColor: resolveColor(borderColor) }}
        >
          <span className="inline-block w-2 h-2 bg-accent" />
          {title && (
            <span style={{ color: resolveColor(textColor) }}>{title}</span>
          )}
          {count && (
            <span
              className="ml-auto"
              style={{ color: resolveColor(textColor) }}
            >
              {count}
            </span>
          )}
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
