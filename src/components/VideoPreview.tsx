import { PlayIcon } from "./icons";

export function VideoPreview({ videoId }: { videoId: string | null }) {
  if (videoId) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-2xl bg-(--color-video-bg) lg:w-[960px]">
        <iframe
          className="size-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
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
