import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SubtitleWorkspace } from "./SubtitleWorkspace";

describe("SubtitleWorkspace", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("shows a validation error for an invalid URL", async () => {
    const user = userEvent.setup();
    render(<SubtitleWorkspace />);

    await user.type(
      screen.getByLabelText("YouTube URL"),
      "not-a-youtube-url",
    );
    await user.click(
      screen.getByRole("button", { name: "자막 불러오기" }),
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent("유효한 YouTube URL을 입력해 주세요.");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("renders subtitles returned from the API", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        videoId: "dQw4w9WgXcQ",
        entries: [{ start: 0, text: "[자막 문장 1]" }],
      }),
    });

    const user = userEvent.setup();
    render(<SubtitleWorkspace />);

    await user.type(
      screen.getByLabelText("YouTube URL"),
      "https://youtu.be/dQw4w9WgXcQ",
    );
    await user.click(
      screen.getByRole("button", { name: "자막 불러오기" }),
    );

    expect(await screen.findByText("[자막 문장 1]")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /자막 다운로드/ }),
    ).toBeEnabled();
  });

  it("shows an error message when the API call fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "자막을 가져오지 못했습니다." }),
    });

    const user = userEvent.setup();
    render(<SubtitleWorkspace />);

    await user.type(
      screen.getByLabelText("YouTube URL"),
      "https://youtu.be/dQw4w9WgXcQ",
    );
    await user.click(
      screen.getByRole("button", { name: "자막 불러오기" }),
    );

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "자막을 가져오지 못했습니다.",
      ),
    );
  });
});
