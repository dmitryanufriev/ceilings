import Tokens = require("csrf");
import {IConfiguration} from "../configuration/IConfiguration";

export class CsrfTokens {
    private tokens: Tokens;
    private security: IConfiguration;

    constructor(security: IConfiguration) {
        this.tokens = new Tokens();
        this.security = security;
    }

    public token(): string {
        return this.tokens.create(
            this.security.value(
                "secret"
            )
        );
    }

    public valid(token: string): boolean {
        return this.tokens.verify(
            this.security.value(
                "secret"
            ),
            token
        );
    }
}
