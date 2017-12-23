import * as http from "http";
import * as path from "path";
import * as express from "express";

import { ISettings } from "./settings/ISettings";
import { SettingsManual } from "./settings/SettingsManual";
import { SettingsNunjucks } from "./settings/SettingsNunjucks";
import { Routes } from "./http/routing/Routes";
import { RouteGet } from "./http/routing/RouteGet";
import { ReqHome } from "./home/ReqHome";
import { OutHtmlNunjucks } from "./http/outputs/OutHtmlNunjucks";

enum Urls {
    Home = "/"
}

export class Application {
    private settings: ISettings;
    private routes: Routes;

    constructor() {
        this.settings = new SettingsNunjucks(
            path.join(__dirname, 'views'),
            new SettingsManual(8080)
        );

        this.routes = new Routes(
            new RouteGet(
                Urls.Home,
                new ReqHome(
                    new OutHtmlNunjucks(
                        "home/index.html"
                    )
                )
            )
        );
    }

    public run() {
        let app = express();
        this.settings.setUp(app);
        this.routes.setUp(app);
        let server = http.createServer(app).listen(app.settings.port);
        server.on("listening", () => console.log(`Listen on port ${server.address().port}...`));
    }
}