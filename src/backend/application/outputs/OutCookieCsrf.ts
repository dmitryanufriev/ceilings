import {Response} from "express";
import {CsrfTokens} from "../../csrf/CsrfTokens";
import {IOutput} from "./IOutput";

export class OutCookieCsrf implements IOutput {
    private tokens: CsrfTokens;
    private origin: IOutput;

    constructor(tokens: CsrfTokens, origin: IOutput) {
        this.tokens = tokens;
        this.origin = origin;
    }

    public with(values: any): IOutput {
        return new OutCookieCsrf(
            this.tokens,
            this.origin.with(
                values
            )
        );
    }

    public write(res: Response): void {
        const options = {
            httpOnly: true,
            maxAge: (1000 * 60) * 15, // (minutes) * count
            signed: true
        };
        res.cookie("csrf", this.tokens.token(), options);
        this.origin.write(res);
    }
}
