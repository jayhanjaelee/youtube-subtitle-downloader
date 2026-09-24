import { formatTimestamp, type SubtitleEntry } from "@/lib/youtube";

export function SubtitleList({ entries }: { entries: SubtitleEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="py-6 text-sm text-(--color-text-secondary)">
        YouTube URL을 입력하고 자막을 불러와 주세요.
      </p>
    );
  }

  return (
    <ul className="max-h-[300px] overflow-auto lg:max-h-[349px]">
      {entries.map((entry, index) => (
        <li
          key={`${entry.start}-${index}`}
          className="flex gap-3 rounded-lg px-1 py-2 hover:bg-(--color-primary-soft) lg:gap-4 lg:px-1.5"
        >
          <span className="w-11 shrink-0 font-mono text-[13px] text-(--color-primary) lg:w-12">
            {formatTimestamp(entry.start)}
          </span>
          <span className="text-[15px] text-(--color-text)">
            {entry.text}
          </span>
        </li>
      ))}
    </ul>
  );
}
