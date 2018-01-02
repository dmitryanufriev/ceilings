import {Request} from "express";
import {IOutput} from "../http/outputs/IOutput";
import {IRequest} from "../http/requests/IRequest";

export class RequestPostBackcall implements IRequest {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public output(req: Request): Promise<IOutput> {
        console.dir(req.body);
        return Promise.resolve(this.out);
    }
}
