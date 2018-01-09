import {Response} from "express";
import {IOutput} from "./IOutput";
import {OutStatus} from "./OutStatus";

export class OutStatusInternalServerError implements IOutput {
    private origin: IOutput;

    constructor(origin: IOutput) {
        this.origin = new OutStatus(
            500,
            origin
        );
    }

    public with(values: any): IOutput {
        return this.origin.with(values);
    }

    public write(res: Response): void {
        this.origin.write(res);
    }
}
