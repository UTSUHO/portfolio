"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Grip } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const tabs = [
  { href: "/", label: "HOME", anchor: "dashboard" },
  { href: "/projects", label: "PROJECTS"},
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
      className="grid grid-cols-6 w-full box-border border-b bg-bg-primary"
      style={{ height: "var(--height-navbar)" }}
    >
      {tabs.map((tab, index) => {
        const isActive = tab.href === pathname || (isHome && tab.href === "/");
        const baseClass =
          "flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-wider border-r border-t border-b border-border hover:text-text transition-colors duration-150";
        const activeClass = isActive
          ? "bg-accent text-text"
          : "text-text-secondary";

        return isHome && tab.anchor ? (
          <a
            key={tab.href}
            href={`#${tab.anchor}`}
            className={`${baseClass} ${activeClass}`}
          >
            <div className="text-3xl bg-transparent">
              <span>0{index + 1}</span>
              <br />
              <span>{tab.label}</span>
            </div>
          </a>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            className={`${baseClass} ${activeClass}`}
          >
            <div className="text-3xl bg-transparent">
              <span>0{index + 1}</span>
              <br />
              <span>{tab.label}</span>
            </div>
          </Link>
        );
      })}

      {/* Default block - opens sheet menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-text-secondary border-r border-t border-b border-border hover:text-text transition-colors duration-150 cursor-pointer"
            >
              <Grip className="w-20 h-20" />
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
