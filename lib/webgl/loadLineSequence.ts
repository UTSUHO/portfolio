import type { LineSequence } from "./types";

export class LineSequenceLoadError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "LineSequenceLoadError";
  }
}

export async function loadLineSequence(dataUrl: string): Promise<LineSequence> {
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new LineSequenceLoadError(
      `Failed to load line sequence: ${response.status} ${response.statusText}`,
      response.status
    );
  }
  const data: unknown = await response.json();
  if (!data || typeof data !== "object") {
    throw new LineSequenceLoadError("Loaded data is not a JSON object");
  }
  return data as LineSequence;
}
