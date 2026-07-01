"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const tabs = [
  { href: "/", label: "HOME", anchor: "dashboard" },
  { href: "/projects", label: "WORKS", anchor: "showcase" },
  { href: "/resume", label: "RESUME" },
  { href: "/library", label: "LIBRARY" },
  { href: "/notes", label: "LOG" },
];

export default function TabNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav
      className="grid grid-cols-6 w-full box-border"
      style={{ height: "var(--height-navbar)" }}
    >
      {tabs.map((tab, index) =>
        isHome && tab.anchor ? (
          <a
            key={tab.href}
            href={`#${tab.anchor}`}
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary border-r border-t border-b border-border hover:text-text transition-colors duration-150"
          >
            <div className="text-4xl bg-transparent">
              <span>0{index+1}</span>
              <br />
              <span>{tab.label}</span>
            </div>
          </a>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary border-r border-t border-b border-border hover:text-text transition-colors duration-150"
          >
            <div className="text-4xl bg-transparent">
              <span>0{index+1}</span>
              <br />
              <span>{tab.label}</span>
            </div>
          </Link>
        )
      )}

      {/* Default block - opens sheet menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider text-text-secondary border-r border-t border-b border-border hover:text-text transition-colors duration-150 cursor-pointer"
            >
              <span className="inline-block text-4xl bg-transparent">MORE</span>
            </button>
          }
        />
        <SheetContent
          side="bottom"
          className="bg-bg-primary border-t border-border"
        >
          <SheetHeader>
            <SheetTitle className="text-xs font-mono uppercase tracking-wider text-text-secondary">
              NAVIGATION_MENU
            </SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-0 p-4">
            {tabs.map((tab) =>
              isHome && tab.anchor ? (
                <a
                  key={tab.href}
                  href={`#${tab.anchor}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 h-12 text-xs font-mono uppercase tracking-wider text-text-secondary border-b border-border hover:text-text hover:bg-bg transition-colors"
                >
                  <span className="inline-block w-2 h-2 bg-accent" />
                  {tab.label}
                </a>
              ) : (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-4 h-12 text-xs font-mono uppercase tracking-wider text-text-secondary border-b border-border hover:text-text hover:bg-bg transition-colors"
                >
                  <span className="inline-block w-2 h-2 bg-accent" />
                  {tab.label}
                </Link>
              )
            )}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
