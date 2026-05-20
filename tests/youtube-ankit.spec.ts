import { test } from "../src/fixture/fixture";

test.describe("Youtube Search Functionality", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto("https://www.youtube.com/");
    });

    test("should search for a video and display results", async ({ appActions }) => {
        await test.step("Search for a video on YouTube", async () => {
            await appActions.ankitAction.searchForVideo("Playwright Testing");
        });
    });

    test("Apply Filters", async ({ appActions }) => {
        await test.step("Apply filters and update results", async () => {
            await appActions.ankitAction.applyFilters("Playwright Testing");
        });
    });

    test("Apply FiltersValue", async ({ appActions }) => {
        await test.step("Apply filters and update values", async () => {
            await appActions.ankitAction.applyFiltersValue("Playwright Testing");
        });
    });

    test("Apply Relevance Filter", async ({ appActions }) => {
        await test.step("Apply relevance filter and update results", async () => {
            await appActions.ankitAction.applyRelevanceFilter("Playwright Testing");
        });
    });

    test("Verify Search Suggestions", async ({ appActions }) => {
        await test.step("Verify search suggestions are displayed", async () => {
            await appActions.ankitAction.verifySearchSuggestions();
        });
    });

});