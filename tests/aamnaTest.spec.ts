import {test} from '../src/fixture/fixture';
import data from '../src/data/data.json'


test("TC01: Open a public video and verify it loads", async ({appActions}) => {
    await appActions.aamnaAction.goToYoutube();
    await appActions.aamnaAction.searchVideo(data.topic);
    await appActions.aamnaAction.openFirstVideo();
    await appActions.aamnaAction.verifyVideoPage();
})

test("TC02: Play/Pause using keyboard shortcut (space)", async ({appActions}) => {
    await appActions.aamnaAction.goToYoutube();
    await appActions.aamnaAction.searchVideo(data.topic);
    await appActions.aamnaAction.openFirstVideo();
    await appActions.aamnaAction.verifyVideoPage();
    await appActions.aamnaAction.pausePlayVideo();
})

test("TC03: toggle full screen and verify player state", async ({appActions}) => {
    await appActions.aamnaAction.goToYoutube();
    await appActions.aamnaAction.searchVideo(data.topic);
    await appActions.aamnaAction.openFirstVideo();
    await appActions.aamnaAction.verifyVideoPage();
    await appActions.aamnaAction.fullScreen();
})

// test.only("TC04: change video quality (360p to 720p)", async ({appActions}) => {
//     await appActions.aamnaAction.goToYoutube();
//     await appActions.aamnaAction.searchVideo(data.topic);
//     await appActions.aamnaAction.openFirstVideo();
//     await appActions.aamnaAction.verifyVideoPage();
//     await appActions.aamnaAction.changeQuality();
// })

