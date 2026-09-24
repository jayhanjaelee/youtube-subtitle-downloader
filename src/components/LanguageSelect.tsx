import { SUBTITLE_LANGUAGES } from "@/lib/languages";

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor="lang"
        className="text-[13px] font-semibold text-(--color-text-secondary)"
      >
        자막 언어
      </label>
      <select
        id="lang"
        name="lang"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) px-4 text-[15px] text-(--color-text) outline-none focus:border-(--color-primary)"
      >
        {SUBTITLE_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
}
