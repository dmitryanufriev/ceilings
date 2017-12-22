import * as http from "http";
import * as path from "path";
import * as express from "express";

import { ISettings } from "./settings/ISettings";
import { SettingsManual } from "./settings/SettingsManual";
import { SettingsNunjucks } from "./settings/SettingsNunjucks";
import { Routes } from "./http/Routes";
import { ReqHome } from "./home/ReqHome";
import { ResHtmlNunjucks } from "./home/ResHtmlNunjucks";

export class Application {
    private settings: ISettings;
    private routes: Routes;

    constructor() {
        this.settings = new SettingsNunjucks(
            path.join(__dirname, 'views'),
            new SettingsManual(8080)
        );
        this.routes = new Routes(
            new ReqHome(
                "/",
                new ResHtmlNunjucks("home/index.html")
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