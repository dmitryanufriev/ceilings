import { Request } from "express";
import { IOutput } from "../http/outputs/IOutput";
import { IRequest } from "../http/requests/IRequest";
import { ImageInstagram } from "../instagram/ImageInstagram";
import { ImagesInstagramRecent } from "../instagram/ImagesInstagramRecent";

export class ReqGetPortfolio implements IRequest {
    private images: ImagesInstagramRecent;
    private out: IOutput;

    constructor(images: ImagesInstagramRecent, output: IOutput) {
        this.images = images;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await this.images.images();
        return this.out.with({
            images: recent.map((img: ImageInstagram) => {
                return {
                    href: img.href(),
                    src: img.src("standard_resolution")
                };
            })
        });
    }
}
