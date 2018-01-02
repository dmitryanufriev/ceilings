import * as bodyParser from "body-parser";
import {Application} from "express";
import {ISettings} from "./ISettings";

export class SettingsRequestBody implements ISettings {
    private origin: ISettings;

    constructor(origin: ISettings) {
        this.origin = origin;
    }

    public setUp(app: Application): void {
        this.origin.setUp(app);
        app.use(bodyParser.json());
    }
}
