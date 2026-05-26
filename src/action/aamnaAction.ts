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

    // async changeQuality() {
    //     await this.aamnaPage.settingButton.click();
    //     await this.aamnaPage.qualityButton.click();
    // }

}