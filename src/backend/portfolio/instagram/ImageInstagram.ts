export class ImageInstagram {
    private imgId: string;
    private imgHref: string;
    private apiImagesJson: any;

    constructor(id: string, href: string, apiImagesJson: any) {
        this.apiImagesJson = apiImagesJson;
    }

    public id(): string {
        return this.imgId;
    }

    public src(resolution: string): string {
        return this.apiImagesJson[resolution].url;
    }

    public href(): string {
        return this.imgHref;
    }

    public toString = (): string => {
        return `<Instagram image (id: ${this.id()})}>`;
    }
}
