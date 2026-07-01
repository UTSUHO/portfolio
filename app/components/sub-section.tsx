import { ReactNode } from "react";

interface SubSectionProps {
  title?: string;
  count?: string;
  children: ReactNode;
  className?: string;
}

export default function SubSection({
  title,
  count,
  children,
  className = "",
}: SubSectionProps) {
  return (
    <div className={`flex flex-col min-h-0 ${className}`}>
      {(title || count) && (
        <div className="flex items-center gap-2 px-4 h-8 text-xs font-mono uppercase tracking-wider border-b border-border bg-bg">
        </div>
      )}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
