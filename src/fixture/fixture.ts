import { test as base } from "@playwright/test";
import { ankitAction } from "../action/youtube-ankitAction";

type AppActions = {
 ankitAction: ankitAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({

    appActions: async ({ page }, use) => {
        const appAction: AppActions = {
            ankitAction: new ankitAction(page),
        };
        await use(appAction);
    },
});

export { expect } from "@playwright/test";
