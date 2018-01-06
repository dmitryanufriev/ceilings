import {Response} from "express";
import {IOutput} from "./IOutput";
import {OutStatus} from "./OutStatus";
import {OutText} from "./OutText";

export class OutStatusNoContent implements IOutput {
    private statusCode: number = 204;
    private origin: IOutput;

    constructor(reason: string = "No Content") {
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

    public write(res: Response): void {
        this.origin.write(res);
    }

}
