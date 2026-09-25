"use client";

import { useState } from "react";
import {
  formatHistoryDate,
  getHistory,
  type HistoryEntry,
} from "@/lib/history";
import { DownloadIcon } from "./icons";

export function HistoryList() {
  const [history] = useState<HistoryEntry[]>(() => getHistory());

  return (
    <div className="flex w-full flex-col gap-5 lg:w-[1080px] lg:gap-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-[22px] font-bold text-(--color-text) lg:text-[26px]">
          최근 기록
        </h1>
        <p className="text-[13px] text-(--color-text-secondary) lg:text-sm">
          총 {history.length}건
        </p>
      </div>

      {history.length === 0 ? (
        <p className="rounded-2xl border border-(--color-border) bg-(--color-surface) px-4 py-10 text-center text-sm text-(--color-text-secondary)">
          아직 다운로드한 자막이 없습니다.
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-2.5 lg:hidden">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-1.5 rounded-[14px] border border-(--color-border) bg-(--color-surface) px-4 py-3.5"
              >
                <p className="text-[15px] font-semibold text-(--color-text)">
                  {entry.title}
                </p>
                <p className="break-all font-mono text-[13px] text-(--color-primary)">
                  {entry.url}
                </p>
                <div className="flex items-center gap-1.5">
                  <DownloadIcon className="size-3.5 text-(--color-text-secondary)" />
                  <span className="text-[13px] text-(--color-text-secondary)">
                    다운로드
                  </span>
                  <span className="font-mono text-[13px] text-(--color-text-secondary)">
                    {formatHistoryDate(entry.downloadedAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden overflow-hidden rounded-[18px] border border-(--color-border) bg-(--color-surface) lg:block">
            <div className="flex gap-6 bg-(--color-bg-footer)/40 px-6 py-3 text-[13px] font-semibold text-(--color-text-secondary)">
              <p className="w-[476px]">동영상 제목</p>
              <p className="w-[380px]">YouTube URL</p>
              <p className="w-[180px]">다운로드 날짜</p>
            </div>
            {history.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center gap-6 border-t border-(--color-divider) px-6 py-4"
              >
                <p className="w-[476px] truncate text-[15px] font-semibold text-(--color-text)">
                  {entry.title}
                </p>
                <p className="w-[380px] truncate font-mono text-[13px] text-(--color-primary)">
                  {entry.url}
                </p>
                <p className="w-[180px] font-mono text-[13px] text-(--color-text-secondary)">
                  {formatHistoryDate(entry.downloadedAt)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
