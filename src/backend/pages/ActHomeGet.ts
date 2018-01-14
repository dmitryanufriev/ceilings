import {Request} from "express";
import {IActionAsync} from "../actress/actions/IActionAsync";
import {IConfiguration} from "../actress/configuration/IConfiguration";
import {IImages} from "../actress/images/IImages";
import {ImageInstagram} from "../actress/images/instagram/ImageInstagram";
import {IOutput} from "../actress/outputs/IOutput";

export class ActHomeGet implements IActionAsync {
    private configuration: IConfiguration;
    private images: IImages;
    private out: IOutput;

    constructor(configuration: IConfiguration, images: IImages, output: IOutput) {
        this.configuration = configuration;
        this.images = images;
        this.out = output;
    }

    public async output(req: Request): Promise<IOutput> {
        const recent = await this.images.all();
        return this.out.with({
            phone: this.configuration.value(
                "contacts.phone"
            ),
            email: this.configuration.value(
                "contacts.email"
            ),
            telegram: this.configuration.value(
                "contacts.telegram"
            ),
            facebook: this.configuration.value(
                "contacts.social.facebook"
            ),
            instagram: this.configuration.value(
                "contacts.social.instagram"
            ),
            vkontakte: this.configuration.value(
                "contacts.social.vkontakte"
            ),
            images: recent.map((img: ImageInstagram) => {
                return {
                    href: img.href(),
                    src: img.src()
                };
            })
        });
    }
}
