"use client";

import { useState } from "react";
import { PlayIcon } from "./icons";

export function VideoPreview({ videoId }: { videoId: string | null }) {
  return <VideoPreviewInner key={videoId} videoId={videoId} />;
}

function VideoPreviewInner({ videoId }: { videoId: string | null }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (videoId) {
    if (isPlaying) {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1${
        origin ? `&origin=${encodeURIComponent(origin)}` : ""
      }`;

      return (
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-(--color-video-bg) lg:w-[960px]">
          <iframe
            className="size-full"
            src={embedSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => setIsPlaying(true)}
        aria-label="Play video"
        className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-(--color-video-bg) lg:w-[960px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
          alt="Video thumbnail"
          className="size-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
          <span className="flex size-14 items-center justify-center rounded-full bg-white/14 lg:size-19">
            <PlayIcon className="size-6 text-white lg:size-8" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="flex aspect-video w-full flex-col items-center justify-center gap-3.5 rounded-2xl bg-(--color-video-bg) lg:w-[960px]">
      <div className="flex size-14 items-center justify-center rounded-full bg-white/14 lg:size-19">
        <PlayIcon className="size-6 text-white lg:size-8" />
      </div>
      <p className="font-mono text-xs text-(--color-text-video-muted)">
        YouTube iframe · VIDEO_ID
      </p>
    </div>
  );
}
