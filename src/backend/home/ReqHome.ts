import { Request } from "express";
import { IRequest } from "../http/requests/IRequest";
import { IOutput } from "../http/outputs/IOutput";

export class ReqHome implements IRequest {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public output(req: Request): IOutput {
        return this.out;
    }
}