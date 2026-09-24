import { expect, test } from "@playwright/test";

const MOCK_RESPONSE = {
  videoId: "dQw4w9WgXcQ",
  entries: [
    { start: 0, text: "[자막 문장 1]" },
    { start: 4, text: "[자막 문장 2]" },
  ],
};

test.beforeEach(async ({ page }) => {
  await page.route("**/api/subtitles*", async (route) => {
    await route.fulfill({ json: MOCK_RESPONSE });
  });
});

test("golden path: fetch and download subtitles", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "자막 다운로더" }),
  ).toBeVisible();

  await page.getByLabel("YouTube URL").fill("https://youtu.be/dQw4w9WgXcQ");
  await page.getByRole("button", { name: "자막 불러오기" }).click();

  await expect(page.getByText("[자막 문장 1]")).toBeVisible();
  await expect(page.getByText("[자막 문장 2]")).toBeVisible();

  const downloadButton = page.getByRole("button", { name: /자막 다운로드/ });
  await expect(downloadButton).toBeEnabled();

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadButton.click(),
  ]);
  expect(download.suggestedFilename()).toContain("subtitle-dQw4w9WgXcQ");
});

test("shows a validation error for an invalid URL", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("YouTube URL").fill("not-a-url");
  await page.getByRole("button", { name: "자막 불러오기" }).click();

  await expect(
    page.getByText("유효한 YouTube URL을 입력해 주세요."),
  ).toBeVisible();
});

test("mobile viewport shows the hamburger menu instead of the sidebar", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile-only assertion");

  await page.goto("/");

  await expect(page.getByRole("button", { name: "메뉴 열기" })).toBeVisible();
  await expect(page.getByRole("link", { name: "최근 기록" })).toBeHidden();
});

test("desktop viewport shows the sidebar navigation", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "desktop-only assertion");

  await page.goto("/");

  await expect(page.getByRole("link", { name: "최근 기록" })).toBeVisible();
});
