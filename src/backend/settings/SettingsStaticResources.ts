import * as express from "express";
import { ISettings } from "./ISettings";

export class SettingsStaticResources implements ISettings {
    private path: string;
    private alias: string;
    private origin: ISettings;

    constructor(path: string, alias: string, origin: ISettings) {
        this.path = path;
        this.alias = alias;
        this.origin = origin;
    }

    public setUp(app: express.Application): void {
        this.origin.setUp(app);
        app.use(this.alias, express.static(this.path));
    }
}
