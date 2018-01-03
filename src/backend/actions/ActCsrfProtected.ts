import {Request} from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {CsrfTokens} from "../csrf/CsrfTokens";

export class ActCsrfProtected implements IActionAsync {
    private tokens: CsrfTokens;
    private out: IOutput;
    private origin: IActionAsync;

    constructor(tokens: CsrfTokens, origin: IActionAsync, output: IOutput) {
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
