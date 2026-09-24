import { buildSubtitleText, extractVideoId, formatTimestamp } from "./youtube";

describe("extractVideoId", () => {
  it("extracts id from youtu.be short link", () => {
    expect(extractVideoId("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "dQw4w9WgXcQ",
    );
  });

  it("extracts id from watch url", () => {
    expect(
      extractVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("extracts id from embed url", () => {
    expect(
      extractVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("extracts id from shorts url", () => {
    expect(
      extractVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ"),
    ).toBe("dQw4w9WgXcQ");
  });

  it("accepts a bare video id", () => {
    expect(extractVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
  });

  it("returns null for invalid input", () => {
    expect(extractVideoId("not a url")).toBeNull();
    expect(extractVideoId("")).toBeNull();
    expect(extractVideoId("https://example.com")).toBeNull();
  });
});

describe("formatTimestamp", () => {
  it("formats seconds as mm:ss", () => {
    expect(formatTimestamp(0)).toBe("00:00");
    expect(formatTimestamp(9)).toBe("00:09");
    expect(formatTimestamp(65)).toBe("01:05");
    expect(formatTimestamp(3599)).toBe("59:59");
  });

  it("clamps negative values to zero", () => {
    expect(formatTimestamp(-5)).toBe("00:00");
  });
});

describe("buildSubtitleText", () => {
  it("joins entries with timestamp prefix", () => {
    const text = buildSubtitleText([
      { start: 0, text: "안녕하세요" },
      { start: 4.2, text: "반갑습니다" },
    ]);

    expect(text).toBe("00:00 안녕하세요\n00:04 반갑습니다");
  });

  it("returns an empty string for no entries", () => {
    expect(buildSubtitleText([])).toBe("");
  });
});
