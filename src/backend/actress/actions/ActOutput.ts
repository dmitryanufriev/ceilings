import {Request} from "express";
import {IOutput} from "../outputs/IOutput";
import {IActionAsync} from "./IActionAsync";

export class ActOutput implements IActionAsync {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public output(req: Request): Promise<IOutput> {
        return Promise.resolve(this.out);
    }
}
