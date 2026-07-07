"use client";

import type { LineSequencePlayer, MaterialSystem } from "@/lib/webgl";

interface TechnicalSpecimenOverlayProps {
  player: LineSequencePlayer | null;
  materialSystem: MaterialSystem | null;
}

export default function TechnicalSpecimenOverlay({
  player,
}: TechnicalSpecimenOverlayProps) {
  const state = player?.getState();

  const totalNodes = state?.vertexCount ?? 0;
  const totalEdges = state?.edgeCount ?? 0;

  const durationSeconds = state?.fps ? state.frameCount / state.fps : 6;
  const cycleProgress =
    ((state?.elapsed ?? 0) % durationSeconds) / durationSeconds;
  const scanline = Math.floor(cycleProgress * 100);
  const scanProgress = cycleProgress;

  const coordX = -128 + ((state?.frameIndex ?? 0) % 64);
  const coordY = 64 + ((state?.frameIndex ?? 0) % 32);
  const coordZ = 256 - ((state?.frameIndex ?? 0) % 48);

  const DEFAULT_FOV = 45;
  const rot = 0;

  const formatCoord = (value: number) => {
    const sign = value < 0 ? "-" : "";
    const digits = Math.abs(value).toFixed(2).padStart(6, "0");
    return `${sign}${digits}`;
  };

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Background grid layer */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          transform: "perspective(600px) rotateX(60deg) translateY(-20%)",
          transformOrigin: "center bottom",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: `
            linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)
          `,
          transform: `translateX(${(scanProgress - 0.5) * 200}%)`,
          transition: "transform 0.1s linear",
        }}
      />

      {/* Signal layer */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[160px] h-[160px] rounded-full border border-dashed border-white/30"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        />
        <div
          className="absolute w-[120px] h-[120px] rounded-full border border-white/30"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        />
        <div
          className="absolute w-[80px] h-[80px] rounded-full border border-white/40"
          style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
          }}
        />
      </div>

      {/* Center crosshair + auxiliary guides */}
      <div
        className="absolute w-10 h-px bg-white"
        style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
      />
      <div
        className="absolute h-10 w-px bg-white"
        style={{ transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}
      />

      {/* Horizontal auxiliary cross lines through center */}
      <div
        className="absolute left-0 h-px bg-white/[0.25]"
        style={{
          top: "50%",
          width: "calc(50% - 196px)",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 50%, transparent 50%)",
          backgroundSize: "8px 1px",
        }}
      />
      <div
        className="absolute right-0 h-px bg-white/[0.25]"
        style={{
          top: "50%",
          width: "calc(50% - 196px)",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.12) 50%, transparent 50%)",
          backgroundSize: "8px 1px",
        }}
      />
      {/* Vertical auxiliary cross lines through center */}
      <div
        className="absolute top-0 w-px bg-white/[0.25]"
        style={{
          left: "50%",
          height: "calc(50% - 196px)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.12) 50%, transparent 50%)",
          backgroundSize: "1px 8px",
        }}
      />
      <div
        className="absolute bottom-0 w-px bg-white/[0.25]"
        style={{
          left: "50%",
          height: "calc(50% - 196px)",
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.12) 50%, transparent 50%)",
          backgroundSize: "1px 8px",
        }}
      />

      {/* Corner brackets — lens frame style */}
      <CornerBracket position="top-left" />
      <CornerBracket position="top-right" />
      <CornerBracket position="bottom-left" />
      <CornerBracket position="bottom-right" />

      {/* Crosshair tick marks at 30% from edges */}
      <CrosshairTick direction="top" />
      <CrosshairTick direction="bottom" />
      <CrosshairTick direction="left" />
      <CrosshairTick direction="right" />

      {/* HUD overlay */}
      <div className="absolute top-8 left-8 text-[10px] font-mono uppercase tracking-wider leading-relaxed text-white/60">
        <div className="text-white/90 font-bold">WebGL Specimen</div>
        <div className="text-white/90">Geometry Node Sequence</div>
        <div className="text-white/90">Render_mode : Wireframe</div>
      </div>

      <div className="absolute top-8 right-8 text-[10px] font-mono uppercase tracking-wider text-right leading-relaxed text-white/60">
        <div className="text-white/80">
          <span>X {formatCoord(coordX)}</span>&nbsp;
          <span>Y {formatCoord(coordY)}</span>&nbsp;
          <span>Z {formatCoord(coordZ)}</span>
        </div>
        <div className="text-white/80">
          <span>ROT {formatCoord(rot % 360)}</span>&nbsp;
          <span>FOV {DEFAULT_FOV.toFixed(2).padStart(6)}</span>
        </div>
        <div className="text-white/80">
          <span>Status: Streaming</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 text-[10px] font-mono uppercase tracking-wider leading-relaxed text-white/60">
        <StatusRow
          label="Nodes"
          value={totalNodes.toString().padStart(3, "0")}
        />
        <StatusRow
          label="Edges"
          value={totalEdges.toString().padStart(3, "0")}
        />
        <StatusRow
          label="Loop"
          value={state?.isPlaying ? "Active" : "Idle"}
          active={state?.isPlaying}
        />
        <StatusRow
          label="FPS"
          value={(state?.fps ?? 0).toFixed(1).padStart(3)}
        />
      </div>

      <div className="absolute bottom-8 left-8 text-[10px] font-mono uppercase tracking-wider leading-relaxed text-white/60">
        <div className="text-white/40">
          Scanline {scanline.toString().padStart(2, "0")}%
        </div>
        <div className="w-32 h-1 bg-white/10 mt-1 overflow-hidden">
          <div
            className="h-full bg-[#f84532]"
            style={{ width: `${scanProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Bottom tactical line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

function StatusRow({
  label,
  value,
  active,
}: {
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className="flex">
      <span className="w-8">{label}</span>
      <span className="w-2">:</span>
      <span className={`w-10 text-right ${active ? "text-[#f84532]" : ""}`}>
        {value}
      </span>
    </div>
  );
}

function CornerBracket({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const offset = "12px";
  const size = "28px";
  const thickness = "1px";
  const color = "rgba(255,255,255,0.8)";

  const configs: Record<string, React.CSSProperties> = {
    "top-left": {
      position: "absolute",
      top: offset,
      left: offset,
      width: size,
      height: size,
      borderTop: `${thickness} solid ${color}`,
      borderLeft: `${thickness} solid ${color}`,
    },
    "top-right": {
      position: "absolute",
      top: offset,
      right: offset,
      width: size,
      height: size,
      borderTop: `${thickness} solid ${color}`,
      borderRight: `${thickness} solid ${color}`,
    },
    "bottom-left": {
      position: "absolute",
      bottom: offset,
      left: offset,
      width: size,
      height: size,
      borderBottom: `${thickness} solid ${color}`,
      borderLeft: `${thickness} solid ${color}`,
    },
    "bottom-right": {
      position: "absolute",
      bottom: offset,
      right: offset,
      width: size,
      height: size,
      borderBottom: `${thickness} solid ${color}`,
      borderRight: `${thickness} solid ${color}`,
    },
  };

  return <div style={configs[position]} />;
}

function CrosshairTick({
  direction,
}: {
  direction: "top" | "bottom" | "left" | "right";
}) {
  const length = "28px";
  const thickness = "1px";
  const baseColor = "rgba(255,255,255,0.8)";

  const styles: Record<string, React.CSSProperties> = {
    top: {
      position: "absolute",
      left: "50%",
      top: "0%",
      width: thickness,
      height: length,
      backgroundColor: baseColor,
      transform: "translateX(-50%)",
    },
    bottom: {
      position: "absolute",
      left: "50%",
      bottom: "0%",
      width: thickness,
      height: length,
      backgroundColor: baseColor,
      transform: "translateX(-50%)",
    },
    left: {
      position: "absolute",
      top: "50%",
      left: "0%",
      width: length,
      height: thickness,
      backgroundColor: baseColor,
      transform: "translateY(-50%)",
    },
    right: {
      position: "absolute",
      top: "50%",
      right: "0%",
      width: length,
      height: thickness,
      backgroundColor: baseColor,
      transform: "translateY(-50%)",
    },
  };

  return <div style={styles[direction]} />;
}
