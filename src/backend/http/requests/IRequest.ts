import { Request } from "express";
import { IOutput } from "../outputs/IOutput";

export interface IRequest {
    output(req: Request): IOutput;
}
