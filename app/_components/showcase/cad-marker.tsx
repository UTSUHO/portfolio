import styles from "./showcase.module.css";

export interface MarkerLabelOptions {
  fontSize?: number;
  labelAbove?: boolean;
  labelOffset?: number;
}

function nodeLabel(
  cx: number,
  cy: number,
  label: string,
  {
    fontSize = 6,
    labelAbove = false,
    labelOffset = 16,
  }: MarkerLabelOptions = {}
) {
  const textY = labelAbove ? cy - labelOffset : cy + labelOffset;
  return (
    <text
      x={cx}
      y={textY}
      fontSize={fontSize}
      textAnchor="middle"
      className={styles["text-strong"]}
    >
      {label}
    </text>
  );
}

/** Square node marker */
export function squareMarker(
  cx: number,
  cy: number,
  label: string,
  size = 20,
  options: MarkerLabelOptions = {}
) {
  const half = size / 2;
  const labelAbove = options.labelAbove ?? false;
  const labelOffset = options.labelOffset ?? half + 16;
  const textY = labelAbove ? cy - labelOffset : cy + labelOffset;

  return (
    <g>
      <rect
        x={cx - half - 2}
        y={cy - half - 2}
        width={size + 4}
        height={size + 4}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <rect
        x={cx - half}
        y={cy - half}
        width={size}
        height={size}
        fill="none"
        className={styles["line-base"]}
      />
      <circle cx={cx} cy={cy} r={2} fill="none" className={styles["line-strong"]} />
      <text
        x={cx}
        y={textY}
        fontSize={options.fontSize ?? 6}
        textAnchor="middle"
        className={styles["text-strong"]}
      >
        {label}
      </text>
    </g>
  );
}

/** Document / page marker */
export function docMarker(cx: number, cy: number, label: string, options: MarkerLabelOptions = {}) {
  return (
    <g>
      <rect
        x={cx - 12}
        y={cy - 14}
        width={24}
        height={28}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <rect
        x={cx - 10}
        y={cy - 12}
        width={20}
        height={24}
        fill="none"
        className={styles["line-base"]}
      />
      <line x1={cx - 7} y1={cy - 6} x2={cx + 7} y2={cy - 6} className={styles["line-faint"]} />
      <line x1={cx - 7} y1={cy - 1} x2={cx + 7} y2={cy - 1} className={styles["line-faint"]} />
      <line x1={cx - 7} y1={cy + 4} x2={cx + 4} y2={cy + 4} className={styles["line-faint"]} />
      {nodeLabel(cx, cy, label, { ...options, labelOffset: options.labelOffset ?? 24 })}
    </g>
  );
}

/** Hexagon marker */
export function hexMarker(cx: number, cy: number, label: string, options: MarkerLabelOptions = {}) {
  return (
    <g>
      <polygon
        points={`${cx},${cy - 13} ${cx + 11.5},${cy - 6.5} ${cx + 11.5},${cy + 6.5} ${cx},${cy + 13} ${cx - 11.5},${cy + 6.5} ${cx - 11.5},${cy - 6.5}`}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <polygon
        points={`${cx},${cy - 11} ${cx + 9.5},${cy - 5.5} ${cx + 9.5},${cy + 5.5} ${cx},${cy + 11} ${cx - 9.5},${cy + 5.5} ${cx - 9.5},${cy - 5.5}`}
        fill="none"
        className={styles["line-base"]}
      />
      <circle cx={cx} cy={cy} r={3.5} fill="none" className={styles["line-faint"]} />
      {nodeLabel(cx, cy, label, { ...options, labelOffset: options.labelOffset ?? 26 })}
    </g>
  );
}
