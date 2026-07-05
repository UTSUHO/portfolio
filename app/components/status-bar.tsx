"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TabNav from "./tab-nav";

export function TopStatusBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const now = new Date();
  const dateStr = now
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, ".");

  return (
    <div
      className="absolute top-0 left-0 w-full z-[1] box-border"
      style={{ paddingLeft: "var(--width-sidebar)" }}
    >
      <div
        className="w-full grid grid-cols-1 lg:grid-cols-12 items-center text-xs font-mono uppercase tracking-wider bg-bg-primary text-text-secondary border-b border-subtle box-border"
        style={{ height: "var(--height-status)" }}
      >
        {/* left */}
        <div className="lg:col-span-4 flex items-center justify-between gap-4 px-6 border-r h-full">
          <span className="text-text">
            SYSTEM.LOG <span className="inline-block w-1.5 h-1.5 bg-accent" />
          </span>
        </div>
        {/* right */}
        <div className="lg:col-span-8 flex items-center h-full">
          {!isHome ? (
            <div className="w-full h-full">
              <TabNav />
            </div>
          ) : (
            <div className="flex items-center px-6 h-full w-full">
              <div className="w-[50%] flex items-center justify-between h-full border-r pr-6">
                <span>V 2.0.1</span>
                <span className="hidden sm:inline">
                  x:{mouse.x.toString().padStart(4)} y:
                  {mouse.y.toString().padStart(4)}
                </span>
              </div>
              <div className="w-[50%] flex items-center justify-end gap-4">
                <span>DATE: {dateStr}</span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 bg-accent" />
                  ONLINE
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function BottomStatusBar() {
  return (
    <div
      className="flex items-center justify-between px-6 h-8 text-xs font-mono uppercase tracking-wider bg-bg-invert text-text-secondary border-t border-subtle"
      style={{ paddingLeft: "calc(var(--width-sidebar) + 24px)" }}
    >
      <div className="flex items-center gap-4">
        <span>SYS:STABLE</span>
        <span className="hidden sm:inline">CPU:12%</span>
        <span className="hidden sm:inline">MEM:4.2GB</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">UPTIME: 99.9%</span>
        <span>&copy; {new Date().getFullYear()} REI UTSUHO</span>
      </div>
    </div>
  );
}
