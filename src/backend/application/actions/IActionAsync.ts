import { Request } from "express";
import { IOutput } from "../outputs/IOutput";

export interface IActionAsync {
    output(req: Request): Promise<IOutput>;
}
