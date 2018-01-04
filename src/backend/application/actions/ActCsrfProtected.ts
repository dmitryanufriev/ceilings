import {Request} from "express";
import {CsrfTokens} from "../../csrf/CsrfTokens";
import {IOutput} from "../outputs/IOutput";
import {IActionAsync} from "./IActionAsync";

export class ActCsrfProtected implements IActionAsync {
    private tokens: CsrfTokens;
    private out: IOutput;
    private origin: IActionAsync;

    constructor(tokens: CsrfTokens, output: IOutput, origin: IActionAsync) {
        this.tokens = tokens;
        this.out = output;
        this.origin = origin;
    }

    public async output(req: Request): Promise<IOutput> {
        let output = Promise.resolve(this.out);
        const token = req.signedCookies.csrf;
        if (token && this.tokens.valid(token)) {
            output = this.origin.output(req);
        }
        return output;
    }
}
