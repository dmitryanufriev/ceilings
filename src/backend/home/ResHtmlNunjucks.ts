import * as express from "express";
import { IResponse } from "../http/IReponse";

export class ResHtmlNunjucks implements IResponse {
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    public render(res: express.Response, values: any): void {
        res.render(this.template);
    }
}