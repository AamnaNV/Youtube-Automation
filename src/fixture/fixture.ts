import { test as base } from "@playwright/test";
import { ankitAction } from "../action/youtube-ankitAction";
import { AamnaAction } from "../action/aamnaAction";

type AppActions = {
 ankitAction: ankitAction;
 aamnaAction: AamnaAction;
};

type Fixtures = {
    gotoBaseUrl: void;
    appActions: AppActions;
};

export const test = base.extend<Fixtures>({

    appActions: async ({ page }, use) => {
        const appAction: AppActions = {
            ankitAction: new ankitAction(page),
            aamnaAction: new AamnaAction(page)

        };
        await use(appAction);
    },
});

export { expect } from "@playwright/test";
