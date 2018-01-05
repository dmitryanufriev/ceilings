import * as e from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {IConfiguration} from "../configuration/IConfiguration";
import {IImagesInstagram} from "../instagram/IImagesInstagram";
import {ImagesInstagramBySpec} from "../instagram/ImagesInstagramBySpec";
import {SpecSrcEndsWith} from "../instagram/SpecSrcEndsWith";

export class ActPortfolioGet implements IActionAsync {
    private contacts: IConfiguration;
    private images: IImagesInstagram;
    private out: IOutput;

    constructor(contacts: IConfiguration, images: IImagesInstagram, output: IOutput) {
        this.images = images;
        this.contacts = contacts;
        this.out = output;
    }

    public async output(req: e.Request): Promise<IOutput> {
        const images = await new ImagesInstagramBySpec(
            new SpecSrcEndsWith(
                `${req.params.name}.${req.params.ext}`
            ),
            this.images
        ).images();
        return Promise.resolve(
            this.out.with({
                title: "Натяжные потолки от Жени",
                description: `тел.: ${this.contacts.value("phone")}`,
                image: images.length > 0 ? images[0].src() : "",
                url: `${req.protocol}://${req.headers.host}`
            })
        );
    }
}
