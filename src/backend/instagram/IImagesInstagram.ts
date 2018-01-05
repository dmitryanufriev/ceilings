import {IImageInstagram} from "./IImageInstagram";

export interface IImagesInstagram {
    images(): Promise<IImageInstagram[]>;
}
