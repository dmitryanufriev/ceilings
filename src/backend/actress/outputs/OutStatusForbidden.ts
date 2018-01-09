import {Response} from "express";
import {IOutput} from "./IOutput";
import {OutStatus} from "./OutStatus";
import {OutText} from "./OutText";

export class OutStatusForbidden implements IOutput {
    private statusCode: number = 403;
    private origin: IOutput;

    constructor(reason: string = "Forbidden") {
        this.origin = new OutStatus(
            this.statusCode,
            new OutText(
                `${this.statusCode} ${reason}`
            )
        );
    }

    public with(values: any): IOutput {
        return this.origin;
    }

    public write(res: Response): void {
        this.origin.write(res);
    }
}
