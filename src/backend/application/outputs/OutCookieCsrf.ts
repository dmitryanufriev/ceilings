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
        console.log(
            new Tokens().create(
                this.security.value(
                    "secret"
                )
            )
        );
        this.origin.write(res);
    }
}
