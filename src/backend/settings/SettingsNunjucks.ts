import * as express from "express";
import * as nunjucks from "nunjucks";
import {ISettings} from "./ISettings";

export class SettingsNunjucks implements ISettings {
    private viewsPath: string;
    private origin: ISettings;

    constructor(viewsPath: string, origin: ISettings) {
        this.viewsPath = viewsPath;
        this.origin = origin;
    }

    public setUp(app: express.Application): void {
        this.origin.setUp(app);
        const env = nunjucks.configure(this.viewsPath, {
            autoescape: true
        });
        env.addFilter("digits", (x: string) => x.match(/\d+/g).join(""));
    }
}
