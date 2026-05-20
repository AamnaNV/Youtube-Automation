import { ankitPage } from "../page/youtube-ankitPage";
import { test, expect, Page } from "@playwright/test";

export class ankitAction {
  readonly page: Page;
  readonly youtubePage: ankitPage;

  constructor(page: Page) {
    this.page = page;
    this.youtubePage = new ankitPage(page);
  }

  async searchForVideo(videoName: string) {
    await this.youtubePage.searchBox.click();
    await this.youtubePage.searchBox.fill(videoName);
    await this.youtubePage.searchBox.press("Enter");

    const videos = this.page.locator("ytd-video-renderer");
    await expect(videos.first()).toBeVisible();

    const count = await videos.count();
    console.log(`Total videos found: ${count}`);

    expect(count).toBeGreaterThan(0);
  }

  async applyFilters(videoName: string) {
    await this.youtubePage.searchBox.click();
    await this.youtubePage.searchBox.fill(videoName);
    await this.youtubePage.searchBox.press("Enter");

    const videos = this.page.locator("ytd-video-renderer");
    await expect(videos.first()).toBeVisible();

    await this.youtubePage.fliter.click();
  }

  async applyFiltersValue(videoName: string) {
    await this.youtubePage.searchBox.click();
    await this.youtubePage.searchBox.fill(videoName);

    await this.page.getByRole("button", { name: "Search", exact: true }).click();

    const videos = this.page.locator("ytd-video-renderer");
    await expect(videos.first()).toBeVisible();

    await this.youtubePage.fliter.click();

    await this.page.waitForLoadState("load");

    await this.youtubePage.weekFilter.click();

    await this.page.waitForLoadState("load");

    await this.youtubePage.fliter.click();
    await this.youtubePage.movieFilter.click();
  }

  async applyRelevanceFilter(videoName: string) {
    await this.youtubePage.searchBox.click();
    await this.youtubePage.searchBox.fill(videoName);

    await this.page.getByRole("button", { name: "Search", exact: true }).click();

    const videos = this.page.locator("ytd-video-renderer");
    await expect(videos.first()).toBeVisible();

    await this.youtubePage.fliter.click();

    await this.page.waitForLoadState("load");

    await this.youtubePage.relevanceFilter.click();
  }

  async verifySearchSuggestions() {
    await this.youtubePage.searchBox.click();
    await this.youtubePage.searchBox.type("play", { delay: 300 });

    // wait for dropdown render
    await this.page.waitForTimeout(2000);

    // capture screenshot
    await this.page.screenshot({ path: "suggestions.png" });
  }
}