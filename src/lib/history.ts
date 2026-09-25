export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  downloadedAt: string;
}

const STORAGE_KEY = "subtitle-history";
const MAX_ENTRIES = 50;

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry: {
  title: string;
  url: string;
}): void {
  if (typeof window === "undefined") return;

  const newEntry: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: entry.title,
    url: entry.url,
    downloadedAt: new Date().toISOString(),
  };

  const updated = [newEntry, ...getHistory()].slice(0, MAX_ENTRIES);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function formatHistoryDate(iso: string): string {
  const date = new Date(iso);
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
