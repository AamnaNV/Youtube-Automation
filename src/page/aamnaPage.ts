//open a public video and verify it loads
//play/pause using keyboard shortcut (space)
//toggle full screen and verify player state
//change video quality (360p to 720p)
import {Page, Locator} from '@playwright/test';

export class AamnaPage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly videosOption: Locator;
    readonly videos: Locator;
    readonly videoTitle: Locator;
    readonly mainVideo: Locator;
    readonly pauseButton: Locator;
    readonly playButton: Locator;
    readonly fullScreenButton: Locator;
    readonly settingButton: Locator;
    readonly qualityButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchBar = page.locator('//input[@name="search_query"]');
        this.videosOption = page.locator('//div[text()= "Videos"]')
        this.videos = page.locator('//a[@class="yt-simple-endpoint inline-block style-scope ytd-thumbnail"]//img');
        this.videoTitle = page.locator('//h1[@class="style-scope ytd-watch-metadata"]');
        this.mainVideo = page.locator('//video[@class="video-stream html5-main-video"]')
        this.pauseButton = page.locator('//button[@data-title-no-tooltip="Pause"]');
        this.playButton = page.locator('//button[@data-title-no-tooltip="Play"]');
        this.fullScreenButton = page.locator('//button[@class="ytp-fullscreen-button ytp-button"]');
        this.settingButton = page.locator('//button[@class="ytp-button ytp-settings-button"]');
        this.qualityButton = page.locator('//div[@class="ytp-menuitem-label" and text() = "Quality"]');
    }
}