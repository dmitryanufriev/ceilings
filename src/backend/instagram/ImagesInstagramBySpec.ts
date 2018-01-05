import {ISpecification} from "../application/specifications/ISpecification";
import {IImageInstagram} from "./IImageInstagram";
import {IImagesInstagram} from "./IImagesInstagram";

export class ImagesInstagramBySpec implements IImagesInstagram {
    private specification: ISpecification<IImageInstagram>;
    private origin: IImagesInstagram;

    constructor(specification: ISpecification<IImageInstagram>, origin: IImagesInstagram) {
        this.specification = specification;
        this.origin = origin;
    }

    public async images(): Promise<IImageInstagram[]> {
        const images = await this.origin.images();
        return images.filter(
            (x: IImageInstagram) => this.specification.satisfiedBy(x)
        );
    }
}
