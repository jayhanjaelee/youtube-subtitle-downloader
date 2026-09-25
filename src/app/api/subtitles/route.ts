import { NextRequest, NextResponse } from "next/server";
import {
  YoutubeTranscript,
  YoutubeTranscriptNotAvailableLanguageError,
} from "youtube-transcript";
import { extractVideoId } from "@/lib/youtube";

async function fetchVideoTitle(videoId: string): Promise<string | null> {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        `https://www.youtube.com/watch?v=${videoId}`,
      )}&format=json`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return typeof data.title === "string" ? data.title : null;
  } catch {
    return null;
  }
}

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
    let transcript;
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang });
    } catch (error) {
      // 요청한 언어의 자막이 없는 경우(예: 자동 생성 자막만 존재), 이용 가능한 자막으로 대체
      if (error instanceof YoutubeTranscriptNotAvailableLanguageError && lang) {
        transcript = await YoutubeTranscript.fetchTranscript(videoId);
      } else {
        throw error;
      }
    }

    const entries = transcript.map((item) => ({
      start: item.offset / 1000,
      text: item.text,
    }));

    const title = await fetchVideoTitle(videoId);

    return NextResponse.json({ videoId, title, entries });
  } catch {
    return NextResponse.json(
      { error: "자막을 가져오지 못했습니다. 자막이 없는 영상일 수 있습니다." },
      { status: 502 },
    );
  }
}
