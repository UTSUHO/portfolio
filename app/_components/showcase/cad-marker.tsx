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
      <circle
        cx={cx}
        cy={cy}
        r={2}
        fill="none"
        className={styles["line-strong"]}
      />
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
export function docMarker(
  cx: number,
  cy: number,
  label: string,
  options: MarkerLabelOptions = {}
) {
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
      <line
        x1={cx - 7}
        y1={cy - 6}
        x2={cx + 7}
        y2={cy - 6}
        className={styles["line-faint"]}
      />
      <line
        x1={cx - 7}
        y1={cy - 1}
        x2={cx + 7}
        y2={cy - 1}
        className={styles["line-faint"]}
      />
      <line
        x1={cx - 7}
        y1={cy + 4}
        x2={cx + 4}
        y2={cy + 4}
        className={styles["line-faint"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 24,
      })}
    </g>
  );
}

/** Hexagon marker */
export function hexMarker(
  cx: number,
  cy: number,
  label: string,
  options: MarkerLabelOptions = {}
) {
  return (
    <g>
      <polygon
        points={`${cx},${cy - 13} ${cx + 11.5},${cy - 6.5} ${cx + 11.5},${
          cy + 6.5
        } ${cx},${cy + 13} ${cx - 11.5},${cy + 6.5} ${cx - 11.5},${cy - 6.5}`}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <polygon
        points={`${cx},${cy - 11} ${cx + 9.5},${cy - 5.5} ${cx + 9.5},${
          cy + 5.5
        } ${cx},${cy + 11} ${cx - 9.5},${cy + 5.5} ${cx - 9.5},${cy - 5.5}`}
        fill="none"
        className={styles["line-base"]}
      />
      <circle
        cx={cx}
        cy={cy}
        r={3.5}
        fill="none"
        className={styles["line-faint"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}

const hexPoints = (cx: number, cy: number, r: number) =>
  `${cx},${cy - r} ${cx + r * 0.866},${cy - r * 0.5} ${cx + r * 0.866},${
    cy + r * 0.5
  } ${cx},${cy + r} ${cx - r * 0.866},${cy + r * 0.5} ${cx - r * 0.866},${
    cy - r * 0.5
  }`;

function isoCubeFaces(cx: number, cy: number, s: number) {
  const dx = s * 0.866;
  const dy = s * 0.5;
  // top face
  const top = `${cx},${cy - dy} ${cx + dx},${cy} ${cx},${cy + dy} ${
    cx - dx
  },${cy}`;
  // left face
  const left = `${cx - dx},${cy} ${cx},${cy + dy} ${cx},${cy + dy + s} ${
    cx - dx
  },${cy + s}`;
  // right face
  const right = `${cx + dx},${cy} ${cx},${cy + dy} ${cx},${cy + dy + s} ${
    cx + dx
  },${cy + s}`;
  return { top, left, right };
}

/** GLTF icon — hexagon badge with three stacked isometric cubes */
export function gltfMarker(
  cx: number,
  cy: number,
  label: string,
  size = 26,
  options: MarkerLabelOptions = {}
) {
  const cubeSize = 3;
  const positions = [
    { x: cx, y: cy - 3.6 },
    { x: cx - 4.2, y: cy + 2.4 },
    { x: cx + 4.2, y: cy + 2.4 },
  ];
  return (
    <g>
      <polygon
        points={hexPoints(cx, cy, 13)}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <polygon
        points={hexPoints(cx, cy, 11)}
        fill="none"
        className={styles["line-base"]}
      />
      {positions.map((p, i) => {
        const faces = isoCubeFaces(p.x, p.y, cubeSize);
        return (
          <g key={i}>
            <polygon
              points={faces.left}
              fill="none"
              className={styles["line-base"]}
            />
            <polygon
              points={faces.right}
              fill="none"
              className={styles["line-base"]}
            />
            <polygon
              points={faces.top}
              fill="none"
              className={styles["line-strong"]}
            />
          </g>
        );
      })}
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}

/** VIEWER icon — monitor badge with screen details */
export function viewerMarker(
  cx: number,
  cy: number,
  label: string,
  size = 24,
  options: MarkerLabelOptions = {}
) {
  return (
    <g>
      <rect
        x={cx - 12}
        y={cy - 10}
        width={24}
        height={18}
        rx={1}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <rect
        x={cx - 11}
        y={cy - 9}
        width={22}
        height={15}
        rx={1}
        fill="none"
        className={styles["line-base"]}
      />
      <rect
        x={cx - 8}
        y={cy - 6}
        width={16}
        height={9}
        fill="none"
        className={styles["line-faint"]}
      />
      <line
        x1={cx - 6}
        y1={cy - 2}
        x2={cx + 6}
        y2={cy - 2}
        className={styles["line-faint"]}
      />
      <line
        x1={cx}
        y1={cy + 6}
        x2={cx}
        y2={cy + 10}
        className={styles["line-base"]}
      />
      <rect
        x={cx - 6}
        y={cy + 10}
        width={12}
        height={2}
        fill="none"
        className={styles["line-base"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}

/** ANNOT icon — document page badge with a pen */
export function annotMarker(
  cx: number,
  cy: number,
  label: string,
  size = 24,
  options: MarkerLabelOptions = {}
) {
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
      <line
        x1={cx - 7}
        y1={cy - 6}
        x2={cx + 7}
        y2={cy - 6}
        className={styles["line-faint"]}
      />
      <line
        x1={cx - 7}
        y1={cy - 1}
        x2={cx + 7}
        y2={cy - 1}
        className={styles["line-faint"]}
      />
      <line
        x1={cx - 7}
        y1={cy + 4}
        x2={cx + 4}
        y2={cy + 4}
        className={styles["line-faint"]}
      />
      {/* pen overlapping the bottom-right corner */}
      <polygon
        points={`${cx + 5},${cy + 10} ${cx + 10},${cy + 5} ${cx + 11},${
          cy + 6
        } ${cx + 6},${cy + 11}`}
        fill="none"
        className={styles["line-strong"]}
      />
      <line
        x1={cx + 7}
        y1={cy + 9}
        x2={cx + 11}
        y2={cy + 5}
        className={styles["line-faint"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}

/** RECON icon — diamond badge with four arrows converging into a core */
export function reconMarker(
  cx: number,
  cy: number,
  label: string,
  size = 30,
  options: MarkerLabelOptions = {}
) {
  const outerDiamond = `${cx},${cy - 15} ${cx + 15},${cy} ${cx},${cy + 15} ${
    cx - 15
  },${cy}`;
  const innerDiamond = `${cx},${cy - 13} ${cx + 13},${cy} ${cx},${cy + 13} ${
    cx - 13
  },${cy}`;
  return (
    <g>
      <polygon
        points={outerDiamond}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <polygon
        points={innerDiamond}
        fill="none"
        className={styles["line-base"]}
      />
      {/* central core hexagon */}
      <polygon
        points={`${cx},${cy - 5} ${cx + 4.5},${cy - 2.5} ${cx + 4.5},${
          cy + 2.5
        } ${cx},${cy + 5} ${cx - 4.5},${cy + 2.5} ${cx - 4.5},${cy - 2.5}`}
        fill="none"
        className={styles["line-strong"]}
      />
      {/* top arrow */}
      <line
        x1={cx}
        y1={cy - 12}
        x2={cx}
        y2={cy - 6}
        className={styles["line-strong"]}
      />
      <polygon
        points={`${cx - 2},${cy - 6} ${cx + 2},${cy - 6} ${cx},${cy - 3}`}
        fill="none"
        className={styles["line-strong"]}
      />
      {/* bottom arrow */}
      <line
        x1={cx}
        y1={cy + 12}
        x2={cx}
        y2={cy + 6}
        className={styles["line-strong"]}
      />
      <polygon
        points={`${cx - 2},${cy + 6} ${cx + 2},${cy + 6} ${cx},${cy + 3}`}
        fill="none"
        className={styles["line-strong"]}
      />
      {/* left arrow */}
      <line
        x1={cx - 12}
        y1={cy}
        x2={cx - 6}
        y2={cy}
        className={styles["line-strong"]}
      />
      <polygon
        points={`${cx - 6},${cy - 2} ${cx - 6},${cy + 2} ${cx - 3},${cy}`}
        fill="none"
        className={styles["line-strong"]}
      />
      {/* right arrow */}
      <line
        x1={cx + 12}
        y1={cy}
        x2={cx + 6}
        y2={cy}
        className={styles["line-strong"]}
      />
      <polygon
        points={`${cx + 6},${cy - 2} ${cx + 6},${cy + 2} ${cx + 3},${cy}`}
        fill="none"
        className={styles["line-strong"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}

/** FACE MAP icon — document-style badge with many-to-many mapping */
export function faceMapMarker(
  cx: number,
  cy: number,
  label: string,
  size = 24,
  options: MarkerLabelOptions = {}
) {
  const halfW = 10;
  const halfH = 10;
  const leftX = cx - 7;
  const rightX = cx + 3;
  const ys = [cy - 5, cy, cy + 5];
  return (
    <g>
      <rect
        x={cx - halfW - 2}
        y={cy - halfH - 2}
        width={halfW * 2 + 4}
        height={halfH * 2 + 4}
        stroke="none"
        className={styles["fill-panel"]}
      />
      <rect
        x={cx - halfW}
        y={cy - halfH}
        width={halfW * 2}
        height={halfH * 2}
        fill="none"
        className={styles["line-base"]}
      />
      {ys.map((y, i) => (
        <rect
          key={`l${i}`}
          x={leftX}
          y={y - 2}
          width={4}
          height={4}
          fill="none"
          className={styles["line-base"]}
        />
      ))}
      {ys.map((y, i) => (
        <rect
          key={`r${i}`}
          x={rightX}
          y={y - 2}
          width={4}
          height={4}
          fill="none"
          className={styles["line-base"]}
        />
      ))}
      <line
        x1={leftX + 4}
        y1={cy - 5}
        x2={rightX}
        y2={cy + 5}
        className={styles["line-faint"]}
      />
      <line
        x1={leftX + 4}
        y1={cy}
        x2={rightX}
        y2={cy}
        className={styles["line-faint"]}
      />
      <line
        x1={leftX + 4}
        y1={cy + 5}
        x2={rightX}
        y2={cy - 5}
        className={styles["line-faint"]}
      />
      {nodeLabel(cx, cy, label, {
        ...options,
        labelOffset: options.labelOffset ?? 26,
      })}
    </g>
  );
}
