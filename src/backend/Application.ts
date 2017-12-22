import * as http from "http";
import * as express from "express";

import { ISettings } from "./settings/ISettings";
import { SettingsManual } from "./settings/SettingsManual";
import { Routes } from "./http/Routes";
import { ReqHome } from "./home/ReqHome";
import { ResTextMessage } from "./home/ResTextMessage";

export class Application {
    private settings: ISettings;
    private routes: Routes;

    constructor() {
        this.settings = new SettingsManual(8080);
        this.routes = new Routes(
            new ReqHome(
                "/",
                new ResTextMessage()
            )
        );
    }

    public run() {
        let app = express();
        this.routes.setUp(app);
        this.settings.setUp(app);
        let server = http.createServer(app).listen(app.settings.port);
        server.on("listening", () => console.log(`Listen on port ${server.address().port}...`));
    }

    private onListeningIncomingRequests() {
        console.log("Listen app...");
    }
}