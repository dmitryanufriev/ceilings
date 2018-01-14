import * as e from "express";
import {IActionAsync} from "../actress/actions/IActionAsync";
import {IConfiguration} from "../actress/configuration/IConfiguration";
import {IImages} from "../actress/images/IImages";
import {ImagesBySpec} from "../actress/images/ImagesBySpec";
import {SpecImageSrcEndsWith} from "../actress/images/specifications/SpecImageSrcEndsWith";
import {IOutput} from "../actress/outputs/IOutput";

export class ActPortfolioGet implements IActionAsync {
    private readonly configuration: IConfiguration;
    private readonly images: IImages;
    private readonly out: IOutput;

    constructor(contacts: IConfiguration, images: IImages, output: IOutput) {
        this.images = images;
        this.configuration = contacts;
        this.out = output;
    }

    public async output(req: e.Request): Promise<IOutput> {
        const images = await new ImagesBySpec(
            new SpecImageSrcEndsWith(
                `${req.params.name}.${req.params.ext}`
            ),
            this.images
        ).all();
        return this.out.with({
            title: "Натяжные потолки от Жени",
            description: `тел.: ${this.configuration.value("contacts.phone")}`,
            image: images.length > 0 ? images[0].src() : "",
            url: `${req.protocol}://${req.headers.host}`
        });
    }
}
