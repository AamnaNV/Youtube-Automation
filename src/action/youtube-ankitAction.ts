import { ankitPage } from "../page/youtube-ankitPage";
import { test, expect, Page } from "@playwright/test";

export class ankitAction{
 readonly page : Page;
 readonly youtubePage : ankitPage;  


 constructor(page:Page){
    this.page=page;
    this.youtubePage=new ankitPage(page);
 }


 async searchForVideo(videoName:string){
    await this.youtubePage.searchBox.fill(videoName);
    await this.youtubePage.searchBox.press('Enter');
    
    const videos  = this.page.locator("ytd-video-rendere");
    const count  = await videos.count();
    console.log(`Total videos found: ${count}`);
    expect(count).toBeGreaterThan(0);
}}