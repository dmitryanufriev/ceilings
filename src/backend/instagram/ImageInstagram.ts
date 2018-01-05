import {IImageInstagram} from "./IImageInstagram";

export class ImageInstagram implements IImageInstagram {
    private imgId: string;
    private imgHref: string;
    private imgResolution: string;
    private apiImagesJson: any;

    constructor(id: string, href: string, resolution: string, apiImagesJson: any) {
        this.imgId = id;
        this.imgHref = href;
        this.imgResolution = resolution;
        this.apiImagesJson = apiImagesJson;
    }

    public id(): string {
        return this.imgId;
    }

    public src(): string {
        return this.apiImagesJson[this.imgResolution].url;
    }

    public href(): string {
        return this.imgHref;
    }
}
