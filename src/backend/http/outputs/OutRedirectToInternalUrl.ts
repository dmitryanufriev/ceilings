import {Response} from "express";
import {IOutput} from "./IOutput";

export class OutRedirectToInternalUrl implements IOutput {
    private url: string;

    constructor(url: string, values: any = {}) {
        this.url = url;
    }

    public with(values: any): IOutput {
        return new OutRedirectToInternalUrl(this.url, values);
    }

    public write(res: Response): void {
        res.redirect(this.url);
    }
}
