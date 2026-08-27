"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ai-training-visual.module.css";

const trainRows = [
  { name: "GPU-01", value: 72 },
  { name: "GPU-02", value: 64 },
  // { name: "GPU-03", value: 58 },
];

const inferenceRows = [
  { name: "GPU-01", value: 44 },
  { name: "GPU-02", value: 36 },
  // { name: "GPU-03", value: 28 },
];

const inputPaths = [
  "M145 34 H238 L290 92 H322",
  "M145 86 H254 L290 108 H322",
  "M145 138 H254 L290 124 H322",
  "M145 190 H238 L290 140 H322",
];

function UtilizationBand({
  title,
  rows,
}: {
  title: string;
  rows: typeof trainRows;
}) {
  return (
    <section className={styles["utilization-band"]} aria-label={`${title} utilization`}>
      <div className={styles["band-heading"]}>
        <span>{title}</span>
        <span className={styles["band-rule"]} />
        <small>UTILIZATION</small>
      </div>

      <div className={styles["metric-table"]}>
        {rows.map((row) => (
          <div className={styles["metric-row"]} key={`${title}-${row.name}`}>
            <div className={styles["metric-name"]}>
              <span>{row.name}</span>
              <i aria-label="healthy" />
            </div>
            <div className={styles.meter} aria-label={`${row.value}%`}>
              <span style={{ width: `${row.value}%` }} />
            </div>
            <b>{row.value}%</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function KubeGlyph() {
  return (
    <svg viewBox="0 0 74 74" aria-hidden="true" className={styles["kube-glyph"]}>
      <circle cx="37" cy="37" r="10" />
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 37 + Math.cos(rad) * 10;
        const y1 = 37 + Math.sin(rad) * 10;
        const x2 = 37 + Math.cos(rad) * 25;
        const y2 = 37 + Math.sin(rad) * 25;
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} />
            <circle cx={x2} cy={y2} r="4.2" />
          </g>
        );
      })}
    </svg>
  );
}

function WorkloadGlyph() {
  return (
    <svg viewBox="0 0 80 70" aria-hidden="true" className={styles["workload-glyph"]}>
      <path d="M40 6 66 20 40 34 14 20 40 6Z" />
      <path d="m18 31 22 12 22-12" />
      <path d="m18 43 22 12 22-12" />
      <path d="m18 55 22 12 22-12" />
    </svg>
  );
}

function MiniCubes({ count }: { count: number }) {
  return (
    <div className={styles["mini-cubes"]} aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} style={{ animationDelay: `${index * 0.23}s` }}>
          <i />
        </span>
      ))}
      <em>•••</em>
    </div>
  );
}

function K8sArchitecture() {
  return (
    <section className={styles["k8s-architecture"]} aria-label="Kubernetes orchestration">
      <div className={styles["architecture-heading"]}>
        <span>K8S ORCHESTRATION</span>
        <i />
      </div>

      <div className={styles["architecture-flow"]}>
        <article className={styles["architecture-card"]}>
          <h3>K8S CONTROL</h3>
          <KubeGlyph />
          <ul>
            <li>API SERVER</li>
            <li>HPA / SCALING</li>
            <li>DEVICE PLUGIN</li>
          </ul>
          <div className={styles["architecture-subcard"]}>
            <span>NODES</span>
            <MiniCubes count={3} />
            <b>3×</b>
          </div>
        </article>

        <div className={styles["architecture-link"]} aria-hidden="true">
          <span />
        </div>

        <article className={styles["architecture-card"]}>
          <h3>GPU WORKLOAD</h3>
          <WorkloadGlyph />
          <ul>
            <li>SERVICE</li>
            <li>DEPLOYMENT</li>
            <li>RESOURCE QUOTA</li>
          </ul>
          <div className={styles["architecture-subcard"]}>
            <span>PODS</span>
            <MiniCubes count={3} />
            <b>12×</b>
          </div>
        </article>
      </div>
    </section>
  );
}

function SchedulerGlyph() {
  const spokes = useMemo(() => [0, 60, 120, 180, 240, 300], []);
  return (
    <g className={styles["scheduler-glyph"]}>
      <circle
        cx="392"
        cy="116"
        r="60"
        className={`${styles["scheduler-ring"]} ${styles["ring-a"]}`}
      />
      <circle
        cx="392"
        cy="116"
        r="50"
        className={`${styles["scheduler-ring"]} ${styles["ring-b"]}`}
      />
      <circle cx="392" cy="116" r="14" />
      {spokes.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 392 + Math.cos(rad) * 14;
        const y1 = 116 + Math.sin(rad) * 14;
        const x2 = 392 + Math.cos(rad) * 34;
        const y2 = 116 + Math.sin(rad) * 34;
        return (
          <g key={angle}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} />
            <circle cx={x2} cy={y2} r="5.5" />
          </g>
        );
      })}
      <text x="392" y="211" textAnchor="middle" className={styles["node-label"]}>
        SCHEDULER
      </text>
    </g>
  );
}

function JobIcon({ y, number }: { y: number; number: number }) {
  return (
    <g className={styles["job-node"]}>
      <path d={`M14 ${y - 16}h21l9 9v23H14Z`} />
      <path d={`M35 ${y - 16}v10h9`} />
      <path d={`M21 ${y + 2}h16M21 ${y + 9}h12`} />
      <text x="55" y={y + 5}>{`JOB 0${number}`}</text>
    </g>
  );
}

function ControlPlane() {
  const [activeCells, setActiveCells] = useState([2, 5, 8]);

  useEffect(() => {
    const chooseCells = () => {
      const pool = Array.from({ length: 12 }, (_, index) => index);
      for (let index = pool.length - 1; index > 0; index -= 1) {
        const swap = Math.floor(Math.random() * (index + 1));
        [pool[index], pool[swap]] = [pool[swap], pool[index]];
      }
      const count = 1 + Math.floor(Math.random() * 3);
      setActiveCells(pool.slice(0, count));
    };

    const timer = window.setInterval(chooseCells, 1180);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <svg
      className={styles["control-diagram"]}
      viewBox="0 0 752 230"
      role="img"
      aria-label="Four jobs converge on one scheduler and are dispatched to a three by four GPU cluster"
    >
      <defs>
        <filter id="pulse-glow" x="-200%" y="-200%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {inputPaths.map((path, index) => (
        <g key={path}>
          <path d={path} className={styles["motion-path"]} />
          <g filter="url(#pulse-glow)">
            <circle r="5" className={styles["route-marker-ring"]}>
              <animateMotion
                dur="4.8s"
                begin={`${index * -1.15}s`}
                repeatCount="indefinite"
                path={path}
              />
            </circle>
            <circle r="2" className={styles["route-marker-core"]}>
              <animateMotion
                dur="4.8s"
                begin={`${index * -1.15}s`}
                repeatCount="indefinite"
                path={path}
              />
            </circle>
          </g>
        </g>
      ))}

      {[34, 86, 138, 190].map((y, index) => (
        <JobIcon key={y} y={y} number={index + 1} />
      ))}

      <SchedulerGlyph />

      <path d="M452 116H523" className={styles["motion-path"]} />
      <path d="M523 116 560 78M523 116h37M523 116l37 38" className={styles["assignment-path"]} />
      <g filter="url(#pulse-glow)">
        <circle r="5.5" className={styles["route-marker-ring"]}>
          <animateMotion
            dur="1.35s"
            begin="0.85s"
            repeatCount="indefinite"
            path="M452 116H523L560 116"
          />
        </circle>
        <circle r="2.2" className={styles["route-marker-core"]}>
          <animateMotion
            dur="1.35s"
            begin="0.85s"
            repeatCount="indefinite"
            path="M452 116H523L560 116"
          />
        </circle>
      </g>

      <path d="M570 63h-10v106h10" className={styles["cluster-bracket"]} />
      {Array.from({ length: 12 }, (_, index) => {
        const column = index % 4;
        const row = Math.floor(index / 4);
        const x = 580 + column * 39;
        const y = 64 + row * 39;
        const isActive = activeCells.includes(index);
        return (
          <rect
            key={index}
            x={x}
            y={y}
            width="29"
            height="29"
            rx="3"
            className={
              isActive
                ? `${styles["compute-cell"]} ${styles["is-active"]}`
                : styles["compute-cell"]
            }
          />
        );
      })}
      <text x="638" y="207" textAnchor="middle" className={styles["node-label"]}>
        GPU CLUSTER
      </text>
      <text x="638" y="222" textAnchor="middle" className={styles["node-meta"]}>
        3 ROWS × 4 SHARDS
      </text>
    </svg>
  );
}

export default function AiTrainingVisual({
  className = "",
  active = true,
}: {
  className?: string;
  active?: boolean;
}) {
  return (
    <div
      className={`${styles.visual} ${className}`}
      data-active={active}
      aria-hidden="true"
    >
      <div className={styles["showcase-canvas"]}>
        <section className={`${styles["visual-panel"]} ${styles["cluster-panel"]}`}>
          <header className={styles["panel-header"]}>
            <span>AI TRAINING</span>
            <i>{"//"}</i>
            <h2>GPU CLUSTER</h2>
          </header>

          <div className={styles["cluster-content"]}>
            <div className={styles["utilization-column"]}>
              <UtilizationBand title="TRAIN" rows={trainRows} />
              <UtilizationBand title="INFERENCE" rows={inferenceRows} />
            </div>
            <K8sArchitecture />
          </div>
        </section>

        <section className={`${styles["visual-panel"]} ${styles["control-panel"]}`}>
          <header className={`${styles["panel-header"]} ${styles.compact}`}>
            <span>AI TRAINING</span>
            <i>{"//"}</i>
            <h2>CONTROL PLANE</h2>
          </header>
          <ControlPlane />
        </section>
      </div>
    </div>
  );
}
