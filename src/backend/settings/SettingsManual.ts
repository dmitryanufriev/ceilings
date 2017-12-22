import * as express from "express";
import { ISettings } from "./ISettings";

export class SettingsManual implements ISettings {
    private httpPort: number;

    constructor(port: number) {
        this.httpPort = port;
    }

    public setUp(app: express.Application): void {
        app.set("port", this.httpPort);
    }
}