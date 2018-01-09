import { Response } from "express";
import { IOutput } from "./IOutput";

export class OutJson implements IOutput {
    private values: any;

    constructor(values: any = {}) {
        this.values = values;
    }

    public with(values: any): IOutput {
        return new OutJson(values);
    }

    public write(res: Response): void {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(this.values));
    }
}
