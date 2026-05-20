import { Page, Locator } from "@playwright/test";

export class ankitPage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly fliter: Locator;
  readonly weekFilter: Locator;
  readonly movieFilter: Locator;
  readonly relevanceFilter: Locator;
  readonly searchSuggestions: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchBox = page.locator(
      "//input[@class='ytSearchboxComponentInput yt-searchbox-input title']"
    );

    this.fliter = page.locator("//button[@aria-label='Search filters']");

    this.weekFilter = page.locator("//yt-formatted-string[.='This week']");

    this.movieFilter = page.locator(
      "(//yt-formatted-string[.='Movies'])[1]"
    );

    this.relevanceFilter = page.locator(
      "//yt-formatted-string[.='Relevance']"
    );

    this.searchSuggestions = page.getByRole("button", {
      name: "Search",
      exact: true,
    });
  }
}
