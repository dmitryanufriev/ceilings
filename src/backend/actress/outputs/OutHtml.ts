import {Response} from "express";
import {IHtmlEngine} from "../html/IHtmlEngine";
import {IOutput} from "./IOutput";

export class OutHtml implements IOutput {
    private html: IHtmlEngine;
    private values: any;

    constructor(html: IHtmlEngine, values: any = {}) {
        this.html = html;
        this.values = values;
    }

    public with(values: any): IOutput {
        return new OutHtml(this.html, values);
    }

    public write(res: Response): void {
        res.send(this.html.render(this.values));
    }
}
