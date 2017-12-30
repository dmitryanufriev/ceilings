import { Request } from "express";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";
import { ImagesInstagramRecent } from "./instagram/ImagesInstagramRecent";

export class ReqGetPortfolio implements IRequest {
    private out: IOutput;

    constructor(output: IOutput) {
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await new ImagesInstagramRecent(
            "",
            "standard_resolution"
        ).images();
        return this.out.with({
            images: recent
        });
    }
}
