import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";
import { extractVideoId } from "@/lib/youtube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") ?? "";
  const lang = searchParams.get("lang") ?? undefined;

  const videoId = extractVideoId(url);
  if (!videoId) {
    return NextResponse.json(
      { error: "유효한 YouTube URL이 아닙니다." },
      { status: 400 },
    );
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang,
    });

    const entries = transcript.map((item) => ({
      start: item.offset / 1000,
      text: item.text,
    }));

    return NextResponse.json({ videoId, entries });
  } catch {
    return NextResponse.json(
      { error: "자막을 가져오지 못했습니다. 자막이 없는 영상일 수 있습니다." },
      { status: 502 },
    );
  }
}
