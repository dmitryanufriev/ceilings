import * as e from "express";
import {IActionAsync} from "../application/actions/IActionAsync";
import {IOutput} from "../application/outputs/IOutput";
import {IConfiguration} from "../configuration/IConfiguration";
import {IImagesInstagram} from "../instagram/IImagesInstagram";

export class ActPortfolioGet implements IActionAsync {
    private contacts: IConfiguration;
    private images: IImagesInstagram;
    private out: IOutput;

    constructor(contacts: IConfiguration, images: IImagesInstagram, output: IOutput) {
        this.images = images;
        this.contacts = contacts;
        this.out = output;
    }

    public output(req: e.Request): Promise<IOutput> {
        return Promise.resolve(
            this.out.with({
                title: "Натяжные потолки от Жени",
                description: `тел.: ${this.contacts.value("phone")}`,
                image: `${req.params.name}.${req.params.ext}`
            })
        );
    }
}
