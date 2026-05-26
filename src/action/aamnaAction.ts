import {Page, expect} from '@playwright/test';
import { AamnaPage } from '../page/aamnaPage';

export class AamnaAction{
    readonly aamnaPage: AamnaPage;

    constructor(page: Page) {
        this.aamnaPage = new AamnaPage(page);
    }

    async goToYoutube() {
        await this.aamnaPage.page.goto("https://www.youtube.com/");
    }

    async searchVideo(topic: string) {
        await this.aamnaPage.searchBar.fill(topic);
        await this.aamnaPage.searchBar.press("Enter");
        await this.aamnaPage.videos.first().scrollIntoViewIfNeeded();
        await expect(this.aamnaPage.videos.first()).toBeVisible();

    }

    async openFirstVideo() {
        await this.aamnaPage.videos.nth(0).click();
        await expect(this.aamnaPage.page).toHaveURL(/watch/);
    }

    async verifyVideoPage() { 
        await expect(this.aamnaPage.videoTitle).toBeVisible();
        await expect(this.aamnaPage.pauseButton).toBeVisible();
    }

    async pausePlayVideo() {
        await this.aamnaPage.mainVideo.nth(0).click();
        await this.aamnaPage.page.keyboard.press("Space");
        await expect(this.aamnaPage.pauseButton).toBeVisible();
        await this.aamnaPage.page.keyboard.press("Space");
        await expect(this.aamnaPage.playButton).toBeVisible();
    }

    async fullScreen() {
        await this.aamnaPage.fullScreenButton.click();
        const isFullscreen = await this.aamnaPage.page.evaluate(() => {
            return !!document.fullscreenElement;
        });
        expect(isFullscreen).toBeTruthy();
    }

    async waitForAdsToFinish() {
    await this.aamnaPage.playerContainer.waitFor({ state: 'visible' });

    // wait until player is stable AND quality option exists in settings
    // quality menu item only appears for real video, never during ads
    await this.aamnaPage.page.waitForFunction(
        () => {
            const player = document.querySelector('#movie_player');
            if (!player) return false;
            
            const isAdPlaying = document.body.classList.contains('ad-showing');
            const isUnstarted = player.classList.contains('unstarted-mode');
            
            return !isAdPlaying && !isUnstarted;
        },
        { timeout: 120000, polling: 1000 } // poll every 1s, allow up to 2 mins for 3 ads
    );

    // extra buffer — catches the gap between back-to-back ads
    // where ad-showing briefly disappears before next ad loads
    await this.aamnaPage.page.waitForTimeout(3000);

    // recheck one final time after the buffer
    const stillAdActive = await this.aamnaPage.adShowing.isVisible().catch(() => false);
    if (stillAdActive) {
        await this.waitForAdsToFinish(); // recurse if another ad started in the gap
    }
}

    async changeQuality() {
        await this.waitForAdsToFinish();

        // hover to reveal controls, then wait for settings button to be visible
        await this.aamnaPage.mainVideo.nth(0).hover();
        await this.aamnaPage.settingButton.waitFor({ state: 'visible' });
        await this.aamnaPage.settingButton.click();

        // wait for quality option to appear in the menu
        await this.aamnaPage.qualityButton.waitFor({ state: 'visible' });
        await this.aamnaPage.qualityButton.click();

        // wait for 720p submenu to appear
        await this.aamnaPage.quality480p.waitFor({ state: 'visible' });
        await this.aamnaPage.quality480p.click();
    }}