"use client";

import type { LineSequencePlayer, MaterialSystem } from "@/lib/webgl";

interface LineSequenceDebugOverlayProps {
  player: LineSequencePlayer | null;
  materialSystem: MaterialSystem | null;
  loaded: boolean;
  error: string | null;
}

export default function LineSequenceDebugOverlay({
  player,
  materialSystem,
  loaded,
  error,
}: LineSequenceDebugOverlayProps) {
  const state = player?.getState();
  const currentGroup = player?.getCurrentGroup();

  const roleCounts: Record<string, number> = {};
  currentGroup?.children.forEach((child) => {
    const role = child.userData.role as string;
    const count = child.userData.edgeCount as number;
    if (role) {
      roleCounts[role] = count;
    }
  });

  return (
    <div className="absolute top-4 left-4 z-10 p-4 rounded bg-black/70 text-xs font-mono text-white backdrop-blur-sm pointer-events-none select-none">
      {error ? (
        <div className="text-red-400 mb-2">{error}</div>
      ) : (
        <>
          <div className="mb-1">loaded: {loaded ? "true" : "false"}</div>
          <div className="mb-1">
            frame: {state?.frameIndex ?? 0} / {state?.frameCount ?? 0}
          </div>
          <div className="mb-1">Blender frame: {state?.blenderFrame ?? 0}</div>
          <div className="mb-1">fps: {state?.fps ?? 0}</div>
          <div className="mb-1">speed: {state?.speed ?? 1}</div>
          <div className="mb-1">
            state: {state?.isPlaying ? "playing" : "paused"}
          </div>
          <div className="mb-2">
            cached frames: {player?.getCachedFrameCount() ?? 0}
          </div>
          <div className="border-t border-white/20 pt-2">
            <div className="mb-1 text-white/70">Role counts:</div>
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="flex justify-between gap-4">
                <span className="text-white/80">{role}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
          {materialSystem && (
            <div className="border-t border-white/20 pt-2 mt-2">
              <div className="mb-1 text-white/70">Roles:</div>
              {materialSystem.getRoles().map((role) => {
                const controls = materialSystem.getRoleControls(role);
                return (
                  <div key={role} className="flex justify-between gap-4">
                    <span className="text-white/80">{role}</span>
                    <span>
                      {controls.visible ? "on" : "off"} |{" "}
                      {(controls.opacity * 100).toFixed(0)}% |{" "}
                      {(controls.lineRatio * 100).toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
