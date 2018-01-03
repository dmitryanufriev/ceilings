import * as cookieParser from "cookie-parser";
import {Application} from "express";
import {IConfiguration} from "../configuration/IConfiguration";
import {ISettings} from "./ISettings";

export class SettingsSecuredCookies implements ISettings {
    private security: IConfiguration;
    private origin: ISettings;

    constructor(security: IConfiguration, origin: ISettings) {
        this.security = security;
        this.origin = origin;
    }

    public setUp(app: Application): void {
        this.origin.setUp(app);
        app.use(
            cookieParser(
                this.security.value(
                    "secret"
                )
            )
        );
    }
}
