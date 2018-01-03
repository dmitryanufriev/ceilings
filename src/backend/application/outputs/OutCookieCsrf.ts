import Tokens = require("csrf");
import {Response} from "express";
import {IConfiguration} from "../../configuration/IConfiguration";
import {IOutput} from "./IOutput";

export class OutCookieCsrf implements IOutput {
    private security: IConfiguration;
    private origin: IOutput;

    constructor(security: IConfiguration, origin: IOutput) {
        this.security = security;
        this.origin = origin;
    }

    public with(values: any): IOutput {
        return new OutCookieCsrf(
            this.security,
            this.origin.with(
                values
            )
        );
    }

    public write(res: Response): void {
        res.cookie(
            "csrf",
            new Tokens().create(
                this.security.value(
                    "secret"
                )
            ), {
                httpOnly: true,
                maxAge: (1000 * 60) * 15, // (minutes) * count
                signed: true
            });
        this.origin.write(res);
    }
}
