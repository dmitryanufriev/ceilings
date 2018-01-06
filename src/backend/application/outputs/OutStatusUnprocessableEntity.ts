import * as e from "express";
import {IOutput} from "./IOutput";
import {OutStatus} from "./OutStatus";
import {OutText} from "./OutText";

export class OutStatusUnprocessableEntity implements IOutput {
    private statusCode = 422;
    private origin: IOutput;

    constructor(reason: string = "Unprocessable Entity") {
        this.origin = new OutStatus(
            this.statusCode,
            new OutText(
                `${this.statusCode} ${reason}`
            )
        );
    }

    public with(values: any): IOutput {
        return this;
    }

    public write(res: e.Response): void {
        this.origin.write(res);
    }
}
