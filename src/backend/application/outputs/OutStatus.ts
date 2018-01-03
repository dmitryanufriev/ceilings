import {Response} from "express";
import {IOutput} from "./IOutput";

export class OutStatus implements IOutput {
    private code: number;
    private origin: IOutput;

    constructor(code: number, origin: IOutput) {
        this.code = code;
        this.origin = origin;
    }

    public with(values: any): IOutput {
        return new OutStatus(
            this.code,
            this.origin.with(values)
        );
    }

    public write(res: Response): void {
        res.status(this.code);
        this.origin.write(res);
    }
}
