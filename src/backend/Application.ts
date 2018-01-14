import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as http from "http";
import * as nunjucks from "nunjucks";
import * as path from "path";

import {ActCsrfProtected} from "./actress/actions/ActCsrfProtected";
import {ActOutput} from "./actress/actions/ActOutput";
import {ActRequestBodyValidated} from "./actress/actions/ActRequestBodyValidated";
import {Configuration} from "./actress/configuration/Configuration";
import {ConfigurationComposite} from "./actress/configuration/ConfigurationComposite";
import {ConfigurationRoot} from "./actress/configuration/ConfigurationRoot";
import {IConfiguration} from "./actress/configuration/IConfiguration";
import {CsrfTokens, ICsrfTokensConfiguration} from "./actress/csrf";
import {HtmlEngineNunjucks} from "./actress/html/HtmlEngineNunjucks";
import {IInstagramConfiguration} from "./actress/images/instagram/IInstagramConfiguration";
import {ImagesInstagramRecentStandartResolution} from "./actress/images/instagram/recent";
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

// noinspection JSUnusedGlobalSymbols
export class Application {
    private readonly configuration: IConfiguration;
    private readonly routes: IRoutes;

    constructor() {
        const configuration = new ConfigurationRoot();
        const instagramImages = new ImagesInstagramRecentStandartResolution(
            new class implements IInstagramConfiguration {
                public accessToken(): string {
                    return configuration.value("Instagram.accessToken");
                }
            }()
        );
        const csrfTokens = new CsrfTokens(
            new class implements ICsrfTokensConfiguration {
                public secret(): string {
                    return configuration.value("server.security.secret");
                }
            }()
        );
        this.configuration = configuration;
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
                        "/",
                        new ActHomeGet(
                            configuration,
                            instagramImages,
                            new OutCookieCsrf(
                                csrfTokens,
                                new OutHtml(
                                    new HtmlEngineNunjucks(
                                        "home/index.html"
                                    )
                                )
                            )
                        )
                    ),
                    new RoutePost(
                        "/",
                        new ActCsrfProtected(
                            csrfTokens,
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
                                            "server"
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
                            configuration,
                            instagramImages,
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
        // TODO Nunjucks settings to HtmlEngineNunjucks
        const env = nunjucks.configure(
            path.join(__dirname, "views"), {
                autoescape: true
            }
        );
        env.addFilter("digits", (x: string) => x.match(/\d+/g).join(""));
        const app = express();
        app.use(
            "/public",
            express.static(
                path.join(__dirname, "public")
            )
        );
        app.use(
            cookieParser(
                this.configuration.value(
                    "server.security.secret"
                )
            )
        );
        app.use(
            bodyParser.json()
        );
        this.routes.setUp(app);
        const server = http.createServer(
            app
        ).listen(
            this.configuration.value("server.port"),
            this.configuration.value("server.ip")
        );
        server.on(
            "listening",
            () => console.log(
                `Listen ${server.address().address} on ${server.address().port}...`
            )
        );
    }
}
