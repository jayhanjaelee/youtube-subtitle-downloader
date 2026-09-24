export interface SubtitleEntry {
  start: number;
  text: string;
}

const YOUTUBE_URL_PATTERN =
  /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtube\.com\/watch\?.*[?&]v=)([a-zA-Z0-9_-]{11})/;

export function extractVideoId(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const match = trimmed.match(YOUTUBE_URL_PATTERN);
  if (match) return match[1];

  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  return null;
}

export function formatTimestamp(seconds: number): string {
  const totalSeconds = Math.max(0, Math.floor(seconds));
  const mm = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (totalSeconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

export function buildSubtitleText(entries: SubtitleEntry[]): string {
  return entries
    .map((entry) => `${formatTimestamp(entry.start)} ${entry.text}`)
    .join("\n");
}
