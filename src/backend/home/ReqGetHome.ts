import { Request } from "express";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";

export class ReqGetHome implements IRequest {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public output(req: Request): IOutput {
        return this.out;
    }
}
