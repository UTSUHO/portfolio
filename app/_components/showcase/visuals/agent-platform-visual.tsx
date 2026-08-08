"use client";

import { useRef, useMemo } from "react";
import gsap from "gsap";
import { easings } from "animejs";
import type { EasingFunction } from "animejs";
import styles from "../showcase.module.css";
import useSvgFlowAnimation, { type FlowNode } from "../use-svg-flow-animation";

const wsRows = ["SESSIONS", "SKILLS", "MCP", "FILE_MANAGEMENT", "VNC_RDP"];

const flowNodes = [
  { x: 40, label: "FRONTEND-APP", n: "01" },
  { x: 120, label: "K8S-GATEWAYS", n: "02" },
  { x: 200, label: "BACKEND-SERVER", n: "03" },
  { x: 280, label: "REDIS", n: "04" },
  { x: 360, label: "DATABASE", n: "05" },
];

const BRANCH_Y = 280;
const FORK_NODE_INDEX = 1;
const forkNode = flowNodes[FORK_NODE_INDEX];
const forkX = forkNode.x;
const forkY = 252;

// 30° diagonal connector: dy = 28, dx = dy / tan(30°)
const branchStart = {
  x: forkX + (BRANCH_Y - forkY) / Math.tan((30 * Math.PI) / 180),
  y: BRANCH_Y,
};
const branchNodes = [
  { x: 200, y: BRANCH_Y, label: "CONTAINER" },
  { x: 280, y: BRANCH_Y, label: "MIDDLEWARE" },
  { x: 360, y: BRANCH_Y, label: "AGENT" },
];

const branchEnd = { x: branchNodes[branchNodes.length - 1].x, y: BRANCH_Y };

const branchPathPoints = [{ x: forkX, y: forkY }, branchStart, branchEnd];

const diagLength = Math.hypot(branchStart.x - forkX, branchStart.y - forkY);
const branchPathLength = diagLength + (branchEnd.x - branchStart.x);

const startX = flowNodes[0].x;
const endX = flowNodes[flowNodes.length - 1].x;
const pathWidth = endX - startX;
const waveWidth = pathWidth * 0.45;

const branchWaveWidth = branchPathLength * 0.45;

const LOOP_DURATION = 2.2;
const ACTIVE_HOLD = 0.5;
const nodeEase: EasingFunction = easings.eases.out(3);

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function setNodeVisuals(
  circle: SVGCircleElement | null,
  core: SVGCircleElement | null,
  intensity: number
) {
  if (!circle) return;
  const active = intensity > 0.5;
  circle.setAttribute("class", active ? styles.accent : styles["line-base"]);

  const baseR = 3.5;
  const activeR = 5.2;
  circle.setAttribute("r", String(lerp(baseR, activeR, intensity)));

  if (core) {
    core.setAttribute(
      "class",
      active ? `${styles["accent-fill"]} ${styles.pulse}` : styles["fill-base"]
    );
  }
}

export default function AgentPlatformVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const branchGradientRef = useRef<SVGLinearGradientElement>(null);
  const nodeRefs = useRef<SVGCircleElement | null[]>([]);
  const coreRefs = useRef<SVGCircleElement | null[]>([]);
  const branchNodeRefs = useRef<SVGCircleElement | null[]>([]);
  const branchCoreRefs = useRef<SVGCircleElement | null[]>([]);

  const nodes = useMemo<FlowNode[]>(
    () => [
      ...flowNodes.map((node, i) => ({
        progress: (node.x - startX) / pathWidth,
        onUpdate: (intensity: number) => {
          setNodeVisuals(nodeRefs.current[i], coreRefs.current[i], intensity);
        },
      })),
      ...branchNodes.map((node, i) => ({
        progress: (diagLength + (node.x - branchStart.x)) / branchPathLength,
        pathId: "down",
        onUpdate: (intensity: number) => {
          setNodeVisuals(
            branchNodeRefs.current[i],
            branchCoreRefs.current[i],
            intensity
          );
        },
      })),
    ],
    []
  );

  useSvgFlowAnimation({
    containerRef: svgRef,
    nodes,
    wave: {
      elementRef: gradientRef,
      from: startX,
      to: endX,
      width: waveWidth,
      enabled: true,
    },
    branches: [
      {
        id: "down",
        from: { x: forkX, y: forkY },
        to: branchEnd,
        pathPoints: branchPathPoints,
        wave: {
          elementRef: branchGradientRef,
          width: branchWaveWidth,
          enabled: true,
        },
        forkAt: (forkX - startX) / pathWidth,
      },
    ],
    duration: LOOP_DURATION,
    fadeDuration: 0.4,
    activeHold: ACTIVE_HOLD,
    repeatDelay: 0.7,
    startDelay: 0.35,
    ease: nodeEase,
    loop: true,
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="block w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="agent-flow-wave"
          ref={gradientRef}
          x1={0}
          y1={0}
          x2={waveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>

        <linearGradient
          id="agent-flow-wave-branch"
          ref={branchGradientRef}
          x1={0}
          y1={0}
          x2={branchWaveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
      </defs>

      <text x={24} y={24} fontSize={7} className={styles["text-label"]}>
        SYS // RUNTIME TOPOLOGY
      </text>

      <rect
        x={24}
        y={40}
        width={110}
        height={140}
        className={`${styles["line-base"]} ${styles["fill-panel"]}`}
      />
      <line x1={24} y1={58} x2={134} y2={58} className={styles["line-faint"]} />
      <text x={30} y={53} fontSize={7} className={styles["text-strong"]}>
        CONTAINER ADAPTER
      </text>
      {[
        { name: "WS_OPENCLAW", y: 66 },
        { name: "HTTP_API", y: 98 },
        { name: "SSE_QWENPAW", y: 130, active: true },
      ].map((slot) => (
        <g key={slot.name}>
          <rect
            x={30}
            y={slot.y}
            width={98}
            height={26}
            fill="none"
            className={slot.active ? styles.accent : styles["line-faint"]}
          />
          {slot.active && (
            <rect
              x={30}
              y={slot.y}
              width={98}
              height={26}
              stroke="none"
              className={styles["accent-soft"]}
            />
          )}
          <text
            x={38}
            y={slot.y + 16}
            fontSize={6.5}
            className={
              slot.active ? styles["text-accent"] : styles["text-label"]
            }
          >
            {slot.name}
          </text>
          <circle
            cx={120}
            cy={slot.y + 13}
            r={2}
            stroke="none"
            className={
              slot.active
                ? `${styles["accent-fill"]} ${styles.pulse}`
                : styles["fill-base"]
            }
          />
        </g>
      ))}
      <text
        x={79}
        y={198}
        fontSize={7}
        textAnchor="middle"
        className={`${styles["text-accent"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "800ms" }}
      >
        PAW = ACTIVE
      </text>

      <path
        d="M134 110 L164 110"
        pathLength={1}
        fill="none"
        className={`${styles["line-base"]} ${styles.draw}`}
        style={{ ["--draw-delay" as string]: "300ms" }}
      />
      <path
        d="M164 106 L170 110 L164 114"
        fill="none"
        className={styles["line-base"]}
      />

      <polygon
        points="195,84 217.5,97 217.5,123 195,136 172.5,123 172.5,97"
        fill="none"
        className={styles["line-strong"]}
      />
      <circle
        cx={195}
        cy={110}
        r={3.5}
        className={`${styles["fill-base"]} ${styles.pulse}`}
        stroke="none"
      />
      <text
        x={195}
        y={152}
        fontSize={7}
        textAnchor="middle"
        className={styles["text-label"]}
      >
        MIDDLEWARE
      </text>

      <path
        d="M221 110 L252 110"
        pathLength={1}
        fill="none"
        className={`${styles["line-base"]} ${styles.draw}`}
        style={{ ["--draw-delay" as string]: "500ms" }}
      />
      <path
        d="M252 106 L258 110 L252 114"
        fill="none"
        className={styles["line-base"]}
      />

      <rect
        x={258}
        y={40}
        width={110}
        height={140}
        fill="none"
        className={styles["line-base"]}
      />
      <line
        x1={258}
        y1={58}
        x2={368}
        y2={58}
        className={styles["line-faint"]}
      />
      <text x={264} y={53} fontSize={7} className={styles["text-strong"]}>
        AGENT WORKSPACE
      </text>
      {wsRows.map((row, i) => {
        const y = 64 + i * 22;
        const selected = i === 1;
        return (
          <g key={row}>
            {selected && (
              <rect
                x={261}
                y={y + 1}
                width={104}
                height={18}
                className={styles["fill-base"]}
                stroke="none"
              />
            )}
            <rect
              x={267}
              y={y + 7}
              width={5}
              height={5}
              fill="none"
              className={
                selected ? styles["line-strong"] : styles["line-faint"]
              }
            />
            <text
              x={278}
              y={y + 12}
              fontSize={6.5}
              className={
                selected ? styles["text-strong"] : styles["text-label"]
              }
            >
              {row}
            </text>
          </g>
        );
      })}

      <line
        x1={24}
        y1={216}
        x2={376}
        y2={216}
        className={styles["line-faint"]}
      />
      <text x={24} y={232} fontSize={7} className={styles["text-label"]}>
        MESSAGE FLOW
      </text>

      {/* Main pipeline */}
      <line
        x1={startX}
        y1={252}
        x2={endX}
        y2={252}
        className={styles["line-faint"]}
      />
      <path
        d={`M${startX} 252 L${endX} 252`}
        fill="none"
        stroke="url(#agent-flow-wave)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Branch pipeline */}
      <path
        d={`M${forkX} ${forkY} L${branchStart.x} ${branchStart.y} L${branchEnd.x} ${branchEnd.y}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${forkX} ${forkY} L${branchStart.x} ${branchStart.y} L${branchEnd.x} ${branchEnd.y}`}
        fill="none"
        stroke="url(#agent-flow-wave-branch)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* <path
        d={`M${branchEnd.x - 6} ${branchEnd.y - 3} L${branchEnd.x} ${branchEnd.y} L${branchEnd.x - 6} ${branchEnd.y + 3}`}
        fill="none"
        className={styles['line-base']}
      /> */}

      {flowNodes.map((node, i) => (
        <g key={node.n}>
          <circle
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            cx={node.x}
            cy={252}
            r={3.5}
            fill="#0B141E"
            className={styles["line-base"]}
          />
          <circle
            ref={(el) => {
              coreRefs.current[i] = el;
            }}
            cx={node.x}
            cy={252}
            r={1.5}
            stroke="none"
            className={styles["fill-base"]}
          />
          <text
            x={node.x}
            y={244}
            fontSize={6}
            textAnchor="middle"
            className={styles["text-label"]}
          >
            {node.label}
          </text>
          <text
            x={node.x}
            y={268}
            fontSize={6}
            textAnchor="middle"
            className={styles["text-label"]}
          >
            {node.n}
          </text>
        </g>
      ))}

      {branchNodes.map((node, i) => (
        <g key={node.label}>
          <circle
            ref={(el) => {
              branchNodeRefs.current[i] = el;
            }}
            cx={node.x}
            cy={node.y}
            r={3}
            fill="#0B141E"
            className={styles["line-base"]}
          />
          <circle
            ref={(el) => {
              branchCoreRefs.current[i] = el;
            }}
            cx={node.x}
            cy={node.y}
            r={1.2}
            stroke="none"
            className={styles["fill-base"]}
          />
          <text
            x={node.x}
            y={node.y + 12}
            fontSize={5.5}
            textAnchor="middle"
            className={styles["text-label"]}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
