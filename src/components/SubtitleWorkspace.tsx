"use client";

import { useMemo, useState } from "react";
import { SubtitleForm } from "./SubtitleForm";
import { VideoPreview } from "./VideoPreview";
import { LanguageSelect } from "./LanguageSelect";
import { SubtitleList } from "./SubtitleList";
import { DownloadIcon } from "./icons";
import {
  buildSubtitleText,
  extractVideoId,
  type SubtitleEntry,
} from "@/lib/youtube";
import { DEFAULT_LANGUAGE } from "@/lib/languages";
import { addHistoryEntry } from "@/lib/history";

export function SubtitleWorkspace() {
  const [url, setUrl] = useState("");
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [entries, setEntries] = useState<SubtitleEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewVideoId = useMemo(
    () => extractVideoId(url) ?? videoId,
    [url, videoId],
  );

  async function handleFetchSubtitles() {
    const id = extractVideoId(url);
    if (!id) {
      setError("유효한 YouTube URL을 입력해 주세요.");
      return;
    }

    setVideoId(id);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/subtitles?url=${encodeURIComponent(url)}&lang=${lang}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "자막을 가져오지 못했습니다.");
      }

      setVideoId(data.videoId);
      setVideoTitle(data.title ?? null);
      setEntries(data.entries);
    } catch (err) {
      setEntries([]);
      setError(
        err instanceof Error ? err.message : "자막을 가져오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleDownload() {
    if (entries.length === 0) return;

    const blob = new Blob([buildSubtitleText(entries)], {
      type: "text/plain;charset=utf-8",
    });
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = `subtitle-${videoId ?? "video"}-${lang}.txt`;
    anchor.click();
    URL.revokeObjectURL(downloadUrl);

    addHistoryEntry({
      title: videoTitle ?? `[${videoId}]`,
      url: url || `https://www.youtube.com/watch?v=${videoId}`,
    });
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:w-[960px] lg:gap-8">
      <SubtitleForm
        url={url}
        onUrlChange={setUrl}
        onSubmit={handleFetchSubtitles}
        isLoading={isLoading}
      />

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-6 lg:gap-8">
        <VideoPreview videoId={previewVideoId} />

        <section className="flex flex-col gap-3.5 rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 py-[18px] lg:flex-row lg:gap-7 lg:p-6">
          <div className="flex flex-1 flex-col gap-3.5">
            <h2 className="text-[17px] font-bold text-(--color-text) lg:text-lg">
              자막 스크립트
            </h2>
            <div className="lg:border-t lg:border-(--color-divider) lg:pt-2">
              <SubtitleList entries={entries} />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 lg:w-60 lg:border-l lg:border-(--color-divider) lg:pl-7">
            <LanguageSelect value={lang} onChange={setLang} />
            <button
              type="button"
              onClick={handleDownload}
              disabled={entries.length === 0}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-(--color-primary) bg-(--color-primary-soft) text-[15px] font-semibold text-(--color-primary) disabled:opacity-50 lg:border-none lg:bg-(--color-primary) lg:text-white"
            >
              <DownloadIcon className="size-[18px]" />
              자막 다운로드
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
