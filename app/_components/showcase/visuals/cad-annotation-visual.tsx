"use client";

import { useRef, useMemo } from "react";
import { easings } from "animejs";
import type { EasingFunction } from "animejs";
import styles from "../showcase.module.css";
import { squareMarker, docMarker, hexMarker } from "../cad-marker";
import useSvgFlowAnimation, { type FlowNode } from "../use-svg-flow-animation";

const PIPELINE_Y = 264;
const GLB_Y = 240;
const FACE_MAP_Y = 288;
const ML_ADAPTER_Y = 240;
const EXTERNAL_Y = 288;
const GLB_ELBOW_X = 110;
const GLB_ELBOW2_X = 155;
const FACE_MAP_ELBOW_X = 110;
const FACE_MAP_ELBOW2_X = 155;
const ML_ELBOW_X = 315;
const EXTERNAL_ELBOW_X = 315;
const TOP_BRANCH_NODE_X = 132.5;
const BOTTOM_BRANCH_NODE_X = 345;
const startX = 40;
const timingEndX = 340; // 控制动画时间轴总长度，给下分支留出播放窗口
const visualEndX = 300; // 控制可见主线的终点，与 RECON 对齐
const pathWidth = timingEndX - startX;
const waveWidth = pathWidth * 0.45;

// Stage 1: CAD Processing
// Stage 2: Interactive Annotation
// Stage 3: Dataset Production
const pipelineNodes = [
  { x: 40, label: "STEP", short: "STEP" },
  { x: 95, label: "OCCT", short: "OCCT" },
  { x: 170, label: "VIEWER", short: "VIEWER" },
  { x: 235, label: "ANNOT", short: "ANNOT" },
  { x: 300, label: "RECON", short: "RECON" },
];

// Top branches: OCCT -> GLB -> VIEWER  and  OCCT -> FACE MAP -> VIEWER (parallel, stacked vertically)
const topForkX = 95;
const topMergeX = 170;
const topBranchNodes = [
  { x: TOP_BRANCH_NODE_X, y: GLB_Y, label: "GLB", labelAbove: false },
  { x: TOP_BRANCH_NODE_X, y: FACE_MAP_Y, label: "FACE MAP", labelAbove: false },
];
const glbBranchPathPoints = [
  { x: topForkX, y: PIPELINE_Y },          // OCCT
  { x: GLB_ELBOW_X, y: GLB_Y },            // elbow (diagonal from OCCT)
  { x: TOP_BRANCH_NODE_X, y: GLB_Y },      // GLB
  { x: GLB_ELBOW2_X, y: GLB_Y },           // elbow (diagonal to VIEWER)
  { x: topMergeX, y: PIPELINE_Y },         // VIEWER
];
const faceMapBranchPathPoints = [
  { x: topForkX, y: PIPELINE_Y },          // OCCT
  { x: FACE_MAP_ELBOW_X, y: FACE_MAP_Y },  // elbow (diagonal from OCCT)
  { x: TOP_BRANCH_NODE_X, y: FACE_MAP_Y }, // FACE MAP
  { x: FACE_MAP_ELBOW2_X, y: FACE_MAP_Y }, // elbow (diagonal to VIEWER)
  { x: topMergeX, y: PIPELINE_Y },         // VIEWER
];

// Bottom branch: RECON -> ML ADAPTER + EXTERNAL (parallel, stacked vertically)
const bottomForkX = 300;
const bottomBranchNodes = [
  { x: BOTTOM_BRANCH_NODE_X, y: ML_ADAPTER_Y, label: "ML ADAPTER", labelAbove: false },
  { x: BOTTOM_BRANCH_NODE_X, y: EXTERNAL_Y, label: "EXTERNAL", labelAbove: false },
];
const mlBranchPathPoints = [
  { x: bottomForkX, y: PIPELINE_Y },             // RECON
  { x: ML_ELBOW_X, y: ML_ADAPTER_Y },            // elbow
  { x: BOTTOM_BRANCH_NODE_X, y: ML_ADAPTER_Y },  // ML ADAPTER
];
const externalBranchPathPoints = [
  { x: bottomForkX, y: PIPELINE_Y },             // RECON
  { x: EXTERNAL_ELBOW_X, y: EXTERNAL_Y },        // elbow
  { x: BOTTOM_BRANCH_NODE_X, y: EXTERNAL_Y },    // EXTERNAL
];

function pathLength(points: { x: number; y: number }[]) {
  return points.reduce(
    (sum, p, i) =>
      i === 0 ? 0 : sum + Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y),
    0
  );
}

const glbBranchPathLength = pathLength(glbBranchPathPoints);
const faceMapBranchPathLength = pathLength(faceMapBranchPathPoints);
const mlBranchPathLength = pathLength(mlBranchPathPoints);
const externalBranchPathLength = pathLength(externalBranchPathPoints);

const glbWaveWidth = glbBranchPathLength * 0.45;
const faceMapWaveWidth = faceMapBranchPathLength * 0.45;
const mlWaveWidth = mlBranchPathLength * 0.45;
const externalWaveWidth = externalBranchPathLength * 0.45;

const LOOP_DURATION = 2.2;
const ACTIVE_HOLD = 0.5;
const FADE_DURATION = 0.4;
const nodeEase: EasingFunction = easings.eases.out(3);

function setNodeAccent(node: SVGGElement | null, intensity: number) {
  if (!node) return;
  const active = intensity > 0.5;

  // 节点边框/主形状
  const shapes = node.querySelectorAll("rect, polygon, circle");
  shapes.forEach((shape) => {
    const isTextMarker =
      shape.tagName === "circle" && shape.getAttribute("r") === "2";
    if (isTextMarker) {
      shape.setAttribute(
        "class",
        active
          ? `${styles["accent-fill"]} ${styles.pulse}`
          : styles["line-strong"]
      );
    } else {
      shape.setAttribute("class", active ? styles.accent : styles["line-base"]);
    }
  });

  // 内部装饰线
  const innerLines = node.querySelectorAll("line");
  innerLines.forEach((line) => {
    line.setAttribute("class", active ? styles.accent : styles["line-faint"]);
  });

  // 文字标签
  const text = node.querySelector("text");
  if (text) {
    text.setAttribute(
      "class",
      active ? styles["text-accent"] : styles["text-strong"]
    );
  }
}

export default function CadAnnotationVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientRef = useRef<SVGLinearGradientElement>(null);
  const glbGradientRef = useRef<SVGLinearGradientElement>(null);
  const faceMapGradientRef = useRef<SVGLinearGradientElement>(null);
  const mlGradientRef = useRef<SVGLinearGradientElement>(null);
  const externalGradientRef = useRef<SVGLinearGradientElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const topNodeRefs = useRef<(SVGGElement | null)[]>([]);
  const bottomNodeRefs = useRef<(SVGGElement | null)[]>([]);

  const nodes = useMemo<FlowNode[]>(
    () => [
      ...pipelineNodes.map((node, i) => ({
        progress: (node.x - startX) / pathWidth,
        onUpdate: (intensity: number) => {
          setNodeAccent(nodeRefs.current[i], intensity);
        },
      })),
      {
        progress: pathLength(glbBranchPathPoints.slice(0, 3)) / glbBranchPathLength,
        pathId: "glb",
        onUpdate: (intensity: number) => {
          setNodeAccent(topNodeRefs.current[0], intensity);
        },
      },
      {
        progress: pathLength(faceMapBranchPathPoints.slice(0, 3)) / faceMapBranchPathLength,
        pathId: "facemap",
        onUpdate: (intensity: number) => {
          setNodeAccent(topNodeRefs.current[1], intensity);
        },
      },
      {
        progress: pathLength(mlBranchPathPoints.slice(0, 3)) / mlBranchPathLength,
        pathId: "ml",
        onUpdate: (intensity: number) => {
          setNodeAccent(bottomNodeRefs.current[0], intensity);
        },
      },
      {
        progress: pathLength(externalBranchPathPoints.slice(0, 3)) / externalBranchPathLength,
        pathId: "external",
        onUpdate: (intensity: number) => {
          setNodeAccent(bottomNodeRefs.current[1], intensity);
        },
      },
    ],
    []
  );

  useSvgFlowAnimation({
    containerRef: svgRef,
    nodes,
    wave: {
      elementRef: gradientRef,
      from: startX,
      to: timingEndX,
      width: waveWidth,
      enabled: true,
    },
    branches: [
      {
        id: "glb",
        from: { x: topForkX, y: PIPELINE_Y },
        to: { x: topMergeX, y: PIPELINE_Y },
        pathPoints: glbBranchPathPoints,
        wave: {
          elementRef: glbGradientRef,
          width: glbWaveWidth,
          enabled: true,
        },
        forkAt: (topForkX - startX) / pathWidth,
        joinAt: (topMergeX - startX) / pathWidth,
      },
      {
        id: "facemap",
        from: { x: topForkX, y: PIPELINE_Y },
        to: { x: topMergeX, y: PIPELINE_Y },
        pathPoints: faceMapBranchPathPoints,
        wave: {
          elementRef: faceMapGradientRef,
          width: faceMapWaveWidth,
          enabled: true,
        },
        forkAt: (topForkX - startX) / pathWidth,
        joinAt: (topMergeX - startX) / pathWidth,
      },
      {
        id: "ml",
        from: { x: bottomForkX, y: PIPELINE_Y },
        to: { x: BOTTOM_BRANCH_NODE_X, y: ML_ADAPTER_Y },
        pathPoints: mlBranchPathPoints,
        wave: {
          elementRef: mlGradientRef,
          width: mlWaveWidth,
          enabled: true,
        },
        forkAt: (bottomForkX - startX) / pathWidth,
      },
      {
        id: "external",
        from: { x: bottomForkX, y: PIPELINE_Y },
        to: { x: BOTTOM_BRANCH_NODE_X, y: EXTERNAL_Y },
        pathPoints: externalBranchPathPoints,
        wave: {
          elementRef: externalGradientRef,
          width: externalWaveWidth,
          enabled: true,
        },
        forkAt: (bottomForkX - startX) / pathWidth,
      },
    ],
    duration: LOOP_DURATION,
    fadeDuration: FADE_DURATION,
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
        <pattern
          id="cad-iso-grid"
          width={34.64}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M17.32 0 L34.64 10 L17.32 20 L0 10 Z"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        </pattern>

        <linearGradient
          id="cad-flow-wave"
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
          id="cad-flow-wave-glb"
          ref={glbGradientRef}
          x1={0}
          y1={0}
          x2={glbWaveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>

        <linearGradient
          id="cad-flow-wave-facemap"
          ref={faceMapGradientRef}
          x1={0}
          y1={0}
          x2={faceMapWaveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>

        <linearGradient
          id="cad-flow-wave-ml"
          ref={mlGradientRef}
          x1={0}
          y1={0}
          x2={mlWaveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>

        <linearGradient
          id="cad-flow-wave-external"
          ref={externalGradientRef}
          x1={0}
          y1={0}
          x2={externalWaveWidth}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="45%" stopColor="rgba(248,69,50,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
        </linearGradient>
      </defs>

      <text x={24} y={24} fontSize={7} className={styles["text-label"]}>
        GEOM // B-REP VIEWER
      </text>
      <text
        x={376}
        y={24}
        fontSize={7}
        textAnchor="end"
        className={styles["text-label"]}
      >
        MODE: FACE_PICK
      </text>

      <rect
        x={56}
        y={36}
        width={288}
        height={170}
        fill="url(#cad-iso-grid)"
        stroke="none"
      />
      <path d="M68 36 H56 V48" fill="none" className={styles["line-strong"]} />
      <path
        d="M332 36 H344 V48"
        fill="none"
        className={styles["line-strong"]}
      />
      <path
        d="M56 194 V206 H68"
        fill="none"
        className={styles["line-strong"]}
      />
      <path
        d="M344 194 V206 H332"
        fill="none"
        className={styles["line-strong"]}
      />

      <path
        d="M200 122 L279.7 168 M200 122 L148 152 M200 122 L200 78"
        fill="none"
        strokeDasharray="3 3"
        className={styles["line-faint"]}
      />

      <g
        className={styles["fade-label"]}
        style={{ ["--draw-delay" as string]: "900ms" }}
      >
        <polygon
          points="279.7,168 227.7,198 227.7,154 279.7,124"
          stroke="none"
          className={styles["accent-soft"]}
        />
        <polygon
          points="279.7,168 227.7,198 227.7,154 279.7,124"
          fill="none"
          className={styles.accent}
        />
        <circle
          cx={253.7}
          cy={161}
          r={3}
          fill="none"
          className={styles.accent}
        />
        <circle
          cx={253.7}
          cy={161}
          r={1}
          stroke="none"
          className={`${styles["accent-fill"]} ${styles.pulse}`}
        />
      </g>

      <path
        d="M200 78 L279.7 124 L279.7 168 L227.7 198 L148 152 L148 108 Z"
        pathLength={1}
        fill="none"
        className={`${styles["line-strong"]} ${styles.draw}`}
        style={{ ["--draw-delay" as string]: "200ms" }}
      />
      <path
        d="M279.7 124 L227.7 154 L148 108 M227.7 154 L227.7 198"
        pathLength={1}
        fill="none"
        className={`${styles["line-base"]} ${styles.draw}`}
        style={{ ["--draw-delay" as string]: "450ms" }}
      />

      <g
        className={styles["fade-label"]}
        style={{ ["--draw-delay" as string]: "650ms" }}
      >
        <ellipse
          cx={214}
          cy={116}
          rx={14}
          ry={7}
          fill="none"
          className={styles["line-faint"]}
        />
        <line
          x1={200}
          y1={96}
          x2={200}
          y2={116}
          className={styles["line-base"]}
        />
        <line
          x1={228}
          y1={96}
          x2={228}
          y2={116}
          className={styles["line-base"]}
        />
        <ellipse
          cx={214}
          cy={96}
          rx={14}
          ry={7}
          fill="none"
          className={styles["line-strong"]}
        />
        <ellipse
          cx={214}
          cy={96}
          rx={7}
          ry={3.5}
          fill="none"
          className={styles["line-base"]}
        />
      </g>

      <g
        className={styles["fade-label"]}
        style={{ ["--draw-delay" as string]: "750ms" }}
      >
        <ellipse
          cx={204}
          cy={95}
          rx={5}
          ry={2.5}
          fill="none"
          className={styles["line-base"]}
        />
        <ellipse
          cx={226}
          cy={138}
          rx={5}
          ry={2.5}
          fill="none"
          className={styles["line-base"]}
        />
      </g>

      <path
        d="M262 158 L316 102 H330"
        pathLength={1}
        fill="none"
        className={`${styles.accent} ${styles.draw}`}
        style={{ ["--draw-delay" as string]: "1000ms" }}
      />
      <g
        className={styles["fade-label"]}
        style={{ ["--draw-delay" as string]: "1150ms" }}
      >
        <text x={332} y={94} fontSize={8} className={styles["text-accent"]}>
          FACE_024
        </text>
        <text x={332} y={118} fontSize={7} className={styles["text-label"]}>
          GROUP: 1
        </text>
        <text x={332} y={106} fontSize={7} className={styles["text-label"]}>
          TYPE: PLANAR
        </text>
      </g>

      <line
        x1={24}
        y1={216}
        x2={376}
        y2={216}
        className={styles["line-faint"]}
      />
      <text x={24} y={240} fontSize={7} className={styles["text-label"]}>
        PIPELINE
      </text>

      {/* Main pipeline */}
      <path
        d={`M${startX} ${PIPELINE_Y} L${topForkX} ${PIPELINE_Y}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${startX} ${PIPELINE_Y} L${topForkX} ${PIPELINE_Y}`}
        fill="none"
        stroke="url(#cad-flow-wave)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d={`M${topMergeX} ${PIPELINE_Y} L${visualEndX} ${PIPELINE_Y}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${topMergeX} ${PIPELINE_Y} L${visualEndX} ${PIPELINE_Y}`}
        fill="none"
        stroke="url(#cad-flow-wave)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Top branches: GLB and FACE MAP parallel */}
      <path
        d={`M${glbBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${glbBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        stroke="url(#cad-flow-wave-glb)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d={`M${faceMapBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${faceMapBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        stroke="url(#cad-flow-wave-facemap)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Bottom branches: ML ADAPTER and EXTERNAL parallel */}
      <path
        d={`M${mlBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${mlBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        stroke="url(#cad-flow-wave-ml)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d={`M${externalBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        className={styles["line-faint"]}
      />
      <path
        d={`M${externalBranchPathPoints.map((p) => `${p.x} ${p.y}`).join(" L")}`}
        fill="none"
        stroke="url(#cad-flow-wave-external)"
        strokeWidth={1.5}
        strokeLinecap="round"
      />

      {/* Main pipeline nodes */}
      <g
        ref={(el) => {
          nodeRefs.current[0] = el;
        }}
        className={`${styles["node-marker"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "1200ms" }}
      >
        {docMarker(40, PIPELINE_Y, "STEP", { fontSize: 6 })}
      </g>

      <g
        ref={(el) => {
          nodeRefs.current[1] = el;
        }}
        className={`${styles["node-marker"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "1300ms" }}
      >
        {hexMarker(95, PIPELINE_Y, "OCCT", { fontSize: 6 })}
      </g>

      <g
        ref={(el) => {
          nodeRefs.current[2] = el;
        }}
        className={`${styles["node-marker"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "1400ms" }}
      >
        {squareMarker(170, PIPELINE_Y, "VIEWER", 20, { fontSize: 6 })}
      </g>

      <g
        ref={(el) => {
          nodeRefs.current[3] = el;
        }}
        className={`${styles["node-marker"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "1500ms" }}
      >
        {squareMarker(235, PIPELINE_Y, "ANNOT", 20, { fontSize: 6 })}
      </g>

      <g
        ref={(el) => {
          nodeRefs.current[4] = el;
        }}
        className={`${styles["node-marker"]} ${styles["fade-label"]}`}
        style={{ ["--draw-delay" as string]: "1600ms" }}
      >
        {docMarker(300, PIPELINE_Y, "RECON", { fontSize: 6 })}
      </g>

      {/* Top branch nodes */}
      {topBranchNodes.map((node, i) => (
        <g
          key={node.label}
          ref={(el) => {
            topNodeRefs.current[i] = el;
          }}
          className={`${styles["node-marker"]} ${styles["fade-label"]}`}
          style={{ ["--draw-delay" as string]: `${1250 + i * 100}ms` }}
        >
          {node.label === "GLB"
            ? squareMarker(node.x, node.y, node.label, 18, { fontSize: 5.5, labelAbove: node.labelAbove, labelOffset: 12 })
            : squareMarker(node.x, node.y, node.label, 18, { fontSize: 5.5, labelAbove: node.labelAbove, labelOffset: 12 })}
        </g>
      ))}

      {/* Bottom branch nodes */}
      {bottomBranchNodes.map((node, i) => (
        <g
          key={node.label}
          ref={(el) => {
            bottomNodeRefs.current[i] = el;
          }}
          className={`${styles["node-marker"]} ${styles["fade-label"]}`}
          style={{ ["--draw-delay" as string]: `${1550 + i * 100}ms` }}
        >
          {node.label === "ML ADAPTER"
            ? squareMarker(node.x, node.y, node.label, 18, { fontSize: 5.5, labelAbove: node.labelAbove, labelOffset: 12 })
            : squareMarker(node.x, node.y, node.label, 18, { fontSize: 5.5, labelAbove: node.labelAbove, labelOffset: 12 })}
        </g>
      ))}
    </svg>
  );
}
