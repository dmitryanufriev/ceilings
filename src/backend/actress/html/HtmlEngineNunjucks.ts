import * as nunjucks from "nunjucks";
import {IHtmlEngine} from "./IHtmlEngine";

export class HtmlEngineNunjucks implements IHtmlEngine {
    private template: string;

    constructor(template: string) {
        this.template = template;
    }

    public render(values: any): string {
        return nunjucks.render(this.template, values);
    }
}
