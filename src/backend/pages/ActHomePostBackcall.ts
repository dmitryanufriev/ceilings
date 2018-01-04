import {Request} from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";

export class ActHomePostBackcall implements IActionAsync {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public output(req: Request): Promise<IOutput> {
        console.dir(req.body);
        return Promise.resolve(this.out);
    }
}
