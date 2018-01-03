import * as express from "express";
import * as http from "http";
import * as path from "path";

import {RequestPostBackcall} from "./backcall/RequestPostBackcall";
import { Configuration } from "./configuration/Configuration";
import { ConfigurationSection } from "./configuration/ConfigurationSection";
import {ReqGetHome} from "./home/ReqGetHome";
import {OutHtmlNunjucks} from "./http/outputs/OutHtmlNunjucks";
import {OutJson} from "./http/outputs/OutJson";
import {OutRedirectToInternalUrl} from "./http/outputs/OutRedirectToInternalUrl";
import {RouteGet} from "./http/routing/RouteGet";
import {RoutePost} from "./http/routing/RoutePost";
import {Routes} from "./http/routing/Routes";
import {ImagesInstagramRecent} from "./instagram/ImagesInstagramRecent";
import {ISettings} from "./settings/ISettings";
import {SettingsManual} from "./settings/SettingsManual";
import {SettingsNunjucks} from "./settings/SettingsNunjucks";
import {SettingsRequestBody} from "./settings/SettingsRequestBody";
import {SettingsStaticResources} from "./settings/SettingsStaticResources";

enum Urls {
    Home = "/",
    Portfolio = "/portfolio",
    Backcall = "/backcall"
}

export class Application {
    private settings: ISettings;
    private routes: Routes;

    constructor() {
        this.settings = new SettingsRequestBody(
            new SettingsNunjucks(
                path.join(__dirname, "views"),
                new SettingsStaticResources(
                    path.join(__dirname, "public"),
                    "/public",
                    new SettingsManual(8080)
                )
            )
        );

        this.routes = new Routes(
            new RouteGet(
                Urls.Home,
                new ReqGetHome(
                    new ConfigurationSection(
                        "Contacts",
                        new Configuration()
                    ),
                    new ImagesInstagramRecent(
                        new ConfigurationSection(
                            "Instagram",
                            new Configuration()
                        )
                    ),
                    new OutHtmlNunjucks(
                        "home/index.html"
                    )
                )
            ),
            new RoutePost(
                Urls.Backcall,
                new RequestPostBackcall(
                    new OutRedirectToInternalUrl(
                        Urls.Home
                    )
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
