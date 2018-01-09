import * as express from "express";
import * as http from "http";
import * as path from "path";

import {ActCsrfProtected} from "./actress/actions/ActCsrfProtected";
import {ActOutput} from "./actress/actions/ActOutput";
import {ActRequestBodyValidated} from "./actress/actions/ActRequestBodyValidated";
import {Configuration} from "./actress/configuration/Configuration";
import {ConfigurationComposite} from "./actress/configuration/ConfigurationComposite";
import {CsrfTokens} from "./actress/csrf/CsrfTokens";
import {HtmlEngineNunjucks} from "./actress/html/HtmlEngineNunjucks";
import {ImagesInstagramRecent} from "./actress/instagram/ImagesInstagramRecent";
import {OutCookieCsrf} from "./actress/outputs/OutCookieCsrf";
import {OutHtml} from "./actress/outputs/OutHtml";
import {OutStatusForbidden} from "./actress/outputs/OutStatusForbidden";
import {OutStatusInternalServerError} from "./actress/outputs/OutStatusInternalServerError";
import {OutStatusNoContent} from "./actress/outputs/OutStatusNoContent";
import {OutStatusNotFound} from "./actress/outputs/OutStatusNotFound";
import {OutStatusUnprocessableEntity} from "./actress/outputs/OutStatusUnprocessableEntity";
import {IRoutes} from "./actress/routing/IRoutes";
import {RouteGet} from "./actress/routing/RouteGet";
import {RouteNotFound} from "./actress/routing/RouteNotFound";
import {RoutePost} from "./actress/routing/RoutePost";
import {Routes} from "./actress/routing/Routes";
import {RoutesSafe} from "./actress/routing/RoutesSafe";
import {SmtpMailRu} from "./actress/smtp/transport/SmtpMailRu";
import {MaxLength} from "./actress/validation/MaxLength";
import {Required} from "./actress/validation/Required";
import {ValidationComposite} from "./actress/validation/ValidationComposite";
import {ActHomeGet} from "./pages/ActHomeGet";
import {ActHomePostBackcall} from "./pages/ActHomePostBackcall";
import {ActPortfolioGet} from "./pages/ActPortfolioGet";
import {ISettings} from "./settings/ISettings";
import {SettingsManual} from "./settings/SettingsManual";
import {SettingsNunjucks} from "./settings/SettingsNunjucks";
import {SettingsRequestBody} from "./settings/SettingsRequestBody";
import {SettingsSecuredCookies} from "./settings/SettingsSecuredCookies";
import {SettingsStaticResources} from "./settings/SettingsStaticResources";

enum Urls {
    Home = "/"
}

export class Application {
    private settings: ISettings;
    private routes: IRoutes;

    constructor() {
        this.settings = new SettingsRequestBody(
            new SettingsSecuredCookies(
                new Configuration(
                    "Server.Security"
                ),
                new SettingsNunjucks(
                    path.join(__dirname, "views"),
                    new SettingsStaticResources(
                        path.join(__dirname, "public"),
                        "/public",
                        new SettingsManual(8080)
                    )
                )
            )
        );

        this.routes =
            new RoutesSafe(
                new OutStatusInternalServerError(
                    new OutHtml(
                        new HtmlEngineNunjucks(
                            "error/500.html"
                        )
                    )
                ),
                new Routes(
                    new RouteGet(
                        Urls.Home,
                        new ActHomeGet(
                            new Configuration(
                                "Contacts"
                            ),
                            new ImagesInstagramRecent(
                                new Configuration(
                                    "Instagram"
                                ),
                                "standard_resolution"
                            ),
                            new OutCookieCsrf(
                                new CsrfTokens(
                                    new Configuration(
                                        "Server.Security"
                                    )
                                ),
                                new OutHtml(
                                    new HtmlEngineNunjucks(
                                        "home/index.html"
                                    )
                                )
                            )
                        )
                    ),
                    new RoutePost(
                        Urls.Home,
                        new ActCsrfProtected(
                            new CsrfTokens(
                                new Configuration(
                                    "Server.Security"
                                )
                            ),
                            new OutStatusForbidden(
                                "CSRF Failed: CSRF token missing or incorrect"
                            ),
                            new ActRequestBodyValidated(
                                new ValidationComposite(
                                    new Required(
                                        "phone"
                                    ),
                                    new MaxLength(
                                        "name",
                                        50
                                    ),
                                    new MaxLength(
                                        "time",
                                        50
                                    )
                                ),
                                new OutStatusUnprocessableEntity(),
                                new ActHomePostBackcall(
                                    new ConfigurationComposite(
                                        new Configuration(
                                            "Server"
                                        ),
                                        new Configuration(
                                            "Contacts"
                                        )
                                    ),
                                    new HtmlEngineNunjucks(
                                        "email/backcall.html"
                                    ),
                                    new SmtpMailRu(
                                        new Configuration(
                                            "Smtp.MailRu"
                                        )
                                    ),
                                    new OutStatusNoContent(
                                        "Success"
                                    )
                                )
                            )
                        )
                    ),
                    new RouteGet(
                        "/portfolio/:ext/:name",
                        new ActPortfolioGet(
                            new Configuration(
                                "Contacts"
                            ),
                            new ImagesInstagramRecent(
                                new Configuration(
                                    "Instagram"
                                ),
                                "standard_resolution"
                            ),
                            new OutHtml(
                                new HtmlEngineNunjucks(
                                    "portfolio/index.html"
                                )
                            )
                        )
                    ),
                    new RouteNotFound(
                        new ActOutput(
                            new OutStatusNotFound(
                                new OutHtml(
                                    new HtmlEngineNunjucks(
                                        "error/404.html"
                                    )
                                )
                            )
                        )
                    )
                )
            );
    }

    // noinspection JSUnusedGlobalSymbols Используется в ./bin/www
    public run() {
        const app = express();
        this.settings.setUp(app);
        this.routes.setUp(app);
        const server = http.createServer(app).listen(app.settings.port);
        server.on("listening", () => console.log(`Listen on port ${server.address().port}...`));
    }
}
