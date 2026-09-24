"use client";

import { LinkIcon } from "./icons";

interface SubtitleFormProps {
  url: string;
  onUrlChange: (url: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function SubtitleForm({
  url,
  onUrlChange,
  onSubmit,
  isLoading,
}: SubtitleFormProps) {
  return (
    <form
      className="flex w-full flex-col gap-2.5 lg:w-[960px] lg:flex-row lg:items-end lg:gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className="flex flex-1 flex-col gap-2.5">
        <label
          htmlFor="yt-url"
          className="text-sm font-semibold text-(--color-text)"
        >
          YouTube URL
        </label>
        <div className="relative">
          <LinkIcon className="pointer-events-none absolute top-1/2 left-3.5 size-[18px] -translate-y-1/2 text-(--color-text-secondary) lg:left-4" />
          <input
            id="yt-url"
            name="yt-url"
            type="text"
            inputMode="url"
            placeholder="https://youtu.be/VIDEO_ID"
            value={url}
            onChange={(event) => onUrlChange(event.target.value)}
            className="h-12 w-full rounded-xl border border-(--color-border-strong) bg-(--color-surface) py-3 pr-3.5 pl-[42px] text-[15px] text-(--color-text) outline-none focus:border-(--color-primary) lg:h-[52px] lg:pl-[46px]"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="h-12 shrink-0 rounded-xl bg-(--color-primary) px-6 text-[15px] font-semibold text-white disabled:opacity-60 lg:h-[52px] lg:w-40"
      >
        {isLoading ? "불러오는 중..." : "자막 불러오기"}
      </button>
    </form>
  );
}
