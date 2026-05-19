import { Page,Locator } from "@playwright/test";

export class ankitPage{

readonly page : Page;
readonly searchBox: Locator;
readonly fliter: Locator;



constructor(page:Page){

    this.page=page;
    this.searchBox=page.locator("//input[@class='ytSearchboxComponentInput yt-searchbox-input title']");
    this.fliter=page.locator("//div[@id='tooltip' and @class='style-scope tp-yt-paper-tooltip fade-in-animation']/parent::tp-yt-paper-tooltip/preceding-sibling::yt-button-shape//yt-touch-feedback-shape//div[@class='ytSpecTouchFeedbackShapeStroke']");
    
}

}
