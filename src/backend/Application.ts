import * as express from "express";
import * as http from "http";
import * as path from "path";

import {ActCsrfProtected} from "./application/actions/ActCsrfProtected";
import {ActRequestBodyValidated} from "./application/actions/ActRequestBodyValidated";
import {OutCookieCsrf} from "./application/outputs/OutCookieCsrf";
import {OutForbidden} from "./application/outputs/OutForbidden";
import {OutHtmlNunjucks} from "./application/outputs/OutHtmlNunjucks";
import {OutNoContent} from "./application/outputs/OutNoContent";
import {OutUnprocessableEntity} from "./application/outputs/OutUnprocessableEntity";
import {RouteGet} from "./application/routing/RouteGet";
import {RoutePost} from "./application/routing/RoutePost";
import {Routes} from "./application/routing/Routes";
import {Configuration} from "./configuration/Configuration";
import {CsrfTokens} from "./csrf/CsrfTokens";
import {ImagesInstagramRecent} from "./instagram/ImagesInstagramRecent";
import {ActHomeGet} from "./pages/ActHomeGet";
import {ActHomePostBackcall} from "./pages/ActHomePostBackcall";
import {ActPortfolioGet} from "./pages/ActPortfolioGet";
import {ISettings} from "./settings/ISettings";
import {SettingsManual} from "./settings/SettingsManual";
import {SettingsNunjucks} from "./settings/SettingsNunjucks";
import {SettingsRequestBody} from "./settings/SettingsRequestBody";
import {SettingsSecuredCookies} from "./settings/SettingsSecuredCookies";
import {SettingsStaticResources} from "./settings/SettingsStaticResources";
import {SmtpMailRu} from "./smtp/transport/SmtpMailRu";
import {MaxLength} from "./validation/MaxLength";
import {Required} from "./validation/Required";
import {ValidationComposite} from "./validation/ValidationComposite";

enum Urls {
    Home = "/"
}

export class Application {
    private settings: ISettings;
    private routes: Routes;

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

        this.routes = new Routes(
            new RouteGet(
                Urls.Home,
                new ActHomeGet(
                    new Configuration(
                        "Contacts"
                    ),
                    new ImagesInstagramRecent(
                        new Configuration(
                            "Instagram"
                        )
                    ),
                    new OutCookieCsrf(
                        new CsrfTokens(
                            new Configuration(
                                "Server.Security"
                            )
                        ),
                        new OutHtmlNunjucks(
                            "home/index.html"
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
                    new OutForbidden(
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
                        new OutUnprocessableEntity(),
                        new ActHomePostBackcall(
                            new Configuration(
                                "Server"
                            ),
                            new Configuration(
                                "Contacts"
                            ),
                            new SmtpMailRu(
                                new Configuration(
                                    "Smtp.MailRu"
                                )
                            ),
                            new OutNoContent(
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
                    new OutHtmlNunjucks(
                        "portfolio/index.html"
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
