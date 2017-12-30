import * as express from "express";
import * as http from "http";
import * as path from "path";

import { ReqGetHome } from "./home/ReqGetHome";
import { OutHtmlNunjucks } from "./http/outputs/OutHtmlNunjucks";
import { OutJson } from "./http/outputs/OutJson";
import { RouteGet } from "./http/routing/RouteGet";
import { Routes } from "./http/routing/Routes";
import { ReqGetPortfolio } from "./portfolio/ReqGetPortfolio";
import { ISettings } from "./settings/ISettings";
import { SettingsManual } from "./settings/SettingsManual";
import { SettingsNunjucks } from "./settings/SettingsNunjucks";
import { SettingsStaticResources } from "./settings/SettingsStaticResources";

enum Urls {
    Home = "/",
    Portfolio = "/portfolio"
}

export class Application {
    private settings: ISettings;
    private routes: Routes;

    constructor() {
        this.settings = new SettingsNunjucks(
            path.join(__dirname, "views"),
            new SettingsStaticResources(
                path.join(__dirname, "public"),
                "/public",
                new SettingsManual(8080)
            )
        );

        this.routes = new Routes(
            new RouteGet(
                Urls.Home,
                new ReqGetHome(
                    new OutHtmlNunjucks(
                        "home/index.html"
                    )
                )
            ),
            new RouteGet(
                Urls.Portfolio,
                new ReqGetPortfolio(
                    new OutJson()
                )
            )
        );
    }

    public run() {
        const app = express();
        this.settings.setUp(app);
        this.routes.setUp(app);
        const server = http.createServer(app).listen(app.settings.port);
        server.on("listening", () => console.log(`Listen on port ${server.address().port}...`));
    }
}
