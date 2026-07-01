"use client";

import { useRef, useEffect } from "react";
import styles from "./webgl-slot.module.css";

interface WebGLSlotProps {
  index: number;
  className?: string;
  onMount?: (element: HTMLDivElement, index: number) => void;
  onUnmount?: (element: HTMLDivElement, index: number) => void;
}

export default function WebGLSlot({
  index,
  className = "",
  onMount,
  onUnmount,
}: WebGLSlotProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.setAttribute("data-webgl-slot", String(index));
    onMount?.(el, index);

    return () => {
      onUnmount?.(el, index);
    };
  }, [index, onMount, onUnmount]);

  return (
    <div
      ref={ref}
      data-webgl-slot={index}
      className={`${styles["webgl-container"]} ${className}`}
    >
      <div className={styles["webgl-header"]}></div>
      <div className={styles["webgl-content"]}></div>
      <div
        className={styles["webgl-footer"]}
        data-index={`[${String(index).padStart(2, "0")}]`}
      ></div>
    </div>
  );
}
