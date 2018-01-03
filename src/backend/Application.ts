import * as express from "express";
import * as http from "http";
import * as path from "path";

import {ActGetHome} from "./actions/ActGetHome";
import {ActPostBackcall} from "./actions/ActPostBackcall";
import {OutHtmlNunjucks} from "./application/outputs/OutHtmlNunjucks";
import {OutJson} from "./application/outputs/OutJson";
import {OutRedirectToInternalUrl} from "./application/outputs/OutRedirectToInternalUrl";
import {RouteGet} from "./application/routing/RouteGet";
import {RoutePost} from "./application/routing/RoutePost";
import {Routes} from "./application/routing/Routes";
import {Configuration} from "./configuration/Configuration";
import {ConfigurationSection} from "./configuration/ConfigurationSection";
import {ImagesInstagramRecent} from "./instagram/ImagesInstagramRecent";
import {ISettings} from "./settings/ISettings";
import {SettingsManual} from "./settings/SettingsManual";
import {SettingsNunjucks} from "./settings/SettingsNunjucks";
import {SettingsRequestBody} from "./settings/SettingsRequestBody";
import {SettingsStaticResources} from "./settings/SettingsStaticResources";

enum Urls {
    Home = "/",
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
                new ActGetHome(
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
                new ActPostBackcall(
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
