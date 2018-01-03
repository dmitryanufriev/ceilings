import {Response} from "express";
import {IOutput} from "./IOutput";

export class OutText implements IOutput {
    private text: string;

    constructor(text: string) {
        this.text = text;
    }

    public with(values: any): IOutput {
        return this;
    }

    public write(res: Response): void {
        res.setHeader("Content-Type", "text/plain");
        res.send(this.text);
    }
}
